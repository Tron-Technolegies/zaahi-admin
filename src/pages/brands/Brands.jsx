import React from 'react';
import BrandTable from '../../components/Brands/BrandTable';
import BrandDialog from '../../components/Brands/BrandDialog';
import { FaPlus } from 'react-icons/fa6';

export default function Brands() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div className='flex justify-between mb-5'>
        <h1 className='text-3xl font-semibold'>Brands</h1>

        <button
          onClick={() => setOpen(true)}
          className='bg-black text-white flex items-center px-4 py-2 gap-2 rounded-md'
        >
          <FaPlus /> Add Brand
        </button>
      </div>

      <BrandTable />

      <BrandDialog open={open} handleClose={() => setOpen(false)} />
    </>
  );
}
