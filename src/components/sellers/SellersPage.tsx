import React from 'react';
import { CheckCircle2, Star, MapPin, Phone, Mail, Award, Store, Shield } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';

interface SellersPageProps {
  onBrowseSellerProducts: (sellerId: string) => void;
}

export const SellersPage: React.FC<SellersPageProps> = ({ onBrowseSellerProducts }) => {
  const { sellers, products } = useMarketplace();

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Editorial Header */}
      <div className="border-b border-sand-200/90 pb-8 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono uppercase tracking-widest text-slate-500">
          <span className="flex items-center gap-1.5">
            <Store className="w-3.5 h-3.5 text-mango-600" />
            Sindhudurg Cooperative Registry
          </span>
          <span>Direct Producer Guild • Fair Compensation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-ocean-950 tracking-tight">
          Artisans, Cultivators & Expedition Guides
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
          Every provider is a verified local resident, orchard owner, or MTDC/PADI recognized dive master operating directly within the talukas of Sindhudurg.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sellers.map((s) => {
          const sellerProducts = products.filter((p) => p.sellerId === s.id);
          return (
            <div
              key={s.id}
              className="bg-white rounded-3xl border border-sand-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              {/* Banner */}
              <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                <img
                  src={s.bannerUrl || 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=1200&q=80'}
                  alt={s.businessName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-white text-xs font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-teal-400" />
                  <span>{s.taluka} Taluka, Sindhudurg</span>
                </div>
              </div>

              {/* Profile Card Info */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={s.avatarUrl}
                        alt={s.ownerName}
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md -mt-10"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-lg text-ocean-950 font-serif">
                            {s.businessName}
                          </h3>
                          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                        </div>
                        <p className="text-xs text-slate-500">Representative: {s.ownerName}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs">
                      <Star className="w-4 h-4 fill-mango-400 text-mango-500" />
                      <span className="font-bold text-slate-800">{s.rating}</span>
                      <span className="text-slate-400">({s.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Specialty */}
                  <div className="mt-3">
                    <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
                      {s.specialty}
                    </span>
                  </div>

                  {/* Story */}
                  <p className="text-xs text-slate-600 leading-relaxed mt-3">
                    &ldquo;{s.story}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-sand-100 text-xs text-slate-500 space-y-2">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{s.address}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{s.phone}</span>
                    <span className="text-slate-300">•</span>
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{s.email}</span>
                  </p>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
