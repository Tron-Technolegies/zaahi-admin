import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../services/api';
import { toast } from 'react-toastify';

export const useGetCoupons = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['coupons'],
    queryFn: async () => {
      const { data } = await api.get('/coupon');
      return data;
    },
  });
  return { isLoading, isError, error, data };
};

export const useAddCoupons = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.post('/coupon', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['coupons'],
      });
      toast.success('Coupon Added');
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

export const useGetSingleCoupon = ({ id }) => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['coupon', id],
    queryFn: async () => {
      const { data } = await api.get(`/coupon/${id}`);
      return data;
    },
  });
  return { isError, isLoading, error, data };
};

export const useEditCoupon = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.patch(`/coupon/${data.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
      queryClient.invalidateQueries({ queryKey: ['coupon'] });

      toast.success('Coupon Updated');
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

export const useDeleteCoupon = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.delete(`/coupon/${data.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });

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
