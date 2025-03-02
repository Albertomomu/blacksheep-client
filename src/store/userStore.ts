import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Address {
  id: number;
  street: string;
  portal: string;
  door: string;
  city: string;
  province: string;
  postal_code: string;
  country: Country;
}

interface Country {
  code: number;
  name: string;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  username: string;
  password?: string;
  address_id: number;
  address?: Address;
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