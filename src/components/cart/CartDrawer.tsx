import React from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Plus,
  Minus,
  Truck,
  ShieldCheck
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../lib/utils';

interface CartDrawerProps {
  onProceedCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onProceedCheckout }) => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotalInr,
    deliveryFeeInr,
    totalAmountInr,
    totalItems
  } = useCart();

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 999;
  const amountNeededForFree = Math.max(0, freeDeliveryThreshold - subtotalInr);
  const freeDeliveryPercent = Math.min(100, Math.round((subtotalInr / freeDeliveryThreshold) * 100));

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-sand-200 flex items-center justify-between bg-sand-50/70">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-ocean-900" />
              <h3 className="font-bold text-ocean-950 text-base font-serif">
                Your Sindhudurg Basket ({totalItems})
              </h3>
            </div>
            <button
              onClick={closeCart}
              aria-label="Close cart"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-sand-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="px-5 py-3 bg-ocean-50/60 border-b border-ocean-100/60 text-xs text-ocean-900">
            {amountNeededForFree > 0 ? (
              <p>
                Add <strong className="text-teal-800">{formatINR(amountNeededForFree)}</strong> more of local items for <strong>FREE Delivery</strong>
              </p>
            ) : (
              <p className="text-teal-800 font-semibold flex items-center gap-1">
                <Truck className="w-4 h-4" />
                Congratulations! You unlocked FREE Delivery across India.
              </p>
            )}
            <div className="w-full bg-sand-200 rounded-full h-1.5 mt-1.5 overflow-hidden">
              <div
                className="bg-teal-600 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${freeDeliveryPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="p-5 flex-1 overflow-y-auto divide-y divide-sand-100 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-sand-100 text-slate-400 mx-auto flex items-center justify-center">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-slate-800 text-base">
                  Your cart is empty
                </h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Discover authentic Alphonso mangoes, Sawantwadi wooden toys, and Kokum extracts.
                </p>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div key={product.id} className="pt-3 first:pt-0 flex gap-3.5">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-16 h-16 rounded-xl object-cover border border-sand-200 shrink-0"
                  />
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1 leading-snug">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          aria-label={`Remove ${product.name}`}
                          className="text-slate-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        {product.unit} • {formatINR(product.priceInr)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-sand-300 rounded-lg bg-sand-50 p-0.5">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          aria-label="Decrease quantity"
                          className="w-6 h-6 rounded bg-white hover:bg-sand-100 flex items-center justify-center text-slate-700 shadow-xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-slate-800">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          aria-label="Increase quantity"
                          className="w-6 h-6 rounded bg-white hover:bg-sand-100 flex items-center justify-center text-slate-700 shadow-xs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-bold text-ocean-950 text-sm font-serif">
                        {formatINR(product.priceInr * quantity)}
                      </span>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Bar */}
          {items.length > 0 && (
            <div className="p-5 border-t border-sand-200 bg-sand-50/90 space-y-3">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-slate-900">{formatINR(subtotalInr)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery to doorstep:</span>
                  <span className="font-semibold text-teal-800">
                    {deliveryFeeInr === 0 ? 'FREE' : formatINR(deliveryFeeInr)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-ocean-950 pt-2 border-t border-sand-200 font-serif">
                  <span>Total Amount:</span>
                  <span className="text-base text-ocean-950">{formatINR(totalAmountInr)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  closeCart();
                  onProceedCheckout();
                }}
                className="w-full py-3.5 rounded-xl bg-ocean-950 hover:bg-ocean-900 text-white font-semibold text-sm shadow-sm flex items-center justify-center gap-2 transition-all"
              >
                <span>Proceed to Consignment Checkout</span>
                <ArrowRight className="w-4 h-4 text-mango-400" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                <span>Direct artisan cooperative dispatch • Zero card fees</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
