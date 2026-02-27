import React, { useState } from "react";
import CategoryTable from "../../components/categories/CategoryTable";
import DialogTable from "../../components/categories/Dialogtable";
import { MdEdit } from "react-icons/md";

export default function Categories() {
  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-xl">Categories</h1>
        <DialogTable />
      </div>
      <CategoryTable />
    </div>
  );
}
