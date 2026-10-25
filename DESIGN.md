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
- **Frontend Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS utility classes + Lucide React icons
- **State Management**: React Context (`CartContext`, `AuthContext`, `MarketplaceContext`) with full Local JSON Database synchronization and persistence.
- **Backend & Storage**: 100% Local JSON Database Engine (`src/data/database.json`) with LocalStorage persistence and JSON Backup/Import/Export. Zero external cloud dependencies, zero Supabase requirement.
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
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── DemoBanner.tsx (Local JSON Status & Inspector)
│   │   │   ├── Badge.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── NotificationToast.tsx
│   │   ├── home/
│   │   ├── products/
│   │   ├── tourism/
│   │   ├── cart/
│   │   ├── auth/
│   │   └── dashboard/
│   ├── context/
│   │   ├── AuthContext.tsx (Local JSON User Authentication)
│   │   ├── CartContext.tsx
│   │   └── MarketplaceContext.tsx (Local JSON CRUD Engine)
│   ├── data/
│   │   ├── database.json (Full Local JSON Database)
│   │   └── seedData.ts (Typed Schemas & Seed Dataset)
│   ├── lib/
│   │   ├── jsonDatabase.ts (Local JSON Storage Manager)
│   │   └── utils.ts
│   ├── types/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
```

---

## 4. Local JSON Database Architecture

### 4.1 JSON Data Models (`database.json`)
The complete system is powered by structured, relational-like JSON entities:
- **`profiles`**: User profiles with roles (`customer`, `seller`, `admin`).
- **`sellers`**: Verified local producer profiles, taluka affiliation, and ratings.
- **`categories`**: Product taxonomy (Devgad mangoes, cashews, kokum, wooden crafts, masalas).
- **`products`**: Catalog items with price (INR), stock, taluka, GI tag, and images.
- **`tourism`**: Heritage fort walks, scuba diving, homestays, and craft workshops.
- **`orders`**: Tracked order objects with generated code (`SDG-XXXXXX`), customer details, and item breakdowns.
- **`enquiries`**: Direct tourism bookings and scheduling requests.
- **`favorites`**: Saved product and experience IDs.

### 4.2 Local Persistence & Portability
- Real-time updates stored in browser storage and local JSON runtime.
- Built-in JSON Export / Import tool to save the database as `sindhudurg-data.json` and load custom data at any time.
- Reset to factory Konkan seed data button for consistent evaluator demonstrations.
- Completely self-contained: works offline and in any environment without internet or database connection.

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
