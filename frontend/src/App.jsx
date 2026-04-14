import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from './pages/PaymentPage';
import AuthPage from './pages/AuthPage';
import OurStoryPage from './pages/OurStoryPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';

// Scroll to top on every route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

// Pages where Footer should NOT render
const NO_FOOTER_ROUTES = ['/auth'];
// Pages where Navbar should NOT render  
const NO_NAVBAR_ROUTES = ['/auth'];

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  const showNavbar = !NO_NAVBAR_ROUTES.includes(pathname);
  const showFooter = !NO_FOOTER_ROUTES.includes(pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <div className="min-h-screen">{children}</div>
      {showFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <AuthProvider>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/collections" element={<ShopPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/about" element={<OurStoryPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              {/* 404 fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </CartProvider>
    </BrowserRouter>
  );
};

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 gap-8">
    <p className="text-[10px] font-label uppercase tracking-[0.4em] text-secondary">404</p>
    <h1 className="text-6xl md:text-8xl font-headline font-bold leading-tight">
      Page Not <br />
      <span className="italic font-normal">Found</span>
    </h1>
    <p className="text-on-surface-variant max-w-md">
      The page you're looking for may have moved or no longer exists.
    </p>
    <a
      href="/"
      className="px-10 py-4 bg-primary text-on-primary font-label text-xs uppercase tracking-widest hover:bg-secondary transition-colors duration-300"
    >
      Return Home
    </a>
  </div>
);

export default App;
