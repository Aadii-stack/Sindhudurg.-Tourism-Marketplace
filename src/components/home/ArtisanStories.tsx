import React from 'react';
import { CheckCircle2, Star, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';

interface ArtisanStoriesProps {
  onSelectSeller?: (sellerId: string) => void;
}

export const ArtisanStories: React.FC<ArtisanStoriesProps> = ({ onSelectSeller }) => {
  const { sellers } = useMarketplace();

  return (
    <section className="py-16 sm:py-20 bg-sand-50/50 border-t border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-mango-600 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Voices of the Konkan Soil
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ocean-950 font-serif tracking-tight">
            Meet the Artisans & Guides
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            The passionate families and cooperatives keeping Sindhudurg&apos;s rich agricultural, handicraft, and maritime legacy alive.
          </p>
        </div>

        {/* Sellers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sellers.map((seller) => (
            <div
              key={seller.id}
              className="group bg-white rounded-3xl border border-sand-200 p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Photo & Badge */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-sand-100 mb-4">
                  <img
                    src={seller.avatarUrl}
                    alt={seller.ownerName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-bold text-teal-800 flex items-center gap-1 shadow-xs">
                    <CheckCircle2 className="w-3 h-3 text-teal-600" />
                    Verified
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 bg-slate-900/80 backdrop-blur-sm px-2 py-0.5 rounded-md text-[10px] font-semibold text-white flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-teal-400" />
                    {seller.taluka} Taluka
                  </div>
                </div>

                {/* Seller info */}
                <h3 className="text-base font-bold text-ocean-950 font-serif leading-snug">
                  {seller.businessName}
                </h3>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">
                  Lead: {seller.ownerName}
                </p>

                {/* Specialty */}
                <p className="text-xs text-teal-800 font-semibold bg-teal-50 px-2 py-1 rounded-lg mt-2 inline-block">
                  {seller.specialty}
                </p>

                {/* Story */}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mt-2">
                  &ldquo;{seller.story}&rdquo;
                </p>
              </div>

              {/* Rating and review count */}
              <div className="pt-3 border-t border-sand-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-mango-400 text-mango-500" />
                  <span className="font-bold text-slate-900">{seller.rating}</span>
                  <span>({seller.reviewsCount} reviews)</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
