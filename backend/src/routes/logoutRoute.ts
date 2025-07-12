import { Request, Response, Router } from "express";

export const router = Router();

router.post('/', (req: Request, res:Response) => {
    res.clearCookie('auth_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    }).json({
        message: "Logged out successfully"
    });
})