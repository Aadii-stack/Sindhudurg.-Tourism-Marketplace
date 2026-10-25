import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Product,
  TourismListing,
  Seller,
  ProductCategory,
  Order,
  TourismEnquiry,
  OrderStatus,
  EnquiryStatus,
  Taluka
} from '../types';
import {
  INITIAL_CATEGORIES,
  INITIAL_SELLERS,
  INITIAL_PRODUCTS,
  INITIAL_TOURISMS
} from '../data/seedData';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
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
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('sindhudurg_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [tourismListings, setTourismListings] = useState<TourismListing[]>(() => {
    const saved = localStorage.getItem('sindhudurg_tourisms');
    return saved ? JSON.parse(saved) : INITIAL_TOURISMS;
  });

  const [sellers] = useState<Seller[]>(INITIAL_SELLERS);
  const [categories] = useState<ProductCategory[]>(INITIAL_CATEGORIES);

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('sindhudurg_orders');
    if (saved) return JSON.parse(saved);
    // Initial demo order for rich UI experience
    return [
      {
        id: 'ord-demo-01',
        orderCode: 'SDG-774921',
        customerName: 'Rohit Deshmukh',
        customerEmail: 'rohit.traveler@example.com',
        customerPhone: '+91 98200 11223',
        shippingAddress: 'Flat 402, Sea Pearl Apt, Prabhadevi',
        taluka: 'Malvan',
        pincode: '400025',
        subtotalInr: 1890,
        deliveryFeeInr: 0,
        totalAmountInr: 1890,
        status: 'confirmed',
        paymentMethod: 'Demo Mode (Cash on Delivery)',
        notes: 'Please pack in eco-friendly banana fiber carton',
        createdAt: '2026-04-14T11:20:00Z',
        items: [
          {
            id: 'item-01',
            orderId: 'ord-demo-01',
            productId: 'p1',
            productName: 'Original Devgad GI-Tagged Alphonso Mango Box',
            productPriceInr: 1250,
            quantity: 1,
            subtotalInr: 1250,
            imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=80'
          },
          {
            id: 'item-02',
            orderId: 'ord-demo-01',
            productId: 'p3',
            productName: 'Sawantwadi Handcrafted Wooden Fruit & Vegetable Set',
            productPriceInr: 650,
            quantity: 1,
            subtotalInr: 650,
            imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=400&q=80'
          }
        ]
      }
    ];
  });

  const [enquiries, setEnquiries] = useState<TourismEnquiry[]>(() => {
    const saved = localStorage.getItem('sindhudurg_enquiries');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'enq-demo-01',
        listingId: 't1',
        listingTitle: 'Tarkarli Coral Reef Scuba Diving & Underwater Photography',
        customerName: 'Rohit Deshmukh',
        customerEmail: 'rohit.traveler@example.com',
        customerPhone: '+91 98200 11223',
        preferredDate: '2026-05-15',
        guestsCount: 2,
        notes: 'Interested in early morning 7 AM slot for clear underwater reef visibility.',
        status: 'contacted',
        createdAt: '2026-04-15T09:30:00Z'
      }
    ];
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('sindhudurg_favorites');
    return saved ? JSON.parse(saved) : ['p1', 't1'];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTaluka, setActiveTaluka] = useState('all');

  // Persist locally
  useEffect(() => {
    localStorage.setItem('sindhudurg_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('sindhudurg_tourisms', JSON.stringify(tourismListings));
  }, [tourismListings]);

  useEffect(() => {
    localStorage.setItem('sindhudurg_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('sindhudurg_enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem('sindhudurg_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Sync from Supabase if configured
  const fetchSupabaseData = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) return;
    setIsLoading(true);
    try {
      const [prodRes, tourRes, orderRes, enqRes] = await Promise.all([
        supabase.from('products').select('*').order('created_at', { ascending: false }),
        supabase.from('tourism_listings').select('*').order('created_at', { ascending: false }),
        supabase.from('orders').select('*, order_items(*)').order('created_at', { ascending: false }),
        supabase.from('tourism_enquiries').select('*').order('created_at', { ascending: false })
      ]);

      if (prodRes.data && prodRes.data.length > 0) {
        setProducts(prodRes.data.map((p: any) => ({
          id: p.id,
          sellerId: p.seller_id,
          categoryId: p.category_id,
          name: p.name,
          slug: p.slug,
          description: p.description,
          priceInr: Number(p.price_inr),
          mrpInr: p.mrp_inr ? Number(p.mrp_inr) : undefined,
          unit: p.unit,
          stockQuantity: p.stock_quantity,
          originTaluka: p.origin_taluka as Taluka,
          imageUrl: p.image_url,
          additionalImages: p.additional_images || [],
          isOrganic: p.is_organic,
          isFeatured: p.is_featured,
          isActive: p.is_active,
          rating: Number(p.rating || 4.8),
          reviewsCount: p.reviews_count || 0,
          createdAt: p.created_at
        })));
      }

      if (tourRes.data && tourRes.data.length > 0) {
        setTourismListings(tourRes.data.map((t: any) => ({
          id: t.id,
          sellerId: t.seller_id,
          title: t.title,
          slug: t.slug,
          category: t.category,
          locationTaluka: t.location_taluka as Taluka,
          address: t.address || '',
          duration: t.duration,
          priceIndicativeInr: Number(t.price_indicative_inr),
          priceLabel: t.price_label || 'per person',
          description: t.description,
          highlights: t.highlights || [],
          included: t.included || [],
          imageUrl: t.image_url,
          additionalImages: t.additional_images || [],
          isFeatured: t.is_featured,
          isActive: t.is_active,
          rating: Number(t.rating || 4.9),
          reviewsCount: t.reviews_count || 0,
          createdAt: t.created_at
        })));
      }
    } catch (err) {
      console.warn('Supabase data synchronization fallback:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSupabaseData();
  }, [fetchSupabaseData]);

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

    setOrders(prev => [newOrder, ...prev]);

    if (isSupabaseConfigured && supabase) {
      try {
        const { data: dbOrder } = await supabase.from('orders').insert({
          order_code: orderCode,
          user_id: orderData.userId || null,
          customer_name: orderData.customerName,
          customer_email: orderData.customerEmail,
          customer_phone: orderData.customerPhone,
          shipping_address: orderData.shippingAddress,
          taluka: orderData.taluka,
          pincode: orderData.pincode,
          subtotal_inr: orderData.subtotalInr,
          delivery_fee_inr: orderData.deliveryFeeInr,
          total_amount_inr: orderData.totalAmountInr,
          status: 'confirmed',
          payment_method: orderData.paymentMethod,
          notes: orderData.notes
        }).select().single();

        if (dbOrder && orderData.items.length > 0) {
          await supabase.from('order_items').insert(
            orderData.items.map(i => ({
              order_id: dbOrder.id,
              product_id: i.productId,
              product_name: i.productName,
              product_price_inr: i.productPriceInr,
              quantity: i.quantity,
              subtotal_inr: i.subtotalInr
            }))
          );
        }
      } catch (err) {
        console.warn('Order sync fallback to local store:', err);
      }
    }

    return newOrder;
  };

  const createEnquiry = async (enquiryData: Omit<TourismEnquiry, 'id' | 'createdAt' | 'status'>): Promise<TourismEnquiry> => {
    const newEnquiry: TourismEnquiry = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      status: 'received',
      createdAt: new Date().toISOString()
    };

    setEnquiries(prev => [newEnquiry, ...prev]);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('tourism_enquiries').insert({
          listing_id: enquiryData.listingId,
          user_id: enquiryData.userId || null,
          customer_name: enquiryData.customerName,
          customer_email: enquiryData.customerEmail,
          customer_phone: enquiryData.customerPhone,
          preferred_date: enquiryData.preferredDate || null,
          guests_count: enquiryData.guestsCount,
          notes: enquiryData.notes,
          status: 'received'
        });
      } catch (err) {
        console.warn('Enquiry sync fallback:', err);
      }
    }

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

    setProducts(prev => [newProduct, ...prev]);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('products').insert({
          seller_id: productData.sellerId,
          category_id: productData.categoryId,
          name: productData.name,
          slug: productData.slug,
          description: productData.description,
          price_inr: productData.priceInr,
          mrp_inr: productData.mrpInr,
          unit: productData.unit,
          stock_quantity: productData.stockQuantity,
          origin_taluka: productData.originTaluka,
          image_url: productData.imageUrl,
          is_organic: productData.isOrganic,
          is_featured: productData.isFeatured,
          is_active: productData.isActive
        });
      } catch (err) {
        console.warn('Product addition sync fallback:', err);
      }
    }

    return newProduct;
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('products').update({
          name: updates.name,
          price_inr: updates.priceInr,
          unit: updates.unit,
          stock_quantity: updates.stockQuantity,
          is_active: updates.isActive,
          description: updates.description,
          image_url: updates.imageUrl
        }).eq('id', id);
      } catch (err) {
        console.warn('Product update sync fallback:', err);
      }
    }
  };

  const deleteProduct = async (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('products').delete().eq('id', id);
      } catch (err) {
        console.warn('Product deletion sync fallback:', err);
      }
    }
  };

  const toggleProductActive = async (id: string) => {
    const item = products.find(p => p.id === id);
    if (item) {
      await updateProduct(id, { isActive: !item.isActive });
    }
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status } : o))
    );
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('orders').update({ status }).eq('id', orderId);
      } catch (err) {
        console.warn('Order status sync fallback:', err);
      }
    }
  };

  const updateEnquiryStatus = async (enquiryId: string, status: EnquiryStatus) => {
    setEnquiries(prev =>
      prev.map(e => (e.id === enquiryId ? { ...e, status } : e))
    );
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('tourism_enquiries').update({ status }).eq('id', enquiryId);
      } catch (err) {
        console.warn('Enquiry status sync fallback:', err);
      }
    }
  };

  const resetToDemoData = () => {
    localStorage.removeItem('sindhudurg_products');
    localStorage.removeItem('sindhudurg_tourisms');
    localStorage.removeItem('sindhudurg_orders');
    localStorage.removeItem('sindhudurg_enquiries');
    localStorage.removeItem('sindhudurg_favorites');
    setProducts(INITIAL_PRODUCTS);
    setTourismListings(INITIAL_TOURISMS);
  };

  return (
    <MarketplaceContext.Provider
      value={{
        products,
        tourismListings,
        sellers,
        categories,
        orders,
        enquiries,
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
        resetToDemoData
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
