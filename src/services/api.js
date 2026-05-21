import axios from "axios";

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api/v1"
      : `https://api.zaahidesigns.com/api/v1`,
  withCredentials: true,
});

//https://zaahi-backend.onrender.com
//http://localhost:3000
//https://api.zaahidesigns.com
