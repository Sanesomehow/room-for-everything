import { Router, Request, Response } from 'express';
import prisma from '../../prismaConfig'

export const removeTagFromPost = Router();

removeTagFromPost.delete('/:id/tags/:tag', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;
    if(!userId) {
      res.status(401).json({
        error: "User not authenticated"
      });
      return;
    }
    const { id, tag } = req.params;
    // TODO: Implement removing tag from post in database
    res.status(200).json({ message: `Removed tag ${tag} from post ${id}` });
  } catch (error) {
    console.error('Error removing tag from post:', error);
    res.status(500).json({ error: 'Failed to remove tag from post' });
  }
});
