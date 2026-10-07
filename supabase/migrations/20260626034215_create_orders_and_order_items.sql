/*
# Create orders and order_items tables

## Purpose
Persist customer orders and their line items for the Daddy Market e-commerce store.
Orders are created at checkout and updated with payment status from the Rise Payment API.
The app uses Firebase for authentication (not Supabase auth), so the Supabase client
always runs as the `anon` role. Policies therefore allow `anon, authenticated` CRUD.

## New Tables

### orders
- `id` (uuid, primary key)
- `user_email` (text, nullable - the Firebase user's email if signed in)
- `user_id` (text, nullable - the Firebase uid if signed in)
- `customer_name` (text, nullable)
- `customer_phone` (text, not null - needed for M-Pesa)
- `customer_email` (text, nullable)
- `street` (text, nullable)
- `city` (text, nullable)
- `zip` (text, nullable)
- `payment_method` (text, not null - 'mpesa' | 'card' | 'bank-transfer')
- `payment_option` (text, nullable - '50%' | 'full')
- `subtotal` (numeric, not null)
- `shipping` (numeric, not null default 0)
- `discount` (numeric, not null default 0)
- `total` (numeric, not null)
- `currency` (text, not null default 'KES')
- `status` (text, not null default 'pending' - pending|success|failed|cancelled)
- `checkout_id` (text, nullable - from Rise API)
- `tx_ref` (text, nullable - from Rise API)
- `transaction_id` (text, nullable - from Rise API)
- `items_count` (integer, not null default 0)
- `created_at` (timestamptz, default now())
- `updated_at` (timestamptz, default now())

### order_items
- `id` (uuid, primary key)
- `order_id` (uuid, foreign key to orders.id ON DELETE CASCADE)
- `product_id` (text, not null)
- `title` (text, not null)
- `description` (text, nullable)
- `price` (numeric, not null)
- `quantity` (integer, not null)
- `image` (text, nullable)
- `created_at` (timestamptz, default now())

## Security
- RLS enabled on both tables.
- `anon, authenticated` CRUD on both (single-tenant style: the app's Supabase client uses the anon key).
- order_items SELECT/INSERT/UPDATE/DELETE scoped through order_id existence is not strictly necessary since orders are public; we allow anon CRUD for simplicity matching the no-Supabase-auth model.

## Notes
1. The app authenticates via Firebase, not Supabase, so `auth.uid()` is always null here.
2. Orders are intentionally writable by the anon client so checkout can persist them.
3. `updated_at` auto-refreshes via trigger.
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text,
  user_id text,
  customer_name text,
  customer_phone text NOT NULL,
  customer_email text,
  street text,
  city text,
  zip text,
  payment_method text NOT NULL,
  payment_option text,
  subtotal numeric NOT NULL DEFAULT 0,
  shipping numeric NOT NULL DEFAULT 0,
  discount numeric NOT NULL DEFAULT 0,
  total numeric NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'KES',
  status text NOT NULL DEFAULT 'pending',
  checkout_id text,
  tx_ref text,
  transaction_id text,
  items_count integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id text NOT NULL,
  title text NOT NULL,
  description text,
  price numeric NOT NULL,
  quantity integer NOT NULL,
  image text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- orders policies (anon + authenticated)
DROP POLICY IF EXISTS "anon_select_orders" ON orders;
CREATE POLICY "anon_select_orders" ON orders FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_orders" ON orders;
CREATE POLICY "anon_update_orders" ON orders FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_orders" ON orders;
CREATE POLICY "anon_delete_orders" ON orders FOR DELETE
  TO anon, authenticated USING (true);

-- order_items policies (anon + authenticated)
DROP POLICY IF EXISTS "anon_select_order_items" ON order_items;
CREATE POLICY "anon_select_order_items" ON order_items FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_order_items" ON order_items;
CREATE POLICY "anon_insert_order_items" ON order_items FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_order_items" ON order_items;
CREATE POLICY "anon_update_order_items" ON order_items FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_order_items" ON order_items;
CREATE POLICY "anon_delete_order_items" ON order_items FOR DELETE
  TO anon, authenticated USING (true);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders (status);
CREATE INDEX IF NOT EXISTS idx_orders_user_email ON orders (user_email);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items (order_id);

-- updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS orders_updated_at ON orders;
CREATE TRIGGER orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
