import React, { useState } from "react";
import ProductTable from "../../components/products/ProductTable";
import ProductDialog from "../../components/products/ProductDialog";
import { FiFilter } from "react-icons/fi";
import { HiPlus } from "react-icons/hi";

export default function Products() {
  const [open, setOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState("add");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddOpen = () => {
    setDialogMode("add");
    setSelectedProduct(null);
    setOpen(true);
  };

  const handleEditOpen = (product) => {
    setDialogMode("edit");
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <div className="p-10 min-h-screen flex flex-col gap-8 bg-[#FAFAFA]">
      <div className="flex items-center justify-between">
        <button className="flex items-center gap-1 px-4 py-1.5 border border-gray-300 rounded-xl text-gray-600 font-semibold bg-white hover:bg-gray-50 transition-all shadow-sm text-lg">
          <FiFilter className="text-xl" />
          <span>Filter</span>
        </button>

        <button
          onClick={handleAddOpen}
          className="flex items-center gap-1 px-4 py-1.5 bg-[#171717] text-[#FACC15] rounded-xl font-medium hover:bg-black transition-all shadow-lg text-lg active:scale-95"
        >
          <HiPlus className="text-2xl" />
          <span>Add Product</span>
        </button>
      </div>

      <ProductTable onEdit={handleEditOpen} />

      <ProductDialog
        open={open}
        handleClose={handleClose}
        mode={dialogMode}
        editData={selectedProduct}
      />
    </div>
  );
}
