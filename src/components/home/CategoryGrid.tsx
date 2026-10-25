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
  ArrowRight
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
      subtitle: 'GI Tagged Natural Hapus',
      icon: Sun,
      iconColor: 'text-mango-500 bg-mango-50',
      badge: 'Farm Direct',
      slug: 'alphonso-mangoes',
      isTourism: false
    },
    {
      title: 'Sawantwadi Wooden Craft',
      subtitle: '300-Yr Royal Chitari Toys',
      icon: Hammer,
      iconColor: 'text-amber-600 bg-amber-50',
      badge: 'GI Craft',
      slug: 'wooden-handicrafts',
      isTourism: false
    },
    {
      title: 'Wild Kokum & Agal',
      subtitle: 'Solkadhi & Herbal Syrups',
      icon: Wine,
      iconColor: 'text-kokum-700 bg-kokum-50',
      badge: 'Pure Extract',
      slug: 'kokum-beverages',
      isTourism: false
    },
    {
      title: 'Malvani Masalas & Pantry',
      subtitle: 'Tirphal Spices & Red Rice',
      icon: Flame,
      iconColor: 'text-orange-600 bg-orange-50',
      badge: 'Stone Ground',
      slug: 'malvani-masalas',
      isTourism: false
    },
    {
      title: 'Vengurla Jumbo Cashews',
      subtitle: 'W180 & W240 Coastal Nuts',
      icon: Nut,
      iconColor: 'text-emerald-700 bg-emerald-50',
      badge: 'Dry Roasted',
      slug: 'cashews',
      isTourism: false
    },
    {
      title: 'Tarkarli Scuba & Watersports',
      subtitle: 'Coral Reefs & Dolphin Safari',
      icon: Waves,
      iconColor: 'text-teal-600 bg-teal-50',
      badge: 'PADI Certified',
      slug: 'water_sports',
      isTourism: true
    },
    {
      title: 'Historic Sea Fort Trails',
      subtitle: 'Sindhudurg & Vijaydurg Ramparts',
      icon: Shield,
      iconColor: 'text-ocean-700 bg-ocean-50',
      badge: 'Heritage',
      slug: 'fort',
      isTourism: true
    },
    {
      title: 'Konkan Coastal Homestays',
      subtitle: 'Farm Stays & Malvani Dining',
      icon: Home,
      iconColor: 'text-indigo-700 bg-indigo-50',
      badge: 'Eco Living',
      slug: 'homestay',
      isTourism: true
    }
  ];

  return (
    <section className="py-12 bg-white border-y border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">
              Explore By Heritage Category
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-ocean-950 font-serif mt-1">
              Sindhudurg&apos;s Signature Specialties
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm">
            Hand-curated local treasures and eco-tourism activities straight from verified taluka artisans and licensed guides.
          </p>
        </div>

        {/* 4x2 Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                onClick={() => {
                  if (cat.isTourism) {
                    onSelectTourism();
                  } else {
                    onSelectCategory(cat.slug);
                  }
                }}
                className="group relative p-4 sm:p-5 rounded-2xl bg-sand-50/70 hover:bg-white border border-sand-200 hover:border-ocean-300 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cat.iconColor} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sand-200/60 text-slate-700">
                      {cat.badge}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-ocean-900 transition-colors leading-snug">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                    {cat.subtitle}
                  </p>
                </div>

                <div className="pt-3 mt-2 border-t border-sand-200/60 flex items-center justify-between text-xs font-semibold text-ocean-700 group-hover:text-ocean-900">
                  <span>{cat.isTourism ? 'View Experience' : 'Browse Products'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
