# Aeromedia Setup Guide

## Overview
Aeromedia is a media delivery platform for balloon ride photos and videos, using 6-digit access codes for passengers to download their memories.

## Supabase Setup

### 1. Database Schema
Run the SQL schema file in your Supabase SQL editor:
```sql
-- Execute the contents of src/app/tools/aeromedia/supabase/schema.sql
```

### 2. Storage Bucket
Create a storage bucket for media files:

1. Go to Storage in your Supabase dashboard
2. Create a new bucket called `aeromedia-media`
3. Set the bucket to "Public" 
4. Add the following policies:

**Upload Policy (Authenticated)**:
```sql
-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'aeromedia-media');
```

**Public Read Policy**:
```sql
-- Allow public to read files
CREATE POLICY "Public can read files" ON storage.objects
FOR SELECT TO public
USING (bucket_id = 'aeromedia-media');
```

### 3. Admin User Setup
To create an admin user:

1. First, create a regular user account through Supabase Auth
2. Then add them to the admin_users table:

```sql
INSERT INTO admin_users (id, email) 
VALUES ('user-uuid-here', 'info@aerostatic.io');
```

## Features

### For Passengers
- Enter 6-digit access code to view media
- Browse photos and videos by category
- Download individual files or bulk download
- Share gallery link
- 30-day access period

### For Admins
- Create media packages with access codes
- Upload photos and videos
- Categorize media (regular/drone)
- View analytics and download stats
- Send access codes to passengers

## Technical Stack
- Next.js 15 with React 19
- Supabase for backend (database + storage)
- Tailwind CSS + shadcn/ui
- Framer Motion for animations
- TypeScript for type safety

## Environment Variables
Ensure these are set in your `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Testing the Flow

1. **Admin Flow**:
   - Navigate to `/tools/aeromedia/admin`
   - Login with admin credentials
   - Create a new package
   - Upload media files
   - Copy the access code

2. **Passenger Flow**:
   - Navigate to `/tools/aeromedia`
   - Enter the 6-digit access code
   - Browse and download media

## Security Features
- Row Level Security (RLS) on all tables
- Access codes expire after 30 days
- Admin authentication required for management
- Download tracking for analytics

## Future Enhancements
- Email integration for sending access codes
- Professional print ordering
- Extended video highlights
- Anniversary packages
- Custom photo books