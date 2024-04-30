import express from "express";
import {config} from "dotenv";
import indexRouter from "./routes/index.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import {GoogleGenerativeAI} from "@google/generative-ai"
import cors from "cors";
if(process.env.NODE_ENV != "production"){
    config();
}

const app = express();

app.use(cors({origin: "http://localhost:5173", credentials: true}));
app.use(express.json()); 
app.use(cookieParser(process.env.COOKIE_SECRET));           
app.use(morgan('dev'));     //remove this while rendering

app.use("/api/v1", indexRouter);

app.use((err,req,res,next)=>{
    let {status=500,name , message="Something went wrong"} = err;
    res.status(status).send({message});
  });

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
export const model = genAI.getGenerativeModel({ model: "gemini-pro"});

export default app;