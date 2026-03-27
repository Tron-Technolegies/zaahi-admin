import axios from "axios";

export const api = axios.create({
  baseURL: `https://zaahi-backend.onrender.com/api/v1`,
  withCredentials: true,
});

//https://zaahi-backend.onrender.com
//http://localhost:3000
