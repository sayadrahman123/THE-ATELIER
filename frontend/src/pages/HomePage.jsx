import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';
import { products } from '../data/products';

const featuredProducts = products.slice(0, 4);

const HomePage = () => {
  return (
    <div className="bg-surface">
      {/* ── Hero Section ── */}
      <section className="relative h-screen min-h-[600px] flex items-center px-6 md:px-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBayevTCcuyDHYC5fJ03entLvIXEZqmGw-W3Yx00AdQ9iGnqdYaXRcUj78jq6l_dGk31yjt55KQON5KE6qIvRrk_iZt_1FqZMg3dIv90Zt36ruOjDdhiOwIKxY5BUVxhqYq6xhN-drEwxPb9AR6H6hUiPXiGVmK0rTmo_1GbcDEU4LPVd1Rdc9CDmI4U9JEIPmOg83b7YtOgtNRE-eAC1oYwpXmgOwHYM-yLgITtKyjtif6e3wmW0pz0FGOww35FEFutAO26sS4nwH9"
            alt="Luxury interior"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-stone-900/10" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <p className="font-label text-xs uppercase tracking-[0.4em] mb-6 text-on-surface-variant">
            Autumn / Winter '24
          </p>
          <h1 className="text-6xl md:text-8xl font-headline font-bold leading-tight mb-8 text-on-surface">
            The Silent <br />
            <span className="italic font-normal">Symphony</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant mb-10 max-w-lg leading-relaxed">
            A curated selection of objects and apparel that bridge the gap between architectural precision and artisanal warmth.
          </p>
          <div className="flex flex-wrap gap-6 items-center">
            <Link
              to="/shop"
              className="px-10 py-4 bg-primary text-on-primary font-label text-sm uppercase tracking-widest hover:bg-secondary transition-colors duration-300"
            >
              Shop Now
            </Link>
            <Link
              to="/about"
              className="text-primary font-label text-sm uppercase tracking-widest border-b border-secondary pb-1"
            >
              View Lookbook
            </Link>
          </div>
        </div>
      </section>

      {/* ── Seasonal Fragments — Bento Grid ── */}
      <section className="py-32 px-6 md:px-8 max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-headline mb-6">Seasonal Fragments</h2>
            <p className="text-on-surface-variant leading-relaxed">
              Our collections are released in small, intentional chapters. Each piece is numbered and crafted for longevity.
            </p>
          </div>
          <Link to="/shop" className="hidden md:block text-stone-400 hover:text-primary transition-colors py-2 group">
            Explore all collections{' '}
            <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[800px]">
          {/* Left large image */}
          <div className="md:col-span-8 group relative overflow-hidden bg-surface-container-low h-80 md:h-full">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7MwWy8Aqi1EkITenj29zOQ8PsD_1pfxT4C6vvZR-IGJDlFFKFKxbzIWLNvLB-WIDbdUYABBPf63rGS7FN_2Aqk0sqMwk8PxJRV1IkrOJEov3knJhqo2TOSpKCcPd77O7LeYOIgQh9Obg0QL4RNdT_9rWEe94yY6Ssb-7f1MG9nxUeOBQTPpRdvoNRkqzV_rn3ZFt7XzkcieBZqk16_3AaFAyz1IAc-iBxDSUoH8xJMuwHqZ83qOoJo1LNZAQKQ0mOkQN8qwHs65a2"
              alt="Woman in beige coat"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
            <div className="absolute bottom-10 left-10 text-white">
              <span className="text-[10px] uppercase tracking-[0.3em] mb-2 block">Chapter I</span>
              <h3 className="text-3xl font-headline mb-4">Neutral Geometry</h3>
              <Link to="/shop" className="text-sm border-b border-white pb-1">Discover</Link>
            </div>
          </div>

          {/* Right 2-row stack */}
          <div className="md:col-span-4 grid grid-rows-2 gap-6">
            <div className="group relative overflow-hidden bg-surface-container-low h-60 md:h-full">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB99EbjRtT8JomS2ugvKuXWwZwGNw6fgxMaIzdjSlTmfAzscje7SCqAppa3HquHXH70umzy6nCXgxQsHq68qOIIoZF2S_Gip7Yqo_1chR0BZaH5AD_T0czlGOt6MsSvT-5mR5e74k8E72dZOt2kadQQWFvmL9jj-Ef3KEICsQiCUZ0qivsaBYTuZVm86r_TcIPilZSj4anO5B_4Rlc3sLOzmZT9MuOH3YEMBrQuFHsbi5R0roO7TpUfy9QggWwZPLhuj7YJ6AbLVNCH"
                alt="Luxury fabrics"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xs uppercase tracking-widest px-4 py-2 border border-white">Textiles</span>
              </div>
            </div>
            <div className="group relative overflow-hidden bg-surface-container-low h-60 md:h-full">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_p_rLwlcpnLI5By0r9qzk7sm_yimnh1uYK39KTTi_AIFt-2LmN88ncX2N6SDYNEK_12ixdhJRBRqudvR3dGyos7W9SxOXyTEnZuK1jT_Tj36nfXtG8yi-8aQ561pvgy5ZwEKroLLmUf4OkU2MKVihjzQvA1FpwU1M_b9figZB-4kU7Q3konnqcDk-Of_tuYBtf-U6mQbh6fOHAhC8CHZsSCCedlgB78pKVQCmFF86vRlwxgNX8W47nx2GrgEPDlUH5GSsJP_eeq7u"
                alt="Ceramic vases"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xs uppercase tracking-widest px-4 py-2 border border-white">Objets</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Essential Artifacts — Product Grid ── */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-headline mb-4">Essential Artifacts</h2>
            <div className="w-12 h-px bg-secondary mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} showBadge={!!product.badge} badge={product.badge} />
            ))}
          </div>
          <div className="text-center mt-16">
            <Link
              to="/shop"
              className="inline-block px-12 py-4 border border-primary text-primary font-label text-xs uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ── Brand Storytelling ── */}
      <section className="py-40 px-6 md:px-8">
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center gap-24">
          <div className="lg:w-1/2 relative">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-secondary/5 -z-10" />
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAj6cWrLWfKiE-Tug0cu1vmBirpTk7ClqffehWrhJbxtCdeSxZ2ifQS7MMps2IBjdvI1aeKKMBYEe7DlbVv09rIwKv7I4DA3SHx0faxNi8CPNBv3y3FzXtrn9-L_OFokJz9diMF4o2fZ1wRW3y1AZXkwv1X1MA1HtRLN0zVGAJm5HsVEC6Oe4oM-iUuDbt3K7g-Pfhfckiox_GN5C7hmVi7OoJw26mmFR9Km-Vpt10hTyfSHAgPKXZTzK_RyS879cjd0b6e_SMgjdYh"
              alt="Craftsman at work"
              className="w-full editorial-shadow grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </div>
          <div className="lg:w-1/2 space-y-8">
            <p className="font-label text-xs uppercase tracking-[0.4em] text-secondary">Our Philosophy</p>
            <h2 className="text-5xl font-headline leading-tight">
              Quiet Luxury, <br />Vocal Craft.
            </h2>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              At THE ATELIER, we believe that the objects we surround ourselves with define the quality of our days. Our process is intentionally slow. We partner with family-owned mills in Northern Italy and independent ceramicists in Japan to ensure every seam and glaze tells a story of human excellence.
            </p>
            <div className="pt-4">
              <Link
                to="/about"
                className="text-primary font-label text-sm uppercase tracking-widest group inline-flex items-center gap-3"
              >
                Read the full story
                <span className="w-8 h-px bg-primary transition-all group-hover:w-12" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="bg-primary text-on-primary py-32 text-center px-6 md:px-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-headline mb-6">Join The Circle</h2>
          <p className="text-primary-fixed-dim mb-12 font-body font-light">
            Be the first to receive invitation-only access to our limited collection drops and private editorial features.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              className="flex-grow bg-transparent border-b border-white/20 focus:border-secondary focus:ring-0 text-white placeholder:text-white/40 py-3 outline-none"
              placeholder="Your Email Address"
              type="email"
            />
            <button
              type="submit"
              className="bg-on-primary text-primary px-8 py-3 font-label text-xs uppercase tracking-widest hover:bg-secondary hover:text-white transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
