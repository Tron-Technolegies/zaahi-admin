import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";
import { toast } from "react-toastify";

export const usePlaceOrder = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.post("/order/confirm", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Added");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          error.message,
      );
    },
  });
  return { isPending, mutateAsync };
};

export const useGetOrder = ({ currentPage, status }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["orders", currentPage, status],
    queryFn: async () => {
      const { data } = await api.get("/order/all", {
        params: { currentPage, status },
      });
      return data;
    },
  });
  return { isLoading, isError, data };
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async ({ orderId, status }) => {
      await api.patch(`/order/${orderId}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order status updated");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          error.message,
      );
    },
  });
  return { isPending, mutateAsync };
};
