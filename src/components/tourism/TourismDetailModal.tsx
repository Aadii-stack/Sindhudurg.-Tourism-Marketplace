import React from 'react';
import {
  MapPin,
  Clock,
  Star,
  CheckCircle2,
  Shield,
  Send,
  Calendar,
  Compass,
  AlertCircle
} from 'lucide-react';
import { TourismListing } from '../../types';
import { formatINR } from '../../lib/utils';
import { Modal } from '../common/Modal';

interface TourismDetailModalProps {
  listing: TourismListing | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenEnquiry: (listing: TourismListing) => void;
}

export const TourismDetailModal: React.FC<TourismDetailModalProps> = ({
  listing,
  isOpen,
  onClose,
  onOpenEnquiry
}) => {
  if (!listing) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="3xl">
      <div className="space-y-6">
        
        {/* Hero Image */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 border border-sand-200">
          <img
            src={listing.imageUrl}
            alt={listing.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-mango-500 text-slate-950 inline-block mb-1">
              {listing.locationTaluka} Taluka • {listing.duration}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif leading-tight">
              {listing.title}
            </h2>
          </div>
        </div>

        {/* Overview Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-sand-50 rounded-2xl border border-sand-200 text-xs text-slate-700">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Estimated Cost</span>
            <span className="font-bold text-ocean-950 text-sm">
              {formatINR(listing.priceIndicativeInr)} <span className="text-[11px] font-normal text-slate-500">/{listing.priceLabel}</span>
            </span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Duration</span>
            <span className="font-semibold text-slate-900">{listing.duration}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Location</span>
            <span className="font-semibold text-slate-900">{listing.locationTaluka} Taluka</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Rating</span>
            <div className="flex items-center gap-1 font-bold text-slate-900">
              <Star className="w-3.5 h-3.5 fill-mango-400 text-mango-500" />
              <span>{listing.rating} ({listing.reviewsCount} reviews)</span>
            </div>
          </div>
        </div>

        {/* Narrative Description */}
        <div className="space-y-2 text-sm text-slate-600 leading-relaxed">
          <h4 className="font-bold text-ocean-950 text-base font-serif">
            About This Experience
          </h4>
          <p>{listing.description}</p>
        </div>

        {/* Key Highlights Checklist */}
        {listing.highlights && listing.highlights.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-bold text-ocean-950 text-sm font-serif">
              Experience Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {listing.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 p-2 rounded-xl bg-sand-50/70 border border-sand-200/60">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* What's Included */}
        {listing.included && listing.included.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-bold text-ocean-950 text-sm font-serif">
              Included Amenities & Gear
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {listing.included.map((inc, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 font-medium"
                >
                  ✓ {inc}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Seasonal Advisory & Safety Protocol */}
        <div className="p-3.5 bg-sand-50 rounded-xl border border-sand-200 text-xs text-slate-700 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-ocean-950">Seasonal Coastal &amp; Maritime Advisory:</span>
            <p className="text-[11px] text-slate-500 leading-relaxed font-light">
              Marine conditions are subject to Arabian Sea tide cycles and MTDC coastal safety clearances. Advance enquiry confirms slot availability directly with certified local navigators.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-sand-200">
          <div>
            <span className="text-xs text-slate-500">Provider:</span>
            <p className="text-xs font-bold text-slate-800">
              {listing.providerName || 'Local Konkan Tourism Guild'}
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-sand-100 flex-1 sm:flex-initial"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenEnquiry(listing);
              }}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-ocean-900 hover:bg-ocean-800 flex items-center justify-center gap-2 shadow-md flex-1 sm:flex-initial"
            >
              <Send className="w-4 h-4 text-mango-400" />
              <span>Enquire / Book Experience</span>
            </button>
          </div>
        </div>

      </div>
    </Modal>
  );
};
