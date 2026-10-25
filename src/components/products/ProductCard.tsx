import React from 'react';
import { ShoppingBag, Heart, Star, CheckCircle2 } from 'lucide-react';
import { Product } from '../../types';
import { formatINR } from '../../lib/utils';
import { useCart } from '../../context/CartContext';
import { useMarketplace } from '../../context/MarketplaceContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView
}) => {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useMarketplace();
  const isFav = isFavorite(product.id);

  return (
    <article className="group bg-white rounded-2xl border border-sand-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      
      {/* Visual Canvas with Subtle Heart Toggle */}
      <div
        className="relative aspect-square w-full overflow-hidden bg-sand-100 cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          aria-label={isFav ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3.5 right-3.5 p-2 rounded-full backdrop-blur-md transition-all duration-150 ${
            isFav
              ? 'bg-kokum-700 text-white shadow-xs'
              : 'bg-white/85 hover:bg-white text-slate-700 shadow-2xs'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-white' : ''}`} />
        </button>

        {/* Quiet Provenance Ribbon */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-ocean-950/80 backdrop-blur-sm text-white">
            {product.originTaluka}
          </span>
          {product.isOrganic && (
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-900/80 backdrop-blur-sm text-emerald-100">
              Chemical-Free
            </span>
          )}
        </div>
      </div>

      {/* Body Information */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          {/* Category */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="text-teal-800 font-medium tracking-wide uppercase text-[10px]">
              {product.categoryName || 'Konkan Heritage'}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-slate-600">
              <Star className="w-3 h-3 fill-mango-400 text-mango-500" />
              <span className="font-bold text-slate-800">{product.rating}</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-bold text-ocean-950 text-base font-serif group-hover:text-ocean-700 transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {product.name}
          </h3>

          {/* Producer Provenance */}
          <p className="text-xs text-slate-500 flex items-center gap-1 pt-0.5">
            <CheckCircle2 className="w-3 h-3 text-teal-700 shrink-0" />
            <span className="truncate">{product.sellerName || 'Verified Collective'}</span>
          </p>
        </div>

        {/* Pricing and Tactile Add Action */}
        <div className="pt-3 border-t border-sand-100 flex items-end justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-ocean-950 font-serif">
                {formatINR(product.priceInr)}
              </span>
              {product.mrpInr && product.mrpInr > product.priceInr && (
                <span className="text-xs text-slate-400 line-through">
                  {formatINR(product.mrpInr)}
                </span>
              )}
            </div>
            <span className="text-[11px] text-slate-500 block font-light">
              {product.unit}
            </span>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={product.stockQuantity === 0}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-150 active:scale-95 ${
              product.stockQuantity === 0
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-ocean-900 hover:bg-ocean-800 text-white shadow-xs'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-mango-400" />
            <span>Add</span>
          </button>
        </div>

      </div>

    </article>
  );
};
