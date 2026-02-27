import React from 'react';
import { FaDollarSign } from 'react-icons/fa';
import { FiShoppingCart, FiUsers } from 'react-icons/fi';
import { AiOutlineLineChart } from 'react-icons/ai';
import DashboardCard from './DashboardCard';

const DashboardStats = () => {
  const statsData = [
    {
      title: 'Total Orders',
      value: '1,253',
      percentage: '8%',
      isPositive: true,
      icon: <FiShoppingCart />,
    },
    {
      title: 'New Customers',
      value: '342',
      percentage: '2%',
      isPositive: false,
      icon: <FiUsers />,
    },
    {
      title: 'Growth Rate',
      value: '18.2%',
      percentage: '4%',
      isPositive: true,
      icon: <AiOutlineLineChart />,
    },
  ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
      <DashboardCard
        title='Total Revenue'
        value='$54,239'
        percentage='12%'
        isPositive={true}
        icon={<FaDollarSign />}
      />

      {statsData.map((item, index) => (
        <DashboardCard key={index} {...item} />
      ))}
    </div>
  );
};

export default DashboardStats;
