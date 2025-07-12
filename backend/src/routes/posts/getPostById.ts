import { Router, Request, Response } from 'express';
import prisma from '../../prismaConfig'

export const getPostById = Router();

getPostById.get('/:id', async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user?.userId;
        if (!userId) {
            res.status(401).json({
                error: "User not authenticated"
            });
            return;
        }
        const { id } = req.params;
        let idNum = parseInt(id);
        if (isNaN(idNum)) {
            res.status(400).json({ error: 'Invalid post ID. Must be a number.' });
            return;
        }

        const post = await prisma.post.findFirst({
            where: {
                id: idNum,
                userId: userId
            }
        })
        res.status(200).json({
            message: `Get post ${idNum}`,
            post
        });
    } catch (error) {
        console.error('Error getting post:', error);
        res.status(500).json({ error: 'Failed to retrieve post' });
    }
})