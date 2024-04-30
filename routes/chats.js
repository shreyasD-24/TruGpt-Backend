import express from 'express';
import { chatValidations, validate } from '../utils/validator.js';
import { verifyToken } from '../utils/token.js';
import wrapAsync from '../utils/wrapAsync.js';
import { deleteChats, generateChat, loadChats } from '../controllers/chat.js';
const chatsRouter = express.Router();

chatsRouter.post("/new", verifyToken,validate(chatValidations), wrapAsync(generateChat,"Unable to connect to AI"));
chatsRouter.get("/",verifyToken, wrapAsync(loadChats,"Unable to Load Chats", 500));
chatsRouter.delete("/",verifyToken, wrapAsync(deleteChats,"Unable to clear Chats", 500));
export default chatsRouter;