import { Router } from 'express';
import prisma from '../../prismaConfig';


const router = Router();


router.get('/', async (req, res) => {
  try {
    const userId = (req as any).user?.userId;
    if(!userId) {
      res.status(401).json({
        error: "User not authenticated"
      });
      return;
    }
    const posts = await prisma.post.findMany({
      where: {
        userId: userId
      },
      include: {
        user: {
          select: {
            id: true,
            email: true
          }
        }
        // If your Post model has a 'tags' relation, add it to your Prisma schema and then uncomment the next line:
        // ,tags: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const formattedPosts = posts.map(post => {
      return {
        id: post.id,
        title: post.title,
        content: post.text || post.url || '',
        text: post.text,
        url: post.url,
        type: post.type,
        previewData: post.previewData,
        userId: post.userId,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        // If you want to include tags, make sure your Prisma query includes them and the type allows it
      };
    });

    res.json(formattedPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
});


export { router as getAllPosts };
