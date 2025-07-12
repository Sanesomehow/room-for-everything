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

    if (url) {
      try {
        type = findType(url)

        previewData = (await fetchMetadata({ url, type })) ?? {};
        //previewData = await scraper({ html, url });

        //console.log('Scraped metadata:', previewData);
      } catch (error) {
        console.error('Failed to load metadata:', error);
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