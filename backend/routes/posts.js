import { Router } from "express";
import { createPost, deletePost, getNetworkPosts, getPosts } from "../controllers/posts.js";
import { authenticate } from "../controllers/users.js";
import upload from "../middlewares/uploads.js";

const postsRouter = Router();

// Routes
postsRouter.post('/', authenticate, upload.array('files', 5), createPost);
postsRouter.get('/:networkName', getNetworkPosts);
postsRouter.get('/', getPosts);
postsRouter.delete('/:postId', authenticate, deletePost);

export default postsRouter