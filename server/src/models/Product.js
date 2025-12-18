const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, default: "Generic" },
    mrp: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
    status: {
      type: String,
      enum: ["published", "unpublished"],
      default: "published"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
