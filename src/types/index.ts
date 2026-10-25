export type UserRole = 'customer' | 'seller' | 'admin';

export type Taluka = 
  | 'Devgad' 
  | 'Malvan' 
  | 'Sawantwadi' 
  | 'Vengurla' 
  | 'Kudal' 
  | 'Kankavli' 
  | 'Dodamarg' 
  | 'Vaibhavwadi';

export type TourismCategory = 
  | 'fort' 
  | 'water_sports' 
  | 'homestay' 
  | 'culture' 
  | 'nature' 
  | 'food';

export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'dispatched' 
  | 'delivered' 
  | 'cancelled';

export type EnquiryStatus = 
  | 'received' 
  | 'contacted' 
  | 'confirmed' 
  | 'closed';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface Seller {
  id: string;
  businessName: string;
  ownerName: string;
  taluka: Taluka;
  address: string;
  phone: string;
  email: string;
  specialty: string;
  story: string;
  avatarUrl: string;
  bannerUrl?: string;
  isVerified: boolean;
  rating: number;
  reviewsCount: number;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
}

export interface Product {
  id: string;
  sellerId: string;
  sellerName?: string;
  categoryId: string;
  categoryName?: string;
  name: string;
  slug: string;
  description: string;
  priceInr: number;
  mrpInr?: number;
  unit: string;
  stockQuantity: number;
  originTaluka: Taluka;
  imageUrl: string;
  additionalImages?: string[];
  isOrganic?: boolean;
  isFeatured?: boolean;
  isActive: boolean;
  rating: number;
  reviewsCount: number;
  createdAt: string;
}

export interface TourismListing {
  id: string;
  sellerId?: string;
  providerName?: string;
  title: string;
  slug: string;
  category: TourismCategory;
  locationTaluka: Taluka;
  address: string;
  duration: string;
  priceIndicativeInr: number;
  priceLabel: string;
  description: string;
  highlights: string[];
  included: string[];
  imageUrl: string;
  additionalImages?: string[];
  isFeatured: boolean;
  isActive: boolean;
  rating: number;
  reviewsCount: number;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productPriceInr: number;
  quantity: number;
  subtotalInr: number;
  imageUrl?: string;
}

export interface Order {
  id: string;
  orderCode: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  taluka: string;
  pincode: string;
  subtotalInr: number;
  deliveryFeeInr: number;
  totalAmountInr: number;
  status: OrderStatus;
  paymentMethod: string;
  notes?: string;
  items: OrderItem[];
  createdAt: string;
}

export interface TourismEnquiry {
  id: string;
  listingId: string;
  listingTitle: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  preferredDate?: string;
  guestsCount: number;
  notes?: string;
  status: EnquiryStatus;
  createdAt: string;
}
