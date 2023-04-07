import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import connectDB from "./config/database";
import cors from 'cors';
import authRouter from "./routes/auth";
import productRouter from "./routes/product";
import categoryRouter from "./routes/category";


const app = express();
dotenv.config();

connectDB(process.env.MONGO_URI);

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/api", productRouter);
app.use("/api", authRouter);
app.use("/api", categoryRouter)

export const viteNodeApp = app;