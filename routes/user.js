const express = require("express");
const User = require("../models/User");
const Order = require("../models/Order");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    const orders = await Order.find({ user: req.user.id });

    res.json({
      username: user.name,
      email: user.email,
      totalOrders: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: "Profile load failed" });
  }
});

module.exports = router;