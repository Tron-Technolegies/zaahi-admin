import React from "react";
import BrandTable from "../../components/Brands/BrandTable";
import BrandDialog from "../../components/Brands/BrandDialog";
import { FaPlus } from "react-icons/fa6";
import { useGetBrands } from "../../hooks/brands/useBrands";

export default function Brands() {
  const [open, setOpen] = React.useState(false);
  const { isError, isLoading, error, data } = useGetBrands();

  return (
    <>
      <div className="flex justify-between mb-5">
        <h1 className="text-xl">Brands</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-black text-white flex items-center px-4 py-2 gap-2 rounded-md"
        >
          <FaPlus /> Add Brand
        </button>
      </div>
      {isLoading ? (
        <p>Loading....</p>
      ) : isError ? (
        <p>{error.message}</p>
      ) : (
        <BrandTable data={data} />
      )}
      {console.log(data)}

      <BrandDialog open={open} handleClose={() => setOpen(false)} />
    </>
  );
}
