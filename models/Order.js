const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer: {
      name: String,
      email: String,
      phone: String,
      address: String,
    },
    user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},
    items: [
      {
        id: String,
        name: String,
        size: String,
        quantity: Number,
        totalPrice: Number,
      },
    ],
    total: Number,
  },
  { timestamps: true }
);


module.exports = mongoose.model("Order", orderSchema);

