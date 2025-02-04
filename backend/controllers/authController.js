import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Register a new user
export const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(200).json({ message: "User E-mail already exists" });
    }

    // Create new user
    user = new User({ username, password, email, role });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    // Generate JWT
    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 3600000 * 24 * 7 * 52,
      // domain: ".yourbackend.com",
    }); // 1 hour
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login user
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password, "email");
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Cannot find user e-mail !" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set token in cookie
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
    res.status(200).json({
      message: "Logged in successfully",
      userDetails: { email: user.email, name: user.username, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Logout user
export const logout = (req, res) => {
  console.log("logout");
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};
