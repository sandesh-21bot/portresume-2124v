-- Add visibility settings column to portfolios table
ALTER TABLE public.portfolios 
ADD COLUMN visibility_settings JSONB DEFAULT '{
  "fullName": true,
  "title": true,
  "bio": true,
  "skills": true,
  "education": true,
  "projects": true,
  "contactEmail": true,
  "contactPhone": true,
  "dateOfBirth": true,
  "linkedinUrl": true,
  "address": true,
  "careerObjective": true,
  "achievements": true,
  "profilePhoto": true
}'::jsonb;