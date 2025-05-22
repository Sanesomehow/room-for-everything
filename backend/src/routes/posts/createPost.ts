import { Router, Request, Response } from 'express';
import prisma from '../../index'

export const createPost = Router();

type PostInput = {
  title: string,
  type: 'video' | 'audio' | 'inage' | 'text' | 'url';
  content
}


createPost.post('/', async (req: Request, res: Response) => {
  try {
    const postData = req.body;
    // TODO: Implement creating post in database
    await prisma.post.create({
        data: {
            title: req.body.title,
            
        }
    })
    res.status(201).json({ message: 'Post created', data: postData });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});
