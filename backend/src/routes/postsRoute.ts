import { RequestHandler, Request, Response, Router } from 'express';
import prisma from '../prismaConfig';
import jwt from 'jsonwebtoken';
import { getAllPosts } from './posts/getAllPosts';
import { getPostById } from './posts/getPostById';
import { createPost } from './posts/createPost';
import { updatePost } from './posts/updatePost';
import { deletePost } from './posts/deletePost';
import { addTagsToPost } from './posts/addTagsToPost';
import { removeTagFromPost } from './posts/removeTagFromPost';

export const router = Router();

declare global {
  namespace Express {
    interface Request {
      user?: User | undefined;
    }
  }
}

/* AUTHENTICATION MIDDLEWARE COMMENTED OUT FOR DEVELOPMENT
const authMiddleware : RequestHandler = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const headerToken = authHeader && authHeader.split(' ')[1];
  const cookieToken = req.cookies.auth_token;
  const token = headerToken || cookieToken;
  const secret = process.env.JWT_SECRET || 'secret';

  if (token == null) {
    res.status(401).json({
      error: "Auth token is required"
    });
    return;
  }
  try {
    var decoded = jwt.verify(token, secret);
    console.log(decoded)
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err)
    res.status(403).json({
      error: "Invalid or expired token"
    })
    return;
  }
};
*/

// Temporary development middleware that bypasses authentication
const devAuthMiddleware: RequestHandler = (req, res, next) => {
  // Set a mock user ID for development
  req.user = { userId: 1 };
  next();
};

// Use the dev middleware instead of the real auth middleware
router.use(devAuthMiddleware);

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

// DELETE /api/posts/:id/tags/:tag
router.use('/', removeTagFromPost);
