import React from 'react';
import { Compass, ShieldCheck, Heart, MapPin, Mail, Phone } from 'lucide-react';
import { Taluka } from '../../types';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onSelectTaluka?: (taluka: string) => void;
}

const TALUKAS: Taluka[] = [
  'Devgad',
  'Malvan',
  'Sawantwadi',
  'Vengurla',
  'Kudal',
  'Kankavli',
  'Dodamarg',
  'Vaibhavwadi'
];

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onSelectTaluka }) => {
  return (
    <footer className="bg-ocean-950 text-slate-300 pt-16 pb-12 border-t border-ocean-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-ocean-900/80">
          
          {/* Brand & Mission (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-mango-500/10 border border-mango-500/30 flex items-center justify-center text-mango-400">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-serif">
                Sindhudurg<span className="text-mango-400">.</span>
              </span>
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              A community-first economic bridge empowering local Konkan farmers, master woodcraft artisans, certified marine scuba divers, and eco-homestays in Sindhudurg, Maharashtra.
            </p>

            <div className="flex flex-col gap-2 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Sindhudurg District, Konkan Division, Maharashtra 416812</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>contact@sindhudurg-marketplace.demo.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span>+91 (02362) 228-800 / Toll Free: 1800-KONKAN</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-slate-100 font-sans">
              Marketplace
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <button
                  onClick={() => setActiveTab('products')}
                  className="hover:text-mango-300 transition-colors"
                >
                  Devgad Alphonso Mangoes
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('products')}
                  className="hover:text-mango-300 transition-colors"
                >
                  Sawantwadi Wooden Toys
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('products')}
                  className="hover:text-mango-300 transition-colors"
                >
                  Wild Kokum & Agal Extract
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('products')}
                  className="hover:text-mango-300 transition-colors"
                >
                  Malvani Stone-Ground Spices
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('products')}
                  className="hover:text-mango-300 transition-colors"
                >
                  Vengurla Jumbo Cashews
                </button>
              </li>
            </ul>
          </div>

          {/* Tourism & Travel */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-slate-100 font-sans">
              Experiences
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <button
                  onClick={() => setActiveTab('tourism')}
                  className="hover:text-teal-300 transition-colors"
                >
                  Tarkarli Coral Reef Scuba
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('tourism')}
                  className="hover:text-teal-300 transition-colors"
                >
                  Sindhudurg Sea Fort Trail
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('tourism')}
                  className="hover:text-teal-300 transition-colors"
                >
                  Sawantwadi Lacquer Workshop
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('tourism')}
                  className="hover:text-teal-300 transition-colors"
                >
                  Coastal Farm Homestays
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('tourism')}
                  className="hover:text-teal-300 transition-colors"
                >
                  Dolphin Watch at Vengurla
                </button>
              </li>
            </ul>
          </div>

          {/* Talukas of Sindhudurg */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-slate-100 font-sans">
              District Talukas
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {TALUKAS.map((taluka) => (
                <button
                  key={taluka}
                  onClick={() => {
                    if (onSelectTaluka) onSelectTaluka(taluka);
                    setActiveTab('products');
                  }}
                  className="text-[11px] px-2.5 py-1 rounded bg-ocean-900/90 text-slate-300 hover:text-white hover:bg-ocean-800 transition-colors border border-ocean-800"
                >
                  {taluka}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 pt-2">
              All 8 talukas represented with verified native geographic provenance.
            </p>
          </div>
        </div>

        {/* Academic ED Disclaimer Box */}
        <div className="my-8 p-4 rounded-xl bg-ocean-900/40 border border-ocean-800/80 text-xs text-slate-400 space-y-1">
          <div className="flex items-center gap-1.5 text-mango-400 font-semibold text-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>Academic Entrepreneurship Development (ED) Project Disclaimer</span>
          </div>
          <p>
            This web application is developed as an educational prototype for the Entrepreneurship Development (ED) course. Product listings, prices, tourism providers, and checkout flows are demonstration data designed to showcase digital transformation opportunities for Sindhudurg&apos;s local economy. No actual financial transactions are processed.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Sindhudurg Tourism & Marketplace. Built with React, Tailwind & Local JSON Engine.
          </p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Preserving Konkan Heritage with</span>
            <Heart className="w-3.5 h-3.5 text-kokum-500 inline fill-kokum-500" />
            <span>in Maharashtra</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
