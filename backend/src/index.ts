import express from "express";
import authRoutes from "./routes/auth.route.ts";
import messageRoutes from "./routes/massage.route.ts";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/massages", messageRoutes);
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
