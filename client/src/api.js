import axios from 'axios';
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

// Add a request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
      config.headers.Authorization = `Bearer ${token}`;
  }else {
    // If no token, redirect to login
    const navigate = useNavigate();
    navigate("/login");
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
