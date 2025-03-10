import express from "express";
const router = express.Router();
router.get("/conversation", (req, res) => {
  res.send("Conversation route");
});
router.get("/message", (req, res) => {
  res.send("Message route");
});
export default router;
