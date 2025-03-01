import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: string; // Asumiendo que el precio es un string, como se muestra en el ejemplo
  stock: number;
  category_id: number;
  category: Category;
}

interface ProductState {
  products: Product[];
  setProducts: (products: Product[]) => void;
  clearProducts: () => void;
}

const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: [],
      setProducts: (products: Product[]) => set({ products }),
      clearProducts: () => set({ products: [] }),
    }),
    {
      name: 'product-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useProductStore;