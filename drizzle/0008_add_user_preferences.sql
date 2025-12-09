-- Add preferences JSONB column to users table
ALTER TABLE users
ADD COLUMN IF NOT EXISTS preferences jsonb;
