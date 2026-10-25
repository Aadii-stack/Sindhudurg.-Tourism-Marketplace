import React from 'react';
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  MapPin,
  Waves,
  ShoppingBag
} from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';

interface HeroSectionProps {
  onExploreProducts: () => void;
  onExploreTourism: () => void;
  onSelectCategory: (categorySlug: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProducts,
  onExploreTourism,
  onSelectCategory
}) => {
  const { searchQuery, setSearchQuery } = useMarketplace();

  const quickPills = [
    { label: '🥭 Devgad Hapus', slug: 'alphonso-mangoes', isProduct: true },
    { label: '🤿 Tarkarli Scuba', slug: 'water_sports', isProduct: false },
    { label: '🪵 Wooden Toys', slug: 'wooden-handicrafts', isProduct: true },
    { label: '🍷 Wild Kokum Agal', slug: 'kokum-beverages', isProduct: true },
    { label: '🏰 Sindhudurg Fort', slug: 'fort', isProduct: false },
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
      {/* Background Subtle Gradient & Accents */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-ocean-100/60 via-sand-50/70 to-sand-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & CTA (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Regional Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand-100/90 border border-sand-300 text-ocean-900 text-xs font-semibold shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-mango-500 animate-pulse" />
              <span>Maharashtra&apos;s First Tourism District</span>
              <span className="text-slate-400">•</span>
              <span className="text-teal-700 font-bold">Sindhudurg</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ocean-950 font-serif tracking-tight leading-[1.15]">
              Discover the <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean-900 via-teal-800 to-mango-600">
                Soul of Sindhudurg.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Shop Konkan&apos;s authentic local treasures—naturally ripened Devgad Alphonso mangoes, centuries-old Sawantwadi wooden crafts, pure Kokum agal—and discover unforgettable coastal sea fort experiences.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreProducts}
                className="px-6 py-3.5 rounded-xl bg-ocean-900 hover:bg-ocean-800 text-white font-semibold text-sm sm:text-base shadow-lg shadow-ocean-900/15 flex items-center gap-2 group transition-all"
              >
                <ShoppingBag className="w-5 h-5 text-mango-400" />
                <span>Shop Local Treasures</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreTourism}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-sand-100 text-ocean-950 border border-sand-300 font-semibold text-sm sm:text-base shadow-sm flex items-center gap-2 transition-all"
              >
                <Compass className="w-5 h-5 text-teal-600" />
                <span>Explore Tourism</span>
              </button>
            </div>

            {/* Quick Keyword Search Tags */}
            <div className="pt-4 space-y-2">
              <span className="text-xs font-medium text-slate-500 block">
                Popular in Sindhudurg:
              </span>
              <div className="flex flex-wrap gap-2">
                {quickPills.map((pill) => (
                  <button
                    key={pill.slug}
                    onClick={() => {
                      if (pill.isProduct) {
                        onSelectCategory(pill.slug);
                        onExploreProducts();
                      } else {
                        onExploreTourism();
                      }
                    }}
                    className="text-xs px-3 py-1.5 rounded-lg bg-white/90 hover:bg-sand-100 text-slate-700 border border-sand-200 shadow-xs transition-colors"
                  >
                    {pill.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-sand-200 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-mango-600 shrink-0" />
                <span>100% GI Tagged Devgad Hapus</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Zero Middleman Exploitation</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Waves className="w-4 h-4 text-ocean-600 shrink-0" />
                <span>PADI Certified Scuba Guides</span>
              </div>
            </div>

          </div>

          {/* Right Visual Image Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Primary Image Card: Sindhudurg Sea Fort / Coastal Coast */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 aspect-[4/5] group">
                <img
                  src="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80"
                  alt="Sindhudurg Coastal Waters & Sea Fort"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/80 via-transparent to-black/20" />
                
                {/* Overlay Text */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-mango-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    Sindhudurg Fort • 1664 CE
                  </span>
                  <h3 className="text-xl font-bold font-serif leading-tight">
                    Chhatrapati Shivaji Maharaj&apos;s Maratha Sea Stronghold
                  </h3>
                  <p className="text-xs text-slate-200 line-clamp-2">
                    Surrounded by pristine coral shoals and tranquil azure waters of Malvan.
                  </p>
                </div>
              </div>

              {/* Floating Badge Card 1: Alphonso Box */}
              <div className="absolute -bottom-6 -left-6 sm:-left-8 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-sand-200 max-w-[210px] hidden sm:flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=150&q=80"
                  alt="Devgad Alphonso"
                  className="w-12 h-12 rounded-xl object-cover shrink-0"
                />
                <div>
                  <span className="text-[10px] uppercase font-bold text-mango-600 block">
                    Fresh Harvest
                  </span>
                  <p className="text-xs font-bold text-slate-800 leading-tight">
                    Devgad Grade A Hapus
                  </p>
                  <p className="text-[11px] text-teal-700 font-semibold">
                    ₹1,250 / dozen
                  </p>
                </div>
              </div>

              {/* Floating Badge Card 2: Scuba Diving */}
              <div className="absolute -top-6 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-sand-200 hidden sm:flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700">
                  <Waves className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-ocean-950">
                    Tarkarli Scuba
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium">
                    Certified Dive Masters
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
