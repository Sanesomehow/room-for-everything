import { Request, Response, Router } from "express";
import prisma from "../prismaConfig";
import passport from "passport";
import jwt from 'jsonwebtoken'
import { User } from "../../dist/generated/prisma";

export const router = Router();


const frontendUrl = process.env.VITE_FRONTEND_URL || 'http://localhost:5173';

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', {
    session: false,
    failureRedirect: `${frontendUrl}/login?error=oauth_failed`
}),
(req:Request, res:Response) => {
    try {
        const user = req.user as User;
        const secret = process.env.JWT_SECRET || 'secret';

        const token = jwt.sign({
            userId: user.id
        }, secret, { expiresIn: '168h' });

        const redirectUrl = `${frontendUrl}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify({
            id: user.id,
            email: user.email,
            name: user.name,
            profilePicture: user.profilePicture
        }))}`;

        res.redirect(redirectUrl);
    } catch (error) {
        console.log('OAuth callback error:', error);
        res.redirect(`${frontendUrl}/login?error=oauth_failed`);
    }
});