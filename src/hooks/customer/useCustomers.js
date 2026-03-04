import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";

export const useGetCustomer = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await api.get("/user/info");
      return data;
    },
  });
  return { isError, error, isLoading, data };
};

export const useGetAllCustomers = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await api.get("/user");
      return data;
    },
  });
  return { isError, error, isLoading, data };
};
