import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

// Register a new user
router.post("/register", register);

// Login user
router.post("/login", login);

// Logout user
router.get("/logout", authMiddleware, logout);

export default router;
