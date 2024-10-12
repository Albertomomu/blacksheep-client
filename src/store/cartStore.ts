import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Asumiendo que ya tienes definida la interfaz Product
interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  categoryId: number;
  category: Category;
  size: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product) => set((state) => {
        const existingItem = state.items.find(item => item.id === product.id);
        if (existingItem) {
          return {
            items: state.items.map(item =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            )
          };
        } else {
          return { items: [...state.items, { ...product, quantity: 1 }] };
        }
      }),

      removeItem: (productId: number) => set((state) => ({
        items: state.items.filter(item => item.id !== productId)
      })),

      updateQuantity: (productId: number, quantity: number) => set((state) => ({
        items: state.items.map(item =>
          item.id === productId ? { ...item, quantity: quantity } : item
        )
      })),

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        const state = get();
        return state.items.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;