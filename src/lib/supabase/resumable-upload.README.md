# Resumable Upload Implementation

This module implements resumable file uploads using the TUS protocol, which is natively supported by Supabase Storage v3.

## Features

- **Automatic resumption**: If an upload is interrupted, it can be resumed from where it left off
- **Progress tracking**: Real-time upload progress updates
- **Large file support**: Handles files up to 1GB
- **Smart chunking**: Files are uploaded in 6MB chunks for optimal performance
- **Persistent upload state**: Upload progress is stored locally and can be resumed even after page refresh

## Usage

The resumable upload is automatically used for files larger than 6MB in:
- MediaUploader component (admin upload interface)
- PackageCard component (drag-and-drop uploads)

Files smaller than 6MB use the standard upload method for better performance.

## Implementation Details

1. **TUS Protocol**: Uses the official tus-js-client library to communicate with Supabase's TUS endpoint
2. **Authentication**: Automatically includes the user's session token for authenticated uploads
3. **Error Handling**: Implements smart retry logic with exponential backoff
4. **State Management**: Tracks active uploads and provides pause/resume functionality

## User Experience

- Users see a pause button for large file uploads that use resumable upload
- Upload progress persists even if users navigate away from the page
- Failed uploads can be retried without starting from the beginning
- Clear visual feedback with progress bars and status indicators

## Technical Notes

- The TUS upload URL is valid for up to 24 hours
- Only one client can upload to the same URL at a time (prevents corruption)
- Uploads are automatically chunked into 6MB pieces
- The implementation gracefully falls back to standard upload for smaller files