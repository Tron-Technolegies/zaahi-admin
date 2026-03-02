import { redirect } from "react-router-dom";
import { api } from "../services/api";

export const userInfoLoader = async () => {
  try {
    const response = await api.get(`/user/info`);
    const data = response.data;
    const user = data;

    if (!user) {
      throw new Error("No user found in response");
    }
    if (user.role !== "Admin") {
      throw new Error(`User role is '${user.role}', expected 'Admin'`);
    }
    return user;
  } catch (error) {
    console.error(error?.response?.data?.error || error?.response?.data?.message || error.message);
    return redirect("/login");
  }
};
