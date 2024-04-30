import express from 'express';
import wrapAsync from '../utils/wrapAsync.js';
import {loginUser, logoutUser, registerUser, verifyUser } from '../controllers/user.js';
import { loginValidations, signupValidations, validate } from '../utils/validator.js';
import { verifyToken } from '../utils/token.js';

const userRouter = express.Router();


userRouter.post('/signup',validate(signupValidations), wrapAsync(registerUser, "Couldn't register the user", 403));

userRouter.post('/login', validate(loginValidations),wrapAsync(loginUser, "Couldn't Login"));

userRouter.get('/auth-status', verifyToken, wrapAsync(verifyUser, "Authentication Failed", 401));

userRouter.get('/logout', wrapAsync(logoutUser, "Couldn't Log out", 500));

export default userRouter;