import React from "react";
import { adminNavLinks } from "../../utils/AdminLinks";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-75 bg-neutral-800 min-h-screen sticky top-0 left-0 flex flex-col p-3">
      <h1 className="text-3xl text-gray-100 mt-5 text-center pb-5 border-b">Zaahi Admin</h1>
      <nav className="my-8 flex flex-col gap-4">
        {adminNavLinks.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className="text-white flex gap-3 items-center p-2 text-lg hover:bg-gray-200 hover:text-black rounded-full ease-in-out duration-200 hover:ms-2"
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
