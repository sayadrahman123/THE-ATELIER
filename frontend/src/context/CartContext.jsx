import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { cartAPI } from '../services/api';

const CartContext = createContext();
const LOCAL_CART_KEY = 'atelier_cart';
// Custom DOM event fired by AuthContext after login/logout
const AUTH_CHANGE_EVENT = 'atelier-auth-change';

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

// ── Helpers ──────────────────────────────────────────────────────────────────

const isLoggedIn = () => !!localStorage.getItem('accessToken');

// Map API response shape → UI shape
const apiToLocal = (apiItem) => ({
  cartItemId: apiItem.cartItemId,         // DB row id (needed for PUT/DELETE)
  id:         apiItem.productId,
  name:       apiItem.name,
  price:      parseFloat(apiItem.price),
  image:      apiItem.imageUrl,
  quantity:   apiItem.quantity,
  size:       apiItem.selectedSize  || '',
  color:      apiItem.selectedColor || '',
});

// Map local item shape → API request shape
const localToRequest = (item) => ({
  productId:     item.id,
  quantity:      item.quantity,
  selectedSize:  item.size  || '',
  selectedColor: item.color || '',
});

// Read / write / clear local storage cart
const localLoad  = () => { try { return JSON.parse(localStorage.getItem(LOCAL_CART_KEY) || '[]'); } catch { return []; } };
const localSave  = (items) => localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(items));
const localClear = () => localStorage.removeItem(LOCAL_CART_KEY);

// ── Provider ─────────────────────────────────────────────────────────────────

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [syncing,   setSyncing]   = useState(false);

  // ── Load cart: from API if logged in, localStorage if guest ────────────
  const loadCart = useCallback(async () => {
    if (isLoggedIn()) {
      try {
        const { data } = await cartAPI.getCart();
        setCartItems(data.map(apiToLocal));
      } catch {
        // Fall back to local if API fails
        setCartItems(localLoad());
      }
    } else {
      setCartItems(localLoad());
    }
  }, []);

  // Initial load
  useEffect(() => { loadCart(); }, [loadCart]);

  // Re-load / merge whenever auth state changes (login / logout)
  useEffect(() => {
    const onAuthChange = async () => {
      if (isLoggedIn()) {
        // User just logged in → merge guest cart into DB then load DB cart
        const localItems = localLoad();
        if (localItems.length > 0) {
          try {
            const requests = localItems.map(localToRequest);
            const { data } = await cartAPI.mergeCart(requests);
            setCartItems(data.map(apiToLocal));
          } catch {
            await loadCart(); // merge failed → at least load DB cart
          }
          localClear();
        } else {
          await loadCart(); // no local items → just load DB cart
        }
      } else {
        // User just logged out → clear everything
        localClear();
        setCartItems([]);
      }
    };
    window.addEventListener(AUTH_CHANGE_EVENT, onAuthChange);
    return () => window.removeEventListener(AUTH_CHANGE_EVENT, onAuthChange);
  }, [loadCart]);

  // ── addToCart ─────────────────────────────────────────────────────────

  const addToCart = async (product) => {
    if (isLoggedIn()) {
      setSyncing(true);
      try {
        await cartAPI.addItem({
          productId:     product.id,
          quantity:      1,
          selectedSize:  product.size  || '',
          selectedColor: product.color || '',
        });
        await loadCart();
      } finally { setSyncing(false); }
    } else {
      // Optimistic local update
      setCartItems((prev) => {
        const exists = prev.find(
          (i) => i.id === product.id && i.size === product.size && i.color === product.color
        );
        const updated = exists
          ? prev.map((i) =>
              i.id === product.id && i.size === product.size && i.color === product.color
                ? { ...i, quantity: i.quantity + 1 }
                : i
            )
          : [...prev, { ...product, quantity: 1 }];
        localSave(updated);
        return updated;
      });
    }
  };

  // ── removeFromCart ────────────────────────────────────────────────────

  const removeFromCart = async (id, size, color) => {
    if (isLoggedIn()) {
      const item = cartItems.find((i) => i.id === id && i.size === size && i.color === color);
      if (!item?.cartItemId) return;
      setSyncing(true);
      try {
        await cartAPI.removeItem(item.cartItemId);
        setCartItems((prev) => prev.filter(
          (i) => !(i.id === id && i.size === size && i.color === color)
        ));
      } finally { setSyncing(false); }
    } else {
      setCartItems((prev) => {
        const updated = prev.filter((i) => !(i.id === id && i.size === size && i.color === color));
        localSave(updated);
        return updated;
      });
    }
  };

  // ── updateQuantity ────────────────────────────────────────────────────

  const updateQuantity = async (id, size, color, delta) => {
    const item = cartItems.find((i) => i.id === id && i.size === size && i.color === color);
    if (!item) return;
    const newQty = item.quantity + delta;

    if (isLoggedIn() && item.cartItemId) {
      setSyncing(true);
      try {
        if (newQty <= 0) {
          await cartAPI.removeItem(item.cartItemId);
          setCartItems((prev) => prev.filter((i) => !(i.id === id && i.size === size && i.color === color)));
        } else {
          await cartAPI.updateQty(item.cartItemId, newQty);
          setCartItems((prev) => prev.map((i) =>
            i.id === id && i.size === size && i.color === color ? { ...i, quantity: newQty } : i
          ));
        }
      } finally { setSyncing(false); }
    } else {
      setCartItems((prev) => {
        const updated = prev
          .map((i) =>
            i.id === id && i.size === size && i.color === color ? { ...i, quantity: newQty } : i
          )
          .filter((i) => i.quantity > 0);
        localSave(updated);
        return updated;
      });
    }
  };

  // ── clearCart ─────────────────────────────────────────────────────────

  const clearCart = async () => {
    if (isLoggedIn()) {
      try { await cartAPI.clearCart(); } catch { /* ignore */ }
    }
    localClear();
    setCartItems([]);
  };

  // ── mergeGuestCartOnLogin (called by AuthContext after login) ─────────
  // Takes whatever is in localStorage, pushes to DB, then reloads from DB.

  const mergeGuestCartOnLogin = async () => {
    const localItems = localLoad();
    if (localItems.length > 0) {
      try {
        const requests = localItems.map(localToRequest);
        const { data } = await cartAPI.mergeCart(requests);
        setCartItems(data.map(apiToLocal));
      } catch {
        // If merge fails, just reload DB cart
        await loadCart();
      }
    } else {
      await loadCart();
    }
    localClear();
  };

  // ── Derived values ────────────────────────────────────────────────────

  const getCartCount = () => cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const getCartTotal = () => cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      syncing,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartCount,
      getCartTotal,
      mergeGuestCartOnLogin,
      reloadCart: loadCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};
