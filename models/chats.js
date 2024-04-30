import mongoose from "mongoose";

export const chatsSchema = new mongoose.Schema({
    role : {
        type: String,
        enum : ['user', 'model'],
        required : true
    },
    parts : [{text : String}],
})