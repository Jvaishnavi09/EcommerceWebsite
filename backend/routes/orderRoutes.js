import express from "express";
import { createOrder, getUserOrders } from "../controllers/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new order
router.post("/", authMiddleware, createOrder);

// Get all orders for a user
router.get("/", authMiddleware, getUserOrders);

export default router;
