import { Router } from 'express';
import prisma from '../../prismaConfig';


const router = Router();


router.get('/', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
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

    // Transform the posts to match the frontend expectations
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
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
        // If you want to include tags, make sure your Prisma query includes them and the type allows it
        tags: (post as any).tags ?? []
      };
    });

    res.json(formattedPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
});


export { router as getAllPosts };
