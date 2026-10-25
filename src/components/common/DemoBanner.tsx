import React, { useState } from 'react';
import { Database, Download, Upload, RotateCcw, CheckCircle2, UserCheck, Code } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Modal } from './Modal';
import { UserRole } from '../../types';

export const DemoBanner: React.FC = () => {
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const { role, switchDemoRole } = useAuth();
  const {
    products,
    tourismListings,
    orders,
    enquiries,
    exportDatabaseJson,
    importDatabaseJson,
    resetToDemoData
  } = useMarketplace();

  const handleDownload = () => {
    const jsonStr = exportDatabaseJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sindhudurg-database-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    if (!importText.trim()) return;
    const res = importDatabaseJson(importText);
    if (res.success) {
      setImportStatus('Database successfully updated from JSON!');
      setTimeout(() => {
        setImportStatus(null);
        setShowJsonModal(false);
      }, 1200);
    } else {
      setImportStatus(`Error: ${res.error}`);
    }
  };

  return (
    <>
      <aside aria-label="Local JSON Banner" className="bg-ocean-950 text-slate-200 text-xs py-2 px-4 border-b border-ocean-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Project & Database status */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-ocean-800 text-ocean-100 font-medium">
              <Database className="w-3.5 h-3.5 text-mango-400" />
              100% Local JSON Database
            </span>
            <span className="hidden sm:inline text-slate-400">•</span>
            <span className="hidden sm:inline text-slate-300">
              Zero External Cloud / Offline Ready
            </span>

            <button
              onClick={() => setShowJsonModal(true)}
              className="inline-flex items-center gap-1 text-teal-300 hover:text-teal-200 underline underline-offset-2 ml-1"
            >
              <Code className="w-3 h-3" />
              Inspect / Export JSON ({products.length} Products, {orders.length} Orders)
            </button>
          </div>

          {/* Right: Quick Role Switcher */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 hidden md:inline flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-mango-400" />
              Persona:
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

      {/* Local JSON Inspector & Backup Modal */}
      <Modal
        isOpen={showJsonModal}
        onClose={() => setShowJsonModal(false)}
        title="Local JSON Database Engine"
        subtitle="Full in-browser data persistence with zero external server dependencies"
        maxWidth="2xl"
      >
        <div className="space-y-4 text-xs text-slate-600">
          
          <div className="p-3.5 bg-teal-50 border border-teal-200 rounded-xl text-teal-950 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Offline Local JSON Architecture Active</p>
              <p className="mt-0.5 text-teal-900">
                All products, cart items, customer orders, and tourism enquiries are saved directly inside local JSON storage. You can backup, import, or reset the dataset anytime below.
              </p>
            </div>
          </div>

          {/* Statistics grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-sand-50 rounded-xl border border-sand-200">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Products</span>
              <span className="text-lg font-bold text-ocean-950">{products.length}</span>
            </div>
            <div className="p-3 bg-sand-50 rounded-xl border border-sand-200">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Tours</span>
              <span className="text-lg font-bold text-ocean-950">{tourismListings.length}</span>
            </div>
            <div className="p-3 bg-sand-50 rounded-xl border border-sand-200">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Orders Logged</span>
              <span className="text-lg font-bold text-ocean-950">{orders.length}</span>
            </div>
            <div className="p-3 bg-sand-50 rounded-xl border border-sand-200">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Enquiries</span>
              <span className="text-lg font-bold text-ocean-950">{enquiries.length}</span>
            </div>
          </div>

          {/* Export / Reset Actions */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-sand-50 rounded-xl border border-sand-200">
            <div>
              <p className="font-bold text-slate-800">Database Portability</p>
              <p className="text-[11px] text-slate-500">Download the complete JSON data file to inspect or share</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="px-3 py-1.5 rounded-lg bg-ocean-900 hover:bg-ocean-800 text-white font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-mango-400" />
                <span>Export JSON File</span>
              </button>
              <button
                onClick={() => {
                  if (confirm('Restore factory Konkan seed data?')) {
                    resetToDemoData();
                    setShowJsonModal(false);
                  }
                }}
                className="px-3 py-1.5 rounded-lg bg-sand-200 hover:bg-sand-300 text-slate-800 font-semibold flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Seed</span>
              </button>
            </div>
          </div>

          {/* Import JSON Area */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 flex items-center gap-1">
              <Upload className="w-3.5 h-3.5 text-teal-600" />
              <span>Import Custom JSON Payload (Paste below):</span>
            </label>
            <textarea
              rows={4}
              placeholder='Paste valid {"products": [...], "categories": [...]} JSON data here...'
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              className="w-full p-2.5 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-xl border border-slate-800 focus:outline-none"
            />
            {importStatus && (
              <p className={`font-semibold ${importStatus.startsWith('Error') ? 'text-red-600' : 'text-teal-700'}`}>
                {importStatus}
              </p>
            )}
            <div className="flex justify-end pt-1">
              <button
                onClick={handleImport}
                disabled={!importText.trim()}
                className="px-3 py-1.5 bg-teal-800 hover:bg-teal-700 disabled:opacity-50 text-white rounded-lg font-semibold"
              >
                Apply Imported JSON
              </button>
            </div>
          </div>

        </div>
      </Modal>
    </>
  );
};
