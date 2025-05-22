import { Router, Request, Response } from 'express';
import prisma from '../../index'

export const updatePost = Router();

updatePost.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let idNum = parseInt(id);
    const updateData = req.body;
    // TODO: Implement updating post in database

    await prisma.post.update({
      where: {
        id: idNum
      },
      data:{
        title: updateData.title,
        updatedAt: new Date()
      }
    })
    res.status(200).json({ message: `Updated post ${id}`, data: updateData });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Failed to update post' });
  }
});
