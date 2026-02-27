# Flipkart-Style E-commerce Starter (Next.js + React + TypeScript)

A structured starter for a Flipkart-like e-commerce app with React, Next.js, TypeScript, Tailwind, and **Phase C backend integration using MongoDB Atlas Data API**.

## Quick start

```bash
git clone <your-repo-url>
cd flipkart-clone-nextjs
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000

## Environment (`.env.local`)

```env
NEXT_PUBLIC_APP_NAME=Flipkart Clone Starter
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
JWT_SECRET=replace-with-a-long-random-secret
MONGODB_DATA_API_URL=https://data.mongodb-api.com/app/<app-id>/endpoint/data/v1/action
MONGODB_DATA_API_KEY=replace-with-data-api-key
MONGODB_DATABASE=flipkart_clone
```

## Implemented phases

### Phase A

- folder strategy (`features`, `lib`, `services`)
- formatting/lint tooling
- typed env helper

### Phase B

- `/products` with search/filter/sort via URL params
- `/products/[slug]` details page
- `/cart` and `/checkout` flow

### Phase C

- **Login + signup feature** (`/login`, `/signup`)
- auth APIs:
  - `POST /api/auth/signup`
  - `POST /api/auth/login`
  - `POST /api/auth/logout`
  - `GET /api/auth/me`
- order APIs with payment state:
  - `POST /api/orders` (creates order with `paymentStatus: pending`)
  - `GET /api/orders` (current user order history)
- `/orders` page to view placed orders
- checkout persists order to MongoDB API

## Commands

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run format
npm run format:check
```
