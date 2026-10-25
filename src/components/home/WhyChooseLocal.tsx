import React from 'react';
import { ShieldCheck, HeartHandshake, Leaf, Anchor, ArrowRight } from 'lucide-react';

interface WhyChooseLocalProps {
  onLearnMore: () => void;
}

export const WhyChooseLocal: React.FC<WhyChooseLocalProps> = ({ onLearnMore }) => {
  const pillars = [
    {
      label: 'Direct Agricultural Equity',
      heading: '85% Value Retention by Village Households',
      description: 'Traditional urban agricultural distribution chains absorb up to 50% in distributor margins. Direct patron connectivity ensures fair living wages for coastal orchardists in Devgad and spice growers in Malvan.'
    },
    {
      label: 'Geographical Indication Protection',
      heading: 'Defending Centuries-Old Provenance',
      description: 'Devgad Alphonso and Sawantwadi Lacquerware hold legally protected GI status. Purchasing directly preserves traditional grafting knowledge and prevents synthetic counterfeits from degrading the heritage.'
    },
    {
      label: 'Organic Purity & Natural Ripening',
      heading: 'Zero Calcium Carbide Gas',
      description: 'Commercial brokers artificially force ripening with hazardous chemical agents. Konkan producers rely on traditional hay bedding and tree ripening for safe, fragrant, unadulterated fruit.'
    },
    {
      label: 'Regenerative Marine Stewardship',
      heading: 'Empowering Certified Local Navigators',
      description: 'Tarkarli and Malvan boatmen operate licensed, low-impact expeditions committed to coral reef preservation, marine safety, and respectful engagement with historic Maratha sea bastions.'
    }
  ];

  return (
    <section className="py-20 sm:py-24 bg-white border-b border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-5 h-[1px] bg-teal-800" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-800">
              Community Mandate &amp; Stewardship
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ocean-950 font-serif tracking-tight leading-tight">
            Why Local Provenance Matters in Sindhudurg.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
            Every mango crate dispatched, wooden toy carved, and diving excursion guided directly sustains an indigenous coastal ecology and preserves living history.
          </p>
        </div>

        {/* 4 Pillars in Clean 2x2 Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-sand-50/70 border border-sand-200/80 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-teal-800 font-bold block">
                  Pillar 0{idx + 1} • {item.label}
                </span>
                <h3 className="text-lg font-bold text-ocean-950 font-serif leading-snug">
                  {item.heading}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light pt-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quiet Patron Callout */}
        <div className="p-8 rounded-2xl bg-ocean-950 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <h4 className="text-lg font-bold font-serif">
              Represent a Konkan agricultural collective or marine guild?
            </h4>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              Register verified orchard harvests or coastal expeditions directly through the local cooperative portal.
            </p>
          </div>
          <button
            onClick={onLearnMore}
            className="px-5 py-3 rounded-xl bg-white hover:bg-sand-100 text-ocean-950 font-semibold text-xs tracking-wide transition-all duration-150 active:scale-95 shrink-0"
          >
            Access Producer Portal
          </button>
        </div>

      </div>
    </section>
  );
};
