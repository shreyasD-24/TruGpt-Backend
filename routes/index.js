import express from 'express';
import userRouter from './user.js';
import chatsRouter from './chats.js';
const indexRouter = express.Router();

indexRouter.use("/user", userRouter);
indexRouter.use("/chat", chatsRouter);

export default indexRouter;