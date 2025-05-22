import { Router, Request, Response } from 'express';
import prisma from '../../index'

export const getPostById = Router();

getPostById.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        let idNum = parseInt(id)
        // TODO: Implement fetching post by ID from database

        const post = await prisma.post.findFirst({
            where: {
                id: idNum
            }
        })
        res.status(200).json({ 
            message: `Get post ${id}`,
            post
         });
    } catch (error) {
        console.error('Error getting post:', error);
        res.status(500).json({ error: 'Failed to retrieve post' });
    }
})