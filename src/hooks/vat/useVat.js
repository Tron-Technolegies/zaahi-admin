import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";
import { toast } from "react-toastify";

export const useGetVat = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["vat"],
    queryFn: async () => {
      const { data } = await api.get("/shipping");
      return data;
    },
  });
  return { isError, isLoading, data };
};

export const useAddNewVat = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.post("/shipping", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vat"] });
      toast.success("New Data updated");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "something went wrong",
      );
    },
  });
  return { isPending, mutateAsync };
};
