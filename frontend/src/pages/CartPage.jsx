import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();
  const navigate = useNavigate();
  const subtotal = getCartTotal();

  const suggestions = [
    {
      name: 'Silk Scarf - Sand',
      price: 120,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaTfJiw-WZjFX3Gknrz-XQOTpyGhMwjGXDOMOiaO2nhGpTr7WiKYM0PRZJpWJYvH4GvqS0eGriLunEB28KwnF1aUT_t3gCwWXw9NPkHRenngkxL6ffNOt-KmgfoDmg76_89-ak8BnX_2xdjZ9D2bOHsXGZOGGkMLrfX8KwtA7NYm2EU3uhEoMcbvMCiAyn1WCtKONwyHvHqOGWLhcAu_JTlVmrPaBf35ROGX5PDNghoPbjUaB2kOQQzPc5lg9yIxGLJuYhRyarSR8f',
    },
    {
      name: "L'Atelier Eyewear",
      price: 310,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVKSgsWn09DYeH5Qg2JqlWMYoai4y6JP6xOjAszyzdhpsICMxhFBlQ2AZFt8ThX6nP9g5J4ED9eN6ib9f_iFmSHi1xVDA0sAQbgLynrWPEyQR_2SbNK5jCr_hhJYVheIRsYrtIvv5bHnLWfhacEZf5B5BgOqV4vXPlzeVeg61TYsGVus8VScZnHcUGEJTtPvxdwcZLKq0jzxcuLRLGvgo2vvb8axkl9iyww0a6C1RK30rYHRzVLoADvlnG0SjqkfBWAzSv',
    },
  ];

  return (
    <div className="bg-surface min-h-screen">
      <main className="pt-32 pb-24 px-6 md:px-8 max-w-screen-2xl mx-auto">
        <h1 className="font-headline text-4xl md:text-5xl mb-16 tracking-tight">Your Selection</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-32 space-y-6">
            <span className="material-symbols-outlined text-6xl text-outline-variant">shopping_bag</span>
            <p className="font-headline text-3xl text-on-surface-variant">Your bag is empty</p>
            <p className="text-on-surface-variant/60">Discover pieces crafted for longevity</p>
            <Link
              to="/shop"
              className="inline-block mt-4 px-12 py-4 gold-shimmer text-white text-xs uppercase tracking-widest"
            >
              Explore The Archive
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-16">
            {/* ── Cart Items ── */}
            <div className="flex-grow space-y-12">
              {cartItems.map((item, idx) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="flex flex-col md:flex-row gap-8 pb-12 ghost-border">
                  <div className="w-full md:w-48 aspect-[3/4] overflow-hidden bg-surface-container-low flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover grayscale-[20%] hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex flex-col flex-grow justify-between py-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-label text-xs tracking-widest uppercase text-outline mb-2">{item.category}</p>
                        <h3 className="font-headline text-2xl">{item.name}</h3>
                        <p className="text-sm text-outline mt-1 italic">{item.color} / Size {item.size}</p>
                      </div>
                      <p className="font-headline text-xl">${(item.price * item.quantity).toLocaleString()}.00</p>
                    </div>
                    <div className="flex justify-between items-center mt-8">
                      <div className="flex items-center bg-surface-container-low px-4 py-2 gap-6">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.color, -1)}
                          className="text-outline hover:text-primary transition-colors active:scale-90"
                        >
                          <span className="material-symbols-outlined text-sm">remove</span>
                        </button>
                        <span className="font-body text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.color, 1)}
                          className="text-outline hover:text-primary transition-colors active:scale-90"
                        >
                          <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.size, item.color)}
                        className="flex items-center text-xs tracking-widest uppercase text-outline hover:text-error transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg mr-2">close</span>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* ── Complete the Look ── */}
              <div className="mt-20 p-8 md:p-12 bg-surface-container-low">
                <h4 className="font-headline text-xl mb-8">Complete the Look</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {suggestions.map((s) => (
                    <div key={s.name} className="flex gap-4 items-center bg-surface-container-lowest p-6 group cursor-pointer">
                      <div className="w-20 h-20 overflow-hidden flex-shrink-0">
                        <img
                          src={s.image}
                          alt={s.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div>
                        <p className="font-headline text-sm">{s.name}</p>
                        <p className="font-body text-xs text-secondary mt-1">Add to bag — ${s.price}.00</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Order Summary Sidebar ── */}
            <aside className="w-full lg:w-[400px] flex-shrink-0">
              <div className="bg-surface-container-low p-8 md:p-10 sticky top-32">
                <h2 className="font-headline text-2xl mb-8">Order Summary</h2>
                <div className="space-y-6">
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-outline">Subtotal</span>
                    <span>${subtotal.toLocaleString()}.00</span>
                  </div>
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-outline">Shipping</span>
                    <span className="text-xs">{subtotal >= 500 ? 'Complimentary' : 'Calculated at checkout'}</span>
                  </div>
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-outline">Tax</span>
                    <span>$0.00</span>
                  </div>
                  <div className="pt-6 ghost-border" />
                  <div className="flex justify-between font-headline text-xl">
                    <span>Estimated Total</span>
                    <span>${subtotal.toLocaleString()}.00</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full mt-12 py-5 gold-shimmer text-white font-label tracking-[0.2em] uppercase text-xs font-bold hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center group"
                >
                  Proceed to Checkout
                  <span className="material-symbols-outlined ml-3 text-sm group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>

                <div className="mt-10 space-y-6 pt-10 border-t border-outline-variant/20">
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-secondary text-xl">local_shipping</span>
                    <div>
                      <p className="font-body text-xs font-medium uppercase tracking-wider mb-1">Complimentary Delivery</p>
                      <p className="text-xs text-outline leading-relaxed">Orders over $500 qualify for free standard delivery.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-secondary text-xl">workspace_premium</span>
                    <div>
                      <p className="font-body text-xs font-medium uppercase tracking-wider mb-1">Atelier Guarantee</p>
                      <p className="text-xs text-outline leading-relaxed">Each piece is inspected for quality before dispatch.</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartPage;
