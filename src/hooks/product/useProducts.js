import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";
import { toast } from "react-toastify";

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await api.get(`/product`);
      return data; // returns { products, totalPages, totalProducts }
    },
  });
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      // We pass the FormData object directly; axios/api will set the correct headers
      await api.post(`/product`, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product added successfully");
    },
    onError: (err) => toast.error(err.response?.data?.error || "Upload failed"),
  });
};

export const useEditProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      // Backend uses patch(`/product/edit/${id}`)
      await api.patch(`/product/edit/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Updated Successfully");
    },
    onError: (err) => toast.error(err.response?.data?.error || "Update failed"),
  });
};

export const useGetSingleProduct = ({ id }) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await api.get(`/product/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      // Backend: export const deleteProduct = async (req, res) => { const { id } = req.params; ... }
      await api.delete(`/product/delete/${id}`);
    },
    onSuccess: () => {
      // Refresh the table data automatically
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error || "Failed to delete product");
    },
  });
};
