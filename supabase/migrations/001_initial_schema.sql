-- LuxArch Database Schema for Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  design_approach TEXT,
  materials TEXT[], -- Array of materials
  year TEXT,
  location TEXT,
  client TEXT,
  size TEXT,
  featured BOOLEAN DEFAULT FALSE,
  cover_image JSONB NOT NULL, -- Stores ImageResult object
  gallery JSONB[] DEFAULT '{}', -- Array of ImageResult objects
  floor_plans JSONB[] DEFAULT '{}', -- Array of ImageResult objects
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contacts table (for form submissions)
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  phone TEXT,
  project_type TEXT,
  status TEXT DEFAULT 'new', -- new, contacted, archived
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Images cache table (optional - for caching fetched images)
CREATE TABLE IF NOT EXISTS images_cache (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  query TEXT NOT NULL,
  source TEXT NOT NULL, -- unsplash, pexels, curated
  image_data JSONB NOT NULL, -- ImageResult object
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_images_cache_query ON images_cache(query);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON projects
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contacts_updated_at
BEFORE UPDATE ON contacts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE images_cache ENABLE ROW LEVEL SECURITY;

-- Public read access for projects
CREATE POLICY "Public projects are viewable by everyone"
ON projects FOR SELECT
USING (true);

-- Only authenticated users can insert/update projects
CREATE POLICY "Authenticated users can insert projects"
ON projects FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update projects"
ON projects FOR UPDATE
USING (auth.role() = 'authenticated');

-- Anyone can submit contacts
CREATE POLICY "Anyone can insert contacts"
ON contacts FOR INSERT
WITH CHECK (true);

-- Only authenticated users can view contacts
CREATE POLICY "Authenticated users can view contacts"
ON contacts FOR SELECT
USING (auth.role() = 'authenticated');

-- Images cache policies
CREATE POLICY "Public images_cache viewable by everyone"
ON images_cache FOR SELECT
USING (true);

CREATE POLICY "Service role can manage images_cache"
ON images_cache FOR ALL
USING (auth.role() = 'service_role');

-- Sample data insertion (optional - can be run separately)
-- Uncomment to seed initial data

-- INSERT INTO projects (slug, title, category, description, featured, cover_image, gallery)
-- VALUES (
--   'modern-loft-residence',
--   'Modern Loft Residence',
--   'Residential Architecture',
--   'A transformative renovation of a 1920s industrial warehouse.',
--   true,
--   '{"url": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c", "alt": "Modern loft interior", "width": 1920, "height": 1280, "source": "curated"}',
--   ARRAY['{"url": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0", "alt": "Living area", "width": 1920, "height": 1280, "source": "curated"}']::JSONB[]
-- );
