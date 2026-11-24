-- ==========================================================
-- Coffee Shop Database Schema for Supabase
-- Tables: products, orders
-- ==========================================================

-- 1. Create PRODUCTS table
create table if not exists public.products (
  id text primary key,
  name text not null,
  description text not null,
  price numeric(10, 2) not null,
  category text not null,
  image text not null,
  rating numeric(3, 1) default 5.0,
  badge text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS) on products
alter table public.products enable row level security;

-- Allow public read access to products
create policy "Allow public read access on products"
  on public.products for select
  to public
  using (true);

-- 2. Create ORDERS table
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  order_number text not null unique,
  customer_name text not null,
  email text not null,
  phone text not null,
  emirate text not null,
  area text,
  street text not null,
  building text not null,
  notes text,
  payment_method text not null,
  items jsonb not null,
  subtotal numeric(10, 2) not null,
  tax numeric(10, 2) not null,
  delivery_fee numeric(10, 2) not null,
  total numeric(10, 2) not null,
  status text default 'pending' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS) on orders
alter table public.orders enable row level security;

-- Allow public to insert new orders from checkout
create policy "Allow public insert on orders"
  on public.orders for insert
  to public
  with check (true);

-- Allow public to read their orders
create policy "Allow public read access on orders"
  on public.orders for select
  to public
  using (true);

-- ==========================================================
-- 3. SEED INITIAL 8 COFFEE PRODUCTS
-- ==========================================================
insert into public.products (id, name, description, price, category, image, rating, badge)
values
  (
    'prod-1',
    'Royal Dubai Gold Espresso',
    'Double shot of single-origin Ethiopian Yirgacheffe crowned with edible 24K gold leaf and dense, velvety crema.',
    28.00,
    'Signature Blends',
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
    4.9,
    'Signature'
  ),
  (
    'prod-2',
    'Caramel Macchiato Royale',
    'Steamed creamy whole milk marked with bold roasted espresso, infused with Madagascan vanilla and rich golden caramel drizzle.',
    26.00,
    'Espresso & Hot',
    'https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=800&auto=format&fit=crop',
    4.8,
    'Best Seller'
  ),
  (
    'prod-3',
    'Saffron & Cardamom Qahwa Latte',
    'Heritage Emirati blend infused with crushed green cardamom pods, prized saffron strands, and textured oat milk.',
    25.00,
    'Signature Blends',
    'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop',
    5.0,
    'Heritage'
  ),
  (
    'prod-4',
    'Spanish Latte Supremo',
    'Silky sweetened condensed milk base layered with a robust double espresso shot and creamy micro-foam.',
    24.00,
    'Espresso & Hot',
    'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=800&auto=format&fit=crop',
    4.9,
    'Popular'
  ),
  (
    'prod-5',
    'Kyoto 16-Hour Cold Brew',
    'Slow cold-water drip extracted drop by drop from single-origin Colombian beans; notes of cacao and candied orange.',
    29.00,
    'Cold Brews & Iced',
    'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop',
    4.9,
    'Craft Brew'
  ),
  (
    'prod-6',
    'Pistachio Velvet Flat White',
    'Intense ristretto paired with Sicilian pistachio purée and steamed textured milk, dusted with roasted crushed pistachios.',
    27.00,
    'Espresso & Hot',
    'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=800&auto=format&fit=crop',
    4.7,
    null
  ),
  (
    'prod-7',
    'Smoked Hazelnut Dark Mocha',
    'Melted Belgian 70% dark chocolate folded into hazelnut-infused espresso, topped with artisan golden cocoa dust.',
    26.00,
    'Signature Blends',
    'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=800&auto=format&fit=crop',
    4.8,
    null
  ),
  (
    'prod-8',
    'Vanilla Bean Iced Shakerato',
    'Fresh espresso vigorously shaken over crystal ice spheres with organic Tahitian vanilla extract and demerara cane sugar.',
    23.00,
    'Cold Brews & Iced',
    'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800&auto=format&fit=crop',
    4.8,
    'Refreshing'
  )
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  price = excluded.price,
  category = excluded.category,
  image = excluded.image,
  rating = excluded.rating,
  badge = excluded.badge;
