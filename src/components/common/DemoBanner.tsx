import React from 'react';
import { UserCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export const DemoBanner: React.FC = () => {
  const { role, switchDemoRole } = useAuth();

  return (
    <aside aria-label="Role Bar" className="bg-ocean-950 text-slate-200 text-xs py-2 px-4 border-b border-ocean-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Clean Professional Regional Tagline */}
        <div className="flex items-center gap-2 text-slate-300">
          <span className="font-semibold text-white">Sindhudurg District Marketplace</span>
          <span className="hidden sm:inline text-slate-500">•</span>
          <span className="hidden sm:inline text-slate-400">Konkan Coastal Treasures & Tourism</span>
        </div>

        {/* Right: Quick Role Switcher for seamless evaluation */}
        <div className="flex items-center gap-1.5 ml-auto">
          <span className="text-slate-400 hidden sm:inline flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5 text-mango-400" />
            Persona:
          </span>
          {(['customer', 'seller', 'admin'] as UserRole[]).map(r => (
            <button
              key={r}
              onClick={() => switchDemoRole(r)}
              className={`px-2.5 py-0.5 rounded transition-all capitalize text-[11px] ${
                role === r
                  ? 'bg-mango-500 text-slate-950 font-bold shadow-xs'
                  : 'bg-ocean-900 text-slate-300 hover:bg-ocean-800'
              }`}
            >
              {r === 'customer' ? 'Tourist' : r}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};
