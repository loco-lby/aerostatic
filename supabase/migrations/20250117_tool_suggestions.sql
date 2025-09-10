-- Create tool_suggestions table
CREATE TABLE IF NOT EXISTS tool_suggestions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    idea TEXT NOT NULL,
    source VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Add RLS policies
ALTER TABLE tool_suggestions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert suggestions
CREATE POLICY "Anyone can submit tool suggestions" ON tool_suggestions
    FOR INSERT
    WITH CHECK (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tool_suggestions_updated_at
    BEFORE UPDATE ON tool_suggestions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();