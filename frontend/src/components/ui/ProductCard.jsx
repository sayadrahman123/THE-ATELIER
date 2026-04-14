import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product, showBadge = false, badge = 'New' }) => {
  const { addToCart } = useCart();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ ...product, size: 'M', color: product.color || 'Default', quantity: 1 });
  };

  return (
    <Link to={`/product/${product.id}`} className="group cursor-pointer block">
      <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-surface-container-lowest editorial-shadow">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {showBadge && (
          <div className="absolute top-4 left-4">
            <span className="bg-surface-container-lowest px-3 py-1 text-[10px] uppercase tracking-widest">
              {badge}
            </span>
          </div>
        )}
        {/* Quick Add - slides up on hover */}
        <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-surface/90 backdrop-blur-md">
          <button
            onClick={handleQuickAdd}
            className="w-full py-3 gold-shimmer text-on-secondary font-label text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
          >
            Quick Add
          </button>
        </div>
      </div>
      <div className="space-y-1">
        <h4 className="text-primary font-medium tracking-tight">{product.name}</h4>
        <p className="text-on-surface-variant text-sm">{product.variant}</p>
        <p className="text-primary pt-2">${product.price.toLocaleString()}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
