import React from 'react';

const DashboardCard = ({ title, value, percentage, isPositive, icon }) => {
  return (
    <div className='bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300 w-full'>
      <div className='flex justify-between items-start'>
        <div>
          <p className='text-gray-500 text-sm font-medium'>{title}</p>
          <h2 className='text-2xl font-semibold mt-2'>{value}</h2>
        </div>

        <div className='bg-gray-100 p-3 rounded-lg text-yellow-500 text-xl'>
          {icon}
        </div>
      </div>

      <div className='flex items-center gap-2 mt-4 text-sm'>
        <span
          className={`font-medium ${
            isPositive ? 'text-green-600' : 'text-red-500'
          }`}
        >
          {isPositive ? '↗' : '↘'} {percentage}
        </span>
        <span className='text-gray-500'>vs last month</span>
      </div>
    </div>
  );
};

export default DashboardCard;
