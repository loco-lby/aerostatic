-- Form Submissions Tables
-- Creates tables for all website form submissions

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Media Project Requests (from Work With Us page - Media tab)
CREATE TABLE IF NOT EXISTS media_project_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  project_type TEXT,
  timeline TEXT,
  budget TEXT,
  description TEXT NOT NULL,
  services JSONB DEFAULT '[]'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'declined')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT media_project_requests_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

CREATE INDEX IF NOT EXISTS idx_media_project_requests_email ON media_project_requests(email);
CREATE INDEX IF NOT EXISTS idx_media_project_requests_status ON media_project_requests(status);
CREATE INDEX IF NOT EXISTS idx_media_project_requests_created_at ON media_project_requests(created_at DESC);

-- Event Service Requests (from Work With Us page - Events tab)
CREATE TABLE IF NOT EXISTS event_service_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  event_type TEXT,
  event_date TEXT,
  location TEXT NOT NULL,
  attendees TEXT,
  services JSONB DEFAULT '[]'::jsonb,
  description TEXT NOT NULL,
  timeline TEXT,
  additional_requests TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'declined')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT event_service_requests_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

CREATE INDEX IF NOT EXISTS idx_event_service_requests_email ON event_service_requests(email);
CREATE INDEX IF NOT EXISTS idx_event_service_requests_status ON event_service_requests(status);
CREATE INDEX IF NOT EXISTS idx_event_service_requests_created_at ON event_service_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_event_service_requests_event_date ON event_service_requests(event_date);

-- Tech Project Requests (from Work With Us page - Tech tab)
CREATE TABLE IF NOT EXISTS tech_project_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization TEXT,
  project_type TEXT NOT NULL,
  timeline TEXT,
  budget TEXT,
  description TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'declined')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT tech_project_requests_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

CREATE INDEX IF NOT EXISTS idx_tech_project_requests_email ON tech_project_requests(email);
CREATE INDEX IF NOT EXISTS idx_tech_project_requests_status ON tech_project_requests(status);
CREATE INDEX IF NOT EXISTS idx_tech_project_requests_created_at ON tech_project_requests(created_at DESC);

-- Media Enhancement Requests (from AeroMedia gallery)
CREATE TABLE IF NOT EXISTS media_enhancement_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  services JSONB DEFAULT '[]'::jsonb,
  message TEXT NOT NULL,
  package_code TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'declined')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT media_enhancement_requests_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

CREATE INDEX IF NOT EXISTS idx_media_enhancement_requests_email ON media_enhancement_requests(email);
CREATE INDEX IF NOT EXISTS idx_media_enhancement_requests_status ON media_enhancement_requests(status);
CREATE INDEX IF NOT EXISTS idx_media_enhancement_requests_created_at ON media_enhancement_requests(created_at DESC);

-- Enable Row Level Security on all tables
ALTER TABLE media_project_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_project_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_enhancement_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public to insert (for forms)
CREATE POLICY "Allow public insert for media project requests"
  ON media_project_requests FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Allow public insert for event service requests"
  ON event_service_requests FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Allow public insert for tech project requests"
  ON tech_project_requests FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Allow public insert for media enhancement requests"
  ON media_enhancement_requests FOR INSERT TO public WITH CHECK (true);

-- Policy: Only authenticated users can view (for admin dashboard)
CREATE POLICY "Only authenticated users can view media project requests"
  ON media_project_requests FOR SELECT TO authenticated USING (true);

CREATE POLICY "Only authenticated users can view event service requests"
  ON event_service_requests FOR SELECT TO authenticated USING (true);

CREATE POLICY "Only authenticated users can view tech project requests"
  ON tech_project_requests FOR SELECT TO authenticated USING (true);

CREATE POLICY "Only authenticated users can view media enhancement requests"
  ON media_enhancement_requests FOR SELECT TO authenticated USING (true);

-- Policy: Only authenticated users can update (for status changes)
CREATE POLICY "Only authenticated users can update media project requests"
  ON media_project_requests FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Only authenticated users can update event service requests"
  ON event_service_requests FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Only authenticated users can update tech project requests"
  ON tech_project_requests FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Only authenticated users can update media enhancement requests"
  ON media_enhancement_requests FOR UPDATE TO authenticated USING (true);

-- Add comments for documentation
COMMENT ON TABLE media_project_requests IS 'Media production service requests from Work With Us page';
COMMENT ON TABLE event_service_requests IS 'Event service requests from Work With Us page and Events page';
COMMENT ON TABLE tech_project_requests IS 'Technology project requests from Work With Us page';
COMMENT ON TABLE media_enhancement_requests IS 'Media enhancement requests from AeroMedia gallery';

-- Create updated_at triggers
CREATE TRIGGER update_media_project_requests_updated_at
  BEFORE UPDATE ON media_project_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_event_service_requests_updated_at
  BEFORE UPDATE ON event_service_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tech_project_requests_updated_at
  BEFORE UPDATE ON tech_project_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_media_enhancement_requests_updated_at
  BEFORE UPDATE ON media_enhancement_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
