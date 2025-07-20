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

    // Check if post exists AND belongs to user, then delete in one operation
    const deletedPost = await prisma.post.deleteMany({
      where: {
        id: idNum,
        userId: userId
      }
    });

    if(deletedPost.count === 0) {
      res.status(404).json({
        message: "Post not found or unauthorized"
      });
      return;
    }
    
    res.status(200).json({ 
      message: `Deleted post ${id}`,
      deleted: deletedPost.count 
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});
