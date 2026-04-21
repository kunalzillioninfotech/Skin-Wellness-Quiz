import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/products",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = token;
  return config;
});

export const fetchProducts = (page = 1, limit = 10) => API.get(`/?page=${page}&limit=${limit}`);
export const createProduct = (data) =>
API.post("/", data, {
    headers: {
    "Content-Type": "multipart/form-data",
    },
});
export const removeProduct = (id) => API.delete(`/${id}`);