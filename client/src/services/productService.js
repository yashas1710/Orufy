import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api/products`;

export const getProducts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addProduct = async (product) => {
  const res = await axios.post(API_URL, product);
  return res.data;
};

export const deleteProduct = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
