import React, { useState } from 'react';
import { ArrowRight, Compass, Waves, Shield, Award } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { TourismCard } from '../tourism/TourismCard';
import { TourismDetailModal } from '../tourism/TourismDetailModal';
import { BookingEnquiryModal } from '../tourism/BookingEnquiryModal';
import { ScrollReveal } from '../common/ScrollReveal';
import { TourismListing } from '../../types';

interface TourismSpotlightProps {
  onViewAllTourism: () => void;
}

export const TourismSpotlight: React.FC<TourismSpotlightProps> = ({ onViewAllTourism }) => {
  const { tourismListings } = useMarketplace();
  const [selectedListing, setSelectedListing] = useState<TourismListing | null>(null);
  const [enquiryListing, setEnquiryListing] = useState<TourismListing | null>(null);

  const featured = tourismListings.filter((t) => t.isFeatured && t.isActive).slice(0, 3);

  return (
    <section className="py-12 sm:py-16 bg-sand-100/60 border-y border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              Konkan Expeditions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ocean-950 font-serif mt-1">
              Popular Sindhudurg Experiences
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-lg">
              Submerged coral reef diving, Shivaji Maharaj&apos;s 1664 marine fortress, and authentic palace lacquer workshops.
            </p>
          </div>

          <button
            onClick={onViewAllTourism}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-ocean-900 hover:text-ocean-700 group transition-colors self-start sm:self-auto"
          >
            <span>All Tourism Listings</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Column Grid with Staggered Delays */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((listing, idx) => (
            <ScrollReveal key={listing.id} animation="fade-up" delay={idx * 120} duration={650}>
              <TourismCard
                listing={listing}
                onViewDetails={(item) => setSelectedListing(item)}
                onEnquire={(item) => setEnquiryListing(item)}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* Modals */}
        <TourismDetailModal
          listing={selectedListing}
          isOpen={Boolean(selectedListing)}
          onClose={() => setSelectedListing(null)}
          onOpenEnquiry={(item) => setEnquiryListing(item)}
        />

        <BookingEnquiryModal
          listing={enquiryListing}
          isOpen={Boolean(enquiryListing)}
          onClose={() => setEnquiryListing(null)}
        />

      </div>
    </section>
  );
};
