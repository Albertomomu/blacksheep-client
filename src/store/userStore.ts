import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setUser: (user: User, token: string) => set({ user, accessToken: token }),
      clearUser: () => set({ user: null, accessToken: null }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;