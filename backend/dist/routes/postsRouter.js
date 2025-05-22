"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.createPost = exports.getPostById = exports.getAllPosts = exports.router = void 0;
const express_1 = require("express");
const index_1 = __importDefault(require("../index"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.router = (0, express_1.Router)();
//@ts-ignore
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'secret';
    if (token == null) {
        return res.status(401).json({
            error: "Auth token is required"
        });
    }
    try {
        var decoded = jsonwebtoken_1.default.verify(token, secret);
        console.log(decoded);
        req.user = decoded;
        next();
    }
    catch (err) {
        console.log(err);
        return res.status(403).json({
            error: "Invalid or expired token"
        });
    }
};
exports.router.use(authMiddleware);
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // TODO: Implement fetching all posts from database
        yield index_1.default.post.findMany();
        res.status(200).json({ message: 'Get all posts' });
    }
    catch (error) {
        console.error('Error getting posts:', error);
        res.status(500).json({ error: 'Failed to retrieve posts' });
    }
});
exports.getAllPosts = getAllPosts;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // TODO: Implement fetching post by ID from database
        res.status(200).json({ message: `Get post ${id}` });
    }
    catch (error) {
        console.error('Error getting post:', error);
        res.status(500).json({ error: 'Failed to retrieve post' });
    }
});
exports.getPostById = getPostById;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postData = req.body;
        // TODO: Implement creating post in database
        res.status(201).json({ message: 'Post created', data: postData });
    }
    catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Failed to create post' });
    }
});
exports.createPost = createPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updateData = req.body;
        // TODO: Implement updating post in database
        res.status(200).json({ message: `Updated post ${id}`, data: updateData });
    }
    catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Failed to update post' });
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // TODO: Implement deleting post from database
        res.status(200).json({ message: `Deleted post ${id}` });
    }
    catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Failed to delete post' });
    }
});
exports.deletePost = deletePost;
const addTagsToPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { tags } = req.body;
        // TODO: Implement adding tags to post in database
        res.status(200).json({ message: `Added tags to post ${id}`, tags });
    }
    catch (error) {
        console.error('Error adding tags to post:', error);
        res.status(500).json({ error: 'Failed to add tags to post' });
    }
});
const getTagsForPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // TODO: Implement fetching tags for post from database
        res.status(200).json({ message: `Get tags for post ${id}`, tags: [] });
    }
    catch (error) {
        console.error('Error getting tags for post:', error);
        res.status(500).json({ error: 'Failed to retrieve tags for post' });
    }
});
const removeTagFromPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, tag } = req.params;
        // TODO: Implement removing tag from post in database
        res.status(200).json({ message: `Removed tag ${tag} from post ${id}` });
    }
    catch (error) {
        console.error('Error removing tag from post:', error);
        res.status(500).json({ error: 'Failed to remove tag from post' });
    }
});
// GET /api/posts
exports.router.get('/', exports.getAllPosts);
// GET /api/posts/:id
exports.router.get('/:id', exports.getPostById);
// POST /api/posts
exports.router.post('/', exports.createPost);
// PUT /api/posts/:id
exports.router.put('/:id', exports.updatePost);
// DELETE /api/posts/:id
exports.router.delete('/:id', exports.deletePost);
// POST /api/posts/:id/tags
exports.router.post('/:id/tags', addTagsToPost);
// GET /api/posts/:id/tags
exports.router.get('/:id/tags', getTagsForPost);
// DELETE /api/posts/:id/tags/:tag
exports.router.delete('/:id/tags/:tag', removeTagFromPost);
