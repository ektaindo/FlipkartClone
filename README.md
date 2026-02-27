# Flipkart-Style E-commerce Starter (Next.js + React + TypeScript)

This starter now uses **Firebase Firestore** for backend persistence (users + orders), along with custom cookie auth.

## Quick start

```bash
git clone <your-repo-url>
cd flipkart-clone-nextjs
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000

---

## Firebase setup (after you generated private key)

Since you already generated a service account private key, do this next:

1. Open your service account JSON file.
2. Copy these values into `.env.local`:

```env
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

3. Also set app/auth vars:

```env
NEXT_PUBLIC_APP_NAME=Flipkart Clone Starter
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
JWT_SECRET=replace-with-a-long-random-secret
```

4. In Firebase Console:

   - Build → Firestore Database
   - Create database
   - Choose **Firestore Native mode (Standard)**
   - Start with **Production mode** rules (recommended)

5. Run app and test:
   - `/signup` to create a user
   - `/login` to sign in
   - add items to cart
   - `/checkout` place order
   - `/orders` view order history

### If you see `error:1E08010C:DECODER routines::unsupported` on signup/login

This means the private key format is invalid at runtime. Verify:

1. Use `private_key` from service account JSON (not private_key_id).
2. Keep it in one env line with escaped newlines:

```env
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

3. If your shell already expands newlines, do not double-escape.
4. Restart dev server after updating `.env.local`.

---

## Implemented backend routes

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `POST /api/orders`
- `GET /api/orders`

---

## Commands

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run format
npm run format:check
```
