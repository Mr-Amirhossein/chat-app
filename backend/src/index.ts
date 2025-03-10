import express from "express";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth.route.ts";
import messageRoutes from "./routes/message.route.ts";

import dotenv from "dotenv";
import { app, server } from "./socket/socket.ts";

dotenv.config();

const __dirname = path.resolve();

app.use(cookieParser());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

// fronnend => localhost:3000
// backend => localhost:5000
server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
