// src/store/userStore.ts
import create from 'zustand';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  username: string;
  password?: string;
}

interface UserState {
  user: User | null;
  accessToken: string | null;
  setUser: (user: User, token: string) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  accessToken: null,
  setUser: (user: User, token: string) => set({ user, accessToken: token }),
  clearUser: () => set({ user: null, accessToken: null }),
}));

export default useUserStore;