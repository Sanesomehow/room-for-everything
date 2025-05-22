import { Router, Request, Response } from 'express';
import prisma from '../../index'


export const getAllPosts = Router();
getAllPosts.get('/', async (req: Request, res: Response) => {
    try {
        // TODO: Implement fetching all posts from database
        const AllPosts = await prisma.post.findMany({
            where: {
                id: req.params
            }
        })
        res.status(200).json({
             message: 'Get all posts',
             AllPosts 
            });
    } catch (error) {
        console.error('Error getting posts:', error);
        res.status(500).json({ error: 'Failed to retrieve posts' });
    }
})
