const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  console.log("ADMIN MIDDLEWARE PASS");
  next();
};

export default adminMiddleware;
