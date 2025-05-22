import { Router } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../index'
import jwt from 'jsonwebtoken';

export const router = Router();

router.post('/', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const id = req.params;
        const secret: string = process.env.JWT_SECRET || 'secret';
        const user = await prisma.user.findUnique({
            where: {
                email: username,
            }
        })
        if (!user?.password) {
            res.json({
                error: "Invalid Username or Passsword"
            });
            return;
        }

        const match = await bcrypt.compare(password, user?.password);

        if (match) {
            const token = jwt.sign({
                userId: id
            }, secret, { expiresIn: '168h' });
            res.json({
                message: "User Login successful",
                token,
            });
        }

    } catch (err) {
        console.log(err + "password hash did not match")
    }
})