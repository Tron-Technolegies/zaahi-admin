import React from "react";
import { FaDollarSign } from "react-icons/fa";
import { FiShoppingCart, FiUsers } from "react-icons/fi";
import { AiOutlineLineChart } from "react-icons/ai";
import DashboardCard from "./DashboardCard";
import { useGetDashboardOverview } from "../../hooks/stats/useStats";

const DashboardStats = () => {
  const { isLoading, data } = useGetDashboardOverview();
  const statsData = [
    {
      title: "Total Orders",
      value: "1,253",
      percentage: "8%",
      isPositive: true,
      icon: <FiShoppingCart />,
    },
    {
      title: "New Customers",
      value: "342",
      percentage: "2%",
      isPositive: false,
      icon: <FiUsers />,
    },
    {
      title: "Growth Rate",
      value: "18.2%",
      percentage: "4%",
      isPositive: true,
      icon: <AiOutlineLineChart />,
    },
  ];

  return (
    !isLoading && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Revenue"
          value={`Rs ${data?.dashboard?.totalRevenue || 0}`}
          percentage="12%"
          isPositive={true}
          icon={<FaDollarSign />}
        />
        <DashboardCard
          title="Total Orders"
          value={` ${data?.dashboard?.totalOrders || 0}`}
          percentage="12%"
          isPositive={true}
          icon={<FaDollarSign />}
        />
        <DashboardCard
          title="Customers"
          value={` ${data?.dashboard?.totalCustomers || 0}`}
          percentage="12%"
          isPositive={true}
          icon={<FaDollarSign />}
        />
        <DashboardCard
          title="Total Products"
          value={` ${data?.dashboard?.totalProducts || 0}`}
          percentage="12%"
          isPositive={true}
          icon={<FaDollarSign />}
        />
      </div>
    )
  );
};

export default DashboardStats;
