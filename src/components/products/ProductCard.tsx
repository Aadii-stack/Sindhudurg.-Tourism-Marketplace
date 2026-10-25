import React from 'react';
import { ShoppingBag, Heart, Star, MapPin, CheckCircle2 } from 'lucide-react';
import { Product } from '../../types';
import { formatINR } from '../../lib/utils';
import { useCart } from '../../context/CartContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Badge } from '../common/Badge';

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
    <div className="group relative bg-white rounded-2xl border border-sand-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Image & Floating Badges */}
      <div className="relative aspect-square w-full overflow-hidden bg-sand-100 cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow-sm transition-all ${
            isFav
              ? 'bg-kokum-500 text-white'
              : 'bg-white/80 hover:bg-white text-slate-600 hover:text-kokum-600'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-white' : ''}`} />
        </button>

        {/* Origin Taluka Badge */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-sm text-white">
            <MapPin className="w-3 h-3 text-teal-400" />
            {product.originTaluka}
          </span>
          {product.isOrganic && (
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-700/80 backdrop-blur-sm text-white">
              Organic
            </span>
          )}
        </div>
      </div>

      {/* Body Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          {/* Category & Demo Label */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="text-teal-700 font-semibold truncate max-w-[150px]">
              {product.categoryName || 'Konkan Specialty'}
            </span>
            <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
              Demo Item
            </span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-ocean-900 transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {product.name}
          </h3>

          {/* Seller Provenance */}
          <p className="text-xs text-slate-500 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span className="truncate">{product.sellerName || 'Verified Artisan Collective'}</span>
          </p>

          {/* Short description */}
          <p className="text-xs text-slate-600 line-clamp-2 pt-1">
            {product.description}
          </p>
        </div>

        {/* Rating and Price */}
        <div className="pt-4 mt-3 border-t border-sand-100 flex items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-1 text-xs text-slate-600 mb-1">
              <Star className="w-3.5 h-3.5 fill-mango-400 text-mango-500" />
              <span className="font-bold text-slate-800">{product.rating}</span>
              <span className="text-slate-400">({product.reviewsCount})</span>
            </div>
            
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg sm:text-xl font-extrabold text-ocean-950 font-serif">
                {formatINR(product.priceInr)}
              </span>
              {product.mrpInr && product.mrpInr > product.priceInr && (
                <span className="text-xs text-slate-400 line-through">
                  {formatINR(product.mrpInr)}
                </span>
              )}
            </div>
            <span className="text-[11px] text-slate-500 block">
              {product.unit}
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product, 1)}
            disabled={product.stockQuantity === 0}
            className={`p-2.5 sm:px-3 sm:py-2 rounded-xl flex items-center gap-1.5 text-xs font-semibold shadow-xs transition-all ${
              product.stockQuantity === 0
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-ocean-900 hover:bg-ocean-800 text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-mango-400" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>

      </div>

    </div>
  );
};
