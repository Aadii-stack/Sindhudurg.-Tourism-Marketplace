import React, { useEffect } from 'react';
import { ShoppingBag, CheckCircle2, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../lib/utils';

export const NotificationToast: React.FC = () => {
  const { lastAddedItem, resetLastAddedItem, openCart } = useCart();

  useEffect(() => {
    if (lastAddedItem) {
      const timer = setTimeout(() => {
        resetLastAddedItem();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [lastAddedItem, resetLastAddedItem]);

  if (!lastAddedItem) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-toast-enter">
      <div className="bg-ocean-950 text-white rounded-2xl p-4 shadow-2xl border border-ocean-800 flex items-center gap-3.5 max-w-sm">
        <img
          src={lastAddedItem.imageUrl}
          alt={lastAddedItem.name}
          className="w-12 h-12 rounded-xl object-cover border border-ocean-700 shrink-0"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 text-[11px] font-semibold text-teal-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Added to Cart</span>
          </div>
          <p className="text-xs font-bold truncate text-slate-100 mt-0.5">
            {lastAddedItem.name}
          </p>
          <p className="text-[11px] text-mango-400 font-semibold font-serif">
            {formatINR(lastAddedItem.priceInr)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              resetLastAddedItem();
              openCart();
            }}
            className="px-2.5 py-1.5 bg-mango-500 hover:bg-mango-400 text-slate-950 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shadow-xs"
          >
            View
          </button>
          <button
            onClick={resetLastAddedItem}
            className="p-1 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
