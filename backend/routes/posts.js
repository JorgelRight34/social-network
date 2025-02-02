import { Router } from "express";
import { createPost, deletePost, getPosts } from "../controllers/posts.js";
import { authenticate } from "../controllers/users.js";
import upload from "../middlewares/uploads.js";

const postsRouter = Router();

// Routes
postsRouter.post('/', authenticate, upload.array('files', 5), createPost);
postsRouter.delete('/:postId', authenticate, deletePost);
postsRouter.get('/posts', getPosts);

export default postsRouter