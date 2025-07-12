import { Router } from 'express';
import prisma from '../prismaConfig';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



export const router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const saltRounds: number = parseInt(process.env.SALT_ROUNDS || '10', 10);
        const hash = await bcrypt.hash(req.body.password, saltRounds);
        
        const newUser = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hash
            }, select: {
                id: true,
                email: true,
                name: true
            }
        });
        
        const secret: string = process.env.JWT_SECRET || 'secret';
        const token = jwt.sign({
            userId: newUser.id
        }, secret, { expiresIn: '168h' });
        
        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        }).status(200).json({
            message: "User signed Up",
            user: newUser  
        });

    } catch (error) {
        res.status(500).json({
            error: "failed to sign Up"
        })
    }
})
