// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema(
//    {
//     customer: {
//       name: String,
//       email: String,
//       phone: String,
//       address: String,
//      },
//      items: [
//        {
//         id: String,
//          name: String,
//          size: String,
//         quantity: Number,
//         totalPrice: Number,
//       },
//     ],
//     total: Number,
//    },
//    { timestamps: true }
//  );


// module.exports = mongoose.model("Order", orderSchema);

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    customer: {
      name: String,
      email: String,
      phone: String,
      address: String
    },
    items: [
      {
        name: String,
        size: String,
        quantity: Number,
        totalPrice: Number
      }
    ],
    total: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "confirmed"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
