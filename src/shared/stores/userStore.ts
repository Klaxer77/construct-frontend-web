import { create } from "zustand";

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

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
