-- Add new columns to portfolios table for enhanced resume fields
ALTER TABLE public.portfolios
ADD COLUMN IF NOT EXISTS date_of_birth date,
ADD COLUMN IF NOT EXISTS linkedin_url text,
ADD COLUMN IF NOT EXISTS address text,
ADD COLUMN IF NOT EXISTS career_objective text,
ADD COLUMN IF NOT EXISTS achievements jsonb;