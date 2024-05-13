import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import messagesRoutes from "./routes/messageRoutes.js";
import { v2 as cloudinary } from "cloudinary";
const app = express();
dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

cloudinary.config({
  cloud_name: process.env.C_C_NAME,
  api_key: process.env.C_API_KEY,
  api_secret: process.env.C_API_SECRET,
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages/", messagesRoutes);

app.listen(PORT, () => {});
