import React, { useState } from "react";
import { FaHamburger } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import SmallHeader from "./SmallHeader";
import { useSignOut } from "../../hooks/auth/useLogin";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { isPending, mutateAsync } = useSignOut();
  return (
    <div className="bg-white h-20 sticky top-0 flex items-center justify-between px-3">
      <p className="text-3xl hidden lg:block">Dashboard</p>
      <button className="lg:hidden text-3xl" onClick={() => setOpen(true)}>
        <MdMenu />
      </button>
      <button
        onClick={() => mutateAsync()}
        className="p-2 px-4 bg-black text-white"
      >
        {isPending ? "...." : "Logout"}
      </button>
      <SmallHeader open={open} handleClose={() => setOpen(false)} />
    </div>
  );
}
