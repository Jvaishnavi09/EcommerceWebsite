import Product from "../models/Product.js";
import Order from "../models/Order.js";
import mongoose from "mongoose";

// Add a new product (admin only)
export const addProduct = async (req, res) => {
  const { name, price, description, category, stock } = req.body;
  const image = req.file ? `uploads/${req.file.filename}` : req.image;

  try {
    const product = new Product({
      name,
      price,
      description,
      category,
      stock,
      image,
      addedBy: new mongoose.Types.ObjectId(req.user.id),
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a product (admin only)
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, category, stock } = req.body;
  console.log("hi from admin updatae product");
  const image = req.file ? req.file.path : req.body.image;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { name, price, description, category, stock, image },
      { new: true }
    );
    res.status(200).json(product);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a product (admin only)
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all orders (admin only)
export const getAllOrders = async (req, res) => {
  console.log("get all products");
  try {
    const orders = await Order.find()
      .populate("user", "-password -role") // Populate user
      .populate({
        path: "products._id", // Populate product field inside products array
        model: "Product",
      });
    console.log(orders, "orders");
    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// Update order status (admin only)
export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  console.log(id, status, "updateOrderStatus");
  try {
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllProducts = async (req, res) => {
  const user = req.user;
  console.log(user, "user");
  try {
    const products = await Product.find({
      addedBy: new mongoose.Types.ObjectId(user.id),
    });
    res.status(200).json(products);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server error" });
  }
};
