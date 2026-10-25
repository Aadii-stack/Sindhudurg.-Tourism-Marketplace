import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, Sparkles, MapPin, X } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { ProductCard } from './ProductCard';
import { ProductDetailModal } from './ProductDetailModal';
import { Product, Taluka } from '../../types';

const TALUKAS: { label: string; value: string }[] = [
  { label: 'All Talukas', value: 'all' },
  { label: 'Devgad (Alphonso Hub)', value: 'Devgad' },
  { label: 'Malvan (Spices & Coastal)', value: 'Malvan' },
  { label: 'Sawantwadi (Handicrafts)', value: 'Sawantwadi' },
  { label: 'Vengurla (Cashews & Coast)', value: 'Vengurla' }
];

export const ProductCatalogue: React.FC = () => {
  const {
    products,
    categories,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    activeTaluka,
    setActiveTaluka
  } = useMarketplace();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [organicOnly, setOrganicOnly] = useState(false);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => p.isActive)
      .filter((p) => {
        if (activeCategory !== 'all' && p.categoryId !== activeCategory) {
          // Check if category slug matches
          const cat = categories.find(c => c.id === p.categoryId || c.slug === activeCategory);
          if (cat && cat.slug !== activeCategory && cat.id !== activeCategory) return false;
        }
        if (activeTaluka !== 'all' && p.originTaluka !== activeTaluka) return false;
        if (organicOnly && !p.isOrganic) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchTaluka = p.originTaluka.toLowerCase().includes(q);
          const matchSeller = p.sellerName?.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchTaluka && !matchSeller) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceInr - b.priceInr;
        if (sortBy === 'price-desc') return b.priceInr - a.priceInr;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default featured
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, categories, activeCategory, activeTaluka, organicOnly, searchQuery, sortBy]);

  const hasActiveFilters = activeCategory !== 'all' || activeTaluka !== 'all' || organicOnly || searchQuery.trim() !== '';

  const clearAllFilters = () => {
    setActiveCategory('all');
    setActiveTaluka('all');
    setOrganicOnly(false);
    setSearchQuery('');
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-ocean-950 via-ocean-900 to-teal-900 text-white p-6 sm:p-10 shadow-lg overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-mango-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Konkan Authentic Marketplace
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif tracking-tight">
            Sindhudurg Local Treasures
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Directly from GI-certified orchards, multi-generational master lacquer artisans, and women-led spice cooperatives across all 8 talukas.
          </p>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white rounded-2xl border border-sand-200 p-4 sm:p-5 shadow-xs space-y-4">
        
        {/* Top Search & Sorters */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Field */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Alphonso, wooden toys, kokum agal, masala..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-sand-50 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-ocean-500/20 focus:border-ocean-600"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sorter & Taluka Filter */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Taluka Selector */}
            <select
              value={activeTaluka}
              onChange={(e) => setActiveTaluka(e.target.value)}
              className="py-2 px-3 text-xs sm:text-sm bg-sand-50 rounded-xl border border-sand-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-ocean-500/20"
            >
              {TALUKAS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>

            {/* Sort Selector */}
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="py-2 px-3 text-xs sm:text-sm bg-sand-50 rounded-xl border border-sand-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-ocean-500/20"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            {/* Organic Toggle */}
            <button
              onClick={() => setOrganicOnly(!organicOnly)}
              className={`px-3 py-2 text-xs rounded-xl border transition-colors flex items-center gap-1.5 ${
                organicOnly
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold'
                  : 'bg-sand-50 text-slate-600 border-sand-200 hover:bg-sand-100'
              }`}
            >
              <span>Organic Only</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1 border-t border-sand-100">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              activeCategory === 'all'
                ? 'bg-ocean-900 text-white'
                : 'bg-sand-100/70 text-slate-600 hover:bg-sand-200'
            }`}
          >
            All Categories ({products.filter(p => p.isActive).length})
          </button>

          {categories.map((cat) => {
            const isSelected = activeCategory === cat.slug || activeCategory === cat.id;
            const count = products.filter(p => p.isActive && (p.categoryId === cat.id || p.categoryName === cat.name)).length;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-ocean-900 text-white'
                    : 'bg-sand-100/70 text-slate-600 hover:bg-sand-200'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Active Filter Clear Prompt */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>
              Showing {filteredProducts.length} matching products
            </span>
            <button
              onClick={clearAllFilters}
              className="text-ocean-700 hover:text-ocean-900 font-semibold underline underline-offset-2 flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              Reset all filters
            </button>
          </div>
        )}
      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-sand-200 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-sand-100 text-slate-400 mx-auto flex items-center justify-center">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            No products match your criteria
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Try adjusting your search terms, changing the taluka selector, or clearing active filters to view all authentic listings.
          </p>
          <button
            onClick={clearAllFilters}
            className="px-4 py-2 rounded-xl bg-ocean-900 text-white text-xs font-semibold hover:bg-ocean-800"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
      />

    </div>
  );
};
