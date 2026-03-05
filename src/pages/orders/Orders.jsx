import React from "react";
import OrderTable from "../../components/Orders/OrderTable";
import { useGetOrder } from "../../hooks/orders/useOrders";

export default function Orders() {
  const { isError, isLoading, error, data } = useGetOrder();

  return (
    <div>
      <h1 className="mb-10 text-xl">Orders</h1>
      {isLoading ? (
        <p>Loading....</p>
      ) : isError ? (
        <p>{error.message}</p>
      ) : (
        <OrderTable data={data?.orders} />
      )}
    </div>
  );
}
