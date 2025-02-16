import { Router } from "express";
import {
  createPost,
  deletePost,
  getNetworkPosts,
  getPosts,
  likePost,
  unlikePost,
} from "../controllers/posts.js";
import { authenticate } from "../controllers/users.js";
import upload from "../middlewares/uploads.js";

const postsRouter = Router();

// Routes
postsRouter.post("/", authenticate, upload.array("files", 5), createPost);
postsRouter.get("/:networkName", getNetworkPosts);
postsRouter.get(
  "/",
  (req, res, next) => authenticate(req, res, next, true),
  getPosts
);
postsRouter.delete("/:postId", authenticate, deletePost);
postsRouter.post("/like", authenticate, likePost);
postsRouter.post("/unlike", authenticate, unlikePost);

export default postsRouter;
