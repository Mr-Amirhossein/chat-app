import express from "express";
import {
  getMe,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.ts";
import protectRoute from "../middleware/protectRoute.ts";
const router = express.Router();
router.get("/me", protectRoute, getMe);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
