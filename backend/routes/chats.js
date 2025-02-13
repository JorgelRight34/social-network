import { Router } from "express";
import { authenticate } from "../controllers/users.js";
import { getChat, getChats, getUserchat } from "../controllers/chats.js";

const chatsRouter = Router();

// Routes
chatsRouter.get('/:chatId', authenticate, getChat);
chatsRouter.get('/', authenticate, getChats);

export default chatsRouter