import { Router } from "express";
import { authenticate, login, refreshToken, register, userInfo } from "../controllers/users.js";

const userRouter = Router();

// Routes
userRouter.get('/', authenticate, userInfo);
userRouter.post('/register', register);
userRouter.post('/refresh', refreshToken);
userRouter.post('/login', login);

export default userRouter