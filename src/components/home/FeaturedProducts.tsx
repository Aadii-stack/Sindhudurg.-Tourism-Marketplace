import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { ProductCard } from '../products/ProductCard';
import { ProductDetailModal } from '../products/ProductDetailModal';
import { Product } from '../../types';

interface FeaturedProductsProps {
  onViewAll: () => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onViewAll }) => {
  const { products } = useMarketplace();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const featured = products.filter((p) => p.isFeatured && p.isActive).slice(0, 4);

  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-mango-600 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Handpicked Regional Harvest
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ocean-950 font-serif mt-1">
            Featured Local Treasures
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-lg">
            Directly from GI-certified orchards in Devgad, master lacquer sculptors in Sawantwadi, and native Malvani spice presses.
          </p>
        </div>

        <button
          onClick={onViewAll}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-ocean-900 hover:text-ocean-700 group transition-colors self-start sm:self-auto"
        >
          <span>Explore Entire Catalog</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onQuickView={(item) => setSelectedProduct(item)}
          />
        ))}
      </div>

      {/* Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
      />

    </section>
  );
};
