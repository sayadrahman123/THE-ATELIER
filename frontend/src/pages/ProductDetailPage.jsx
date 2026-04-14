import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ui/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [addedToBag, setAddedToBag] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    setLoading(true);
    setSelectedImage(0);
    setSelectedSize(null);
    productAPI.getById(id)
      .then(({ data }) => {
        setProduct(data);
        setSelectedColor(data.colors?.[0]?.name || '');
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));

    // Fetch related products
    productAPI.getAll({})
      .then(({ data }) => setRelated(data.filter((p) => String(p.id) !== String(id)).slice(0, 4)))
      .catch(() => {});
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <p className="font-headline text-2xl text-on-surface-variant animate-pulse">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-6 pt-24">
        <p className="font-headline text-3xl">Product not found</p>
        <Link to="/shop" className="px-8 py-4 gold-shimmer text-white text-xs uppercase tracking-widest">
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleAddToBag = () => {
    if (!selectedSize && product.sizes.length > 1) return;
    addToCart({
      ...product,
      size: selectedSize || product.sizes[0],
      color: selectedColor,
    });
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 2000);
  };

  // related is now fetched from API above

  return (
    <div className="bg-surface">
      <main className="pt-32 pb-24">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-8">
          {/* Breadcrumbs */}
          <nav className="mb-12 flex items-center gap-2 text-xs tracking-widest uppercase text-on-surface-variant/60">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span className="text-on-surface">{product.name}</span>
          </nav>

          {/* Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* ── Gallery ── */}
            <div className="lg:col-span-7 grid grid-cols-12 gap-4">
              {/* Thumbnails */}
              <div className="col-span-2 space-y-4">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`aspect-[3/4] w-full bg-surface-container-low overflow-hidden border-2 transition-all ${
                      selectedImage === i ? 'border-secondary' : 'border-transparent hover:border-outline-variant'
                    } ${i >= 3 ? 'opacity-40' : ''}`}
                  >
                    <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="col-span-10 relative">
                <div className="aspect-[4/5] bg-surface-container-low overflow-hidden">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
                </div>
                <button className="absolute bottom-6 right-6 p-4 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-primary">zoom_in</span>
                </button>
              </div>
            </div>

            {/* ── Product Info ── */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="mb-2">
                <span className="text-xs uppercase tracking-[0.2em] text-secondary font-semibold font-label">
                  {product.collection}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-headline text-primary mb-4 leading-tight">
                {product.name}
              </h1>
              <div className="text-2xl font-light text-on-surface/80 mb-10">
                ${product.price.toLocaleString()}.00
              </div>

              {/* Description */}
              <div className="space-y-6 mb-12">
                <p className="text-lg leading-relaxed text-on-surface-variant font-light">
                  {product.description}
                </p>
                <div className="grid grid-cols-2 gap-4 py-6 border-y border-outline-variant/20">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-sm">eco</span>
                    <span className="text-xs uppercase tracking-widest text-on-surface/60">Sustainable</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-sm">potted_plant</span>
                    <span className="text-xs uppercase tracking-widest text-on-surface/60">Hand-Finished</span>
                  </div>
                </div>
              </div>

              {/* Selectors */}
              <div className="space-y-10 mb-12">
                {/* Color Selector */}
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-label mb-4 block">
                    Color — {selectedColor}
                  </span>
                  <div className="flex gap-3">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        title={c.name}
                        className={`w-8 h-8 rounded-full border-2 p-0.5 transition-all ${
                          selectedColor === c.name ? 'border-secondary' : 'border-transparent hover:border-outline-variant'
                        }`}
                      >
                        <div className="w-full h-full rounded-full" style={{ backgroundColor: c.hex }} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                {product.sizes.length > 1 && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-label">
                        Select Size
                      </span>
                      <button className="text-[10px] uppercase tracking-widest underline underline-offset-4 decoration-secondary/40 text-on-surface-variant hover:text-secondary transition-colors">
                        Size Guide
                      </button>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-3 text-xs tracking-widest border transition-all ${
                            selectedSize === size
                              ? 'border-2 border-primary bg-primary text-on-primary'
                              : 'border-outline-variant/30 hover:border-primary'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    {!selectedSize && (
                      <p className="text-xs text-on-surface-variant/60 mt-2">Please select a size</p>
                    )}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToBag}
                  disabled={product.sizes.length > 1 && !selectedSize}
                  className={`flex-1 py-5 uppercase tracking-[0.2em] text-xs font-semibold transition-all active:scale-[0.98] ${
                    addedToBag
                      ? 'bg-green-700 text-white'
                      : 'gold-shimmer text-on-secondary hover:opacity-90'
                  } disabled:opacity-40 disabled:cursor-not-allowed`}
                >
                  {addedToBag ? '✓ Added to Bag' : 'Add to Bag'}
                </button>
                <button
                  onClick={() => setWishlisted((v) => !v)}
                  className="px-6 border border-outline-variant/40 hover:bg-surface-container-low transition-colors group"
                >
                  <span
                    className={`material-symbols-outlined transition-all ${wishlisted ? 'text-red-500' : 'text-primary'}`}
                    style={{ fontVariationSettings: wishlisted ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                </button>
              </div>

              {/* Proceed to checkout shortcut */}
              {addedToBag && (
                <button
                  onClick={() => navigate('/cart')}
                  className="mt-3 w-full py-3 border border-primary text-primary text-xs uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all"
                >
                  View Bag
                </button>
              )}

              {/* Shipping Info */}
              <div className="mt-12 p-6 bg-surface-container-low">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary">local_shipping</span>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-semibold mb-1">Complimentary Delivery</h4>
                    <p className="text-xs text-on-surface-variant font-light leading-relaxed">
                      Orders placed before 2pm will be shipped the same day. Free worldwide express shipping on orders over $500.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── Related Products ── */}
      <section className="bg-surface-container-low py-24">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl font-headline text-primary mb-2">Complete The Look</h2>
              <p className="text-on-surface-variant/70 tracking-widest uppercase text-[10px]">
                Pairs perfectly with your selection
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;
