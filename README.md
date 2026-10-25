# Sindhudurg Tourism & Local Products Marketplace

An end-to-end, responsive full-stack MVP web application built for the **Entrepreneurship Development (ED)** project.

This centralized digital marketplace bridges tourists and conscious consumers with local farmers, artisans, and certified tourism guides across the 8 talukas of **Sindhudurg District, Konkan, Maharashtra, India** (Devgad, Malvan, Sawantwadi, Vengurla, Kudal, Kankavli, Dodamarg, and Vaibhavwadi).

---

## 🌴 Key Features

### 1. Distinct Konkan Visual Identity
- Coastal palette inspired by Sindhudurg: Deep Ocean Blue (`#0B2545`), Coastal Teal (`#0D9488`), Warm Sand (`#FDFBF7`), and restrained Mango Gold accents (`#D97706`).
- High-quality, authentic regional imagery: Sindhudurg Sea Fort (1664 CE), Tarkarli coral reef scuba diving, Devgad Alphonso orchards, and Sawantwadi royal lacquer crafts.
- Fully responsive across mobile (375px+), tablet, and desktop viewports.

### 2. Verified Local Products Marketplace
- **Devgad Alphonso Mangoes**: GI-tagged natural straw-ripened Hapus and canned pure pulp.
- **Sawantwadi Handcrafted Wooden Toys**: 300-year-old royal Chitari lacquerware using non-toxic vegetable dyes.
- **Wild Kokum Agal & Extracts**: Natural Solkadhi extract with rock salt.
- **Malvani Pantry & Spices**: Authentic stone-ground Sunday fish & chicken masalas with wild Tirphal pepper.
- **Vengurla Jumbo Cashews**: Roasted coastal W210 nuts.
- Real-time search, category filters, taluka filters, price sorting, organic toggle, and quick view detail modals.

### 3. Coastal Tourism & Living Heritage Experiences
- **Tarkarli Coral Reef Scuba Diving & Photography**: Certified PADI dive master guide accompaniment.
- **Sindhudurg Sea Fort Historic Trail**: Kurte Island ferry passage & Shivaji Maharaj heritage walkthrough.
- **Sawantwadi Palace Lacquerware Workshop**: Direct hands-on woodcraft painting with master chitari artisans.
- **Mithbav Coastal Farm Homestay**: Traditional clay chulha Malvani cooking classes and secluded beach sit-outs.
- **Vengurla Dolphin Sunset Safari**: Boat excursion and 1877 Dutch stone lighthouse tour.
- Interactive booking enquiry modal with instant demonstration voucher ticket generation.

### 4. Shopping Cart & Demonstration Checkout
- Persistent cart drawer with quantity modifiers, item removal, and live subtotal calculation.
- **Free delivery progress meter** (Free shipping for orders over ₹999).
- Delivery details capture form with taluka selector, street address, and PIN code.
- **Non-functional simulated checkout**: Complies with ED academic guidelines by keeping real payment gateways disabled and providing a simulated Cash on Delivery / UPI confirmation with printable receipt.

### 5. Multi-Persona Authentication & Evaluator Role Switcher
- Full Supabase Auth integration (Sign Up, Sign In, Profile synchronization).
- **1-Click Evaluator Quick Switch**: Instant switching between:
  1. **Tourist / Customer** (`Rohit Deshmukh`)
  2. **Local Producer / Seller** (`Dattaram Rane - Devgad Orchardist`)
  3. **District Platform Admin** (`Sindhudurg District Admin Council`)

### 6. User & Protected Admin Dashboards
- **User Dashboard**: Track active orders with status pills (*Confirmed, Dispatched, Delivered*), view submitted tourism enquiries, and access saved wishlist favorites.
- **Seller/Admin Dashboard**:
  - Live KPI statistics (Active listings, Tourism expeditions, Orders volume, Enquiries).
  - Product Catalog Manager: Add new products, edit price/stock, toggle visibility, and delete.
  - Orders Manager: Update order lifecycle state (*Confirmed → Dispatched → Delivered*).
  - Tourism Enquiries Manager: Update enquiry status (*Received → Contacted → Confirmed*).
  - Artisans & Sellers Directory: View registered cooperative profiles.

### 7. Zero-Config Autonomous Demo Mode + Supabase Hybrid Architecture
- Works out of the box with realistic seed data in browser `localStorage`.
- When valid `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are provided in `.env`, the app automatically switches to live Supabase PostgreSQL with Row Level Security (RLS).

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 18 + TypeScript + Vite |
| **Styling** | Tailwind CSS + Lucide React Icons |
| **State Management** | React Context (`AuthContext`, `CartContext`, `MarketplaceContext`) |
| **Database & Auth** | Supabase PostgreSQL + Supabase Auth + Supabase Storage |
| **Containerization** | Docker & Docker Compose |
| **Deployment** | Vercel (with `vercel.json` SPA configuration) |

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+ (tested on Node 20 / 24)
- npm or pnpm

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd ed
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
*(Leave empty to run in Zero-Config Demo Mode, or paste your Supabase credentials).*

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🐳 Docker Execution

Run containerized via Docker Compose:

```bash
docker compose up --build
```
Access the application at [http://localhost:3000](http://localhost:3000).

To stop the container:
```bash
docker compose down
```

---

## 🗄️ Supabase Cloud Setup Guide

To connect a live Supabase PostgreSQL database:

1. Create a free project at [https://supabase.com](https://supabase.com).
2. Open the Supabase **SQL Editor** tab.
3. Paste and run the schema migration:
   ```
   supabase/migrations/20261025_init_schema.sql
   ```
4. Paste and run the seed data script:
   ```
   supabase/seed.sql
   ```
5. Retrieve your project URL and public anon key from **Project Settings > API**.
6. Add them to your `.env` file:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```
7. Restart your dev server (`npm run dev`). The status badge in the top bar will update to **"Supabase Connected"**.

---

## 🌐 Vercel Deployment

1. Push this repository to GitHub.
2. In the [Vercel Dashboard](https://vercel.com), click **Add New Project** and select this repository.
3. The build settings will be auto-detected:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. In **Environment Variables**, add:
   - `VITE_SUPABASE_URL` (optional for live Supabase)
   - `VITE_SUPABASE_ANON_KEY` (optional for live Supabase)
5. Click **Deploy**. Vercel will build and serve the application globally via the included `vercel.json` SPA rewrite rules.

---

## 📂 Project Architecture

```
ed/
├── DESIGN.md                          # Source of Truth for UX/Architecture
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── Dockerfile
├── docker-compose.yml
├── vercel.json
├── supabase/
│   ├── migrations/
│   │   └── 20261025_init_schema.sql  # Tables, RLS policies, indexes
│   └── seed.sql                       # Rich Konkan product & tour seeds
├── src/
│   ├── types/index.ts                 # TypeScript data contracts
│   ├── data/seedData.ts               # Local client-side seed mirror
│   ├── lib/
│   │   ├── supabaseClient.ts          # Resilient Supabase client
│   │   └── utils.ts                   # INR formatting & helpers
│   ├── context/
│   │   ├── AuthContext.tsx            # Multi-role authentication & quick demo switch
│   │   ├── CartContext.tsx            # Cart operations & free shipping calculator
│   │   └── MarketplaceContext.tsx     # Unified data provider & persistence
│   ├── components/
│   │   ├── common/                    # Navbar, Footer, DemoBanner, Badges, Modals
│   │   ├── home/                      # Hero, CategoryGrid, Featured, Spotlight, etc.
│   │   ├── products/                  # ProductCard, DetailModal, Catalogue
│   │   ├── tourism/                   # TourismCard, DetailModal, EnquiryModal
│   │   ├── cart/                      # CartDrawer, CheckoutModal
│   │   ├── auth/                      # AuthModal
│   │   ├── dashboard/                 # UserDashboard, AdminDashboard, ProductModal
│   │   └── sellers/                   # SellersPage
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
```

---

## 🎓 Academic Compliance & Integrity Note

Developed exclusively as an educational prototype for the **Entrepreneurship Development (ED)** project:
- All sample product listings and prices are demonstrative and clearly marked.
- Payment integration is disabled by design to ensure zero accidental charges during student and evaluator testing.
- No real commercial endorsements or customer warranties are claimed.
