import { Router, Request, Response } from 'express';
import prisma from '../../index'

export const addTagsToPost = Router();

addTagsToPost.post('/:id/tags', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let idNum = parseInt(id);
    const { tags } = req.body;
    // TODO: Implement adding tags to post in database
    res.status(200).json({ message: `Added tags to post ${id}`, tags });
  } catch (error) {
    console.error('Error adding tags to post:', error);
    res.status(500).json({ error: 'Failed to add tags to post' });
  }
});
