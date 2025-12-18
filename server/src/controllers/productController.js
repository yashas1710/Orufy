const Product = require("../models/Product");

// CREATE
exports.createProduct = async (req, res) => {
  try {
    console.log("createProduct body:", req.body);
    const body = req.body || {};
    const name = body.name;

    // Accept either `price` (from client) or `mrp`/`sellingPrice` (model)
    const mrpFromBody = body.mrp != null ? Number(body.mrp) : undefined;
    const sellingFromBody = body.sellingPrice != null ? Number(body.sellingPrice) : undefined;
    const priceFromBody = body.price != null ? Number(body.price) : undefined;

    if (!name) return res.status(400).json({ error: "Name is required" });

    // Determine mrp and sellingPrice to satisfy model requirements
    const mrp = mrpFromBody ?? priceFromBody;
    const sellingPrice = sellingFromBody ?? priceFromBody ?? mrpFromBody;

    if (mrp == null || Number.isNaN(Number(mrp))) {
      return res.status(400).json({ error: "mrp (or price) is required and must be a number" });
    }

    if (sellingPrice == null || Number.isNaN(Number(sellingPrice))) {
      return res.status(400).json({ error: "sellingPrice (or price) is required and must be a number" });
    }

    const payload = {
      name,
      brand: body.brand || "Generic",
      mrp: Number(mrp),
      sellingPrice: Number(sellingPrice),
      quantity: body.quantity != null ? Number(body.quantity) : 1,
      status: body.status || "published",
      description: body.description || "",
      images: Array.isArray(body.images) ? body.images : [],
    };

    const product = await Product.create(payload);
    res.status(201).json(product);
  } catch (err) {
    console.error("createProduct error:", err);
    res.status(500).json({ error: "Failed to create product", details: err.message });
  }
};

// READ
exports.getProducts = async (req, res) => {
  try {
    const filter = req.query.status ? { status: req.query.status } : {};
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error("getProducts error:", err);
    res.status(500).json({ error: "Failed to get products", details: err.message });
  }
};

// UPDATE
exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Product not found" });
    res.json(updated);
  } catch (err) {
    console.error("updateProduct error:", err);
    res.status(500).json({ error: "Failed to update product", details: err.message });
  }
};

// DELETE
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error("deleteProduct error:", err);
    res.status(500).json({ error: "Failed to delete product", details: err.message });
  }
};
