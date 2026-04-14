import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const { cartItems, getCartTotal } = useCart();
  const navigate = useNavigate();
  const subtotal = getCartTotal();
  const [delivery, setDelivery] = useState('standard');
  const shippingCost = delivery === 'express' ? 25 : 0;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shippingCost + tax;

  return (
    <div className="bg-surface min-h-screen">
      <main className="pt-32 pb-24 px-6 md:px-8 max-w-screen-xl mx-auto">
        {/* Header */}
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight mb-4">
            Checkout
          </h1>
          <nav className="flex gap-4 text-sm font-label tracking-widest uppercase text-outline">
            <span className="text-secondary">01 Shipping</span>
            <span>/</span>
            <span>02 Payment</span>
            <span>/</span>
            <span>03 Review</span>
          </nav>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-20">
          {/* ── Left: Checkout Form ── */}
          <div className="lg:col-span-7 space-y-16">
            {/* Shipping Information */}
            <section>
              <h2 className="text-2xl font-headline font-bold mb-8">Shipping Information</h2>
              <form className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="relative ghost-border">
                    <label className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-2">
                      First Name
                    </label>
                    <input
                      className="block w-full py-3 bg-transparent border-none focus:ring-0 text-on-surface outline-none"
                      placeholder="Alexandra"
                      type="text"
                    />
                  </div>
                  <div className="relative ghost-border">
                    <label className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-2">
                      Last Name
                    </label>
                    <input
                      className="block w-full py-3 bg-transparent border-none focus:ring-0 text-on-surface outline-none"
                      placeholder="Vogue"
                      type="text"
                    />
                  </div>
                </div>
                <div className="ghost-border">
                  <label className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-2">
                    Email Address
                  </label>
                  <input
                    className="block w-full py-3 bg-transparent border-none focus:ring-0 text-on-surface outline-none"
                    placeholder="curator@atelier.com"
                    type="email"
                  />
                </div>
                <div className="ghost-border">
                  <label className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-2">
                    Street Address
                  </label>
                  <input
                    className="block w-full py-3 bg-transparent border-none focus:ring-0 text-on-surface outline-none"
                    placeholder="1 Mayfair Row"
                    type="text"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  <div className="ghost-border">
                    <label className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-2">City</label>
                    <input
                      className="block w-full py-3 bg-transparent border-none focus:ring-0 text-on-surface outline-none"
                      placeholder="London"
                      type="text"
                    />
                  </div>
                  <div className="ghost-border">
                    <label className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-2">
                      Postal Code
                    </label>
                    <input
                      className="block w-full py-3 bg-transparent border-none focus:ring-0 text-on-surface outline-none"
                      placeholder="W1K 1AA"
                      type="text"
                    />
                  </div>
                  <div className="ghost-border">
                    <label className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-2">Country</label>
                    <select className="block w-full py-3 bg-transparent border-none focus:ring-0 text-on-surface appearance-none outline-none">
                      <option>United Kingdom</option>
                      <option>United States</option>
                      <option>France</option>
                      <option>Italy</option>
                      <option>Japan</option>
                    </select>
                  </div>
                </div>
              </form>
            </section>

            {/* Delivery Method */}
            <section className="bg-surface-container-low p-8 md:p-12">
              <h2 className="text-2xl font-headline font-bold mb-8">Delivery Method</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    id: 'standard',
                    label: 'Standard Atelier',
                    price: 'Free',
                    desc: 'Delivered in our signature charcoal box within 3–5 business days.',
                  },
                  {
                    id: 'express',
                    label: 'Express Courier',
                    price: '$25.00',
                    desc: 'Priority handling and delivery within 24 hours of dispatch.',
                  },
                ].map((opt) => (
                  <label key={opt.id} className="cursor-pointer group">
                    <input
                      type="radio"
                      name="delivery"
                      className="sr-only"
                      checked={delivery === opt.id}
                      onChange={() => setDelivery(opt.id)}
                    />
                    <div
                      className={`p-6 bg-surface-container-lowest border-2 transition-all flex flex-col h-full ${
                        delivery === opt.id ? 'border-secondary' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-sm font-label font-bold uppercase tracking-widest">{opt.label}</span>
                        <span className="text-sm font-bold">{opt.price}</span>
                      </div>
                      <p className="text-sm text-on-surface-variant leading-relaxed">{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </section>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => navigate('/payment')}
                className="gold-shimmer text-on-secondary px-12 py-5 font-label font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-all active:scale-95"
              >
                Proceed to Payment
              </button>
            </div>
          </div>

          {/* ── Right: Order Review Sidebar ── */}
          <aside className="lg:col-span-5">
            <div className="sticky top-32 space-y-8">
              <div className="bg-surface-container-lowest p-8 md:p-10 editorial-shadow">
                <h3 className="text-xl font-headline font-bold mb-8 border-b border-surface-container-high pb-4 uppercase tracking-widest">
                  Order Review
                </h3>
                {cartItems.length === 0 ? (
                  <p className="text-on-surface-variant text-sm">Your bag is empty</p>
                ) : (
                  <div className="space-y-8 mb-10">
                    {cartItems.map((item) => (
                      <div key={`${item.id}-${item.size}`} className="flex items-start gap-6">
                        <div className="w-24 h-32 flex-shrink-0 bg-surface-container overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <h4 className="text-sm font-bold uppercase tracking-wide text-on-surface">{item.name}</h4>
                            <span className="text-sm font-medium">${(item.price * item.quantity).toLocaleString()}.00</span>
                          </div>
                          <p className="text-xs text-on-surface-variant mt-1 uppercase tracking-tighter">
                            Size: {item.size} | Color: {item.color}
                          </p>
                          <p className="text-xs text-on-surface-variant mt-1">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="space-y-4 pt-8 border-t border-surface-container-high">
                  <div className="flex justify-between text-sm text-on-surface-variant">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}.00</span>
                  </div>
                  <div className="flex justify-between text-sm text-on-surface-variant">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? 'Complimentary' : `$${shippingCost}.00`}</span>
                  </div>
                  <div className="flex justify-between text-sm text-on-surface-variant">
                    <span>Estimated Tax</span>
                    <span>${tax.toLocaleString()}.00</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold font-headline pt-4 border-t border-surface-container-high">
                    <span>Total</span>
                    <span>${total.toLocaleString()}.00</span>
                  </div>
                </div>
              </div>

              <div className="p-8 border border-outline-variant/20 text-center">
                <p className="text-xs font-label uppercase tracking-[0.2em] text-on-surface-variant mb-2">Need Assistance?</p>
                <p className="text-sm font-medium">Concierge: +1 800 ATELIER</p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
