import express from "express";
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllOrders,
  updateOrderStatus,
  getAllProducts,
} from "../controllers/adminController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// Add a new product
router.post(
  "/products",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  addProduct
);

// Update a product
router.put(
  "/products/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  updateProduct
);

// Delete a product
router.delete("/products/:id", authMiddleware, adminMiddleware, deleteProduct);

// Get all orders
router.get("/orders", authMiddleware, adminMiddleware, getAllOrders);

// Update order status
router.put("/orders/:id", authMiddleware, adminMiddleware, updateOrderStatus);

router.get("/products", authMiddleware, adminMiddleware, getAllProducts);

export default router;
