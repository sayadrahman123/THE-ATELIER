import React, { useState } from 'react';

const contactInfo = [
  {
    icon: 'location_on',
    label: 'Atelier Address',
    lines: ['1 Mayfair Row', 'London W1K 1AA', 'United Kingdom'],
  },
  {
    icon: 'phone',
    label: 'Concierge Line',
    lines: ['+44 20 7946 0123', 'Mon – Fri, 9am – 6pm GMT'],
  },
  {
    icon: 'mail',
    label: 'Email',
    lines: ['hello@theatelier.com', 'press@theatelier.com'],
  },
];

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-surface min-h-screen pt-24">
      {/* ── Page Header ── */}
      <div className="py-20 px-6 md:px-8 max-w-screen-2xl mx-auto">
        <span className="text-xs font-label uppercase tracking-[0.3em] text-secondary font-semibold mb-4 block">Get In Touch</span>
        <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-tight leading-tight mb-6">
          Contact <br />
          <span className="serif-italic font-normal">The Atelier</span>
        </h1>
        <p className="text-on-surface-variant text-lg max-w-xl leading-relaxed">
          Our concierge team is available to assist with styling consultations, bespoke orders, and any enquiries about our collections.
        </p>
      </div>

      <div className="px-6 md:px-8 max-w-screen-2xl mx-auto pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-20">

          {/* ── Contact Form ── */}
          <div className="lg:col-span-7">
            {sent ? (
              <div className="bg-surface-container-low p-16 text-center space-y-6">
                <span className="material-symbols-outlined text-5xl text-secondary">check_circle</span>
                <h2 className="text-3xl font-headline">Message Received</h2>
                <p className="text-on-surface-variant leading-relaxed max-w-sm mx-auto">
                  Thank you for reaching out. A member of our concierge team will respond within 24 hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-4 px-8 py-4 border border-primary text-primary text-xs uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="space-y-10" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="ghost-border">
                    <label className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-2">
                      Full Name
                    </label>
                    <input
                      className="w-full py-3 bg-transparent border-none focus:ring-0 text-on-surface outline-none placeholder:text-outline-variant"
                      placeholder="Alexandra Vogue"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="ghost-border">
                    <label className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-2">
                      Email Address
                    </label>
                    <input
                      className="w-full py-3 bg-transparent border-none focus:ring-0 text-on-surface outline-none placeholder:text-outline-variant"
                      placeholder="curator@atelier.com"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="ghost-border">
                  <label className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-2">
                    Subject
                  </label>
                  <select
                    className="w-full py-3 bg-transparent border-none focus:ring-0 text-on-surface outline-none appearance-none"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    required
                  >
                    <option value="">Select enquiry type</option>
                    <option>General Enquiry</option>
                    <option>Styling Consultation</option>
                    <option>Bespoke Order</option>
                    <option>Press & Media</option>
                    <option>Wholesale</option>
                    <option>Returns & Exchanges</option>
                  </select>
                </div>

                <div className="ghost-border">
                  <label className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-2">
                    Message
                  </label>
                  <textarea
                    className="w-full py-3 bg-transparent border-none focus:ring-0 text-on-surface outline-none placeholder:text-outline-variant resize-none"
                    placeholder="Tell us how we can assist you..."
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="gold-shimmer text-on-secondary px-14 py-5 font-label font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-all active:scale-[0.98]"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* ── Contact Info Sidebar ── */}
          <aside className="lg:col-span-5 space-y-8">
            {contactInfo.map((info) => (
              <div key={info.label} className="bg-surface-container-low p-8">
                <div className="flex items-start gap-5">
                  <span className="material-symbols-outlined text-secondary text-2xl flex-shrink-0">{info.icon}</span>
                  <div>
                    <h3 className="text-[10px] font-label font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-3">
                      {info.label}
                    </h3>
                    {info.lines.map((line, i) => (
                      <p key={i} className={`${i === 0 ? 'font-medium text-on-surface' : 'text-on-surface-variant text-sm'}`}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div className="bg-surface-container h-64 overflow-hidden relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAOYrpSboF3hpqbSm3hIut6wx4U3xdBYanLRR-R4jWWrhqJPYjDYi0Bgb1VREl-f2MjyruPWjnADhdSBG-37g6R0Ze6O6ANGl-7b3MtyVyokUVDZu7gVWgQP6mpxry712TcfLhYuAFRUwwUr9lAhHe42BZ9hj1s050MIjdYm3IxaswgjUCc1z14i-grxJZRHhoXDj3akThSiS9bPU8BbO46eExmk3BZmL08WoutBcP1HQkTlbibgEa8TKc4v3xgKQe_WVy-k20e6pS"
                alt="Atelier location"
                className="w-full h-full object-cover grayscale"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="text-center text-white">
                  <span className="material-symbols-outlined text-4xl mb-2">location_on</span>
                  <p className="text-xs uppercase tracking-widest font-label">Mayfair, London</p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="p-8 bg-surface-container-low">
              <h3 className="text-[10px] font-label font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-6">
                Follow The Atelier
              </h3>
              <div className="flex gap-6">
                {[
                  { icon: 'photo_camera', label: 'Instagram' },
                  { icon: 'alternate_email', label: 'Twitter' },
                  { icon: 'share', label: 'Pinterest' },
                ].map((s) => (
                  <button
                    key={s.label}
                    className="flex flex-col items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors group"
                    title={s.label}
                  >
                    <span className="material-symbols-outlined text-xl">{s.icon}</span>
                    <span className="text-[10px] uppercase tracking-widest">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
