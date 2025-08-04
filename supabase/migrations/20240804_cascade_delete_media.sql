-- Add cascade delete for media items when package is deleted
-- First, drop existing foreign key constraint if it exists
ALTER TABLE media_items 
DROP CONSTRAINT IF EXISTS media_items_package_id_fkey;

-- Add it back with ON DELETE CASCADE
ALTER TABLE media_items
ADD CONSTRAINT media_items_package_id_fkey 
FOREIGN KEY (package_id) 
REFERENCES media_packages(id) 
ON DELETE CASCADE;

-- Create a function to delete media files from storage when a package is deleted
CREATE OR REPLACE FUNCTION delete_package_media_files()
RETURNS TRIGGER AS $$
DECLARE
  media_record RECORD;
  storage_path TEXT;
BEGIN
  -- Loop through all media items for the deleted package
  FOR media_record IN 
    SELECT file_url, file_name 
    FROM media_items 
    WHERE package_id = OLD.id
  LOOP
    -- Extract the storage path from the file URL
    -- Format: https://[project].supabase.co/storage/v1/object/public/aeromedia-media/[path]
    storage_path := regexp_replace(
      media_record.file_url, 
      '^https://[^/]+/storage/v1/object/public/aeromedia-media/', 
      ''
    );
    
    -- Delete the file from storage
    -- Note: This requires the service role key to work properly
    -- For now, we'll just log it and handle deletion in the application
    RAISE NOTICE 'File to delete from storage: %', storage_path;
  END LOOP;
  
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to run before package deletion
CREATE TRIGGER delete_package_media_trigger
BEFORE DELETE ON media_packages
FOR EACH ROW
EXECUTE FUNCTION delete_package_media_files();

-- Also update download_tracking to cascade delete
ALTER TABLE download_tracking 
DROP CONSTRAINT IF EXISTS download_tracking_package_id_fkey;

ALTER TABLE download_tracking
ADD CONSTRAINT download_tracking_package_id_fkey 
FOREIGN KEY (package_id) 
REFERENCES media_packages(id) 
ON DELETE CASCADE;