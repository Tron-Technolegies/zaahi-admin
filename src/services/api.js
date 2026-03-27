import axios from "axios";

export const api = axios.create({
  baseURL: `https://zaahibackend.onrender.com/api/v1`,
  withCredentials: true,
});

//https://zaahibackend.onrender.com
//http://localhost:3000
