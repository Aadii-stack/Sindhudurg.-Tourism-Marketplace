# DESIGN.md - Sindhudurg Tourism & Local Products Marketplace

## 1. Executive Summary & Project Intent
**Sindhudurg Tourism & Local Products Marketplace** is a full-stack e-commerce and tourism discovery platform designed for the Konkan coastal district of Sindhudurg, Maharashtra, India. It empowers local farmers, artisans (such as Sawantwadi woodcrafters), homestay owners, and certified maritime guides (Tarkarli scuba, Malvani boatmen) by providing a unified digital gateway for conscious travelers and regional product connoisseurs.

---

## 2. Visual Identity & UI/UX Design System

### 2.1 Color Palette
Reflecting the Konkan coastline, basalt sea forts, tropical foliage, and Alphonso mango orchards:
- **Primary / Ocean Deep**: `#0B2545` (Header, primary text, prominent branding)
- **Secondary / Coastal Teal**: `#134E5E` / `#0D9488` (Accents, badges, active states)
- **Warm Sand Background**: `#FDFBF7` / `#F8F5EE` (Earthy, warm, authentic contrast to cold sterile white)
- **Card Background**: `#FFFFFF` with border `#EAE4D9`
- **Mango Gold Accent**: `#D97706` / `#F59E0B` (CTAs, ratings, regional emphasis)
- **Kokum Berry Muted**: `#881337` / `#BE123C` (Food highlights, seasonal flags)
- **Text Primary**: `#0F172A`
- **Text Muted**: `#475569`

### 2.2 Typography & Spacing
- **Font Stack**: `Plus Jakarta Sans` or `Inter`, system serif accents for heritage headings (`Merriweather` / `Playfair Display`).
- **Hierarchy**:
  - Hero Display: `text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900`
  - Section Headings: `text-2xl sm:text-3xl font-semibold text-slate-900`
  - Card Titles: `text-lg font-semibold text-slate-800`
  - Body: `text-sm sm:text-base text-slate-600 leading-relaxed`
  - Meta/Badges: `text-xs font-medium tracking-wide uppercase`

### 2.3 UI Anti-Patterns Strictly Avoided
- No neon glows or AI-style oversaturated purple/cyan gradients.
- No gigantic generic template heroes with fake stock photos; all imagery is specific to Sindhudurg (Sindhudurg Fort, Tarkarli, Sawantwadi wooden craft, Alphonso mangoes, Kokum agal, Malvani cuisine).
- No unclickable dummy buttons; every link, tab, filter, enquiry, and cart trigger has a real interactive flow.
- Non-functional payment disclaimer clearly shown at demo checkout.

---

## 3. System Architecture & Component Structure

### 3.1 Tech Stack
- **Frontend Framework**: React 18 / 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v3/v4 utility classes + Lucide React icons
- **State Management**: React Context (`CartContext`, `AuthContext`, `MarketplaceContext`) with localStorage persistence and Supabase synchronization.
- **Backend / Database**: Supabase PostgreSQL + Supabase Auth + Supabase Storage (with graceful zero-config Demo Mode fallback).
- **Deployment**: Vercel & Docker containerized setup.

### 3.2 Directory Structure
```
ed/
├── .env.example
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── README.md
├── DESIGN.md
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
├── supabase/
│   ├── migrations/
│   │   └── 20261025_init_schema.sql
│   └── seed.sql
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── DemoBanner.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── NotificationToast.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── CategoryGrid.tsx
│   │   │   ├── FeaturedProducts.tsx
│   │   │   ├── TourismSpotlight.tsx
│   │   │   ├── WhyChooseLocal.tsx
│   │   │   └── ArtisanStories.tsx
│   │   ├── products/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductFilters.tsx
│   │   │   └── ProductDetailModal.tsx
│   │   ├── tourism/
│   │   │   ├── TourismCard.tsx
│   │   │   ├── TourismFilters.tsx
│   │   │   ├── TourismDetailModal.tsx
│   │   │   └── BookingEnquiryModal.tsx
│   │   ├── cart/
│   │   │   ├── CartDrawer.tsx
│   │   │   └── CheckoutModal.tsx
│   │   ├── auth/
│   │   │   └── AuthModal.tsx
│   │   └── dashboard/
│   │       ├── UserDashboard.tsx
│   │       ├── AdminDashboard.tsx
│   │       └── AddEditProductModal.tsx
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   ├── CartContext.tsx
│   │   └── MarketplaceContext.tsx
│   ├── data/
│   │   ├── seedData.ts
│   │   └── sindhudurgInfo.ts
│   ├── lib/
│   │   ├── supabaseClient.ts
│   │   └── utils.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
```

---

## 4. Data Flow & Database Model

### 4.1 Supabase Schema Entity-Relationship
- **`profiles`**: `id (UUID FK auth.users)`, `full_name`, `phone`, `role ('customer'|'seller'|'admin')`, `avatar_url`, `created_at`.
- **`sellers`**: `id (UUID)`, `user_id (FK profiles)`, `business_name`, `taluka` (Malvan, Sawantwadi, Vengurla, Kudal, Kankavli, Devgad), `specialty`, `phone`, `story`, `verified (boolean)`.
- **`product_categories`**: `id (UUID)`, `name`, `slug`, `icon`, `description`.
- **`products`**: `id (UUID)`, `seller_id (FK sellers)`, `category_id (FK product_categories)`, `name`, `slug`, `description`, `price_inr`, `unit`, `stock_quantity`, `is_active`, `origin_taluka`, `image_url`, `is_featured`, `created_at`.
- **`tourism_listings`**: `id (UUID)`, `seller_id (FK sellers)`, `title`, `category ('fort'|'water_sports'|'homestay'|'culture'|'nature')`, `location_taluka`, `duration`, `price_indicative_inr`, `description`, `highlights (text[])`, `image_url`, `is_active`, `created_at`.
- **`orders`**: `id (UUID)`, `user_id (FK profiles)`, `order_code`, `customer_name`, `customer_email`, `customer_phone`, `shipping_address`, `total_amount_inr`, `status ('pending'|'confirmed'|'dispatched'|'delivered')`, `created_at`.
- **`order_items`**: `id (UUID)`, `order_id (FK orders)`, `product_id (FK products)`, `quantity`, `price_at_purchase_inr`.
- **`tourism_enquiries`**: `id (UUID)`, `user_id (FK profiles)`, `listing_id (FK tourism_listings)`, `customer_name`, `customer_email`, `customer_phone`, `preferred_date`, `guests_count`, `notes`, `status ('received'|'contacted'|'closed')`, `created_at`.
- **`favorites`**: `id (UUID)`, `user_id (FK profiles)`, `item_type ('product'|'tourism')`, `item_id (UUID)`, `created_at`.

### 4.2 Row Level Security (RLS) Strategy
- Anyone (anon + authenticated) can `SELECT` active products and active tourism listings.
- Authenticated users can insert their own orders and enquiries, and view their own records.
- Sellers and Admins can update/insert products and listings linked to their seller ID or as system admins.

### 4.3 Hybrid Online & Offline Resilience (Zero-Config First Run)
When `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are not set in `.env`, the client initializes in **Autonomous Demo Mode**:
- Loads verified seed data directly from `src/data/seedData.ts`.
- Persists cart, new orders, mock enquiries, and newly created admin products into browser `localStorage`.
- Allows instant evaluation without blockers, complete with an indicator badge explaining the setup.

---

## 5. Coding Conventions
- Strictly typed TypeScript interfaces for all data structures in `src/types/index.ts`.
- Functional React components with descriptive prop types.
- Zero `any` types where possible.
- Pure Tailwind CSS utility classes; no inline style hacks.
- Mobile-first responsive layouts with clean breakpoint tags (`sm:`, `md:`, `lg:`, `xl:`).
- Accessible keyboard navigation, clear ARIA labels on modals and buttons.

---

## 6. Deployment & Reproducibility Strategy
- **Local Dev**: `npm run dev` (Vite port 5173).
- **Docker**: `docker compose up --build` serving optimized Vite preview/nginx container.
- **Vercel**: `npm run build` outputs to `dist/`, simple static SPA routing via `vercel.json`.
