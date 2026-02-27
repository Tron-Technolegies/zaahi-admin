import { IoMail, IoPeopleOutline, IoNotifications } from "react-icons/io5";
import { MdOutlineDashboard, MdOutlineInventory } from "react-icons/md";
import { RiToolsFill, RiCoupon3Line } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";
import { LuBox, LuBoxes } from "react-icons/lu";
import { TbBrandAmigo } from "react-icons/tb";

export const adminNavLinks = [
  {
    id: 1,
    name: "Dashboard",
    path: "/dashboard",
    urlword: "dashboard",
    icon: <MdOutlineDashboard />,
  },
  {
    id: 2,
    name: "Categories",
    path: "/category",
    urlword: "category",
    icon: <LuBoxes />,
  },
  {
    id: 3,
    name: "Brands",
    path: "/brands",
    urlword: "brands",
    icon: <TbBrandAmigo />,
  },
  {
    id: 7,
    name: "Products",
    path: "/products",
    urlword: "products",
    icon: <LuBox />,
  },
  {
    id: 4,
    name: "Orders",
    path: "/orders",
    urlword: "orders",
    icon: <FiShoppingCart />,
  },
  {
    id: 5,
    name: "Customers",
    path: "/customers",
    urlword: "customers",
    icon: <IoPeopleOutline />,
  },
  {
    id: 6,
    name: "Coupons",
    path: "/coupons",
    urlword: "coupons",
    icon: <RiCoupon3Line />,
  },
];
