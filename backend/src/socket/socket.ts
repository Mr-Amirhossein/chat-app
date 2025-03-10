import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

export const getReceiverSocketId = (receiverId: string) => {
  return userSocketMap[receiverId];
};

const userSocketMap: { [key: string]: string } = {}; // { userId: socketId }

io.on("connection", (socket) => {
  // console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId as string;

  if (userId) userSocketMap[userId] = socket.id;

  //io.emit() is used to send the message to all the connected clients
  io.emit("getOnLineUsers", Object.keys(userSocketMap));

  //socket.on() is used to listen to the events .can be used both on client and server side
  socket.on("disconnect", () => {
    // console.log("User disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnLineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
