import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../services/api';
import { toast } from 'react-toastify';

export const useGetCategories = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get(`/category`);
      return data;
    },
  });
  return { isLoading, isError, error, data };
};

export const useAddCategory = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.post(`/category`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Added');
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

export const useGetSingleCategory = ({ id }) => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['category', id],
    queryFn: async () => {
      const { data } = await api.get(`/category/${id}`);
      return data;
    },
  });
  return { isError, isLoading, error, data };
};

export const useEditCategory = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.patch(`/category/edit/${data.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['category'] });

      toast.success('Updated');
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

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.delete(`/category/delete/${data.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });

      toast.success('Deleted');
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

