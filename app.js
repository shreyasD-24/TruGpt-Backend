import express from "express";
import {config} from "dotenv";
import indexRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import {GoogleGenerativeAI} from "@google/generative-ai"
import cors from "cors";
if(process.env.NODE_ENV != "production"){
    config();
}

const app = express();

app.use(cors({origin: "https://trugpt.netlify.app", credentials: true}));
app.use(express.json()); 
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/api/v1", indexRouter);

app.use((err,req,res,next)=>{
    let {status=500,name , message="Something went wrong"} = err;
    res.status(status).send({message});
  });

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
export const model = genAI.getGenerativeModel({ model: "gemini-pro"});

export default app;
