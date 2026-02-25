import { IoMail, IoNotifications } from "react-icons/io5";
import { MdCategory, MdOutlineInventory } from "react-icons/md";
import { RiToolsFill } from "react-icons/ri";

export const adminNavLinks = [
  {
    id: 1,
    name: "Dashboard",
    path: "/dashboard",
    urlword: "dashboard",
    icon: <MdCategory />,
  },
  {
    id: 2,
    name: "Categories",
    path: "/category",
    urlword: "category",
    icon: <RiToolsFill />,
  },
  {
    id: 3,
    name: "Brands",
    path: "/brands",
    urlword: "brands",
    icon: <MdOutlineInventory />,
  },
  {
    id: 7,
    name: "Products",
    path: "/products",
    urlword: "products",
    icon: <IoMail />,
  },
  {
    id: 4,
    name: "Orders",
    path: "/orders",
    urlword: "orders",
    icon: <IoNotifications />,
  },
  {
    id: 5,
    name: "Customers",
    path: "/customers",
    urlword: "customers",
    icon: <IoMail />,
  },
  {
    id: 6,
    name: "Coupons",
    path: "/coupons",
    urlword: "coupons",
    icon: <IoMail />,
  },
];
