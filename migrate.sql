-- Migration to add missing is_compressed column
-- Run this on production database

-- Check if column exists and add if missing
-- SQLite doesn't have IF NOT EXISTS for ADD COLUMN, so we'll use this approach

-- Add the is_compressed column (will fail if it already exists, but that's fine)
ALTER TABLE pages ADD COLUMN is_compressed BOOLEAN DEFAULT 0;

-- Update any existing records to have is_compressed = 0 (not compressed)
UPDATE pages SET is_compressed = 0 WHERE is_compressed IS NULL;