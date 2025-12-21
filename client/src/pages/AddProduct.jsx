import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../services/productService";


function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    brand: "",
    mrp: "",
    sellingPrice: "",
    quantity: "",
    status: "published"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    await addProduct({
      ...form,
      mrp: Number(form.mrp),
      sellingPrice: Number(form.sellingPrice),
      quantity: Number(form.quantity)
    });

    navigate("/");
  };

  return (
    <div className="page">
      <form className="form" onSubmit={submitHandler}>
        <h2>Add Product</h2>
        <p className="desc">Fill product details carefully</p>

        <div className="field">
          <label>Product Name</label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>

        <div className="field">
          <label>Brand</label>
          <input name="brand" value={form.brand} onChange={handleChange} required />
        </div>

        <div className="row">
          <div className="field">
            <label>MRP</label>
            <input
              type="number"
              name="mrp"
              value={form.mrp}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>Selling Price</label>
            <input
              type="number"
              name="sellingPrice"
              value={form.sellingPrice}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="field">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
          </div>
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
