import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Wine } from '../data/wines';

const CART_STORAGE_KEY = 'vinheria_agnello_cart';

interface CartItem extends Wine {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (wine: Wine) => void;
  removeFromCart: (wineId: string) => void;
  updateQuantity: (wineId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') {
      return [];
    }

    try {
      const savedItems = window.localStorage.getItem(CART_STORAGE_KEY);
      if (!savedItems) {
        return [];
      }

      const parsedItems = JSON.parse(savedItems) as CartItem[];
      return Array.isArray(parsedItems) ? parsedItems : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (wine: Wine) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === wine.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === wine.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...wine, quantity: 1 }];
    });
  };

  const removeFromCart = (wineId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== wineId));
  };

  const updateQuantity = (wineId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(wineId);
      return;
    }
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === wineId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
