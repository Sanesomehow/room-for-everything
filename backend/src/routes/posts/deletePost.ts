import { Router, Request, Response } from 'express';
import prisma from '../../prismaConfig'

export const deletePost = Router();

deletePost.delete('/:id', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;
    if(!userId) {
      res.status(401).json({
        error: "User not authenticated"
      });
      return;
    }
    const { id } = req.params;
    let idNum = parseInt(id);

    const existingPost = await prisma.post.findUnique({
      where: {
        id: idNum,
        userId: userId
      }
    });

    if(!existingPost) {
      res.status(404).json({
        message: "Post not found"
      });
    }
    
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
