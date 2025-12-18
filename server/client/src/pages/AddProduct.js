import { useState } from "react";
import { addProduct } from "../services/productService";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    mrp: "",
    sellingPrice: "",
    quantity: "",
    status: "published"
  });

  const navigate = useNavigate();

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
    <div className="container">
      <h2>Add Product</h2>

      {["name", "brand", "mrp", "sellingPrice", "quantity"].map((f) => (
        <input
          key={f}
          name={f}
          placeholder={f.toUpperCase()}
          value={form[f]}
          onChange={handleChange}
          required
        />
      ))}

      <select name="status" onChange={handleChange}>
        <option value="published">Published</option>
        <option value="unpublished">Unpublished</option>
      </select>

      <button>Add Product</button>
    </div>
  );
}

export default AddProduct;
