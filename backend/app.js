import dotenv from "dotenv";
dotenv.config({});
import express from "express";
import connectDb from "./config/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
import { app,server } from "./socket/socket.js";
import path from "path";


const __dirname = path.resolve();

const corsOption = {
    origin:"http://localhost:5173",
    credentials:true
}
app.use(cors(corsOption));
// requiring routes
import userRouters from "./routes/userRoute.js"
import messageRouters from "./routes/messageRoute.js"

// using routes
app.use("/api/v1/user",userRouters);
app.use("/api/v1/message",messageRouters);


app.use(express.static(path.join(__dirname,"/frontend/dist")))
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
});




const PORT = process.env.PORT;

server.listen(PORT,()=>{
    connectDb();
    console.log(`App is listening on port ${PORT}`);
});