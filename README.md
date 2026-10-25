# Sindhudurg Tourism & Local Products Marketplace

An end-to-end, responsive full-stack MVP web application built for the **Entrepreneurship Development (ED)** project, powered by a **100% Local JSON Database Engine (`src/data/database.json`)**.

This centralized digital marketplace bridges tourists and conscious consumers with local farmers, artisans, and certified tourism guides across the 8 talukas of **Sindhudurg District, Konkan, Maharashtra, India** (Devgad, Malvan, Sawantwadi, Vengurla, Kudal, Kankavli, Dodamarg, and Vaibhavwadi).

---

## 🌴 Key Highlights

- **100% Local JSON Database (`src/data/database.json`)**: Zero cloud dependencies, zero external database setup, offline-ready, and instant evaluation.
- **JSON Portability & Backup Tools**: Real-time browser persistence, 1-click **Export Database JSON (`sindhudurg-data.json`)**, **Import JSON payload**, and **Reset to Factory Seed JSON**.
- **Konkan Visual Identity**: Deep Ocean Blue (`#0B2545`), Coastal Teal (`#0D9488`), Warm Sand (`#FDFBF7`), and restrained Mango Gold accents (`#D97706`).
- **Authentic Regional Catalog**:
  - Devgad GI Alphonso mangoes and pure natural pulp
  - Sawantwadi 300-year royal lacquerware wooden toys
  - Wild Kokum Agal and herbal concentrates
  - Stone-ground Malvani Sunday masalas with wild Tirphal pepper
  - Vengurla jumbo grade W210 roasted cashews
- **Coastal Tourism & Heritage**:
  - Tarkarli coral reef scuba diving with PADI certified guides
  - Sindhudurg Sea Fort (1664 CE) ramparts trail & island ferry
  - Sawantwadi Palace master chitari craft workshop
  - Coastal Mithbav farm homestay & clay chulha culinary masterclass
  - Vengurla dolphin sunset cruise & 1877 Dutch lighthouse tour
- **Interactive Cart & Demo Checkout**:
  - Live subtotal calculation with free delivery meter (threshold ₹999).
  - Delivery details form with taluka and pincode verification.
  - Generates realistic order tracking numbers (`SDG-XXXXXX`) and printable receipts. Real payment integration is purposefully disabled to protect user privacy and avoid accidental charges.
- **1-Click Evaluator Persona Switcher**:
  - **Tourist / Customer** (`Rohit Deshmukh`)
  - **Local Producer / Seller** (`Dattaram Rane - Devgad Orchardist`)
  - **District Admin** (`Sindhudurg District Admin Council`)
- **Admin Center**: Full CRUD controls to add/edit/hide products, update order fulfillment status, manage tourism booking inquiries, and inspect local JSON metrics.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 18 + TypeScript + Vite |
| **Styling** | Tailwind CSS + Lucide React Icons |
| **Database & Storage** | **100% Local JSON Database (`src/data/database.json`)** + Browser LocalStorage Engine |
| **State Management** | React Context (`AuthContext`, `CartContext`, `MarketplaceContext`) |
| **Containerization** | Docker & Docker Compose |
| **Deployment** | Vercel (Static SPA with `vercel.json`) |

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.
The entire local JSON database will load immediately with zero additional configuration!

---

## 📦 JSON Database Management

The application stores all data locally in `src/data/database.json` and syncs live updates to browser `localStorage`.

### Exporting & Inspecting JSON:
- Click **"Inspect / Export JSON"** on the top notification bar or navigate to the **Admin Dashboard > Cloud & Maintenance** tab.
- Click **Export JSON File** to download the snapshot as `sindhudurg-database-YYYY-MM-DD.json`.
- To restore the default dataset at any time, click **Reset to Seed JSON**.

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

## 🌐 Vercel Deployment

1. Push this repository to GitHub.
2. In the [Vercel Dashboard](https://vercel.com), import this repository.
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click **Deploy**. Vercel serves the static single-page app and local JSON database instantly.

---

## 📂 Project Architecture

```
ed/
├── DESIGN.md                          # Source of Truth (Architecture, UI/UX, Data Flow)
├── README.md                          # Documentation & Setup Guide
├── Dockerfile                         # Multi-stage Containerization
├── docker-compose.yml                 # Docker Orchestration
├── vercel.json                        # Vercel SPA Routing
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── src/
    ├── types/index.ts                 # TypeScript Data Models
    ├── data/
    │   ├── database.json              # 100% Local Master JSON Database
    │   └── seedData.ts                # Seed Schema Mirror
    ├── lib/
    │   ├── jsonDatabase.ts            # Local JSON Database Engine & Portability
    │   └── utils.ts                   # INR Currency Formatting & Helpers
    ├── context/
    │   ├── AuthContext.tsx            # Local JSON Authentication & Role Switcher
    │   ├── CartContext.tsx            # Cart Operations & Free Shipping Calculator
    │   └── MarketplaceContext.tsx     # Centralized State Engine
    ├── components/
    │   ├── common/                    # Navbar, Footer, DemoBanner, Badges, Modals
    │   ├── home/                      # Hero, CategoryGrid, Featured, Spotlight, etc.
    │   ├── products/                  # ProductCard, DetailModal, Catalogue with Filters
    │   ├── tourism/                   # TourismCard, DetailModal, BookingEnquiryModal
    │   ├── cart/                      # CartDrawer, CheckoutModal (with Demo Invoice)
    │   ├── auth/                      # AuthModal (Sign In / Register / Quick Switch)
    │   ├── dashboard/                 # UserDashboard, AdminDashboard, AddEditProductModal
    │   └── sellers/                   # SellersPage
    ├── App.tsx
    ├── main.tsx
    └── index.css
```

---

## 🎓 Academic Compliance Note

Developed exclusively as an educational prototype for the **Entrepreneurship Development (ED)** project:
- Uses a local JSON architecture so that students, teachers, and project evaluators can run the app without creating external cloud accounts or submitting credit card information.
- Product listings, prices, and booking confirmations are demonstration records designed to simulate digital market enablement for Sindhudurg artisans and farmers.
