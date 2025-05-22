import { Router } from 'express';
import prisma from '../index';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';



export const router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const saltRounds: number = parseInt(process.env.SALT_ROUNDS || '10', 10);
        const hash = await bcrypt.hash(req.body.password, saltRounds);
        
        const newUser = await prisma.user.create({
            data: {
                email: req.body.email,
                password: hash
            }, select: {
                id: true,
                email: true
            }
        });
        
        res.status(200).json({
            message: "User signed Up",
            newUser
        });

    } catch (error) {
        res.status(500).json({
            error: "failed to sign Up"
        })
    }
})
