# Flipkart-Style E-commerce Starter (Next.js + React + TypeScript)

A structured starter to build a Flipkart-like e-commerce app with:

- React (through Next.js App Router)
- Next.js
- TypeScript
- Tailwind CSS

---

## 1) Create the GitHub repository (step-by-step)

### Step 1 — Create repo on GitHub

1. Open GitHub → **New repository**.
2. Repo name suggestion: `flipkart-clone-nextjs`.
3. Choose visibility (public/private).
4. Click **Create repository**.

### Step 2 — Clone to your machine

```bash
git clone <your-repo-url>
cd flipkart-clone-nextjs
```

### Step 3 — Install packages

```bash
npm install
```

### Step 4 — Run the app

```bash
npm run dev
```

Open: [http://localhost:3000](http://localhost:3000)

---

## 2) If starting from zero (create-next-app command)

```bash
npx create-next-app@latest . --typescript --eslint --tailwind --app --src-dir=false --import-alias "@/*"
```

---

## 3) Project structure and folder strategy

```text
.
├── app/                      # Pages/routes with Next.js App Router
│   ├── products/             # Listing + product details routes
│   ├── cart/                 # Cart route
│   └── checkout/             # Checkout route
├── components/               # Shared UI components
├── data/                     # Static/demo data
├── features/                 # Domain-based modules (products, cart, auth)
├── lib/                      # Shared utilities (env, constants, helpers)
├── services/                 # API clients and integration helpers
├── public/                   # Static assets
└── package.json              # Scripts/dependencies/lint-staged config
```

---

## 4) Phase A setup (already implemented)

### A1. Environment variables

```bash
cp .env.example .env.local
```

- `.env.example` contains app/API/auth/database placeholders.
- `lib/env.ts` gives typed env access with required checks for public vars.

### A2. Folder architecture

- `features/` for domain modules (example: `features/products`, `features/cart`)
- `lib/` for shared logic
- `services/` for HTTP/API wrappers

### A3. Formatting and commit quality gates

- Prettier: `npm run format`, `npm run format:check`
- lint-staged + Husky pre-commit hook

---

## 5) Phase B (implemented in this repo)

### B1. Commerce routes

- `/products` → searchable/filterable/sortable product listing
- `/products/[slug]` → product details page
- `/cart` → cart management page
- `/checkout` → basic checkout and place-order flow

### B2. Cart state

- `features/cart/CartProvider.tsx` provides app-wide cart state
- Add/remove/update quantity actions
- LocalStorage persistence across refreshes
- Cart counter badge in header

### B3. URL query sync for search/filter/sort

`/products` uses URL params:

- `q` for search text
- `category` for category filter
- `sort` for sorting mode

Examples:

- `/products?q=samsung`
- `/products?category=electronics&sort=price-asc`

---

## 6) Commands

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run format
npm run format:check
```

---

## 7) Next feature backlog (Phase C and beyond)

- API/database integration (Prisma/Postgres or MongoDB)
- Authentication and protected checkout
- Coupons, addresses, payment gateway
- Orders and returns module
- Unit, integration, and E2E test coverage
- CI/CD + observability
