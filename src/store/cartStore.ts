import create from 'zustand';
import { persist } from 'zustand/middleware';

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
  removeItem: (productId: number, size: string) => void;
  updateQuantity: (productId: number, size: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (i) => i.id === product.id && i.size === product.size
          );

          if (existingItemIndex !== -1) {
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += 1;
            return { items: updatedItems };
          } else {
            const newItem: CartItem = { ...product, quantity: 1 };
            return { items: [...state.items, newItem] };
          }
        });
      },

      removeItem: (productId, size) => set((state) => ({
        items: state.items.filter(item => !(item.id === productId && item.size === size))
      })),

      updateQuantity: (productId, size, quantity) => set((state) => ({
        items: state.items.map(item =>
          item.id === productId && item.size === size ? { ...item, quantity: quantity } : item
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
      name: 'cart-storage', // nombre del almacenamiento persistente
    }
  )
);

export default useCartStore;