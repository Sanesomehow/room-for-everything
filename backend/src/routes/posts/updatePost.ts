import { Router, Request, Response } from 'express';
import prisma from '../../prismaConfig'

export const updatePost = Router();

updatePost.put('/:id', async (req: Request, res: Response) => {
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
    const { title, text } = req.body;

    const foundPost = await prisma.post.findUnique({
      where: {
        id: idNum
      }
    })

    if(!foundPost) {
      res.status(404).json({
        message: "Post not found"
      });
      return;
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: idNum
      },
      data: {
        title: title,
        text: text,
        updatedAt: new Date()
      }
    })

    res.status(200).json({
      message: `Updated post ${idNum}`,
      data: updatedPost
    })
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Failed to update post' });
  }
});
