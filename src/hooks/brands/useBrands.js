import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";
import { toast } from "react-toastify";
export const useGetBrands = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const { data } = await api.get(`/brand`);
      return data;
    },
  });
  return { isLoading, isError, error, data };
};

export const useAddBrands = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.post(`/brand`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["brands"],
      });
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

export const useGetSingleBrand = ({ id }) => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["brand", id],
    queryFn: async () => {
      const { data } = await api.get(`/brand/${id}`);
      return data;
    },
  });
  return { isError, isLoading, error, data };
};

export const useEditBrand = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.patch(`/brand/edit/${data.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      queryClient.invalidateQueries({ queryKey: ["brand"] });

      toast.success("Updated");
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

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.delete(`/brand/delete/${data.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });

      toast.success("Deleted");
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
