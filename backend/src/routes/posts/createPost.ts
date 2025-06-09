import { Router, Request, Response } from 'express';
import prisma from '../../index'

export const createPost = Router();

createPost.post('/', async (req: Request, res: Response) => {
  try {
    const postData = req.body;
    // TODO: Implement creating post in database 
    res.status(201).json({ message: 'Post created', data: postData });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});
