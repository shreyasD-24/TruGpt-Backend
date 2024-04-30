import mongoose from "mongoose";
import { chatsSchema } from "./chats.js";

const userSchema = new mongoose.Schema({
    name : {
        type: String, 
        required : true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    chats: [chatsSchema],
});
let User = mongoose.model('User', userSchema);

export default User
