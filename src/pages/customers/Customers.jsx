import CustomersTable from "../../components/Customers/CustomersTable";
import { useGetAllCustomers } from "../../hooks/customer/useCustomers.js";

export default function Customers() {
  const { isError, isLoading, error, data } = useGetAllCustomers();

  return (
    <div>
      <h1 className="mb-10 text-xl">Registered Customers</h1>
      {isLoading ? (
        <p>Loading....</p>
      ) : isError ? (
        <p>{error.message}</p>
      ) : (
        <CustomersTable data={data?.users} />
      )}
    </div>
  );
}
