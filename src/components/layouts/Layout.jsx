import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col gap-5 w-full">
        <Header />
        <div className="bg-gray-100 min-h-screen p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
