/*
  # Create URLs table

  1. New Tables
    - `urls`
      - `code` (text, primary key)
      - `url` (text, required)
      - `created_at` (timestamp with time zone, default: now())

  2. Security
    - Enable RLS on `urls` table
    - Add policy for public read access
    - Add policy for public create access
*/

CREATE TABLE IF NOT EXISTS urls (
  code text PRIMARY KEY,
  url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE urls ENABLE ROW LEVEL SECURITY;

-- Allow anyone to create short URLs
CREATE POLICY "Anyone can create URLs"
  ON urls
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow anyone to read URLs
CREATE POLICY "Anyone can read URLs"
  ON urls
  FOR SELECT
  TO public
  USING (true);