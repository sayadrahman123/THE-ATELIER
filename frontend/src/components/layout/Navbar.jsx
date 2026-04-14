import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const { user } = useAuth();
  const location = useLocation();
  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { label: 'Shop', path: '/shop' },
    { label: 'Collections', path: '/collections' },
    { label: 'About', path: '/about' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'shadow-sm' : ''
      } glass-nav`}
    >
      <nav className="flex justify-between items-center w-full px-6 md:px-8 py-5 md:py-6 max-w-screen-2xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-10 lg:gap-12">
          <Link
            to="/"
            className="text-xl md:text-2xl font-bold tracking-widest text-stone-900 font-headline uppercase transition-all active:scale-95"
          >
            THE ATELIER
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-headline tracking-tight transition-all active:scale-95 text-sm ${
                  isActive(link.path)
                    ? 'text-stone-900 border-b border-stone-900 pb-0.5'
                    : 'text-stone-500 hover:text-stone-800 transition-colors'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Search — hidden on mobile */}
          <div className="hidden lg:flex items-center border-b border-outline-variant/40 py-1 px-2">
            <span className="material-symbols-outlined text-outline text-sm">search</span>
            <input
              className="bg-transparent border-none focus:ring-0 text-sm w-40 placeholder:text-stone-400 outline-none pl-2"
              placeholder="Search our archives"
              type="text"
            />
          </div>

          <div className="flex items-center gap-4">
            <Link
              to={user ? '/profile' : '/auth'}
              className="hover:opacity-70 transition-opacity duration-300 active:scale-95 relative"
              title={user ? `${user.name} — View Profile` : 'Sign In'}
            >
              <span className="material-symbols-outlined text-stone-900"
                style={{ fontVariationSettings: user ? "'FILL' 1" : "'FILL' 0" }}>
                person
              </span>
              {/* Green dot when logged in */}
              {user && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
              )}
            </Link>

            <Link
              to="/cart"
              className="hover:opacity-70 transition-opacity duration-300 active:scale-95 relative"
            >
              <span className="material-symbols-outlined text-stone-900">shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] text-white font-bold">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden active:scale-95"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="material-symbols-outlined text-stone-900">
                {menuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-stone-50/95 backdrop-blur-xl border-t border-outline-variant/20 px-6 py-8 space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`block font-headline text-lg tracking-tight ${
                isActive(link.path) ? 'text-stone-900' : 'text-stone-500'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center border-b border-outline-variant/40 py-1">
            <span className="material-symbols-outlined text-outline text-sm">search</span>
            <input
              className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-stone-400 outline-none pl-2"
              placeholder="Search our archives"
              type="text"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
