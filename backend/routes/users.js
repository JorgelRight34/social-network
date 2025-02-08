import { Router } from "express";
import { authenticate, getUser, login, refreshToken, register, userInfo } from "../controllers/users.js";
import upload from "../middlewares/uploads.js";

const userRouter = Router();

// Routes
userRouter.get('/', authenticate, userInfo);
userRouter.get('/profile/:username', getUser);
userRouter.post('/register', upload.single('profile-pic'), register);
userRouter.post('/refresh', refreshToken);
userRouter.post('/login', login);

export default userRouter