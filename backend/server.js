// Load environment variables
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import { updatePayment } from "./controllers/orderController.js";
// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Frontend URL
    credentials: true, // Allows cookies
  })
);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(express.static("public"));

// Connect to MongoDB
connectDB();
app.get("/", async (req, res) => {
  res.send("Welcome to Ecommerce Backend");
});
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

//stripe Integration

app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const { line_items, orderId } = req.body; // Extract `line_items`
    console.log("orderId", orderId);
    if (!Array.isArray(line_items)) {
      return res.status(400).json({ error: "Invalid cart format" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_items,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}success`,
      cancel_url: `${process.env.FRONTEND_URL}cancel`,
      metadata: { orderId },
    });
    res.json(session);
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

//Stripe WebHook
app.post(
  "/webhook",
  express.json({ type: "application/json" }),
  (request, response) => {
    const event = request.body;
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        const orderId = session.metadata?.orderId;
        updatePayment(orderId, "completed");
        break;

      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log("✅ Payment Intent Successful:", paymentIntent.id);
        break;

      case "payment_intent.payment_failed":
        console.log("❌ Payment Failed:", event.data.object);
        break;

      default:
        console.log("Unhandled event type:", event.type);
    }

    response.json({ received: true });
  }
);
// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
