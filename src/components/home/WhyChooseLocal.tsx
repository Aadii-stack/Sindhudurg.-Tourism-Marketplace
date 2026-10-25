import React from 'react';
import { ShieldCheck, HeartHandshake, Leaf, Anchor, ArrowRight } from 'lucide-react';

interface WhyChooseLocalProps {
  onLearnMore: () => void;
}

export const WhyChooseLocal: React.FC<WhyChooseLocalProps> = ({ onLearnMore }) => {
  const pillars = [
    {
      icon: HeartHandshake,
      title: 'Direct Farmer & Artisan Prosperity',
      description: 'Eliminates predatory commercial middlemen layers, ensuring up to 85% of each sale flows directly into rural household economies in Devgad and Sawantwadi.',
      accent: 'text-mango-600 bg-mango-50 border-mango-200'
    },
    {
      icon: ShieldCheck,
      title: 'Protected GI-Tag Authenticity',
      description: 'Counterfeiting is prevalent in urban markets. Every Alphonso box and wooden craft is tracked to verified soil in Sindhudurg under Geographical Indication regulations.',
      accent: 'text-teal-700 bg-teal-50 border-teal-200'
    },
    {
      icon: Leaf,
      title: 'Zero Chemical Ripening Agents',
      description: 'Naturally straw-ripened Alphonso mangoes and wild-harvested Kokum agal with rock salt. Free from harmful calcium carbide gases and synthetic preservatives.',
      accent: 'text-emerald-700 bg-emerald-50 border-emerald-200'
    },
    {
      icon: Anchor,
      title: 'Eco-Certified Marine Tourism',
      description: 'Our licensed scuba operators adhere to reef preservation protocols around Malvan marine sanctuaries, empowering coastal boatmen with sustainable livelihoods.',
      accent: 'text-ocean-700 bg-ocean-50 border-ocean-200'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-700">
            Conscious Commerce & Heritage
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ocean-950 font-serif tracking-tight">
            Why Choose Local Sindhudurg?
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Every mango ordered and every sea fort tour booked sustains a centuries-old Konkan community tradition.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-sand-50/70 border border-sand-200 space-y-4 hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${item.accent}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-ocean-950 font-serif leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Highlight Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-ocean-950 to-teal-950 p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-bold font-serif">
              Are you a local producer, homestay host, or boat guide?
            </h4>
            <p className="text-xs text-slate-300">
              Join the Sindhudurg digital initiative to list your harvest and tours with zero onboarding friction.
            </p>
          </div>
          <button
            onClick={onLearnMore}
            className="px-6 py-3 rounded-xl bg-mango-500 hover:bg-mango-400 text-slate-950 font-bold text-xs shadow-md transition-colors whitespace-nowrap"
          >
            Explore Seller Portal
          </button>
        </div>

      </div>
    </section>
  );
};
