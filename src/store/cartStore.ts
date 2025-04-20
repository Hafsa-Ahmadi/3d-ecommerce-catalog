import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      
      addItem: (newItem) => 
        set((state) => {
          const existingItem = state.items.find(item => item.id === newItem.id);
          
          if (existingItem) {
            return {
              items: state.items.map(item => 
                item.id === newItem.id 
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          
          return {
            items: [...state.items, { ...newItem, quantity: 1 }],
          };
        }),
      
      removeItem: (id) => 
        set((state) => ({
          items: state.items.filter(item => item.id !== id),
        })),
      
      updateQuantity: (id, quantity) => 
        set((state) => ({
          items: state.items.map(item => 
            item.id === id 
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        })),
      
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'lumina-cart',
    }
  )
);