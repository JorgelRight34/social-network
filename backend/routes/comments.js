import { Router } from "express";
import { createComment, getPostComments } from "../controllers/comments.js";
import { authenticate } from "../controllers/users.js";

const commentsRouter = Router();

// Routes
commentsRouter.post('/', authenticate, createComment);
commentsRouter.get('/:postId', getPostComments);

export default commentsRouter