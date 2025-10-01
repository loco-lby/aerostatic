-- Fix RLS policies to allow reading submissions
-- This allows authenticated access to all submission tables

-- Email Subscriptions - Allow read access
ALTER TABLE email_subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to email_subscriptions" ON email_subscriptions;
CREATE POLICY "Allow public read access to email_subscriptions"
ON email_subscriptions FOR SELECT
TO public
USING (true);

-- Media Project Requests - Allow read access
ALTER TABLE media_project_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to media_project_requests" ON media_project_requests;
CREATE POLICY "Allow public read access to media_project_requests"
ON media_project_requests FOR SELECT
TO public
USING (true);

-- Event Service Requests - Allow read access
ALTER TABLE event_service_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to event_service_requests" ON event_service_requests;
CREATE POLICY "Allow public read access to event_service_requests"
ON event_service_requests FOR SELECT
TO public
USING (true);

-- Tech Project Requests - Allow read access
ALTER TABLE tech_project_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to tech_project_requests" ON tech_project_requests;
CREATE POLICY "Allow public read access to tech_project_requests"
ON tech_project_requests FOR SELECT
TO public
USING (true);

-- Tool Suggestions - Allow read access
ALTER TABLE tool_suggestions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to tool_suggestions" ON tool_suggestions;
CREATE POLICY "Allow public read access to tool_suggestions"
ON tool_suggestions FOR SELECT
TO public
USING (true);

-- Media Enhancement Requests - Allow read access
ALTER TABLE media_enhancement_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to media_enhancement_requests" ON media_enhancement_requests;
CREATE POLICY "Allow public read access to media_enhancement_requests"
ON media_enhancement_requests FOR SELECT
TO public
USING (true);

-- Product Interest - Allow read access
ALTER TABLE product_interest ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to product_interest" ON product_interest;
CREATE POLICY "Allow public read access to product_interest"
ON product_interest FOR SELECT
TO public
USING (true);

-- Also allow UPDATE for status changes
DROP POLICY IF EXISTS "Allow public update to media_project_requests" ON media_project_requests;
CREATE POLICY "Allow public update to media_project_requests"
ON media_project_requests FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update to event_service_requests" ON event_service_requests;
CREATE POLICY "Allow public update to event_service_requests"
ON event_service_requests FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update to tech_project_requests" ON tech_project_requests;
CREATE POLICY "Allow public update to tech_project_requests"
ON tech_project_requests FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update to media_enhancement_requests" ON media_enhancement_requests;
CREATE POLICY "Allow public update to media_enhancement_requests"
ON media_enhancement_requests FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update to product_interest" ON product_interest;
CREATE POLICY "Allow public update to product_interest"
ON product_interest FOR UPDATE
TO public
USING (true)
WITH CHECK (true);
