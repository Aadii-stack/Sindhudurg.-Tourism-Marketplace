import React, { useState } from 'react';
import {
  ShoppingBag,
  Heart,
  Star,
  MapPin,
  CheckCircle2,
  Truck,
  ShieldCheck,
  RefreshCw,
  Info
} from 'lucide-react';
import { Product } from '../../types';
import { formatINR } from '../../lib/utils';
import { useCart } from '../../context/CartContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Modal } from '../common/Modal';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose
}) => {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useMarketplace();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string>('');

  if (!product) return null;

  const isFav = isFavorite(product.id);
  const currentImage = activeImage || product.imageUrl;
  const allImages = [product.imageUrl, ...(product.additionalImages || [])];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column: Image Gallery */}
        <div className="space-y-3">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-sand-100 border border-sand-200">
            <img
              src={currentImage}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=800&q=80';
              }}
            />
            <button
              onClick={() => toggleFavorite(product.id)}
              aria-label={isFav ? "Remove from wishlist" : "Add to wishlist"}
              className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow-sm transition-all ${
                isFav
                  ? 'bg-kokum-500 text-white'
                  : 'bg-white/80 hover:bg-white text-slate-600'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-white' : ''}`} />
            </button>
          </div>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    currentImage === img
                      ? 'border-ocean-600 scale-95'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Origin Card */}
          <div className="p-3.5 rounded-xl bg-sand-50 border border-sand-200 text-xs text-slate-600 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-ocean-950">
              <MapPin className="w-4 h-4 text-teal-600" />
              <span>Origin: {product.originTaluka} Taluka, Sindhudurg</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Sold by: <strong className="text-slate-800">{product.sellerName || 'Verified Konkan Farmer Collective'}</strong>
            </p>
          </div>
        </div>

        {/* Right Column: Details & Purchase */}
        <div className="flex flex-col justify-between space-y-4">
          
          <div className="space-y-3">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                {product.categoryName || 'Authentic Konkan'}
              </span>
              {product.isOrganic && (
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  100% Organic
                </span>
              )}
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                Academic Demo Data
              </span>
            </div>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-ocean-950 font-serif leading-snug">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <div className="flex items-center gap-1 bg-sand-100 px-2 py-0.5 rounded-md">
                <Star className="w-3.5 h-3.5 fill-mango-400 text-mango-500" />
                <span className="font-bold text-slate-900">{product.rating}</span>
              </div>
              <span>{product.reviewsCount} customer reviews</span>
              <span className="text-slate-300">•</span>
              <span className="text-teal-700 font-semibold">In Stock ({product.stockQuantity} left)</span>
            </div>

            {/* Price Block */}
            <div className="p-3 rounded-xl bg-sand-50/80 border border-sand-200/80">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-ocean-950 font-serif">
                  {formatINR(product.priceInr)}
                </span>
                {product.mrpInr && product.mrpInr > product.priceInr && (
                  <span className="text-sm text-slate-400 line-through">
                    {formatINR(product.mrpInr)}
                  </span>
                )}
                <span className="text-xs font-semibold text-teal-700 ml-1">
                  Save {product.mrpInr ? Math.round(((product.mrpInr - product.priceInr) / product.mrpInr) * 100) : 0}%
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Unit: <strong className="text-slate-700">{product.unit}</strong> (inclusive of all regional taxes)
              </p>
            </div>

            {/* Description */}
            <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2">
              <p>{product.description}</p>
            </div>

            {/* Delivery highlights */}
            <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-slate-600">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-teal-600" />
                <span>Free delivery on ₹999+</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                <span>Direct farmer verification</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-sand-200 space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity Picker */}
              <div className="flex items-center border border-sand-300 rounded-xl bg-sand-50 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-white hover:bg-sand-100 flex items-center justify-center font-bold text-slate-700 shadow-xs"
                >
                  -
                </button>
                <span className="w-10 text-center text-sm font-bold text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                  className="w-8 h-8 rounded-lg bg-white hover:bg-sand-100 flex items-center justify-center font-bold text-slate-700 shadow-xs"
                >
                  +
                </button>
              </div>

              {/* Add to Cart CTA */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 px-4 rounded-xl bg-ocean-900 hover:bg-ocean-800 text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <ShoppingBag className="w-4 h-4 text-mango-400" />
                <span>Add to Cart • {formatINR(product.priceInr * quantity)}</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400 text-center">
              Sample product for ED evaluation. Mock checkout requires no credit card.
            </p>
          </div>

        </div>

      </div>
    </Modal>
  );
};
