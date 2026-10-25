import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotalInr: number;
  deliveryFeeInr: number;
  totalAmountInr: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  lastAddedItem: Product | null;
  resetLastAddedItem: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 999;
const STANDARD_DELIVERY_FEE = 80;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sindhudurg_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<Product | null>(null);

  useEffect(() => {
    localStorage.setItem('sindhudurg_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }
      return [...prev, { product, quantity }];
    });
    setLastAddedItem(product);
  };

  const removeFromCart = (productId: string) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const resetLastAddedItem = () => setLastAddedItem(null);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalInr = items.reduce((sum, item) => sum + item.product.priceInr * item.quantity, 0);
  const deliveryFeeInr = totalItems > 0 ? (subtotalInr >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_DELIVERY_FEE) : 0;
  const totalAmountInr = subtotalInr + deliveryFeeInr;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotalInr,
        deliveryFeeInr,
        totalAmountInr,
        isCartOpen,
        openCart,
        closeCart,
        lastAddedItem,
        resetLastAddedItem
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
