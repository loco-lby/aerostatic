-- Create media_packages table
CREATE TABLE IF NOT EXISTS media_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  access_code VARCHAR(6) UNIQUE NOT NULL,
  flight_date DATE NOT NULL,
  passenger_names TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() + INTERVAL '30 days',
  is_active BOOLEAN DEFAULT true,
  access_count INTEGER DEFAULT 0,
  last_accessed_at TIMESTAMP WITH TIME ZONE
);

-- Create index on access_code for faster lookups
CREATE INDEX idx_media_packages_access_code ON media_packages(access_code);
CREATE INDEX idx_media_packages_expires_at ON media_packages(expires_at);

-- Create enum for file types
CREATE TYPE media_file_type AS ENUM ('photo', 'video', 'drone_photo', 'drone_video');

-- Create media_items table
CREATE TABLE IF NOT EXISTS media_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID NOT NULL REFERENCES media_packages(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  file_type media_file_type NOT NULL,
  thumbnail_url TEXT,
  file_size INTEGER NOT NULL,
  file_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  width INTEGER,
  height INTEGER,
  duration INTEGER, -- For videos, in seconds
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on package_id for faster queries
CREATE INDEX idx_media_items_package_id ON media_items(package_id);
CREATE INDEX idx_media_items_file_type ON media_items(file_type);

-- Create download_tracking table for analytics
CREATE TABLE IF NOT EXISTS download_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  media_item_id UUID NOT NULL REFERENCES media_items(id) ON DELETE CASCADE,
  package_id UUID NOT NULL REFERENCES media_packages(id) ON DELETE CASCADE,
  downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT
);

-- Create index for analytics queries
CREATE INDEX idx_download_tracking_media_item_id ON download_tracking(media_item_id);
CREATE INDEX idx_download_tracking_package_id ON download_tracking(package_id);
CREATE INDEX idx_download_tracking_downloaded_at ON download_tracking(downloaded_at);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login_at TIMESTAMP WITH TIME ZONE
);

-- Function to generate unique 6-digit access codes
CREATE OR REPLACE FUNCTION generate_access_code()
RETURNS VARCHAR(6) AS $$
DECLARE
  new_code VARCHAR(6);
  done BOOLEAN DEFAULT FALSE;
BEGIN
  WHILE NOT done LOOP
    -- Generate a random 6-digit code
    new_code := LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
    
    -- Check if code already exists
    IF NOT EXISTS (SELECT 1 FROM media_packages WHERE access_code = new_code) THEN
      done := TRUE;
    END IF;
  END LOOP;
  
  RETURN new_code;
END;
$$ LANGUAGE plpgsql;

-- Row Level Security (RLS) policies
ALTER TABLE media_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE download_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public access policy for media_packages (only active and not expired)
CREATE POLICY "Public can view active packages" ON media_packages
  FOR SELECT
  USING (is_active = true AND expires_at > NOW());

-- Public access policy for media_items (only if package is accessible)
CREATE POLICY "Public can view media items" ON media_items
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM media_packages
      WHERE media_packages.id = media_items.package_id
      AND media_packages.is_active = true
      AND media_packages.expires_at > NOW()
    )
  );

-- Admin policies (assuming auth.uid() matches admin_users.id)
CREATE POLICY "Admins can do everything on packages" ON media_packages
  FOR ALL
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "Admins can do everything on items" ON media_items
  FOR ALL
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "Admins can view download tracking" ON download_tracking
  FOR SELECT
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Public can insert download tracking
CREATE POLICY "Public can track downloads" ON download_tracking
  FOR INSERT
  WITH CHECK (true);

-- Function to get Aeromedia statistics
CREATE OR REPLACE FUNCTION get_aeromedia_stats()
RETURNS TABLE (
  total_packages BIGINT,
  total_media BIGINT,
  total_downloads BIGINT,
  active_packages BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    (SELECT COUNT(*) FROM media_packages) AS total_packages,
    (SELECT COUNT(*) FROM media_items) AS total_media,
    (SELECT COUNT(*) FROM download_tracking) AS total_downloads,
    (SELECT COUNT(*) FROM media_packages WHERE is_active = true AND expires_at > NOW()) AS active_packages;
END;
$$ LANGUAGE plpgsql;