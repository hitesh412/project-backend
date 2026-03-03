const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Order = require("../models/Order");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    // Get logged-in user
    const user = await User.findById(req.user.id).select("-password");

    // Get total orders of that user
    const orders = await Order.countDocuments({
      user: req.user.id,
    });

    res.json({
      name: user.name,
      email: user.email,
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;