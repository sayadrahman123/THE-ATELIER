import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();
const CART_STORAGE_KEY = 'atelier_cart';

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

export const CartProvider = ({ children }) => {

  // ── Initialize from localStorage ─────────────────────────────────────
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // ── Sync to localStorage whenever cart changes ────────────────────────
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Storage quota exceeded or private mode — fail silently
    }
  }, [cartItems]);

  // ── Cart operations ───────────────────────────────────────────────────

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.size === product.size && item.color === product.color
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === product.size && item.color === product.color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id, size, color) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size && item.color === color))
    );
  };

  const updateQuantity = (id, size, color, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const getCartCount = () => cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const getCartTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, getCartCount, getCartTotal, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
