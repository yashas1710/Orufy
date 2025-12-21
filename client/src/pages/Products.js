import { useState } from "react";
import { addProduct } from "../services/productService";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    brand: "",
    mrp: "",
    sellingPrice: "",
    quantity: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await addProduct(form);
    navigate("/");
  };

  return (
    <form onSubmit={submitHandler}>
      <h2>Add Product</h2>

      <input name="name" placeholder="Product Name" onChange={handleChange} />
      <input name="brand" placeholder="Brand" onChange={handleChange} />
      <input name="mrp" placeholder="MRP" type="number" onChange={handleChange} />
      <input
        name="sellingPrice"
        placeholder="Selling Price"
        type="number"
        onChange={handleChange}
      />
      <input
        name="quantity"
        placeholder="Quantity"
        type="number"
        onChange={handleChange}
      />

      <button type="submit">Add Product</button>
    </form>

    
  );
}

export default AddProduct;
