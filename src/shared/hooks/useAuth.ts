import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getContractors,
  getCurrentUser,
  getRole,
  login,
  logout,
  refreshToken,
} from "../api/usersApi";
import { useUserStore } from "../stores/userStore";

export const useContractors = () => {
  return useQuery({
    queryKey: ["contractors"],
    queryFn: getContractors,
    retry: false,
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,

  });
};

export const useLogin = () => {
  const { setUser } = useUserStore();
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setUser(data);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { clearUser } = useUserStore();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      clearUser();
    },
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: refreshToken,
  });
};

export const useRole = (email: string) => {
  return useQuery({
    queryKey: ["role", email],
    queryFn: () => getRole({ email }),
    enabled: !!email,
    retry: false,
  });
};
