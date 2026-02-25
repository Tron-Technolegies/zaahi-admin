import React from "react";
import { IoNotifications } from "react-icons/io5";

export default function Header() {
  return (
    <div className="bg-white h-20 sticky top-0 flex items-center justify-between px-3">
      <p className="text-3xl">Dashboard</p>
      <div className="flex gap-2 items-center">
        <input
          className="p-2 outline-none rounded-full bg-gray-100"
          type="search"
          placeholder="search"
        />
        <IoNotifications size={24} />
      </div>
    </div>
  );
}
