import React from 'react';

import { FaPlus } from 'react-icons/fa6';
import CouponTable from '../../components/Coupons/CouponTable';
import CouponAddDialog from '../../components/Coupons/CouponAddDialog';
import { useGetCoupons } from '../../hooks/coupons/useCoupon';

export default function Coupons() {
  const [open, setOpen] = React.useState(false);
  const { isError, isLoading, error, data } = useGetCoupons();

  return (
    <>
      <div className='flex justify-between mb-5'>
        <h1 className='text-3xl font-semibold'>Coupons</h1>

        <button
          onClick={() => setOpen(true)}
          className='bg-black text-white flex items-center px-4 py-2 gap-2 rounded-md'
        >
          <FaPlus /> Add Coupon
        </button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>{error.message}</p>
      ) : (
        <CouponTable data={data} />
      )}

      {/* <CouponTable onEdit={() => setOpen(true)} /> */}

      <CouponAddDialog open={open} handleClose={() => setOpen(false)} />
    </>
  );
}
