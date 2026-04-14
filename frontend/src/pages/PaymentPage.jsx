import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { paymentAPI } from '../services/api';

// Load Razorpay script dynamically
const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (window.Razorpay) { resolve(true); return; }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const PaymentPage = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // orderId passed from CheckoutPage via navigate state
  const orderId = location.state?.orderId;

  const subtotal = getCartTotal();
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + tax;

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Pre-load Razorpay script on mount
  useEffect(() => {
    loadRazorpayScript().then(setScriptLoaded);
  }, []);

  // ── Razorpay checkout handler ────────────────────────────────────────────
  const handleRazorpayPayment = async () => {
    if (!orderId) {
      setError('No order found. Please go back to checkout.');
      return;
    }
    if (!scriptLoaded) {
      setError('Payment gateway is loading. Please try again in a moment.');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Step 1: Create Razorpay order on backend
      const { data: paymentOrder } = await paymentAPI.createOrder({ orderId });

      // Step 2: Open Razorpay modal
      const options = {
        key: paymentOrder.keyId,
        amount: paymentOrder.amount,
        currency: paymentOrder.currency,
        name: 'THE ATELIER',
        description: 'Quiet Luxury, Vocal Craft.',
        order_id: paymentOrder.razorpayOrderId,
        theme: { color: '#1A1A1A' },
        handler: async (response) => {
          // Step 3: Verify payment on backend
          try {
            const { data: verifyResult } = await paymentAPI.verify({
              orderId,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            if (verifyResult.success) {
              clearCart();
              navigate('/', { state: { orderSuccess: true, orderId } });
            } else {
              setError(verifyResult.message || 'Payment verification failed.');
            }
          } catch {
            setError('Payment verification failed. Please contact support.');
          }
        },
        modal: {
          ondismiss: () => {
            setProcessing(false);
            setError('Payment was cancelled. You can try again.');
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      const msg = err.response?.data?.message || 'Payment initialisation failed. Please try again.';
      setError(msg);
      setProcessing(false);
    }
  };

  // Card format helpers (UI only — Razorpay handles actual card processing)
  const [cardHolder, setCardHolder] = useState('');
  const [cardNum, setCardNum] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const formatCardNum = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };
  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  };

  return (
    <div className="bg-surface min-h-screen">
      <main className="pt-32 pb-24 px-6 md:px-8 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* ── Payment Column ── */}
          <div className="lg:col-span-7">
            <header className="mb-12">
              <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-primary tracking-tight mb-4">
                Payment
              </h1>
              <p className="text-on-surface-variant font-body">
                Complete your order by providing your payment details.
              </p>
            </header>

            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 text-sm text-red-700">{error}</div>
            )}

            {/* ── Razorpay Button ── */}
            {orderId && (
              <section className="mb-12">
                <button
                  onClick={handleRazorpayPayment}
                  disabled={processing}
                  className="w-full gold-shimmer text-on-secondary py-5 font-label font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-60"
                >
                  {processing ? 'Opening Payment Gateway...' : 'Pay with Razorpay'}
                </button>
                <p className="text-xs text-center text-on-surface-variant mt-3">
                  Secure payment via Razorpay — Cards, UPI, Net Banking & Wallets supported
                </p>
              </section>
            )}

            {/* ── Express Checkout (UI decorative) ── */}
            <section className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-label uppercase tracking-[0.2em] text-secondary font-semibold">
                  Express Checkout
                </span>
                <div className="flex-grow h-px bg-surface-container-high" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-3 py-4 bg-primary text-on-primary hover:bg-stone-800 active:scale-[0.98] transition-all">
                  <span className="font-medium tracking-widest">⌘ Apple Pay</span>
                </button>
                <button className="flex items-center justify-center gap-3 py-4 border border-outline-variant bg-surface-container-lowest text-on-surface hover:bg-surface-container-low active:scale-[0.98] transition-all">
                  <span className="font-medium tracking-widest">G Pay</span>
                </button>
              </div>
            </section>

            {/* ── Card Display (decorative — Razorpay handles actual card entry) ── */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-xs font-label uppercase tracking-[0.2em] text-secondary font-semibold">
                  Credit or Debit Card
                </span>
                <div className="flex-grow h-px bg-surface-container-high" />
              </div>
              <div className="space-y-8 opacity-50 pointer-events-none select-none">
                <div className="ghost-border group">
                  <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">Cardholder Name</label>
                  <input className="w-full bg-transparent border-none p-0 pb-2 focus:ring-0 text-on-surface placeholder:text-outline-variant font-medium uppercase tracking-wider outline-none" placeholder="ALEXANDRA VOGUE" type="text" value={cardHolder} onChange={(e) => setCardHolder(e.target.value.toUpperCase())} readOnly />
                </div>
                <div className="ghost-border group">
                  <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">Card Number</label>
                  <input className="w-full bg-transparent border-none p-0 pb-2 focus:ring-0 text-on-surface placeholder:text-outline-variant font-medium tracking-widest outline-none" placeholder="0000 0000 0000 0000" type="text" value={cardNum} onChange={(e) => setCardNum(formatCardNum(e.target.value))} readOnly />
                </div>
                <div className="grid grid-cols-2 gap-12">
                  <div className="ghost-border group">
                    <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">Expiry Date</label>
                    <input className="w-full bg-transparent border-none p-0 pb-2 focus:ring-0 text-on-surface placeholder:text-outline-variant font-medium tracking-widest outline-none" placeholder="MM/YY" type="text" value={expiry} onChange={(e) => setExpiry(formatExpiry(e.target.value))} readOnly />
                  </div>
                  <div className="ghost-border group">
                    <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">CVC</label>
                    <input className="w-full bg-transparent border-none p-0 pb-2 focus:ring-0 text-on-surface placeholder:text-outline-variant font-medium tracking-widest outline-none" placeholder="123" type="text" maxLength={3} value={cvc} onChange={(e) => setCvc(e.target.value.replace(/\D/g, ''))} readOnly />
                  </div>
                </div>
                <p className="text-xs text-on-surface-variant">Card details are entered securely in the Razorpay modal above.</p>
              </div>
            </section>
          </div>

          {/* ── Summary Column ── */}
          <div className="lg:col-span-5">
            <div className="bg-surface-container-low p-8 lg:p-12 sticky top-32">
              <h2 className="font-headline text-2xl text-primary mb-8 tracking-tight">Order Summary</h2>
              <div className="space-y-6 mb-12">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-6 items-start">
                    <div className="w-20 h-24 bg-surface-container-high overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-body font-medium text-primary uppercase text-sm tracking-wide">{item.name}</h3>
                      <p className="text-on-surface-variant text-sm mt-1">{item.color} / {item.size}</p>
                      <p className="text-primary font-medium mt-2">${(item.price * item.quantity).toLocaleString()}.00</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-surface-container-highest">
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Subtotal</span>
                  <span className="font-medium">${subtotal.toLocaleString()}.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Shipping</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Taxes</span>
                  <span className="font-medium">${tax.toLocaleString()}.00</span>
                </div>
                <div className="flex justify-between pt-6 mt-2 border-t border-surface-container-highest">
                  <span className="font-headline text-xl text-primary">Total</span>
                  <span className="font-headline text-xl text-primary">${total.toLocaleString()}.00</span>
                </div>
              </div>

              <div className="mt-12 space-y-6">
                <button
                  onClick={handleRazorpayPayment}
                  disabled={processing || !orderId}
                  className="hidden lg:flex w-full items-center justify-center gold-shimmer text-white py-5 font-bold uppercase tracking-[0.2em] text-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60"
                >
                  {processing ? 'Processing...' : 'Complete Purchase'}
                </button>
                <div className="flex items-center justify-center gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">lock</span>
                  <span className="text-[11px] font-label uppercase tracking-widest font-semibold">
                    Secure SSL Encrypted Transaction
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;
