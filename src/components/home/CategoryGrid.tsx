import React from 'react';
import {
  Sun,
  Hammer,
  Wine,
  Flame,
  Nut,
  Waves,
  Shield,
  Home,
  ArrowUpRight
} from 'lucide-react';

interface CategoryGridProps {
  onSelectCategory: (categorySlug: string) => void;
  onSelectTourism: () => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  onSelectCategory,
  onSelectTourism
}) => {
  const categories = [
    {
      title: 'Devgad Alphonso Mangoes',
      subtitle: 'GI-certified natural straw-ripened Hapus and pulp',
      taluka: 'Devgad Taluka',
      slug: 'alphonso-mangoes',
      isTourism: false
    },
    {
      title: 'Sawantwadi Royal Woodcraft',
      subtitle: '300-year Chitari lacquerware & Ganjifa card art',
      taluka: 'Sawantwadi Taluka',
      slug: 'wooden-handicrafts',
      isTourism: false
    },
    {
      title: 'Wild Harvest Kokum & Agal',
      subtitle: 'Concentrated natural Garcinia extract with rock salt',
      taluka: 'Malvan Taluka',
      slug: 'kokum-beverages',
      isTourism: false
    },
    {
      title: 'Stone-Ground Malvani Masalas',
      subtitle: 'Slow-roasted blends featuring wild Tirphal pepper',
      taluka: 'Malvan Taluka',
      slug: 'malvani-masalas',
      isTourism: false
    },
    {
      title: 'Vengurla Coastal Cashews',
      subtitle: 'Grade W210 whole crunchy nuts from red laterite soil',
      taluka: 'Vengurla Taluka',
      slug: 'cashews',
      isTourism: false
    },
    {
      title: 'Marine Reef & Scuba Expeditions',
      subtitle: 'PADI-supervised dive trails around protected Malvan waters',
      taluka: 'Tarkarli, Malvan',
      slug: 'water_sports',
      isTourism: true
    },
    {
      title: 'Historic Maratha Fort Trails',
      subtitle: 'Island ferry passage to Sindhudurg & Vijaydurg ramparts',
      taluka: 'Kurte Island',
      slug: 'fort',
      isTourism: true
    },
    {
      title: 'Heritage Coastal Homestays',
      subtitle: 'Verandah farmstays with traditional Malvani chulha dining',
      taluka: 'Devgad & Mithbav',
      slug: 'homestay',
      isTourism: true
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-sand-200">
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-800 block">
              Curated Directory
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-ocean-950 font-serif">
              Regional Provenance &amp; Living Crafts
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md font-light leading-relaxed">
            Every listing is certified to its originating taluka, safeguarding genuine GI intellectual property and indigenous Konkan traditions.
          </p>
        </div>

        {/* Clean Editorial 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-sand-200 border-b border-sand-200">
          {categories.map((cat, idx) => (
            <div
              key={cat.title}
              onClick={() => {
                if (cat.isTourism) {
                  onSelectTourism();
                } else {
                  onSelectCategory(cat.slug);
                }
              }}
              className="group p-6 lg:p-7 hover:bg-sand-50/80 transition-colors duration-150 cursor-pointer flex flex-col justify-between min-h-[190px]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>0{idx + 1}</span>
                  <span className="text-teal-800 font-medium group-hover:text-ocean-900 transition-colors">
                    {cat.taluka}
                  </span>
                </div>

                <h3 className="text-base font-bold text-ocean-950 font-serif leading-snug group-hover:text-ocean-700 transition-colors">
                  {cat.title}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed font-light">
                  {cat.subtitle}
                </p>
              </div>

              <div className="pt-4 flex items-center justify-end">
                <div className="w-7 h-7 rounded-full bg-sand-100 group-hover:bg-ocean-900 group-hover:text-white flex items-center justify-center text-slate-600 transition-all duration-150">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
