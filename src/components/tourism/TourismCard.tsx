import React from 'react';
import {
  Compass,
  MapPin,
  Clock,
  Star,
  Check,
  ArrowRight,
  Send
} from 'lucide-react';
import { TourismListing } from '../../types';
import { formatINR } from '../../lib/utils';

interface TourismCardProps {
  listing: TourismListing;
  onViewDetails: (listing: TourismListing) => void;
  onEnquire: (listing: TourismListing) => void;
}

const CATEGORY_NAMES: Record<string, string> = {
  water_sports: 'Marine & Scuba',
  fort: 'Sea Fort Heritage',
  homestay: 'Coastal Farmstay',
  culture: 'Artisanal Craft',
  nature: 'Nature & Wildlife',
  food: 'Malvani Culinary'
};

export const TourismCard: React.FC<TourismCardProps> = ({
  listing,
  onViewDetails,
  onEnquire
}) => {
  return (
    <div className="group bg-white rounded-2xl border border-sand-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Image */}
      <div
        className="relative aspect-[16/10] w-full overflow-hidden bg-sand-100 cursor-pointer"
        onClick={() => onViewDetails(listing)}
      >
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3">
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-sm text-ocean-950 shadow-xs">
            {CATEGORY_NAMES[listing.category] || listing.category}
          </span>
        </div>

        {/* Demo Tag */}
        <div className="absolute top-3 right-3">
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/90 text-white shadow-xs">
            Demo Experience
          </span>
        </div>

        {/* Location & Duration */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1 font-semibold">
            <MapPin className="w-3.5 h-3.5 text-mango-400" />
            <span>{listing.locationTaluka} Taluka</span>
          </div>
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded">
            <Clock className="w-3 h-3 text-teal-300" />
            <span>{listing.duration}</span>
          </div>
        </div>
      </div>

      {/* Body Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Provider and Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="truncate max-w-[170px] text-teal-800 font-medium">
              {listing.providerName || 'Certified Local Guide'}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-mango-400 text-mango-500" />
              <span className="font-bold text-slate-800">{listing.rating}</span>
              <span className="text-slate-400">({listing.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => onViewDetails(listing)}
            className="text-base font-bold text-slate-900 group-hover:text-ocean-900 transition-colors cursor-pointer line-clamp-2 leading-snug"
          >
            {listing.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-600 line-clamp-2 mt-1">
            {listing.description}
          </p>

          {/* Top 2 Highlights */}
          <div className="mt-3 space-y-1">
            {listing.highlights.slice(0, 2).map((h, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-600">
                <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-sand-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-xs text-slate-500 block">Indicative starting</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-ocean-950 font-serif">
                {formatINR(listing.priceIndicativeInr)}
              </span>
              <span className="text-[11px] text-slate-500">
                /{listing.priceLabel}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onViewDetails(listing)}
              className="px-2.5 py-2 rounded-xl text-xs font-semibold text-ocean-900 bg-sand-100 hover:bg-sand-200 transition-colors"
            >
              Details
            </button>
            <button
              onClick={() => onEnquire(listing)}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-white bg-ocean-900 hover:bg-ocean-800 flex items-center gap-1 shadow-xs transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-mango-400" />
              <span>Enquire</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
