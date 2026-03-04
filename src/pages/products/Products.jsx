import React, { useState } from "react";
import ProductTable from "../../components/products/ProductTable";
import AddProductDialog from "../../components/products/AddProductDialog";
import EditProductDialog from "../../components/products/EditProductDialog";
import { FiFilter } from "react-icons/fi";

export default function Products() {
  // We only need to manage state for the Edit dialog
  // because AddProductDialog handles its own state internally.
  const [editOpen, setEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEditOpen = (product) => {
    setSelectedProduct(product);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="p-10 min-h-screen flex flex-col gap-8 bg-[#FAFAFA]">
      <div className="flex items-center justify-between">
        <button className="flex items-center gap-1 px-4 py-1.5 border border-gray-300 rounded-xl text-gray-600 font-semibold bg-white hover:bg-gray-50 transition-all shadow-sm text-lg">
          <FiFilter className="text-xl" />
          <span>Filter</span>
        </button>

        {/* This component now contains its own "Add Product" button and Dialog */}
        <AddProductDialog />
      </div>

      <ProductTable onEdit={handleEditOpen} />

      {/* Specifically for editing existing records */}
      <EditProductDialog open={editOpen} onClose={handleEditClose} item={selectedProduct} />
    </div>
  );
}
