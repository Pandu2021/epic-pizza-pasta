'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Tipe data untuk item di dalam keranjang
export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

// Tipe data untuk nilai yang akan disediakan oleh Context
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: { _id: string; name: string; price: number }) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
}

// Membuat Context dengan nilai default
const CartContext = createContext<CartContextType | undefined>(undefined);

// Membuat Provider Component
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);

  // Efek untuk menghitung ulang total setiap kali keranjang berubah
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setCartTotal(total);
  }, [cartItems]);

  const addToCart = (itemToAdd: { _id: string; name: string; price: number }) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === itemToAdd._id);
      if (existingItem) {
        return prevItems.map(item =>
          item._id === itemToAdd._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...itemToAdd, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item._id === itemId ? { ...item, quantity } : item
        )
      );
    }
  };
  
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

// Membuat custom hook untuk mempermudah penggunaan context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
