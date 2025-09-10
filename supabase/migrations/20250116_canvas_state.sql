-- Add canvas_state column to projects table for storing workspace layout
ALTER TABLE projects 
ADD COLUMN canvas_state JSONB DEFAULT '{}'::jsonb;

-- Comment on the new column
COMMENT ON COLUMN projects.canvas_state IS 'Stores beat positions, connections, and overlay positions for the project workspace canvas';