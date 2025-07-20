import { Router, Request, Response } from 'express';
import prisma from '../../prismaConfig';
import { findType } from "../../findType"
import { ItemType } from '../../../dist/generated/prisma';
import { fetchMetadata } from '../../fetchMetadata';

const router = Router();

interface CreatePostBody {
  title?: string;
  text?: string;
  url?: string;
  tags?: string[];
}

router.post('/', async (req: Request<{}, {}, CreatePostBody>, res: Response) => {
  try {
    const userId = (req as any).user?.userId;
    if(!userId) {
      res.status(401).json({
        error: "User not authenticated"
      });
      return;
    }
    
    const { title, text, url, tags } = req.body;
    let previewData = {};
    let type: ItemType = ItemType.TEXT;

    // Fetch metadata asynchronously but don't wait for it if it's slow
    if (url) {
      try {
        type = findType(url);
        // Set a timeout for metadata fetching to prevent delays
        const metadataPromise = fetchMetadata({ url, type });
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Metadata timeout')), 5000)
        );
        
        previewData = await Promise.race([metadataPromise, timeoutPromise]) ?? {};
      } catch (error) {
        console.log('Metadata fetch failed or timed out, continuing without metadata:', error);
        previewData = {};
      } 
    }

    const post = await prisma.post.create({
      data: {
        title,
        text,
        url,
        type,
        previewData: JSON.stringify(previewData),
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    res.status(201).json({
      message: 'Post created successfully',
      post,
      previewData
    });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({
      error: 'Failed to create post',
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
});

export { router as createPost };