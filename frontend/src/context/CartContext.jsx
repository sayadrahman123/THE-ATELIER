import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

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

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, getCartCount, getCartTotal, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
