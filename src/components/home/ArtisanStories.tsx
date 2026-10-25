import React from 'react';
import { CheckCircle2, Star, MapPin } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';

interface ArtisanStoriesProps {
  onSelectSeller?: (sellerId: string) => void;
}

export const ArtisanStories: React.FC<ArtisanStoriesProps> = ({ onSelectSeller }) => {
  const { sellers } = useMarketplace();

  return (
    <section className="py-20 sm:py-24 bg-sand-50/60 border-b border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2.5">
            <span className="w-5 h-[1px] bg-mango-600" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-mango-700">
              Living Heritage Practitioners
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ocean-950 font-serif tracking-tight">
            Meet the Artisans &amp; Navigators
          </h2>
          <p className="text-sm text-slate-500 font-light leading-relaxed">
            The multi-generational families and self-help collectives anchoring Sindhudurg&apos;s agrarian and maritime sovereignty.
          </p>
        </div>

        {/* Sellers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sellers.map((seller) => (
            <article
              key={seller.id}
              onClick={() => onSelectSeller && onSelectSeller(seller.id)}
              className="group bg-white rounded-2xl border border-sand-200/90 p-5 shadow-2xs hover:shadow-lg card-hover-lift flex flex-col justify-between space-y-4 cursor-pointer"
            >
              <div className="space-y-3.5">
                {/* Photo with subtle border */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-sand-100">
                  <img
                    src={seller.avatarUrl}
                    alt={seller.ownerName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-teal-800 flex items-center gap-1 shadow-2xs">
                    <CheckCircle2 className="w-3 h-3 text-teal-600" />
                    Verified
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 bg-ocean-950/80 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-medium text-white flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-mango-400" />
                    {seller.taluka} Taluka
                  </div>
                </div>

                {/* Seller info */}
                <div>
                  <h3 className="text-base font-bold text-ocean-950 font-serif leading-snug group-hover:text-ocean-700 transition-colors">
                    {seller.businessName}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    Led by: {seller.ownerName}
                  </p>
                </div>

                {/* Specialty */}
                <span className="text-[11px] font-medium text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 inline-block">
                  {seller.specialty}
                </span>

                {/* Story Quote */}
                <p className="text-xs text-slate-600 leading-relaxed font-light line-clamp-3 italic">
                  &ldquo;{seller.story}&rdquo;
                </p>
              </div>

              {/* Rating */}
              <div className="pt-3 border-t border-sand-100 flex items-center justify-between text-xs text-slate-500 font-light">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-mango-400 text-mango-500" />
                  <span className="font-bold text-slate-800">{seller.rating}</span>
                  <span>({seller.reviewsCount} reviews)</span>
                </div>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
