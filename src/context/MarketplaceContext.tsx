import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  TourismListing,
  Seller,
  ProductCategory,
  Order,
  TourismEnquiry,
  OrderStatus,
  EnquiryStatus
} from '../types';
import { jsonDb } from '../lib/jsonDatabase';
import { generateOrderCode } from '../lib/utils';

interface MarketplaceContextType {
  products: Product[];
  tourismListings: TourismListing[];
  sellers: Seller[];
  categories: ProductCategory[];
  orders: Order[];
  enquiries: TourismEnquiry[];
  favorites: string[];
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  activeTaluka: string;
  setActiveTaluka: (taluka: string) => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  createOrder: (orderData: Omit<Order, 'id' | 'orderCode' | 'createdAt' | 'status'>) => Promise<Order>;
  createEnquiry: (enquiryData: Omit<TourismEnquiry, 'id' | 'createdAt' | 'status'>) => Promise<TourismEnquiry>;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'rating' | 'reviewsCount'>) => Promise<Product>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  toggleProductActive: (id: string) => Promise<void>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  updateEnquiryStatus: (enquiryId: string, status: EnquiryStatus) => Promise<void>;
  resetToDemoData: () => void;
  exportDatabaseJson: () => string;
  importDatabaseJson: (jsonString: string) => { success: boolean; error?: string };
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dbState, setDbState] = useState(() => jsonDb.getDatabase());

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sindhudurg_favorites');
      return saved ? JSON.parse(saved) : ['p1', 't1'];
    } catch {
      return ['p1', 't1'];
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTaluka, setActiveTaluka] = useState('all');

  // Persist favorites
  useEffect(() => {
    localStorage.setItem('sindhudurg_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const createOrder = async (orderData: Omit<Order, 'id' | 'orderCode' | 'createdAt' | 'status'>): Promise<Order> => {
    const orderCode = generateOrderCode();
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderCode,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    const current = jsonDb.getDatabase();
    current.orders.unshift(newOrder);
    jsonDb.saveDatabase(current);
    setDbState(current);

    return newOrder;
  };

  const createEnquiry = async (enquiryData: Omit<TourismEnquiry, 'id' | 'createdAt' | 'status'>): Promise<TourismEnquiry> => {
    const newEnquiry: TourismEnquiry = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      status: 'received',
      createdAt: new Date().toISOString()
    };

    const current = jsonDb.getDatabase();
    current.enquiries.unshift(newEnquiry);
    jsonDb.saveDatabase(current);
    setDbState(current);

    return newEnquiry;
  };

  const addProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'rating' | 'reviewsCount'>): Promise<Product> => {
    const newProduct: Product = {
      ...productData,
      id: `p-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
      createdAt: new Date().toISOString()
    };

    const current = jsonDb.getDatabase();
    current.products.unshift(newProduct);
    jsonDb.saveDatabase(current);
    setDbState(current);

    return newProduct;
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    const current = jsonDb.getDatabase();
    current.products = current.products.map(p => (p.id === id ? { ...p, ...updates } : p));
    jsonDb.saveDatabase(current);
    setDbState(current);
  };

  const deleteProduct = async (id: string) => {
    const current = jsonDb.getDatabase();
    current.products = current.products.filter(p => p.id !== id);
    jsonDb.saveDatabase(current);
    setDbState(current);
  };

  const toggleProductActive = async (id: string) => {
    const current = jsonDb.getDatabase();
    current.products = current.products.map(p =>
      p.id === id ? { ...p, isActive: !p.isActive } : p
    );
    jsonDb.saveDatabase(current);
    setDbState(current);
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    const current = jsonDb.getDatabase();
    current.orders = current.orders.map(o => (o.id === orderId ? { ...o, status } : o));
    jsonDb.saveDatabase(current);
    setDbState(current);
  };

  const updateEnquiryStatus = async (enquiryId: string, status: EnquiryStatus) => {
    const current = jsonDb.getDatabase();
    current.enquiries = current.enquiries.map(e => (e.id === enquiryId ? { ...e, status } : e));
    jsonDb.saveDatabase(current);
    setDbState(current);
  };

  const resetToDemoData = () => {
    const fresh = jsonDb.resetToFactory();
    setDbState(fresh);
    setFavorites(['p1', 't1']);
  };

  const exportDatabaseJson = (): string => {
    return jsonDb.exportJson();
  };

  const importDatabaseJson = (jsonString: string) => {
    const result = jsonDb.importJson(jsonString);
    if (result.success) {
      setDbState(jsonDb.getDatabase());
    }
    return result;
  };

  return (
    <MarketplaceContext.Provider
      value={{
        products: dbState.products,
        tourismListings: dbState.tourismListings,
        sellers: dbState.sellers,
        categories: dbState.categories,
        orders: dbState.orders,
        enquiries: dbState.enquiries,
        favorites,
        isLoading,
        searchQuery,
        setSearchQuery,
        activeCategory,
        setActiveCategory,
        activeTaluka,
        setActiveTaluka,
        toggleFavorite,
        isFavorite,
        createOrder,
        createEnquiry,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductActive,
        updateOrderStatus,
        updateEnquiryStatus,
        resetToDemoData,
        exportDatabaseJson,
        importDatabaseJson
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) throw new Error('useMarketplace must be used within a MarketplaceProvider');
  return context;
};
