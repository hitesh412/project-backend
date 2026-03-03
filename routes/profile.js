const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Order = require("../models/Order");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const [user, totalOrders] = await Promise.all([
      User.findById(req.user.id).select("-password"),
      Order.countDocuments({ user: req.user.id }),
    ]);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      name: user.name,
      email: user.email,
      totalOrders,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;