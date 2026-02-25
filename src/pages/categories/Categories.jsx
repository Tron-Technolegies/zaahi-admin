import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import CategoryTable from "../../components/categories/CategoryTable";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import DialogTable from "../../components/categories/Dialogtable";

export default function Categories() {
  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1>Categories</h1>
        <DialogTable />
      </div>

      <CategoryTable />
    </div>
  );
}
