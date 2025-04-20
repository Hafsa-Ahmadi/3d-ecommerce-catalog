import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../data/products';

interface RecentlyViewedState {
  items: Product[];
  addItem: (product: Product) => void;
  clearHistory: () => void;
}

const MAX_ITEMS = 10;

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      items: [],
      
      addItem: (product) => 
        set((state) => {
          const filteredItems = state.items.filter(item => item.id !== product.id);
          return {
            items: [product, ...filteredItems].slice(0, MAX_ITEMS),
          };
        }),
      
      clearHistory: () => set({ items: [] }),
    }),
    {
      name: 'lumina-recently-viewed',
    }
  )
);