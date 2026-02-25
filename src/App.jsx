import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import {
  Brands,
  Categories,
  Coupons,
  Customers,
  Dashboard,
  Error,
  Orders,
  Products,
} from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "brands", element: <Brands /> },
      { path: "category", element: <Categories /> },
      { path: "products", element: <Products /> },
      { path: "orders", element: <Orders /> },
      { path: "coupons", element: <Coupons /> },
      { path: "customers", element: <Customers /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
