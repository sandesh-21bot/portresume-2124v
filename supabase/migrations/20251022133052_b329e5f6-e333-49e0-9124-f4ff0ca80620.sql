-- Make profile-photos bucket private
UPDATE storage.buckets 
SET public = false 
WHERE id = 'profile-photos';

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own profile photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own profile photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own profile photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own profile photos" ON storage.objects;

-- Add RLS policy for users to view their own photos
CREATE POLICY "Users can view their own profile photos"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'profile-photos' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Add RLS policy for users to upload their own photos
CREATE POLICY "Users can upload their own profile photos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile-photos' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Add RLS policy for users to update their own photos
CREATE POLICY "Users can update their own profile photos"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'profile-photos' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Add RLS policy for users to delete their own photos
CREATE POLICY "Users can delete their own profile photos"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'profile-photos' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Create table for AI enhancement rate limiting
CREATE TABLE IF NOT EXISTS public.ai_enhancement_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  enhanced_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on ai_enhancement_logs
ALTER TABLE public.ai_enhancement_logs ENABLE ROW LEVEL SECURITY;

-- Policy for users to view their own logs
CREATE POLICY "Users can view their own enhancement logs"
ON public.ai_enhancement_logs
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Create index for rate limiting queries
CREATE INDEX IF NOT EXISTS idx_ai_enhancement_logs_user_time 
ON public.ai_enhancement_logs(user_id, enhanced_at DESC);