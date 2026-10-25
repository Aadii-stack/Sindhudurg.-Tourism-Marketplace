import React from 'react';
import {
  MapPin,
  Clock,
  Star,
  Check,
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
  water_sports: 'Marine Expeditions',
  fort: 'Historic Fort Bastions',
  homestay: 'Coastal Farmstay',
  culture: 'Royal Art & Craft',
  nature: 'Wildlife & Dolphin Safari',
  food: 'Malvani Culinary'
};

export const TourismCard: React.FC<TourismCardProps> = ({
  listing,
  onViewDetails,
  onEnquire
}) => {
  return (
    <article className="group bg-white rounded-2xl border border-sand-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Image Canvas */}
      <div
        className="relative aspect-[16/10] w-full overflow-hidden bg-sand-100 cursor-pointer"
        onClick={() => onViewDetails(listing)}
      >
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/75 via-transparent to-transparent" />

        {/* Category Pill */}
        <div className="absolute top-3.5 left-3.5">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-sm text-ocean-950 shadow-2xs">
            {CATEGORY_NAMES[listing.category] || listing.category}
          </span>
        </div>

        {/* Location & Duration Overlay */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1 font-medium">
            <MapPin className="w-3.5 h-3.5 text-mango-400" />
            <span>{listing.locationTaluka} Taluka</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-200">
            <Clock className="w-3 h-3 text-teal-300" />
            <span>{listing.duration}</span>
          </div>
        </div>
      </div>

      {/* Body Information */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Guide & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="truncate max-w-[170px] text-teal-800 font-medium">
              {listing.providerName || 'Certified Guide'}
            </span>
            <div className="flex items-center gap-1 text-slate-700">
              <Star className="w-3 h-3 fill-mango-400 text-mango-500" />
              <span className="font-bold text-slate-800">{listing.rating}</span>
              <span className="text-slate-400 font-light">({listing.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => onViewDetails(listing)}
            className="text-base font-bold text-ocean-950 group-hover:text-ocean-700 transition-colors cursor-pointer line-clamp-2 leading-snug font-serif"
          >
            {listing.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-600 line-clamp-2 font-light leading-relaxed">
            {listing.description}
          </p>

          {/* Key Highlights */}
          <div className="mt-3 space-y-1.5 pt-1">
            {listing.highlights.slice(0, 2).map((h, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                <Check className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & Reservation Row */}
        <div className="pt-3 border-t border-sand-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
              Tariff
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-ocean-950 font-serif">
                {formatINR(listing.priceIndicativeInr)}
              </span>
              <span className="text-[11px] text-slate-500 font-light">
                /{listing.priceLabel}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onViewDetails(listing)}
              className="px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:text-ocean-900 hover:bg-sand-100 transition-colors"
            >
              Details
            </button>
            <button
              onClick={() => onEnquire(listing)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-ocean-900 hover:bg-ocean-800 flex items-center gap-1.5 shadow-xs transition-all duration-150 active:scale-95"
            >
              <Send className="w-3.5 h-3.5 text-mango-400" />
              <span>Enquire</span>
            </button>
          </div>
        </div>

      </div>

    </article>
  );
};
