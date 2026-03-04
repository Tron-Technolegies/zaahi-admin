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
      toast.error(error?.response?.data?.error || error?.response?.data?.message || error.message);
    },
  });
  return { isPending, mutateAsync };
};

export const useGetOrder = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await api.get("/order/all");
      return data;
    },
  });
  return { isLoading, isError, error, data };
};
