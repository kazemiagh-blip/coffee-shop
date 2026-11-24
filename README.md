# ☕ Coffee Shop ("coffee-shop")

An artisanal specialty coffee shop web application crafted with Next.js 14, Tailwind CSS, TypeScript, and Supabase.

## 🌟 Features
- **Design System**: Warm, elegant brown, cream, and gold palette with responsive layout.
- **Pages**:
  - **Home**: Hero banner, roastery story, customer reviews, and featured coffees.
  - **Menu**: Category filters, real-time search, sorting, and full 8 specialty coffee products with prices in AED.
  - **Cart**: Quantity adjustments, item removal, promo code discount (`GOLD10`), live VAT & delivery calculations.
  - **Checkout**: Form validation, address details across UAE Emirates, multiple payment methods (Cash on Delivery, Credit/Debit Card, Apple Pay), and instant order placement.
- **Supabase Integration**:
  - `products` table for live menu fetching.
  - `orders` table to record customer orders upon checkout.

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Copy `.env.local.example` to `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the website.

4. **Database Setup**:
   Run `supabase/schema.sql` in your Supabase SQL Editor to initialize the `products` and `orders` tables.
