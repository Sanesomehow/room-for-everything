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

const authMiddleware : RequestHandler = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const headerToken = authHeader && authHeader.split(' ')[1];
  const cookieToken = req.cookies.auth_token;
  const token = headerToken || cookieToken;
  const secret = process.env.JWT_SECRET || 'secret';

  console.log('Auth header:', authHeader);
  console.log('Token found:', !!token);

  if (!token) {
    console.log('No token provided');
    res.status(401).json({
      error: "Auth token is required"
    });
    return;
  }
  try {
    const decoded = jwt.verify(token, secret) as any;
    console.log('Decoded token:', decoded);
    
    // Cast to the existing User type structure
    req.user = {
      userId: decoded.userId || decoded.id || decoded.user_id,
      email: decoded.email,
      ...decoded
    } as any; // Temporary cast to avoid type conflicts
    
    console.log('User set on request:', req.user);
    next();
  } catch (err) {
    console.log('Token verification error:', err);
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        error: "Token has expired"
      });
    } else if (err instanceof jwt.JsonWebTokenError) {
      res.status(403).json({
        error: "Invalid token"
      });
    } else {
      res.status(500).json({
        error: "Token verification failed"
      });
    }
    return;
  }
};

// Temporary development middleware that bypasses authentication
// const devAuthMiddleware: RequestHandler = (req, res, next) => {
//   // Set a mock user ID for development
//   req.user = { userId: 1 };
//   next();
// };

// Use the dev middleware instead of the real auth middleware
// router.use(devAuthMiddleware);

router.use(authMiddleware);

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
