// utils/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "api/backend",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
