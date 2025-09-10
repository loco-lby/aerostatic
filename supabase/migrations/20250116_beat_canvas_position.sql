-- Add canvas position columns to beats table
ALTER TABLE beats 
ADD COLUMN x FLOAT,
ADD COLUMN y FLOAT;

-- Comment on the new columns
COMMENT ON COLUMN beats.x IS 'X position of the beat on the canvas';
COMMENT ON COLUMN beats.y IS 'Y position of the beat on the canvas';