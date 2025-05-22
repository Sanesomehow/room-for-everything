import { Router, Request, Response } from 'express';
import prisma from '../../index'

export const deletePost = Router();

deletePost.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let idNum = parseInt(id);
    // TODO: Implement deleting post from database
    await prisma.post.delete({
      where: {
        id: idNum
      }
    })
    res.status(200).json({ message: `Deleted post ${id}` });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});
