import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../services/api';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'details'

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  // Fetch order history
  useEffect(() => {
    if (!user) return;
    setLoadingOrders(true);
    orderAPI.getMyOrders()
      .then(({ data }) => setOrders(data))
      .catch(() => setOrders([]))
      .finally(() => setLoadingOrders(false));
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  // Derive initials for avatar
  const initials = user.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : user.email[0].toUpperCase();

  const statusColor = (status) => {
    switch (status) {
      case 'PAID':        return 'text-emerald-600 bg-emerald-50';
      case 'SHIPPED':     return 'text-blue-600 bg-blue-50';
      case 'DELIVERED':   return 'text-green-700 bg-green-50';
      case 'CANCELLED':   return 'text-red-600 bg-red-50';
      case 'PROCESSING':  return 'text-amber-600 bg-amber-50';
      default:            return 'text-stone-500 bg-stone-100'; // PENDING
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric',
    });
  };

  return (
    <div className="bg-surface min-h-screen">
      <main className="pt-32 pb-24 px-6 md:px-8 max-w-screen-xl mx-auto">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-16">
          <div className="flex items-center gap-8">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full gold-shimmer flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-headline font-bold text-white tracking-widest">
                {initials}
              </span>
            </div>
            <div>
              <p className="text-[10px] font-label uppercase tracking-[0.3em] text-secondary mb-2">
                Member
              </p>
              <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary leading-tight">
                {user.name}
              </h1>
              <p className="text-on-surface-variant text-sm mt-1">{user.email}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link
              to="/shop"
              className="px-6 py-3 border border-outline-variant/40 text-xs uppercase tracking-widest font-label hover:border-primary text-on-surface-variant hover:text-primary transition-all"
            >
              Continue Shopping
            </Link>
            <button
              onClick={handleLogout}
              className="px-6 py-3 border border-error/30 text-xs uppercase tracking-widest font-label text-error hover:bg-error hover:text-white transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* ── Stats Strip ── */}
        <div className="grid grid-cols-3 gap-4 mb-16">
          {[
            { label: 'Orders Placed', value: orders.length },
            {
              label: 'Total Spent',
              value: `$${orders.reduce((sum, o) => sum + parseFloat(o.totalAmount || 0), 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            },
            { label: 'Member Role', value: user.role || 'Customer' },
          ].map((stat) => (
            <div key={stat.label} className="bg-surface-container-low p-6 md:p-8 text-center">
              <p className="text-2xl md:text-3xl font-headline font-bold text-primary mb-1">
                {stat.value}
              </p>
              <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-0 border-b border-outline-variant/20 mb-12">
          {[
            { id: 'orders',  label: 'Order History' },
            { id: 'details', label: 'Account Details' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-4 text-xs font-label uppercase tracking-widest border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-secondary text-primary font-bold'
                  : 'border-transparent text-on-surface-variant hover:text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Order History Tab ── */}
        {activeTab === 'orders' && (
          <div>
            {loadingOrders ? (
              <div className="text-center py-24">
                <p className="font-headline text-2xl text-on-surface-variant animate-pulse">
                  Loading your orders...
                </p>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-24 space-y-6">
                <span className="material-symbols-outlined text-6xl text-on-surface-variant/30">
                  shopping_bag
                </span>
                <p className="font-headline text-3xl text-on-surface-variant">No orders yet</p>
                <p className="text-on-surface-variant/60 text-sm max-w-sm mx-auto">
                  Your order history will appear here once you make your first purchase.
                </p>
                <Link
                  to="/shop"
                  className="inline-block px-10 py-4 gold-shimmer text-white text-xs uppercase tracking-widest font-label mt-4"
                >
                  Explore The Archive
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-surface-container-lowest border border-outline-variant/10 editorial-shadow"
                  >
                    {/* Order Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 md:p-8 border-b border-outline-variant/10">
                      <div className="flex items-center gap-6">
                        <div>
                          <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-1">
                            Order #{order.id}
                          </p>
                          <p className="text-sm font-medium text-on-surface">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                        <div className="h-8 w-px bg-outline-variant/20" />
                        <div>
                          <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-1">
                            Total
                          </p>
                          <p className="text-sm font-bold">${parseFloat(order.totalAmount).toFixed(2)}</p>
                        </div>
                        <div className="h-8 w-px bg-outline-variant/20" />
                        <div>
                          <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-1">
                            Delivery
                          </p>
                          <p className="text-sm capitalize">{order.deliveryMethod || 'standard'}</p>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-label font-bold uppercase tracking-widest px-3 py-1.5 ${statusColor(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    {/* Order Items */}
                    <div className="p-6 md:p-8">
                      <div className="space-y-6">
                        {order.items?.map((item, i) => (
                          <div key={i} className="flex items-start gap-5">
                            <div className="w-16 h-20 flex-shrink-0 bg-surface-container overflow-hidden">
                              {item.productImageUrl ? (
                                <img
                                  src={item.productImageUrl}
                                  alt={item.productName}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
                                  <span className="material-symbols-outlined text-outline-variant text-sm">
                                    image
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="flex-grow">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="text-sm font-bold uppercase tracking-wide text-on-surface">
                                    {item.productName}
                                  </p>
                                  <p className="text-xs text-on-surface-variant mt-1">
                                    {[item.selectedSize, item.selectedColor].filter(Boolean).join(' · ')}
                                    {item.quantity > 1 && ` · Qty ${item.quantity}`}
                                  </p>
                                </div>
                                <p className="text-sm font-medium text-on-surface ml-4 flex-shrink-0">
                                  ${parseFloat(item.lineTotal || item.priceAtOrder).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Shipping Address */}
                      {order.shippingName && (
                        <div className="mt-8 pt-6 border-t border-outline-variant/10 flex flex-col sm:flex-row gap-8">
                          <div>
                            <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-2">
                              Shipped To
                            </p>
                            <p className="text-sm text-on-surface">{order.shippingName}</p>
                            <p className="text-xs text-on-surface-variant mt-0.5">
                              {[order.shippingAddress, order.shippingCity, order.shippingPostalCode, order.shippingCountry]
                                .filter(Boolean).join(', ')}
                            </p>
                          </div>
                          {order.razorpayPaymentId && (
                            <div>
                              <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-2">
                                Payment Ref
                              </p>
                              <p className="text-xs font-mono text-on-surface-variant">
                                {order.razorpayPaymentId}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Account Details Tab ── */}
        {activeTab === 'details' && (
          <div className="max-w-xl">
            <div className="space-y-10">
              {[
                { label: 'Full Name', value: user.name, icon: 'person' },
                { label: 'Email Address', value: user.email, icon: 'mail' },
                { label: 'Account Type', value: user.role || 'Customer', icon: 'badge' },
              ].map((field) => (
                <div key={field.label} className="ghost-border py-3">
                  <label className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-1">
                    {field.label}
                  </label>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-outline text-sm">{field.icon}</span>
                    <span className="text-on-surface font-medium">{field.value}</span>
                  </div>
                </div>
              ))}

              <div className="pt-4 space-y-4">
                <p className="text-xs text-on-surface-variant font-label tracking-wide">
                  To update your name or email, please contact our concierge team.
                </p>
                <button
                  onClick={handleLogout}
                  className="w-full border border-error/30 text-error py-4 text-xs uppercase tracking-widest font-label font-bold hover:bg-error hover:text-white transition-all"
                >
                  Sign Out of THE ATELIER
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default ProfilePage;
