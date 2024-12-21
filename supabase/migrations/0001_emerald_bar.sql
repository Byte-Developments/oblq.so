/*
  # Create pastes table

  1. New Tables
    - `pastes`
      - `id` (uuid, primary key)
      - `content` (text, required)
      - `title` (text, optional)
      - `language` (text, default: 'plaintext')
      - `expires_at` (timestamp with time zone, optional)
      - `burn_after_read` (boolean, default: false)
      - `created_at` (timestamp with time zone, default: now())
      - `viewed` (boolean, default: false)

  2. Security
    - Enable RLS on `pastes` table
    - Add policy for public read access
    - Add policy for public create access
*/

CREATE TABLE IF NOT EXISTS pastes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  title text,
  language text DEFAULT 'plaintext',
  expires_at timestamptz,
  burn_after_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  viewed boolean DEFAULT false
);

ALTER TABLE pastes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to create pastes
CREATE POLICY "Anyone can create pastes"
  ON pastes
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow reading non-expired, non-burned pastes
CREATE POLICY "Anyone can read non-expired pastes"
  ON pastes
  FOR SELECT
  TO public
  USING (
    (expires_at IS NULL OR expires_at > now())
    AND (NOT burn_after_read OR NOT viewed)
  );