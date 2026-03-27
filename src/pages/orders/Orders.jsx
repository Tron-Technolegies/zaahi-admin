import React, { useState } from "react";
import OrderTable from "../../components/Orders/OrderTable";
import { useGetOrder } from "../../hooks/Orders/useOrders";
import PaginationComponent from "../../components/PaginationComponent";

export default function Orders() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentStatus, setCurrentStatus] = useState("ALL");
  const { isError, isLoading, error, data } = useGetOrder({
    currentPage,
    status: currentStatus,
  });

  return (
    <div>
      <h1 className="mb-10 text-xl">Orders</h1>
      {isLoading ? (
        <p>Loading....</p>
      ) : isError ? (
        <p>{error.message}</p>
      ) : (
        <>
          <select
            className="p-2 outline-none shadow my-3 bg-gray-200"
            value={currentStatus}
            onChange={(e) => setCurrentStatus(e.target.value)}
          >
            <option value={"ALL"}>ALL</option>
            <option value={"Pending"}>Pending</option>
            <option value={"Confirmed"}>Confirmed</option>
            <option value={"Shipped"}>Shipped</option>
            <option value={"Delivered"}>Delivered</option>
            <option value={"Cancelled"}>Cancelled</option>
          </select>

          <OrderTable data={data?.orders} />
          {data.totalPages > 1 && (
            <PaginationComponent
              page={currentPage}
              totalPage={data.totalPages}
              pageChange={(e, v) => setCurrentPage(v)}
            />
          )}
        </>
      )}
    </div>
  );
}
