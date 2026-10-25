import React, { useState } from 'react';
import { Database, ShieldAlert, Sparkles, CheckCircle2, ChevronRight, UserCheck } from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabaseClient';
import { useAuth } from '../../context/AuthContext';
import { Modal } from './Modal';
import { UserRole } from '../../types';

export const DemoBanner: React.FC = () => {
  const [showConfigModal, setShowConfigModal] = useState(false);
  const { role, switchDemoRole, user } = useAuth();

  return (
    <>
      <aside aria-label="Demo notice" className="bg-ocean-950 text-slate-200 text-xs py-2 px-4 border-b border-ocean-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Project & Database status */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-ocean-800 text-ocean-100 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-mango-400" />
              ED Project Showcase
            </span>
            <span className="hidden sm:inline text-slate-400">•</span>
            <span className="hidden sm:inline text-slate-300">
              Demonstration Data for Sindhudurg Tourism & Marketplace
            </span>

            {isSupabaseConfigured ? (
              <span className="inline-flex items-center gap-1 text-teal-400 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-800">
                <CheckCircle2 className="w-3 h-3" />
                Supabase Connected
              </span>
            ) : (
              <button
                onClick={() => setShowConfigModal(true)}
                className="inline-flex items-center gap-1 text-mango-300 hover:text-mango-200 underline underline-offset-2 ml-1"
              >
                <Database className="w-3 h-3" />
                Demo Mode (Supabase Setup Guide)
              </button>
            )}
          </div>

          {/* Right: Quick Role Switcher for instant evaluator testing */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 hidden md:inline flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-mango-400" />
              Role:
            </span>
            {(['customer', 'seller', 'admin'] as UserRole[]).map(r => (
              <button
                key={r}
                onClick={() => switchDemoRole(r)}
                className={`px-2 py-0.5 rounded transition-all capitalize ${
                  role === r
                    ? 'bg-mango-500 text-slate-950 font-semibold shadow-sm'
                    : 'bg-ocean-900 text-slate-300 hover:bg-ocean-800'
                }`}
              >
                {r === 'customer' ? 'Tourist' : r}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Supabase Setup Modal */}
      <Modal
        isOpen={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        title="Supabase Database Configuration"
        subtitle="How to switch from Autonomous Demo Mode to live Supabase cloud"
      >
        <div className="space-y-4 text-sm text-slate-600">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 flex items-start gap-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-950">Zero-Config Demo Mode is Currently Active</p>
              <p className="text-xs text-amber-800 mt-0.5">
                All marketplace items, cart operations, orders, and dashboard features are fully functional right now using realistic Konkan seed data saved in your browser session.
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-1">To connect live Supabase:</h4>
            <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm">
              <li>
                Create a free project at <span className="font-mono text-ocean-700 bg-ocean-50 px-1 py-0.5 rounded">https://supabase.com</span>.
              </li>
              <li>
                Open the Supabase <strong>SQL Editor</strong> and execute the provided migration script:
                <div className="mt-1 font-mono text-xs bg-slate-900 text-slate-100 p-2 rounded-lg overflow-x-auto">
                  supabase/migrations/20261025_init_schema.sql
                </div>
              </li>
              <li>
                Execute the seed data script:
                <div className="mt-1 font-mono text-xs bg-slate-900 text-slate-100 p-2 rounded-lg overflow-x-auto">
                  supabase/seed.sql
                </div>
              </li>
              <li>
                Copy your <strong>Project URL</strong> and <strong>Anon Public Key</strong> into your local <code className="bg-sand-100 px-1 py-0.5 rounded text-ocean-900">.env</code> file:
                <pre className="mt-1 p-2 bg-slate-900 text-emerald-400 font-mono text-xs rounded-lg overflow-x-auto">
{`VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...`}
                </pre>
              </li>
              <li>
                Restart Vite (<code className="bg-sand-100 px-1 rounded">npm run dev</code>). The app will automatically connect and synchronize in real time!
              </li>
            </ol>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setShowConfigModal(false)}
              className="px-4 py-2 bg-ocean-900 text-white rounded-xl text-sm font-medium hover:bg-ocean-800 transition-colors"
            >
              Continue in Demo Mode
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
