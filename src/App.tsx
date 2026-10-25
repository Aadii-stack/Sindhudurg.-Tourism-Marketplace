import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { MarketplaceProvider, useMarketplace } from './context/MarketplaceContext';
import { DemoBanner } from './components/common/DemoBanner';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';
import { AuthModal } from './components/auth/AuthModal';
import { NotificationToast } from './components/common/NotificationToast';
import { SmoothScrollProvider } from './components/common/SmoothScrollProvider';

import { HomePage } from './components/home/HomePage';
import { ProductCatalogue } from './components/products/ProductCatalogue';
import { TourismCatalogue } from './components/tourism/TourismCatalogue';
import { SellersPage } from './components/sellers/SellersPage';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { Order } from './types';

const MainApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { setActiveCategory, setActiveTaluka } = useMarketplace();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOrderSuccess = (order: Order) => {
    // Optionally redirect to user dashboard to view new order
  };

  const handleSelectCategoryFromHero = (categorySlug: string) => {
    setActiveCategory(categorySlug);
    setActiveTab('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTalukaFromFooter = (taluka: string) => {
    setActiveTaluka(taluka);
    setActiveTab('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-sand-50 selection:bg-ocean-100 selection:text-ocean-900">
      
      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectCategory={handleSelectCategoryFromHero}
          />
        )}

        {activeTab === 'products' && <ProductCatalogue />}

        {activeTab === 'tourism' && <TourismCatalogue />}

        {activeTab === 'sellers' && (
          <SellersPage
            onBrowseSellerProducts={() => {
              setActiveTab('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'dashboard' && <UserDashboard />}

        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Global Shopping Cart Drawer */}
      <CartDrawer onProceedCheckout={() => setIsCheckoutOpen(true)} />

      {/* Global Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Global Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* Floating Add to Cart Toast Notification */}
      <NotificationToast />

      {/* Floating Scroll to Top Pill */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className="fixed bottom-6 left-6 z-40 p-2.5 rounded-full bg-white/95 hover:bg-white text-ocean-950 shadow-md border border-sand-200 backdrop-blur-sm btn-tactile animate-toast-enter group"
        >
          <ArrowUp className="w-4 h-4 text-ocean-900 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

      {/* Footer */}
      <Footer
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectTaluka={handleSelectTalukaFromFooter}
      />

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <SmoothScrollProvider>
      <AuthProvider>
        <MarketplaceProvider>
          <CartProvider>
            <MainApp />
          </CartProvider>
        </MarketplaceProvider>
      </AuthProvider>
    </SmoothScrollProvider>
  );
};

export default App;
