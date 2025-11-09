/*
  # Create Job Applications Table
  
  1. New Table
    - `job_applications`
      - `id` (uuid, primary key)
      - `job_title` (text, required)
      - `name` (text, required)
      - `email` (text, required)
      - `phone` (text)
      - `cover_letter` (text)
      - `resume_url` (text) -- Assuming you'll upload resume to Supabase Storage and store the URL
      - `created_at` (timestamp)

  2. Security
    - Enable RLS
    - Add policy for anyone to insert
*/

CREATE TABLE IF NOT EXISTS job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_title text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  cover_letter text,
  resume_url text, -- We will not build the file upload today, but the field is ready
  created_at timestamptz DEFAULT now()
);

ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can apply for a job"
  ON job_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
