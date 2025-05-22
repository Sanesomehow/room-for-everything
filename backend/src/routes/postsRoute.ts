import { RequestHandler, Request, Response, Router } from 'express';
import prisma from '../index';
import jwt from 'jsonwebtoken';
import { getAllPosts } from './posts/getAllPosts';
import { getPostById } from './posts/getPostById';
import { createPost } from './posts/createPost';
import { updatePost } from './posts/updatePost';
import { deletePost } from './posts/deletePost';
import { addTagsToPost } from './posts/addTagsToPost';
import { getTagsForPost } from './posts/getTagsForPost';
import { removeTagFromPost } from './posts/removeTagFromPost';

export const router = Router();

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

//@ts-ignore
const authMiddleware : RequestHandler = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token: string | undefined = authHeader && authHeader.split(' ')[1]
  const secret = process.env.JWT_SECRET || 'secret';

  if (token == null) {
    return res.status(401).json({
      error: "Auth token is required"
    });
  }
  try {
    var decoded = jwt.verify(token, secret);
    console.log(decoded)
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err)
    return res.status(403).json({
      error: "Invalid or expired token"
    })
  }
};

router.use(authMiddleware)

// GET /api/posts
router.use('/', getAllPosts);

// GET /api/posts/:id
router.use('/', getPostById);

// POST /api/posts
router.use('/', createPost);

// PUT /api/posts/:id
router.use('/', updatePost);

// DELETE /api/posts/:id
router.use('/', deletePost);

// POST /api/posts/:id/tags
router.use('/', addTagsToPost);

// GET /api/posts/:id/tags
router.use('/', getTagsForPost);

// DELETE /api/posts/:id/tags/:tag
router.use('/', removeTagFromPost);
