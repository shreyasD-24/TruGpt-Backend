import User from '../models/user.js';
import { model } from '../app.js';

export async function generateChat(req,res){
    let {message} = req.body;
    let user = await User.findById(res.locals.jwtData.id);
    let history = user.chats.map(({role,parts})=>{parts = parts.map(({text})=>({text}));
                                                        return {role,parts}});
    user.chats.push({role: 'user', parts: [{text : message}]});
    const chat = model.startChat({
        history
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const textMssg = response.text();
    user.chats.push({role: 'model', parts: [{text : textMssg}]});
    await user.save();
    let chats = user.chats.map(({role,parts})=>{parts = parts.map(({text})=>({text}));
                                                        return {role,parts}});
    res.send({chats});
}

export async function loadChats(req,res,next){
    let user = await User.findById(res.locals.jwtData.id);
    let chats = user.chats.map(({role,parts})=>{parts = parts.map(({text})=>({text}));
                                                        return {role,parts}});
                                                        res.send({chats});
}


export async function deleteChats(req, res){
    let user = await User.findById(res.locals.jwtData.id);
    if(user.email != res.locals.jwtData.email){
        res.status(403).send("Authorisation Failed");
    }
    user.chats = [];
    await user.save();
    res.status(200).send("Chats cleared");
}