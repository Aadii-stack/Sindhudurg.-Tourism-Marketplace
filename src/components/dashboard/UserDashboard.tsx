import React, { useState } from 'react';
import {
  Package,
  Calendar,
  Heart,
  User,
  MapPin,
  Clock,
  CheckCircle2,
  Phone,
  Mail,
  ExternalLink,
  ShoppingBag,
  Trash2,
  Printer
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useCart } from '../../context/CartContext';
import { formatINR, formatDate } from '../../lib/utils';
import { ProductCard } from '../products/ProductCard';
import { TourismCard } from '../tourism/TourismCard';
import { ProductDetailModal } from '../products/ProductDetailModal';
import { TourismDetailModal } from '../tourism/TourismDetailModal';
import { BookingEnquiryModal } from '../tourism/BookingEnquiryModal';
import { Product, TourismListing } from '../../types';

export const UserDashboard: React.FC = () => {
  const { user, role, switchDemoRole } = useAuth();
  const { orders, enquiries, products, tourismListings, favorites } = useMarketplace();
  const { addToCart } = useCart();
  
  const [activeTab, setActiveTab] = useState<'orders' | 'enquiries' | 'favorites'>('orders');
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedTourism, setSelectedTourism] = useState<TourismListing | null>(null);
  const [enquiryTourism, setEnquiryTourism] = useState<TourismListing | null>(null);

  // User orders
  const myOrders = orders.filter(
    (o) => !user?.id || !o.userId || o.userId === user.id || o.customerEmail === user.email
  );

  // User enquiries
  const myEnquiries = enquiries.filter(
    (e) => !user?.id || !e.userId || e.userId === user.id || e.customerEmail === user.email
  );

  // Favorite items
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));
  const favoriteTourisms = tourismListings.filter((t) => favorites.includes(t.id));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">Confirmed</span>;
      case 'dispatched':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">Dispatched</span>;
      case 'delivered':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-100 text-teal-800 border border-teal-200">Delivered</span>;
      case 'contacted':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">Guide Contacted</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sand-200 text-slate-700">Received</span>;
    }
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl border border-sand-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
            alt={user?.fullName}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-sand-200 shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-ocean-950 font-serif">
                {user?.fullName || 'Guest Tourist'}
              </h1>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                {role}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{user?.email || 'guest@example.com'}</span>
              {user?.phone && (
                <>
                  <span className="text-slate-300">•</span>
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{user.phone}</span>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Quick Role switchers */}
        <div className="flex items-center gap-2 text-xs bg-sand-50 p-2 rounded-2xl border border-sand-200">
          <span className="text-slate-500 font-medium pl-1">Switch Persona:</span>
          <button
            onClick={() => switchDemoRole('customer')}
            className={`px-3 py-1 rounded-xl transition-all ${
              role === 'customer' ? 'bg-ocean-900 text-white font-bold' : 'hover:bg-sand-200 text-slate-700'
            }`}
          >
            Tourist
          </button>
          <button
            onClick={() => switchDemoRole('seller')}
            className={`px-3 py-1 rounded-xl transition-all ${
              role === 'seller' ? 'bg-ocean-900 text-white font-bold' : 'hover:bg-sand-200 text-slate-700'
            }`}
          >
            Local Seller
          </button>
          <button
            onClick={() => switchDemoRole('admin')}
            className={`px-3 py-1 rounded-xl transition-all ${
              role === 'admin' ? 'bg-ocean-900 text-white font-bold' : 'hover:bg-sand-200 text-slate-700'
            }`}
          >
            Admin
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-sand-200 gap-4">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 transition-all relative ${
            activeTab === 'orders'
              ? 'text-ocean-900 border-b-2 border-ocean-900'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Package className="w-4 h-4 text-mango-600" />
          <span>My Product Orders ({myOrders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('enquiries')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 transition-all relative ${
            activeTab === 'enquiries'
              ? 'text-ocean-900 border-b-2 border-ocean-900'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-4 h-4 text-teal-600" />
          <span>Tourism Enquiries ({myEnquiries.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('favorites')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 transition-all relative ${
            activeTab === 'favorites'
              ? 'text-ocean-900 border-b-2 border-ocean-900'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Heart className="w-4 h-4 text-kokum-600" />
          <span>Saved Wishlist ({favoriteProducts.length + favoriteTourisms.length})</span>
        </button>
      </div>

      {/* Content based on Active Tab */}
      
      {/* 1. ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {myOrders.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-sand-200 space-y-3">
              <Package className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-700">No orders placed yet</h3>
              <p className="text-xs text-slate-500">
                Browse our marketplace to order fresh Devgad mangoes and handcrafted items.
              </p>
            </div>
          ) : (
            myOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-sand-200 p-5 shadow-xs space-y-4"
              >
                {/* Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-sand-100">
                  <div>
                    <span className="text-xs text-slate-400 block">Tracking Number</span>
                    <span className="font-mono font-bold text-sm text-ocean-950">
                      {order.orderCode}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 block">Order Placed</span>
                    <span className="text-xs font-semibold text-slate-700">
                      {formatDate(order.createdAt)}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 block">Status</span>
                    {getStatusBadge(order.status)}
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 block">Total</span>
                    <span className="font-bold text-sm text-ocean-950 font-serif">
                      {formatINR(order.totalAmountInr)}
                    </span>
                  </div>

                  <button
                    onClick={() => window.print()}
                    className="p-2 text-xs text-slate-500 hover:text-slate-800 hover:bg-sand-100 rounded-lg flex items-center gap-1"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Receipt</span>
                  </button>
                </div>

                {/* Items in this order */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 block">Items:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {order.items.map((it) => (
                      <div
                        key={it.id}
                        className="flex items-center gap-3 p-2.5 rounded-xl bg-sand-50/70 border border-sand-100"
                      >
                        {it.imageUrl && (
                          <img
                            src={it.imageUrl}
                            alt={it.productName}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {it.productName}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            Qty: {it.quantity} • {formatINR(it.productPriceInr)} each
                          </p>
                        </div>
                        <span className="font-bold text-xs text-ocean-950 font-serif">
                          {formatINR(it.subtotalInr)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping & Payment details */}
                <div className="pt-2 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2 border-t border-sand-100">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-teal-600" />
                    <span>
                      Shipping to: {order.shippingAddress}, {order.taluka} ({order.pincode})
                    </span>
                  </div>
                  <span className="text-slate-400 font-mono text-[11px]">
                    Method: {order.paymentMethod}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 2. TOURISM ENQUIRIES TAB */}
      {activeTab === 'enquiries' && (
        <div className="space-y-4">
          {myEnquiries.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-sand-200 space-y-3">
              <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-700">No tourism bookings logged</h3>
              <p className="text-xs text-slate-500">
                Explore Scuba diving in Tarkarli or the Sindhudurg Sea Fort trail to send an enquiry.
              </p>
            </div>
          ) : (
            myEnquiries.map((enq) => (
              <div
                key={enq.id}
                className="bg-white rounded-2xl border border-sand-200 p-5 shadow-xs space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 block">
                      Tourism Experience
                    </span>
                    <h4 className="font-bold text-sm sm:text-base text-ocean-950 font-serif">
                      {enq.listingTitle}
                    </h4>
                  </div>
                  {getStatusBadge(enq.status)}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-600 p-3 bg-sand-50 rounded-xl">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Preferred Date</span>
                    <span className="font-semibold text-slate-800">{enq.preferredDate || 'Flexible'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Party Size</span>
                    <span className="font-semibold text-slate-800">{enq.guestsCount} Persons</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Lead Contact</span>
                    <span className="font-semibold text-slate-800">{enq.customerName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Submitted</span>
                    <span className="text-slate-600">{formatDate(enq.createdAt)}</span>
                  </div>
                </div>

                {enq.notes && (
                  <p className="text-xs text-slate-500 bg-sand-50/50 p-2.5 rounded-lg border border-sand-100">
                    <strong>Special Instructions:</strong> {enq.notes}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* 3. SAVED FAVORITES TAB */}
      {activeTab === 'favorites' && (
        <div className="space-y-6">
          {favoriteProducts.length === 0 && favoriteTourisms.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-sand-200 space-y-3">
              <Heart className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-700">Your wishlist is empty</h3>
              <p className="text-xs text-slate-500">
                Click the heart icon on any product or experience to save it here.
              </p>
            </div>
          ) : (
            <>
              {favoriteProducts.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-ocean-950 font-serif">
                    Saved Products ({favoriteProducts.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {favoriteProducts.map((p) => (
                      <ProductCard
                        key={p.id}
                        product={p}
                        onQuickView={(item) => setSelectedProduct(item)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {favoriteTourisms.length > 0 && (
                <div className="space-y-3 pt-6 border-t border-sand-200">
                  <h3 className="text-base font-bold text-ocean-950 font-serif">
                    Saved Experiences ({favoriteTourisms.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {favoriteTourisms.map((t) => (
                      <TourismCard
                        key={t.id}
                        listing={t}
                        onViewDetails={(item) => setSelectedTourism(item)}
                        onEnquire={(item) => setEnquiryTourism(item)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Modals */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
      />

      <TourismDetailModal
        listing={selectedTourism}
        isOpen={Boolean(selectedTourism)}
        onClose={() => setSelectedTourism(null)}
        onOpenEnquiry={(item) => setEnquiryTourism(item)}
      />

      <BookingEnquiryModal
        listing={enquiryTourism}
        isOpen={Boolean(enquiryTourism)}
        onClose={() => setEnquiryTourism(null)}
      />

    </div>
  );
};
