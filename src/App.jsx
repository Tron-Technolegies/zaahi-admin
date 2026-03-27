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
import { userInfoLoader } from "./loader/UserLoader";
import Login from "./pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";

const client = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 3 } },
});

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: userInfoLoader,
    errorElement: <Error />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "brands", element: <Brands /> },
      { path: "category", element: <Categories /> },
      { path: "products", element: <Products /> },
      { path: "orders", element: <Orders /> },
      // { path: "coupons", element: <Coupons /> },
      { path: "customers", element: <Customers /> },
    ],
  },
  { path: "/login", element: <Login /> },
]);

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <ToastContainer position="top-right" theme="dark" />
      <ReactQueryDevtools initialIsOpen />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
