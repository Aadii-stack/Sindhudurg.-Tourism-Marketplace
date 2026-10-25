import React, { useState } from 'react';
import {
  Shield,
  Store,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Package,
  Calendar,
  Layers,
  Database,
  RotateCcw,
  Eye,
  EyeOff,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { formatINR, formatDate } from '../../lib/utils';
import { Product, OrderStatus, EnquiryStatus } from '../../types';
import { AddEditProductModal } from './AddEditProductModal';
import { isSupabaseConfigured } from '../../lib/supabaseClient';

export const AdminDashboard: React.FC = () => {
  const { user, role, switchDemoRole } = useAuth();
  const {
    products,
    tourismListings,
    sellers,
    categories,
    orders,
    enquiries,
    toggleProductActive,
    deleteProduct,
    updateOrderStatus,
    updateEnquiryStatus,
    resetToDemoData
  } = useMarketplace();

  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'enquiries' | 'sellers' | 'database'>('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Security Gate
  const isAuthorized = role === 'seller' || role === 'admin';

  if (!isAuthorized) {
    return (
      <div className="py-16 max-w-xl mx-auto px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-sm">
          <Shield className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-ocean-950 font-serif">
          Seller & Admin Hub Access
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          You are currently logged in as a <strong>Tourist/Customer</strong>. This dashboard provides protected operations for certified Konkan producers and district administrators.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => switchDemoRole('seller')}
            className="px-5 py-2.5 rounded-xl bg-ocean-900 text-white font-semibold text-xs hover:bg-ocean-800 flex items-center gap-2"
          >
            <Store className="w-4 h-4 text-mango-400" />
            <span>Switch to Local Seller (Demo)</span>
          </button>
          <button
            onClick={() => switchDemoRole('admin')}
            className="px-5 py-2.5 rounded-xl bg-sand-200 text-slate-800 font-semibold text-xs hover:bg-sand-300 flex items-center gap-2"
          >
            <Shield className="w-4 h-4 text-ocean-700" />
            <span>Switch to Platform Admin (Demo)</span>
          </button>
        </div>
      </div>
    );
  }

  // Calculate Metrics
  const activeProductsCount = products.filter((p) => p.isActive).length;
  const totalVolume = orders.reduce((sum, o) => sum + o.totalAmountInr, 0);

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header & Role Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-sand-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-ocean-100 text-ocean-900 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-mango-600" />
              {role === 'admin' ? 'District Administration Console' : 'Local Producer Portal'}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-teal-700 font-medium">Sindhudurg Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ocean-950 font-serif mt-1">
            Marketplace Management Center
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setEditingProduct(null);
              setIsAddModalOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-ocean-900 hover:bg-ocean-800 text-white font-semibold text-xs shadow-sm flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4 text-mango-400" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-sand-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500">Active Listings</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-ocean-950 font-serif">
              {activeProductsCount}
            </span>
            <span className="text-[11px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full font-semibold">
              {products.length} Total
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-sand-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500">Tourism Expeditions</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-ocean-950 font-serif">
              {tourismListings.length}
            </span>
            <span className="text-[11px] text-ocean-700 bg-ocean-50 px-2 py-0.5 rounded-full font-semibold">
              Live Trails
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-sand-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500">Orders Processed</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-ocean-950 font-serif">
              {orders.length}
            </span>
            <span className="text-[11px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full font-semibold">
              {formatINR(totalVolume)}
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-sand-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500">Tourism Enquiries</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-ocean-950 font-serif">
              {enquiries.length}
            </span>
            <span className="text-[11px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full font-semibold">
              Lead Inquiries
            </span>
          </div>
        </div>
      </div>

      {/* Nav Tabs */}
      <div className="flex border-b border-sand-200 gap-2 sm:gap-6 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'products'
              ? 'text-ocean-900 border-b-2 border-ocean-900'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Product Catalog ({products.length})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'orders'
              ? 'text-ocean-900 border-b-2 border-ocean-900'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Orders Manager ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('enquiries')}
          className={`pb-3 text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'enquiries'
              ? 'text-ocean-900 border-b-2 border-ocean-900'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Tourism Enquiries ({enquiries.length})
        </button>

        <button
          onClick={() => setActiveTab('sellers')}
          className={`pb-3 text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'sellers'
              ? 'text-ocean-900 border-b-2 border-ocean-900'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Artisans & Sellers ({sellers.length})
        </button>

        <button
          onClick={() => setActiveTab('database')}
          className={`pb-3 text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'database'
              ? 'text-ocean-900 border-b-2 border-ocean-900'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Cloud & Maintenance
        </button>
      </div>

      {/* TAB 1: PRODUCT CATALOG MANAGER */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-3xl border border-sand-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-sand-50/80 text-ocean-950 font-bold uppercase tracking-wider text-[10px] border-b border-sand-200">
                <tr>
                  <th className="px-5 py-3.5">Product</th>
                  <th className="px-4 py-3.5">Category</th>
                  <th className="px-4 py-3.5">Taluka</th>
                  <th className="px-4 py-3.5">Price / Unit</th>
                  <th className="px-4 py-3.5">Stock</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-sand-50/60 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-12 h-12 rounded-xl object-cover shrink-0 border border-sand-200"
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 line-clamp-1">{p.name}</p>
                          <p className="text-[11px] text-slate-400 truncate">
                            {p.sellerName || 'Local Cooperative'}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 font-medium text-slate-700">
                      {p.categoryName || 'Specialty'}
                    </td>

                    <td className="px-4 py-3.5 font-semibold text-teal-800">
                      {p.originTaluka}
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="font-bold text-ocean-950 font-serif">
                        {formatINR(p.priceInr)}
                      </span>
                      <span className="text-[10px] text-slate-400 block">{p.unit}</span>
                    </td>

                    <td className="px-4 py-3.5 font-semibold text-slate-800">
                      {p.stockQuantity} units
                    </td>

                    <td className="px-4 py-3.5">
                      <button
                        onClick={() => toggleProductActive(p.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase transition-colors ${
                          p.isActive
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-500 border border-slate-200'
                        }`}
                      >
                        {p.isActive ? (
                          <>
                            <Eye className="w-3 h-3" />
                            <span>Active</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" />
                            <span>Hidden</span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setIsAddModalOpen(true);
                          }}
                          className="p-1.5 text-slate-600 hover:text-ocean-900 hover:bg-sand-100 rounded-lg"
                          title="Edit Product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Remove "${p.name}" from marketplace?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: ORDERS MANAGER */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-sand-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-sand-50/80 text-ocean-950 font-bold uppercase tracking-wider text-[10px] border-b border-sand-200">
                  <tr>
                    <th className="px-5 py-3.5">Order ID</th>
                    <th className="px-4 py-3.5">Customer</th>
                    <th className="px-4 py-3.5">Destination</th>
                    <th className="px-4 py-3.5">Amount</th>
                    <th className="px-4 py-3.5">Current Status</th>
                    <th className="px-5 py-3.5 text-right">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-100">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-sand-50/60 transition-colors">
                      <td className="px-5 py-3.5 font-mono font-bold text-ocean-950">
                        {ord.orderCode}
                        <span className="text-[10px] text-slate-400 block font-normal">
                          {formatDate(ord.createdAt)}
                        </span>
                      </td>

                      <td className="px-4 py-3.5">
                        <p className="font-bold text-slate-900">{ord.customerName}</p>
                        <p className="text-[10px] text-slate-500">{ord.customerPhone}</p>
                      </td>

                      <td className="px-4 py-3.5">
                        <span className="font-semibold text-slate-800">{ord.taluka} Taluka</span>
                        <span className="text-[10px] text-slate-500 block truncate max-w-[180px]">
                          {ord.shippingAddress}
                        </span>
                      </td>

                      <td className="px-4 py-3.5 font-bold text-ocean-950 font-serif">
                        {formatINR(ord.totalAmountInr)}
                      </td>

                      <td className="px-4 py-3.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          ord.status === 'delivered' ? 'bg-teal-100 text-teal-800' :
                          ord.status === 'dispatched' ? 'bg-blue-100 text-blue-800' :
                          'bg-emerald-100 text-emerald-800'
                        }`}>
                          {ord.status}
                        </span>
                      </td>

                      <td className="px-5 py-3.5 text-right">
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                          className="px-2.5 py-1 text-xs bg-sand-50 rounded-lg border border-sand-200 text-slate-800"
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TOURISM ENQUIRIES MANAGER */}
      {activeTab === 'enquiries' && (
        <div className="bg-white rounded-3xl border border-sand-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-sand-50/80 text-ocean-950 font-bold uppercase tracking-wider text-[10px] border-b border-sand-200">
                <tr>
                  <th className="px-5 py-3.5">Experience</th>
                  <th className="px-4 py-3.5">Tourist Contact</th>
                  <th className="px-4 py-3.5">Date & Guests</th>
                  <th className="px-4 py-3.5">Notes</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-100">
                {enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-sand-50/60 transition-colors">
                    <td className="px-5 py-3.5 font-bold text-ocean-950 max-w-[200px]">
                      {enq.listingTitle}
                      <span className="text-[10px] text-slate-400 block font-normal">
                        Received {formatDate(enq.createdAt)}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <p className="font-bold text-slate-900">{enq.customerName}</p>
                      <p className="text-[10px] text-slate-500">{enq.customerEmail} • {enq.customerPhone}</p>
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="font-semibold text-slate-800">{enq.preferredDate || 'Flexible'}</span>
                      <span className="text-[10px] text-slate-500 block">{enq.guestsCount} Persons</span>
                    </td>

                    <td className="px-4 py-3.5 text-slate-500 max-w-[200px] truncate">
                      {enq.notes || '—'}
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-purple-50 text-purple-700 border border-purple-200">
                        {enq.status}
                      </span>
                    </td>

                    <td className="px-5 py-3.5 text-right">
                      <select
                        value={enq.status}
                        onChange={(e) => updateEnquiryStatus(enq.id, e.target.value as EnquiryStatus)}
                        className="px-2.5 py-1 text-xs bg-sand-50 rounded-lg border border-sand-200 text-slate-800"
                      >
                        <option value="received">Received</option>
                        <option value="contacted">Contacted Guide</option>
                        <option value="confirmed">Confirmed Slot</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: SELLERS DIRECTORY */}
      {activeTab === 'sellers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sellers.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-3xl border border-sand-200 p-6 shadow-xs space-y-4"
            >
              <div className="flex items-start gap-4">
                <img
                  src={s.avatarUrl}
                  alt={s.ownerName}
                  className="w-16 h-16 rounded-2xl object-cover border border-sand-200"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-ocean-950 font-serif">
                      {s.businessName}
                    </h3>
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  </div>
                  <p className="text-xs text-slate-600 font-medium">Lead: {s.ownerName}</p>
                  <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full inline-block mt-1">
                    {s.taluka} Taluka • {s.specialty}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed border-t border-sand-100 pt-3">
                {s.story}
              </p>

              <div className="text-xs text-slate-500 pt-1 space-y-1">
                <p><strong>Address:</strong> {s.address}</p>
                <p><strong>Phone:</strong> {s.phone} | <strong>Email:</strong> {s.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 5: DATABASE & MAINTENANCE */}
      {activeTab === 'database' && (
        <div className="bg-white rounded-3xl border border-sand-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h3 className="text-xl font-bold text-ocean-950 font-serif">
              Database Synchronization & Cloud Health
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Sindhudurg Marketplace features dual-layer storage: automatic fallback to browser localStorage, with instant live synchronization to Supabase PostgreSQL when credentials are provided.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-sand-50 border border-sand-200 space-y-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                <Database className="w-4 h-4 text-teal-600" />
                Connection State
              </span>
              <p className="text-sm font-bold text-ocean-950">
                {isSupabaseConfigured ? '🟢 Live Supabase PostgreSQL Connected' : '🟡 Autonomous Demo Mode Active'}
              </p>
              <p className="text-xs text-slate-500">
                {isSupabaseConfigured
                  ? 'Cloud RLS policies and live database transactions active.'
                  : 'Operating locally with complete state persistence in localStorage.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-sand-50 border border-sand-200 space-y-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-ocean-700" />
                Demo Seed Reset
              </span>
              <p className="text-xs text-slate-500">
                Restore the default realistic Konkan seed products, tourism listings, demo orders, and reviews.
              </p>
              <button
                onClick={() => {
                  if (confirm('Reset marketplace to original demonstration seed data?')) {
                    resetToDemoData();
                    alert('Seed data restored successfully!');
                  }
                }}
                className="px-3.5 py-1.5 rounded-xl bg-sand-200 hover:bg-sand-300 text-slate-800 text-xs font-semibold transition-colors"
              >
                Reset Demo Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      <AddEditProductModal
        product={editingProduct}
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingProduct(null);
        }}
      />

    </div>
  );
};
