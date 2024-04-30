import User from '../models/user.js';
import {hash, compare} from "bcrypt";
import { COOKIE_NAME, createToken } from '../utils/token.js';
import jwt from "jsonwebtoken";

export async function registerUser(req, res){
    let {name, email, password} = req.body;
    let existingUser = await User.findOne({email});
    if(existingUser){
       return res.status(401).send("User already registered");
    }
    let hashedPassword = await hash(password, 10);
    let user = new User({name, email, password: hashedPassword});
    await user.save();
    res.clearCookie(COOKIE_NAME, {
        httpOnly: true,
        signed: true,sameSite: "none", secure: true
    });

    let token = createToken(user._id.toString(), user.email, "7d");
    let expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME,token, {httpOnly: true, signed: true, sameSite: "none", secure: true,  expires
    });
    res.status(200).json({message: "OK", name, email});
}

export async function loginUser(req, res){
    let {email,password} = req.body;
    let user = await User.findOne({email});
    if(!user){
        return res.status(401).send("User not registered");
    }
    let isPassword = await compare(password, user.password);
    if(!isPassword){
        return res.status(403).send("Incorrect password");
    }
    res.clearCookie(COOKIE_NAME, {
        httpOnly: true,
        signed: true,sameSite: "none", secure: true
    });

    let token = createToken(user._id.toString(), user.email, "7d");
    let expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME,token, { httpOnly: true, signed: true, sameSite: "none", secure: true, expires
    });
    res.status(200).json({message: "ok", email, name: user.name});
}


export async function verifyUser(req, res){
    let user = await User.findById(res.locals.jwtData.id);
    if(!user){
        return res.status(401).send("Authentication failed");
    }
    if(user.email !== res.locals.jwtData.email){
        return res.status(401).send("Authentication failed");
    }
    
    res.status(200).json({message: "ok", email : user.email, name: user.name});
}


export async function logoutUser(req,res){
    let data = await jwt.verify(req.signedCookies[`${COOKIE_NAME}`], process.env.JWT_SECRET);
    if(data){
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            signed: true,sameSite: "none", secure: true
        });
        return res.status(200).send("Logged Out Successfully");
    }
}
