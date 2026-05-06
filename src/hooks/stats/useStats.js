import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";

export const useGetDashboardOverview = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["overview"],
    queryFn: async () => {
      const { data } = await api.get("/stats/overview");
      return data;
    },
  });
  return { isLoading, data, isError, error };
};

export const useGetRevenueChart = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["revenue-chart"],
    queryFn: async () => {
      const { data } = await api.get("/stats/revenue-chart");
      return data;
    },
  });
  return { isLoading, data, isError, error };
};

export const useGetTopProducts = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["top-products"],
    queryFn: async () => {
      const { data } = await api.get("/stats/top-products");
      return data;
    },
  });
  return { isLoading, data, isError, error };
};

export const useGetCustomerGrowth = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["customer-growth"],
    queryFn: async () => {
      const { data } = await api.get("/stats/customer-growth");
      return data;
    },
  });
  return { isLoading, data, isError, error };
};

export const useGetCategoryStats = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["category-stats"],
    queryFn: async () => {
      const { data } = await api.get("/stats/category-stats");
      return data;
    },
  });
  return { isLoading, data, isError, error };
};
