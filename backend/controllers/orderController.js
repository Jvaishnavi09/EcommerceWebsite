import mongoose from "mongoose";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

// Create a new order
export const createOrder = async (req, res) => {
  const { products, total } = req.body;

  try {
    const order = new Order({
      user: req.user.id,
      products,
      total,
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all orders for a user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate({
      path: "products._id",
      model: Product,
    });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updatePayment = async (id, status) => {
  console.log(id, "status", status);
  try {
    const order = await Order.findByIdAndUpdate(
      id,
      { payment: status },
      { new: true }
    );
    console.log(order, "order");
  } catch (err) {
    console.log("ERROR UPDATING PAYMENT", err);
  }
};
