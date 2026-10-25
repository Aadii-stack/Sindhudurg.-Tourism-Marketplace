import React from 'react';
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  Award,
  MapPin,
  Waves,
  ShoppingBag
} from 'lucide-react';

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
  const curatedTags = [
    { label: 'Devgad Hapus (GI)', slug: 'alphonso-mangoes', isProduct: true },
    { label: 'Tarkarli Reef Diving', slug: 'water_sports', isProduct: false },
    { label: 'Sawantwadi Lacquerware', slug: 'wooden-handicrafts', isProduct: true },
    { label: 'Pure Kokum Agal', slug: 'kokum-beverages', isProduct: true },
    { label: 'Sindhudurg Bastions', slug: 'fort', isProduct: false },
  ];

  return (
    <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 bg-sand-50/70 border-b border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Editorial Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Architectural District Provenance */}
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-[1px] bg-ocean-900" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-ocean-900">
                Sindhudurg District • Konkan Coastline
              </span>
            </div>

            {/* Headline with Gravitas */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ocean-950 font-serif tracking-tight leading-[1.08]">
                Authentic Konkan Harvests &amp; Maritime Expeditions.
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
                Connecting discerning patrons directly with GI-certified Devgad orchardists, 300-year-old Sawantwadi royal lacquer guilds, and licensed Malvan coral reef navigators.
              </p>
            </div>

            {/* Dual Actions with Tactile States */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onExploreProducts}
                className="px-6 py-3.5 rounded-xl bg-ocean-900 hover:bg-ocean-800 active:scale-[0.98] text-white font-medium text-sm shadow-sm flex items-center gap-2.5 transition-all duration-150"
              >
                <ShoppingBag className="w-4 h-4 text-mango-400" />
                <span>Shop Regional Goods</span>
                <ArrowRight className="w-4 h-4 text-slate-300" />
              </button>

              <button
                onClick={onExploreTourism}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-sand-100 active:scale-[0.98] text-ocean-950 border border-sand-300 font-medium text-sm shadow-2xs flex items-center gap-2.5 transition-all duration-150"
              >
                <Compass className="w-4 h-4 text-teal-700" />
                <span>Discover Experiences</span>
              </button>
            </div>

            {/* Editorial Provenance Tags (Clean, No AI Emojis) */}
            <div className="pt-2 border-t border-sand-200/80 space-y-2.5">
              <span className="text-[11px] font-bold tracking-wider uppercase text-slate-500 block">
                Signature Provenance:
              </span>
              <div className="flex flex-wrap gap-2">
                {curatedTags.map((tag) => (
                  <button
                    key={tag.slug}
                    onClick={() => {
                      if (tag.isProduct) {
                        onSelectCategory(tag.slug);
                        onExploreProducts();
                      } else {
                        onExploreTourism();
                      }
                    }}
                    className="text-xs px-3 py-1.5 rounded-lg bg-white hover:bg-sand-100 hover:border-ocean-300 text-slate-700 border border-sand-200 transition-colors duration-150 font-medium"
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Institutional Credentials */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs text-slate-600">
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-ocean-800 shrink-0" />
                <span className="font-medium">Geographical Indication Protected</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
                <span className="font-medium">Direct Producer Collective</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Waves className="w-4 h-4 text-ocean-700 shrink-0" />
                <span className="font-medium">PADI Certified Guides</span>
              </div>
            </div>

          </div>

          {/* Right Visual Photographic Canvas (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative">
              
              {/* Main Architectural Visual */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-sand-300/80 bg-ocean-950 aspect-[4/5] group">
                <img
                  src="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80"
                  alt="Sindhudurg Fort Ramparts"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/85 via-ocean-950/20 to-transparent" />
                
                {/* Quiet Caption Plate */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-mango-400">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Kurte Island, Malvan</span>
                  </div>
                  <h3 className="text-xl font-bold font-serif leading-snug">
                    Sindhudurg Sea Fort (1664 CE)
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Engineering marvel of 44 basalt bastions founded directly in Arabian Sea bedrock.
                  </p>
                </div>
              </div>

              {/* Discreet Editorial Footnote Tag */}
              <div className="mt-3 text-right">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">
                  Archival Registry SDG-1664
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
