const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

// CREATE product
router.post("/", productController.createProduct);

// GET all products
router.get("/", productController.getProducts);

// DELETE product
router.delete("/:id", productController.deleteProduct);

module.exports = router;
