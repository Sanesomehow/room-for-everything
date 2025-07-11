import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import prisma from "../prismaConfig"
import jwt from 'jsonwebtoken';

export const router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const secret: string = process.env.JWT_SECRET || 'secret';
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })
        if (!user) {
            res.status(401).json({
                error: "Invalid email or Passsword"
            });
            return;
        }

        if (!user.password) {
            res.status(401).json({
                error: "This account was created using Google. Please use Google Sign-In."
            })
            return;
        }

        const match = await bcrypt.compare(password, user.password);

        if (match) {
            const token = jwt.sign({
                userId: user.id
            }, secret, { expiresIn: '168h' });
            res.cookie('auth_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            }).json({
                message: "User Login successful",
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
            });
        } else {
            res.status(401).json({
                error: "Invalid email or password"
            })
        }

    } catch (err) {
        console.log(err + "password hash did not match")
    }
})