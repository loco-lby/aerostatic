-- Email Subscriptions Table
-- Stores email captures from various sources across the site

CREATE TABLE IF NOT EXISTS email_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  source TEXT NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}'::jsonb,

  CONSTRAINT email_subscriptions_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_email_subscriptions_email ON email_subscriptions(email) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_email_subscriptions_source ON email_subscriptions(source);
CREATE INDEX IF NOT EXISTS idx_email_subscriptions_subscribed_at ON email_subscriptions(subscribed_at DESC);

-- Enable Row Level Security
ALTER TABLE email_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public to insert (for signup forms)
CREATE POLICY "Allow public insert for email subscriptions"
  ON email_subscriptions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy: Only authenticated users can view (for admin dashboard)
CREATE POLICY "Only authenticated users can view email subscriptions"
  ON email_subscriptions
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Only authenticated users can update (for unsubscribe functionality)
CREATE POLICY "Only authenticated users can update email subscriptions"
  ON email_subscriptions
  FOR UPDATE
  TO authenticated
  USING (true);

-- Add comment for documentation
COMMENT ON TABLE email_subscriptions IS 'Stores email subscriptions from various sources: homepage, newsletter, downloads, events, partnerships';
COMMENT ON COLUMN email_subscriptions.source IS 'Source of signup: Homepage, Newsletter, Media Download, Event Registration, Partnership Inquiry, Word of Mouth, Fiesta, Social Media, Other';
COMMENT ON COLUMN email_subscriptions.metadata IS 'Additional flexible data storage for future use (referrer, UTM params, etc.)';
