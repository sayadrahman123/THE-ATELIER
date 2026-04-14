import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

// Custom event to notify CartContext of auth state changes
const AUTH_CHANGE_EVENT = 'atelier-auth-change';
const dispatchAuthChange = () =>
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(false);

  // ── Restore session from localStorage on mount ────────────────────────
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { localStorage.clear(); }
    }
  }, []);

  // ── Register ──────────────────────────────────────────────────────────
  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const { data } = await authAPI.register({ name, email, password });
      _persistSession(data);
      dispatchAuthChange(); // → CartContext merges guest cart
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed. Please try again.';
      return { success: false, error: message };
    } finally { setLoading(false); }
  };

  // ── Login ─────────────────────────────────────────────────────────────
  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await authAPI.login({ email, password });
      _persistSession(data);
      dispatchAuthChange(); // → CartContext merges guest cart + loads DB cart
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Invalid email or password.';
      return { success: false, error: message };
    } finally { setLoading(false); }
  };

  // ── Logout ────────────────────────────────────────────────────────────
  const logout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    // Revoke server-side first (best-effort — don't block UI if it fails)
    if (refreshToken) {
      try { await authAPI.logout({ refreshToken }); } catch { /* ignore */ }
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
    dispatchAuthChange(); // CartContext clears cart state
  };

  // ── Persist session ───────────────────────────────────────────────────
  const _persistSession = (data) => {
    localStorage.setItem('accessToken',  data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    const userInfo = {
      id:    data.userId,
      name:  data.name,
      email: data.email,
      role:  data.role,
    };
    localStorage.setItem('user', JSON.stringify(userInfo));
    setUser(userInfo);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
