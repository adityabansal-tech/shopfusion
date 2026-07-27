# 🛍️ ShopFusion — Full-Stack E-Commerce Platform

ShopFusion is a modern, enterprise-grade e-commerce web application built with **Next.js 16**, **React**, **TypeScript**, **Prisma ORM**, and **Supabase PostgreSQL**. It features a smooth shopping interface, serverless database connection pooling, user authentication, dynamic product catalog management, payment gateway integration, and progressive web app (PWA) readiness.

---

## 🚀 Key Features

### 🛒 **Customer Experience**
* **Dynamic Product Catalog:** Explore products categorized by collections (Men, Women, Featured, Top Sellers) with custom filtering and pagination.
* **Interactive Product Details:** Dynamic image galleries, product specifications, customer reviews, and related products.
* **Smart Cart & Wishlist Management:** Real-time state management for managing cart items, updating quantities, and preserving wishlists.
* **Seamless Checkout & Payment:** Integrated payment processing flow supporting order creation and real-time payment verification.
* **Order History & Tracking:** Detailed customer order completion summaries and transactional tracking.

### ⚡ **Admin Dashboard & Analytics**
* **Management Console:** Dedicated routes for monitoring store metrics, customer accounts, and order fulfillment (`/admin`, `/admin/analytics`, `/admin/orders`).
* **Inventory & Product Management:** Full CRUD operations for products, custom metadata, and image media hosting.

### 🛡️ **Architecture & Performance**
* **Optimized Database Pooling:** Powered by Supabase PostgreSQL and Prisma ORM using transaction pooling (`port 6543`) for high-concurrency serverless scalability.
* **Incremental Static Regeneration (ISR) & Dynamic Rendering:** High-speed page delivery tailored for SEO and dynamic e-commerce data fetching.
* **Edge-Ready Security:** Middleware-protected private routes, secure API endpoints, and authentication handlers.

---

## 🛠️ Tech Stack

* **Framework:** [Next.js 16](https://nextjs.org/) (App Router & Server Actions)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Database & ORM:** [Supabase PostgreSQL](https://supabase.com/) & [Prisma ORM](https://www.prisma.io/)
* **Authentication:** Supabase Auth
* **Styling & UI:** [Tailwind CSS](https://tailwindcss.com/), Lucide Icons
* **Media Management:** Cloudinary / Picsum
* **PWA Integration:** `@serwist/next`
* **Deployment:** [Vercel](https://vercel.com/)

---

## 📁 Repository Structure

```text
shopfusion/
├── prisma/
│   └── schema.prisma         # Prisma database schemas & models
├── src/
│   ├── app/                  # Next.js App Router (Routes, API endpoints, Admin panel)
│   │   ├── (public)/         # Product pages, cart, men/women collections
│   │   ├── admin/            # Admin dashboard, analytics, and product management
│   │   ├── api/              # API routes (Payment, Order, Wishlist, Cart)
│   │   └── auth/             # Login, signup, and callback handlers
│   ├── components/           # Reusable UI components (Navbar, Footer, Modals)
│   └── lib/                  # Database connection singletons and utility functions
├── public/                   # Static assets & service worker definitions
├── next.config.mjs           # Next.js configuration & image domains
└── package.json              # Project dependencies and build scripts
