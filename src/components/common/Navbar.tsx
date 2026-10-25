import React, { useState } from 'react';
import {
  Compass,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  Search,
  Shield,
  Store,
  Layers,
  ChevronDown,
  LogOut
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useMarketplace } from '../../context/MarketplaceContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAuth
}) => {
  const { totalItems, openCart } = useCart();
  const { user, role, logout, switchDemoRole } = useAuth();
  const { favorites, searchQuery, setSearchQuery } = useMarketplace();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Local Marketplace' },
    { id: 'tourism', label: 'Tourism & Experiences' },
    { id: 'sellers', label: 'Artisans & Sellers' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sand-200 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Brand */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-11 h-11 rounded-xl bg-ocean-900 flex items-center justify-center text-mango-400 shadow-md group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="block text-xl font-extrabold tracking-tight text-ocean-950 font-serif leading-none">
                Sindhudurg<span className="text-mango-600">.</span>
              </span>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-teal-700 block mt-1">
                Tourism & Marketplace
              </span>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Alphonso, wooden toys, scuba diving, forts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (activeTab === 'home') setActiveTab('products');
                }}
                className="w-full pl-10 pr-4 py-2 bg-sand-50/80 hover:bg-sand-50 focus:bg-white text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 rounded-full border border-sand-200 focus:outline-none focus:ring-2 focus:ring-ocean-500/20 focus:border-ocean-600 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-ocean-900 bg-ocean-50/80 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-ocean-900 hover:bg-sand-100/70'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            {/* Dashboard / Hub Link */}
            <button
              onClick={() => setActiveTab(role === 'customer' ? 'dashboard' : 'admin')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'dashboard' || activeTab === 'admin'
                  ? 'text-teal-900 bg-teal-50 font-semibold'
                  : 'text-slate-600 hover:text-teal-800 hover:bg-teal-50/50'
              }`}
            >
              {role === 'customer' ? (
                <>
                  <Layers className="w-4 h-4 text-teal-600" />
                  My Orders
                </>
              ) : role === 'seller' ? (
                <>
                  <Store className="w-4 h-4 text-mango-600" />
                  Seller Hub
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 text-ocean-700" />
                  Admin Panel
                </>
              )}
            </button>
          </nav>

          {/* Right Action Icons: Favorites, Cart, Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Wishlist Button */}
            <button
              onClick={() => setActiveTab('dashboard')}
              aria-label="View saved favorites"
              className="p-2.5 rounded-full text-slate-600 hover:text-kokum-700 hover:bg-kokum-50 relative transition-colors"
              title="Saved items"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-kokum-700 text-white text-[10px] font-bold flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={openCart}
              aria-label="Open shopping cart"
              className="p-2.5 rounded-full bg-sand-100/80 hover:bg-sand-200 text-ocean-950 relative transition-colors flex items-center gap-2"
            >
              <ShoppingBag className="w-5 h-5 text-ocean-900" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-mango-600 text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
                  {totalItems}
                </span>
              )}
              <span className="hidden xl:inline text-xs font-semibold text-ocean-900">
                Cart
              </span>
            </button>

            {/* User Dropdown / Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-sand-100/70 hover:bg-sand-200/70 transition-colors border border-sand-200"
                >
                  <img
                    src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                    alt={user.fullName}
                    className="w-7 h-7 rounded-full object-cover border border-white"
                  />
                  <div className="text-left hidden sm:block max-w-[100px] truncate">
                    <p className="text-xs font-semibold text-slate-800 leading-tight truncate">
                      {user.fullName.split(' ')[0]}
                    </p>
                    <p className="text-[10px] uppercase font-bold text-teal-700 leading-tight">
                      {role}
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-sand-200 py-1.5 z-50 animate-in fade-in zoom-in-95"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-sand-100">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {user.fullName}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {user.email}
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab('dashboard')}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-sand-50 flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      My Dashboard & Orders
                    </button>

                    {(role === 'seller' || role === 'admin') && (
                      <button
                        onClick={() => setActiveTab('admin')}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-sand-50 flex items-center gap-2"
                      >
                        <Store className="w-4 h-4 text-mango-600" />
                        Manage Marketplace
                      </button>
                    )}

                    <div className="px-4 py-2 border-t border-sand-100 bg-sand-50/60">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        Switch Persona
                      </p>
                      <div className="grid grid-cols-3 gap-1">
                        {(['customer', 'seller', 'admin'] as const).map((r) => (
                          <button
                            key={r}
                            onClick={(e) => {
                              e.stopPropagation();
                              switchDemoRole(r);
                              setUserDropdownOpen(false);
                            }}
                            className={`py-1 text-[10px] font-bold rounded-md capitalize transition-colors ${
                              role === r
                                ? 'bg-ocean-900 text-white'
                                : 'bg-white hover:bg-sand-200 text-slate-700 border border-sand-200'
                            }`}
                          >
                            {r === 'customer' ? 'Tourist' : r}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-sand-100 my-1" />

                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 rounded-xl bg-ocean-900 text-white text-xs sm:text-sm font-semibold hover:bg-ocean-800 transition-colors shadow-xs"
              >
                Sign In
              </button>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden rounded-lg text-slate-600 hover:bg-sand-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-sand-200 bg-white px-4 pt-3 pb-6 space-y-3">
          {/* Mobile Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products or experiences..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-sand-50 text-xs rounded-xl border border-sand-200"
            />
          </div>

          <div className="flex flex-col space-y-1 pt-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  activeTab === link.id
                    ? 'text-ocean-900 bg-ocean-50 font-semibold'
                    : 'text-slate-600 hover:bg-sand-50'
                }`}
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => {
                setActiveTab(role === 'customer' ? 'dashboard' : 'admin');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-teal-800 hover:bg-teal-50 flex items-center justify-between"
            >
              <span>{role === 'customer' ? 'My Dashboard & Orders' : 'Seller / Admin Hub'}</span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-teal-100 text-teal-800">
                {role}
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
