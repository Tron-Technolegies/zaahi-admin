import React from "react";
import CustomersTable from "../../components/Customers/CustomersTable";

export default function Customers() {
  return (
    <div>
      <h1 className="mb-10 text-xl">Registered Customers</h1>
      <CustomersTable />
    </div>
  );
}
