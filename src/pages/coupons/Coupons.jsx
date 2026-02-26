import React from 'react';

import { FaPlus } from 'react-icons/fa6';
import CouponTable from '../../components/Coupons/CouponTable';
import CouponAddDialog from '../../components/Coupons/CouponAddDialog';

export default function Coupons() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div className='flex justify-between mb-5'>
        <h1>Brands</h1>

        <button
          onClick={() => setOpen(true)}
          className='bg-black text-white flex items-center px-4 py-2 gap-2 rounded-md'
        >
          <FaPlus /> Add Coupon
        </button>
      </div>

      <CouponTable onEdit={() => setOpen(true)} />

      <CouponAddDialog open={open} handleClose={() => setOpen(false)} />
    </>
  );
}
