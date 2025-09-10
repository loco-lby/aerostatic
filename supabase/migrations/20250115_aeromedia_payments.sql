-- Add payment-related columns to media_packages table
ALTER TABLE media_packages 
ADD COLUMN IF NOT EXISTS price_cents INTEGER,
ADD COLUMN IF NOT EXISTS requires_purchase BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS stripe_price_id TEXT,
ADD COLUMN IF NOT EXISTS is_comp BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS operator_id UUID;

-- Create purchases table for tracking payments
CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID NOT NULL REFERENCES media_packages(id) ON DELETE CASCADE,
  operator_id UUID,
  email TEXT NOT NULL,
  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent TEXT,
  amount_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'usd',
  status TEXT NOT NULL CHECK (status IN ('pending', 'succeeded', 'refunded', 'failed', 'canceled')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for purchases
CREATE INDEX idx_purchases_package_id ON purchases(package_id);
CREATE INDEX idx_purchases_email ON purchases(email);
CREATE INDEX idx_purchases_stripe_session_id ON purchases(stripe_session_id);
CREATE INDEX idx_purchases_status ON purchases(status);
CREATE INDEX idx_purchases_created_at ON purchases(created_at);

-- Create analytics_events table for tracking user actions
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID REFERENCES media_packages(id) ON DELETE CASCADE,
  media_item_id UUID REFERENCES media_items(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  email TEXT,
  ip_address INET,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for analytics
CREATE INDEX idx_analytics_events_package_id ON analytics_events(package_id);
CREATE INDEX idx_analytics_events_event_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_events_created_at ON analytics_events(created_at);

-- Create a function to check if a user has access to download
CREATE OR REPLACE FUNCTION check_download_access(
  p_package_id UUID,
  p_email TEXT DEFAULT NULL,
  p_access_code TEXT DEFAULT NULL
) RETURNS BOOLEAN AS $$
DECLARE
  v_package RECORD;
  v_has_purchase BOOLEAN;
BEGIN
  -- Get package details
  SELECT * INTO v_package 
  FROM media_packages 
  WHERE id = p_package_id 
    AND is_active = true 
    AND expires_at > NOW();
  
  -- If package doesn't exist or is expired, deny access
  IF v_package IS NULL THEN
    RETURN FALSE;
  END IF;
  
  -- If access code doesn't match (when provided), deny access
  IF p_access_code IS NOT NULL AND v_package.access_code != p_access_code THEN
    RETURN FALSE;
  END IF;
  
  -- If package is comp or doesn't require purchase, allow access
  IF v_package.is_comp = true OR v_package.requires_purchase = false THEN
    RETURN TRUE;
  END IF;
  
  -- Check if user has a successful purchase
  IF p_email IS NOT NULL THEN
    SELECT EXISTS(
      SELECT 1 FROM purchases 
      WHERE package_id = p_package_id 
        AND email = p_email 
        AND status = 'succeeded'
    ) INTO v_has_purchase;
    
    RETURN v_has_purchase;
  END IF;
  
  -- Default to deny
  RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to generate signed URLs for media downloads
CREATE OR REPLACE FUNCTION generate_signed_url(
  p_media_item_id UUID,
  p_email TEXT DEFAULT NULL,
  p_access_code TEXT DEFAULT NULL,
  p_expiry_minutes INTEGER DEFAULT 60
) RETURNS TEXT AS $$
DECLARE
  v_media RECORD;
  v_has_access BOOLEAN;
  v_signed_url TEXT;
BEGIN
  -- Get media item details
  SELECT mi.*, mp.access_code as package_access_code
  INTO v_media
  FROM media_items mi
  JOIN media_packages mp ON mi.package_id = mp.id
  WHERE mi.id = p_media_item_id;
  
  -- Check if user has access
  v_has_access := check_download_access(v_media.package_id, p_email, p_access_code);
  
  IF NOT v_has_access THEN
    RETURN NULL;
  END IF;
  
  -- For MVP, return the file URL directly
  -- In production, this should generate a time-limited signed URL
  RETURN v_media.file_url;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update function to track analytics events
CREATE OR REPLACE FUNCTION track_event(
  p_package_id UUID DEFAULT NULL,
  p_media_item_id UUID DEFAULT NULL,
  p_event_type TEXT,
  p_email TEXT DEFAULT NULL,
  p_ip_address INET DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL,
  p_metadata JSONB DEFAULT '{}'
) RETURNS UUID AS $$
DECLARE
  v_event_id UUID;
BEGIN
  INSERT INTO analytics_events (
    package_id,
    media_item_id,
    event_type,
    email,
    ip_address,
    user_agent,
    metadata
  ) VALUES (
    p_package_id,
    p_media_item_id,
    p_event_type,
    p_email,
    p_ip_address,
    p_user_agent,
    p_metadata
  ) RETURNING id INTO v_event_id;
  
  RETURN v_event_id;
END;
$$ LANGUAGE plpgsql;

-- Enable RLS on new tables
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- RLS policies for purchases
CREATE POLICY "Admins can view all purchases" ON purchases
  FOR SELECT
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "Users can view their own purchases" ON purchases
  FOR SELECT
  USING (email = current_setting('app.current_user_email', true));

-- RLS policies for analytics_events
CREATE POLICY "Admins can view all analytics" ON analytics_events
  FOR SELECT
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "Public can insert analytics events" ON analytics_events
  FOR INSERT
  WITH CHECK (true);

-- Update trigger for purchases updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_purchases_updated_at
  BEFORE UPDATE ON purchases
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();