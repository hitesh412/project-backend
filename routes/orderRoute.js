const express = require("express");
const Order = require("../models/Order");
const authMiddleware = require("../middleware/auth");


const router = express.Router();

// Create a new order
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
     const savedOrder = await order.save();
     res.status(201).json(savedOrder);
   } catch (error) {
    res.status(500).json({ message: "Order failed" });
  }
});

 // Get order by OrderID
 router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.json(order);
   } catch (error) {
     res.status(404).json({ message: "Order not found" });
   }
 });


// Get all orders
router.get("/", async (req, res) => {
   try {
     const orders = await Order.find(); 
    res.json(orders);
   } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
   }
 });

 router.post("/", authMiddleware, async (req, res) => {
  try {
    const { customer, items, total } = req.body;

    const order = new Order({
      user: req.user.id,
      customer,
      items,
      total,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Order failed" });
  }
});










module.exports = router;

