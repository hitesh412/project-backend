// const express = require("express");
// const Order = require("../models/Order");

// const router = express.Router();


// router.post("/", async (req, res) => {
//   try {
//     const order = new Order(req.body);
//     const savedOrder = await order.save();
//     res.status(201).json(savedOrder);
//   } catch (error) {
//     res.status(500).json({ message: "Order failed" });
//   }
// });


// router.get("/:id", async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     res.json(order);
//   } catch (error) {
//     res.status(404).json({ message: "Order not found" });
//   }
// });



// router.get("/", async (req, res) => {
//   try {
//     const orders = await Order.find(); 
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch orders" });
//   }
// });










// module.exports = router;

const express = require("express");
const Order = require("../models/Order");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// CREATE ORDER
router.post("/", protect, async (req, res) => {
  try {
    const order = await Order.create({
      user: req.user.id,
      customer: req.body.customer,
      items: req.body.items,
      total: req.body.total
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Order failed" });
  }
});

// GET LOGGED-IN USER ORDERS
router.get("/my-orders", protect, async (req, res) => {
  const orders = await Order.find({ user: req.user.id })
    .sort({ createdAt: -1 });

  res.json(orders);
});

// GET SINGLE ORDER (OWNERSHIP CHECK)
router.get("/:id", protect, async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order || order.user.toString() !== req.user.id) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.json(order);
});

module.exports = router;
