const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Order = require("../models/Order");

router.get("/profile", authMiddleware, async (req, res) => {

  try {

    const orders = await Order.find({ user: req.user._id });

    res.json({
      name: req.user.name,
      email: req.user.email,
      orders
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }

});

module.exports = router;