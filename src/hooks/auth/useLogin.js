import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { toast } from "react-toastify";

export const useLogin = () => {
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.post(`/auth/login`, data);
    },
    onSuccess: () => {
      navigate("/dashboard");
      toast.success("Success");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error || error?.response?.data?.message || error.message);
    },
  });
  return { isPending, mutateAsync };
};
