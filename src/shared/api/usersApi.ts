import { api } from "./config";

interface LoginRequest {
  email: string;
  password: string;
}

interface LogoutResponse {
  result: string;
}

interface RefreshResponse {
  access_token: string;
  refresh_token: string;
}

interface RoleRequest {
  email: string;
}

interface RoleResponse {
  role: string;
}

interface User {
  id: string;
  using_id: number;
  avatar: string;
  is_active: boolean;
  access_expires_at: string;
  email: string;
  fio: string;
  role: string;
}

interface Contractor {
  id: string;
  using_id: number;
  avatar: string;
  is_active: boolean;
  email: string;
  fio: string;
  role: string;
  company: {
    id: string;
    title: string;
  };
}

export const getContractors = async (): Promise<Contractor[]> => {
  const response = await api.get("/users/contractors");
  return response.data.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get("/users/current");
  return response.data.data;
};

export const login = async (data: LoginRequest): Promise<User> => {
  const response = await api.post("/users/login", data);
  return response.data.data;
};

export const logout = async (): Promise<LogoutResponse> => {
  const response = await api.post("/users/logout");
  return response.data.data;
};

export const refreshToken = async (): Promise<RefreshResponse> => {
  const response = await api.post("/users/refresh");
  return response.data.data;
};

export const getRole = async (data: RoleRequest): Promise<RoleResponse> => {
  const response = await api.get("/users/role", {
    params: data,
  });
  return response.data.data;
};
