import React, { useState, useMemo } from 'react';
import { Compass, Waves, Shield, Home, Sparkles, MapPin, X, Calendar } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { TourismCard } from './TourismCard';
import { TourismDetailModal } from './TourismDetailModal';
import { BookingEnquiryModal } from './BookingEnquiryModal';
import { ScrollReveal } from '../common/ScrollReveal';
import { TourismListing, TourismCategory, Taluka } from '../../types';

const CATEGORIES: { label: string; value: TourismCategory | 'all' }[] = [
  { label: 'All Experiences', value: 'all' },
  { label: 'Marine & Scuba', value: 'water_sports' },
  { label: 'Historic Sea Forts', value: 'fort' },
  { label: 'Coastal Homestays', value: 'homestay' },
  { label: 'Palace & Craft Workshops', value: 'culture' },
  { label: 'Dolphin & Nature Trails', value: 'nature' }
];

const TALUKAS: { label: string; value: string }[] = [
  { label: 'All Locations', value: 'all' },
  { label: 'Malvan (Tarkarli & Sea Fort)', value: 'Malvan' },
  { label: 'Devgad (Vijaydurg & Coast)', value: 'Devgad' },
  { label: 'Sawantwadi (Royal Heritage)', value: 'Sawantwadi' },
  { label: 'Vengurla (Dolphins & Beaches)', value: 'Vengurla' }
];

export const TourismCatalogue: React.FC = () => {
  const { tourismListings, searchQuery, setSearchQuery } = useMarketplace();
  const [selectedCategory, setSelectedCategory] = useState<TourismCategory | 'all'>('all');
  const [selectedTaluka, setSelectedTaluka] = useState<string>('all');
  
  const [activeDetailListing, setActiveDetailListing] = useState<TourismListing | null>(null);
  const [activeEnquiryListing, setActiveEnquiryListing] = useState<TourismListing | null>(null);

  const filteredListings = useMemo(() => {
    return tourismListings
      .filter((t) => t.isActive)
      .filter((t) => {
        if (selectedCategory !== 'all' && t.category !== selectedCategory) return false;
        if (selectedTaluka !== 'all' && t.locationTaluka !== selectedTaluka) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = t.title.toLowerCase().includes(q);
          const matchDesc = t.description.toLowerCase().includes(q);
          const matchTaluka = t.locationTaluka.toLowerCase().includes(q);
          const matchProvider = t.providerName?.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchTaluka && !matchProvider) return false;
        }
        return true;
      });
  }, [tourismListings, selectedCategory, selectedTaluka, searchQuery]);

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Editorial Header */}
      <div className="border-b border-sand-200/90 pb-8 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono uppercase tracking-widest text-slate-500">
          <span className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-teal-700" />
            Arabian Sea Coastline • 121 km Marine Corridor
          </span>
          <span>Fortresses • Living Coral • Heritage Homestays</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-ocean-950 tracking-tight">
          Sindhudurg Expeditions & Coastal Heritage
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
          Curated diving across Tarkarli&apos;s living reef, archaeological walks through Chhatrapati Shivaji Maharaj&apos;s 1664 marine fortress, and authentic Konkani family homestays.
        </p>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white rounded-2xl border border-sand-200 p-4 sm:p-5 shadow-xs space-y-4">
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Location Selector */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
            <select
              value={selectedTaluka}
              onChange={(e) => setSelectedTaluka(e.target.value)}
              className="py-2 px-3 text-xs sm:text-sm bg-sand-50 rounded-xl border border-sand-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-ocean-500/20"
            >
              {TALUKAS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Clear Filter */}
          {(selectedCategory !== 'all' || selectedTaluka !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedTaluka('all');
                setSearchQuery('');
              }}
              className="text-xs text-ocean-700 hover:text-ocean-900 font-semibold underline underline-offset-2 flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              Reset filters
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1 border-t border-sand-100">
          {CATEGORIES.map((c) => {
            const isSelected = selectedCategory === c.value;
            return (
              <button
                key={c.value}
                onClick={() => setSelectedCategory(c.value)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-ocean-900 text-white shadow-xs'
                    : 'bg-sand-100/70 text-slate-600 hover:bg-sand-200'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Listings Grid with Staggered Delays */}
      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing, idx) => (
            <ScrollReveal
              key={listing.id}
              animation="fade-up"
              delay={Math.min(idx * 80, 400)}
              duration={550}
            >
              <TourismCard
                listing={listing}
                onViewDetails={(item) => setActiveDetailListing(item)}
                onEnquire={(item) => setActiveEnquiryListing(item)}
              />
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-sand-200 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-sand-100 text-slate-400 mx-auto flex items-center justify-center">
            <Compass className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            No experiences found
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Try resetting your destination taluka or checking back as more Konkan guides and homestays are registered.
          </p>
        </div>
      )}

      {/* Modals */}
      <TourismDetailModal
        listing={activeDetailListing}
        isOpen={Boolean(activeDetailListing)}
        onClose={() => setActiveDetailListing(null)}
        onOpenEnquiry={(item) => setActiveEnquiryListing(item)}
      />

      <BookingEnquiryModal
        listing={activeEnquiryListing}
        isOpen={Boolean(activeEnquiryListing)}
        onClose={() => setActiveEnquiryListing(null)}
      />

    </div>
  );
};
