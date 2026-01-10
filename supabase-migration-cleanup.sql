-- Migration: Remove unused discount and OTO columns from orders table
-- This removes columns that are no longer used in the simplified pricing model

-- Drop the unused columns
ALTER TABLE orders DROP COLUMN IF EXISTS email_discount;
ALTER TABLE orders DROP COLUMN IF EXISTS upsell_discount;
ALTER TABLE orders DROP COLUMN IF EXISTS took_big_offer;
ALTER TABLE orders DROP COLUMN IF EXISTS oto_offer;
ALTER TABLE orders DROP COLUMN IF EXISTS oto_price;

-- Verify the table structure (optional - for checking)
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'orders';
