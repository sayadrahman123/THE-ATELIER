import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';
import { productAPI } from '../services/api';

const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'New Arrivals'];

const ShopPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSort, setActiveSort] = useState('Featured');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories once
  useEffect(() => {
    productAPI.getCategories()
      .then(({ data }) => setCategories(['All', ...data]))
      .catch(() => {});
  }, []);

  // Fetch products whenever filters change
  useEffect(() => {
    setLoading(true);
    const sortParam =
      activeSort === 'Price: Low to High' ? 'price_asc' :
      activeSort === 'Price: High to Low' ? 'price_desc' : undefined;

    const params = {
      category: activeCategory === 'All' ? undefined : activeCategory,
      minPrice: priceRange[0] || undefined,
      maxPrice: priceRange[1] < 2000 ? priceRange[1] : undefined,
      sort: sortParam,
    };

    productAPI.getAll(params)
      .then(({ data }) => { setProducts(data); setError(null); })
      .catch(() => setError('Failed to load products.'))
      .finally(() => setLoading(false));
  }, [activeCategory, priceRange, activeSort]);

  const filtered = products;

  return (
    <div className="bg-surface min-h-screen pt-24">
      {/* ── Page Header ── */}
      <div className="bg-surface-container-low py-16 px-6 md:px-8">
        <div className="max-w-screen-2xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="mb-6 flex items-center gap-2 text-xs tracking-widest uppercase text-on-surface-variant/60">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span className="text-on-surface">Shop</span>
          </nav>
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-headline font-bold tracking-tight">The Archive</h1>
              <p className="text-on-surface-variant mt-3 font-body">
                {loading ? 'Loading...' : `${filtered.length} ${filtered.length === 1 ? 'piece' : 'pieces'} curated for the discerning eye`}
              </p>
            </div>
            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-on-surface-variant font-label">Sort by</span>
              <select
                value={activeSort}
                onChange={(e) => setActiveSort(e.target.value)}
                className="bg-transparent border-b border-outline-variant/40 text-sm font-body focus:ring-0 focus:border-secondary py-1 pr-6 outline-none appearance-none cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-8 py-16">
        <div className="flex gap-16">
          {/* ── Sidebar Filters ── */}
          <aside
            className={`flex-shrink-0 w-56 transition-all duration-300 ${
              sidebarOpen ? 'block' : 'hidden'
            } hidden md:block`}
          >
            {/* Categories */}
            <div className="mb-12">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant font-bold mb-6">
                Categories
              </h3>
              <ul className="space-y-4">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setActiveCategory(cat)}
                      className={`text-sm font-body transition-all w-full text-left ${
                        activeCategory === cat
                          ? 'text-primary font-medium tracking-tight border-b border-secondary pb-0.5'
                          : 'text-on-surface-variant hover:text-primary'
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range */}
            <div className="mb-12">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant font-bold mb-6">
                Price Range
              </h3>
              <input
                type="range"
                min="0"
                max="2000"
                step="50"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full accent-secondary cursor-pointer"
              />
              <div className="flex justify-between text-xs text-on-surface-variant mt-2">
                <span>$0</span>
                <span>${priceRange[1].toLocaleString()}</span>
              </div>
            </div>

            {/* Collections filter tags */}
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant font-bold mb-6">
                Collection
              </h3>
              <ul className="space-y-4">
                {["Autumn / Winter '24", 'Essential Collection'].map((col) => (
                  <li key={col} className="flex items-center gap-3">
                    <input type="checkbox" className="accent-secondary cursor-pointer" id={col} />
                    <label htmlFor={col} className="text-sm text-on-surface-variant cursor-pointer hover:text-primary">
                      {col}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* ── Mobile filter toggle ── */}
          <div className="md:hidden mb-6 flex gap-4 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 text-xs uppercase tracking-widest border transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-on-primary border-primary'
                    : 'border-outline-variant text-on-surface-variant hover:border-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ── Product Grid ── */}
          <div className="flex-grow">
            {loading ? (
              <div className="text-center py-32">
                <p className="font-headline text-2xl text-on-surface-variant animate-pulse">Curating your selection...</p>
              </div>
            ) : error ? (
              <div className="text-center py-32">
                <p className="font-headline text-2xl text-on-surface-variant mb-4">{error}</p>
                <p className="text-xs text-on-surface-variant/60">Make sure the backend is running on port 8080</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-32">
                <p className="font-headline text-3xl mb-4 text-on-surface-variant">No pieces found</p>
                <p className="text-on-surface-variant/60 mb-8">Try adjusting your filters</p>
                <button
                  onClick={() => { setActiveCategory('All'); setPriceRange([0, 2000]); }}
                  className="px-8 py-4 border border-primary text-primary text-xs uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} showBadge={!!product.badge} badge={product.badge} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Editorial Banner ── */}
      <section className="relative h-96 overflow-hidden">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7MwWy8Aqi1EkITenj29zOQ8PsD_1pfxT4C6vvZR-IGJDlFFKFKxbzIWLNvLB-WIDbdUYABBPf63rGS7FN_2Aqk0sqMwk8PxJRV1IkrOJEov3knJhqo2TOSpKCcPd77O7LeYOIgQh9Obg0QL4RNdT_9rWEe94yY6Ssb-7f1MG9nxUeOBQTPpRdvoNRkqzV_rn3ZFt7XzkcieBZqk16_3AaFAyz1IAc-iBxDSUoH8xJMuwHqZ83qOoJo1LNZAQKQ0mOkQN8qwHs65a2"
          alt="Editorial"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-900/50 flex flex-col items-center justify-center text-white text-center px-6">
          <p className="text-xs uppercase tracking-[0.4em] mb-4 text-white/70">Limited Edition</p>
          <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6">Autumn / Winter '24</h2>
          <Link
            to="/shop"
            className="px-10 py-4 border border-white text-white text-xs uppercase tracking-widest hover:bg-white hover:text-stone-900 transition-all"
          >
            Explore Collection
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ShopPage;
