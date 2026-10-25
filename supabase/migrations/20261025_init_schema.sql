-- ====================================================================
-- Sindhudurg Tourism & Local Products Marketplace
-- Initial Database Migration
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS & DOMAINS
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('customer', 'seller', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'dispatched', 'delivered', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE tourism_category AS ENUM ('fort', 'water_sports', 'homestay', 'culture', 'nature', 'food');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE enquiry_status AS ENUM ('received', 'contacted', 'confirmed', 'closed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. PROFILES TABLE (Linked with Supabase Auth users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    role user_role DEFAULT 'customer' NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. SELLERS TABLE
CREATE TABLE IF NOT EXISTS public.sellers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    business_name TEXT NOT NULL,
    owner_name TEXT NOT NULL,
    taluka TEXT NOT NULL, -- Malvan, Sawantwadi, Vengurla, Devgad, Kudal, Kankavli, Dodamarg, Vaibhavwadi
    address TEXT,
    phone TEXT NOT NULL,
    email TEXT,
    specialty TEXT NOT NULL,
    story TEXT,
    avatar_url TEXT,
    banner_url TEXT,
    is_verified BOOLEAN DEFAULT true NOT NULL,
    rating NUMERIC(2,1) DEFAULT 4.8,
    reviews_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 5. PRODUCT CATEGORIES
CREATE TABLE IF NOT EXISTS public.product_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 6. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seller_id UUID REFERENCES public.sellers(id) ON DELETE CASCADE NOT NULL,
    category_id UUID REFERENCES public.product_categories(id) ON DELETE RESTRICT NOT NULL,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT NOT NULL,
    price_inr NUMERIC(10,2) NOT NULL CHECK (price_inr >= 0),
    mrp_inr NUMERIC(10,2),
    unit TEXT NOT NULL, -- e.g., '1 Dozen', '500g', '1 Litre', '1 Piece'
    stock_quantity INT DEFAULT 50 NOT NULL CHECK (stock_quantity >= 0),
    origin_taluka TEXT NOT NULL,
    image_url TEXT NOT NULL,
    additional_images TEXT[] DEFAULT '{}',
    is_organic BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true NOT NULL,
    rating NUMERIC(2,1) DEFAULT 4.9,
    reviews_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 7. TOURISM LISTINGS TABLE
CREATE TABLE IF NOT EXISTS public.tourism_listings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seller_id UUID REFERENCES public.sellers(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    category tourism_category NOT NULL,
    location_taluka TEXT NOT NULL,
    address TEXT,
    duration TEXT NOT NULL, -- e.g., '3-4 Hours', 'Full Day', 'Overnight'
    price_indicative_inr NUMERIC(10,2) NOT NULL,
    price_label TEXT DEFAULT 'per person',
    description TEXT NOT NULL,
    highlights TEXT[] DEFAULT '{}',
    included TEXT[] DEFAULT '{}',
    image_url TEXT NOT NULL,
    additional_images TEXT[] DEFAULT '{}',
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true NOT NULL,
    rating NUMERIC(2,1) DEFAULT 4.9,
    reviews_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 8. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    order_code TEXT NOT NULL UNIQUE,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    shipping_address TEXT NOT NULL,
    taluka TEXT,
    pincode TEXT NOT NULL,
    subtotal_inr NUMERIC(10,2) NOT NULL,
    delivery_fee_inr NUMERIC(10,2) DEFAULT 0,
    total_amount_inr NUMERIC(10,2) NOT NULL,
    status order_status DEFAULT 'confirmed' NOT NULL,
    payment_method TEXT DEFAULT 'Demo Mode / Pay on Delivery',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 9. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE RESTRICT NOT NULL,
    product_name TEXT NOT NULL,
    product_price_inr NUMERIC(10,2) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    subtotal_inr NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 10. TOURISM ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.tourism_enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    listing_id UUID REFERENCES public.tourism_listings(id) ON DELETE CASCADE NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    preferred_date DATE,
    guests_count INT DEFAULT 2 NOT NULL,
    notes TEXT,
    status enquiry_status DEFAULT 'received' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 11. FAVORITES TABLE
CREATE TABLE IF NOT EXISTS public.favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    item_type TEXT NOT NULL CHECK (item_type IN ('product', 'tourism')),
    item_id UUID NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE(user_id, item_type, item_id)
);

-- ====================================================================
-- INDEXES FOR PERFORMANCE
-- ====================================================================
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_seller ON public.products(seller_id);
CREATE INDEX IF NOT EXISTS idx_products_active ON public.products(is_active);
CREATE INDEX IF NOT EXISTS idx_tourism_category ON public.tourism_listings(category);
CREATE INDEX IF NOT EXISTS idx_tourism_taluka ON public.tourism_listings(location_taluka);
CREATE INDEX IF NOT EXISTS idx_orders_user ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_listing ON public.tourism_enquiries(listing_id);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sellers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tourism_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tourism_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- 1. Profiles
CREATE POLICY "Public profiles can be viewed by everyone"
    ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can edit their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- 2. Sellers
CREATE POLICY "Sellers public view"
    ON public.sellers FOR SELECT USING (true);

CREATE POLICY "Sellers can update own details"
    ON public.sellers FOR ALL
    USING (auth.uid() = user_id);

-- 3. Product Categories
CREATE POLICY "Categories viewable by all"
    ON public.product_categories FOR SELECT USING (true);

-- 4. Products
CREATE POLICY "Active products viewable by all"
    ON public.products FOR SELECT
    USING (is_active = true OR auth.role() = 'authenticated');

CREATE POLICY "Sellers can manage products"
    ON public.products FOR ALL
    USING (auth.uid() IN (SELECT user_id FROM public.sellers WHERE id = seller_id));

-- 5. Tourism Listings
CREATE POLICY "Active tourism listings viewable by all"
    ON public.tourism_listings FOR SELECT
    USING (is_active = true OR auth.role() = 'authenticated');

CREATE POLICY "Sellers can manage tourism listings"
    ON public.tourism_listings FOR ALL
    USING (auth.uid() IN (SELECT user_id FROM public.sellers WHERE id = seller_id));

-- 6. Orders
CREATE POLICY "Users can view own orders"
    ON public.orders FOR SELECT
    USING (auth.uid() = user_id OR auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

CREATE POLICY "Anyone can create demo order"
    ON public.orders FOR INSERT
    WITH CHECK (true);

-- 7. Order Items
CREATE POLICY "Users view own order items"
    ON public.order_items FOR SELECT
    USING (EXISTS (SELECT 1 FROM public.orders WHERE id = order_items.order_id AND (user_id = auth.uid() OR auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'))));

CREATE POLICY "Anyone can insert order items"
    ON public.order_items FOR INSERT
    WITH CHECK (true);

-- 8. Tourism Enquiries
CREATE POLICY "Users view own enquiries"
    ON public.tourism_enquiries FOR SELECT
    USING (auth.uid() = user_id OR auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('admin', 'seller')));

CREATE POLICY "Anyone can submit enquiry"
    ON public.tourism_enquiries FOR INSERT
    WITH CHECK (true);

-- 9. Favorites
CREATE POLICY "Users manage own favorites"
    ON public.favorites FOR ALL
    USING (auth.uid() = user_id);

-- Automatic Profile Creation on Signup Trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, email, role)
    VALUES (
        new.id,
        COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
        new.email,
        'customer'
    );
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
