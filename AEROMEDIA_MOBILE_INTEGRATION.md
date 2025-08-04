# AeroMedia Mobile Companion Integration Guide

## Overview

The AeroMedia Mobile Companion app serves as the field uploader for balloon flight operations, enabling operators to capture and upload media directly from the field to the web platform for post-production processing before client delivery.

## Architecture Overview

### Shared Infrastructure
- **Authentication**: Supabase Auth (same instance as web platform)
- **Database**: Shared PostgreSQL database with Row Level Security
- **Storage**: Same `aeromedia-media` bucket for unified media management
- **API**: Direct Supabase client integration

### Mobile-Specific Features
- Offline-first architecture with queue management
- Field-optimized UI for quick media capture
- Batch upload with resumable transfers
- Real-time sync when connected

## Integration Requirements

### 1. Authentication Integration

#### Admin User Authentication
```typescript
// Mobile app must verify admin status after login
const { data: { user } } = await supabase.auth.getUser();
if (user) {
  // Check admin_users table
  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('*')
    .eq('user_id', user.id)
    .single();
    
  if (!adminUser) {
    // Redirect to non-admin view or show error
  }
}
```

#### Required Auth Flow
1. Email/password login using Supabase Auth
2. Verify admin status via `admin_users` table
3. Store session securely using Expo SecureStore
4. Auto-refresh tokens for seamless experience

### 2. Database Schema Integration

#### Media Packages Management
Mobile app needs to:
- List active packages from `media_packages` table
- Create new packages with auto-generated 6-digit codes
- Update package metadata (passenger names, flight date)
- Check expiration status (30-day window)

#### Media Items Upload
```typescript
// Upload to same structure as web platform
const mediaItem = {
  package_id: selectedPackageId,
  file_url: uploadedUrl,
  file_type: 'photo' | 'video' | 'drone' | 'reel',
  file_size: file.size,
  file_name: file.name,
  mime_type: file.type,
  thumbnail_url: thumbnailUrl,
  width: dimensions?.width,
  height: dimensions?.height,
  duration: videoDuration, // for videos
};

await supabase.from('media_items').insert(mediaItem);
```

### 3. Storage Integration

#### Bucket Configuration
- Bucket: `aeromedia-media` (public read, authenticated write)
- Path structure: `{packageId}/{timestamp}_{filename}`
- File naming: Preserve original names with timestamp prefix

#### Upload Strategy
```typescript
// For files > 6MB, use resumable upload
import { createResumableUpload } from './utils/resumableUpload';

if (file.size > 6 * 1024 * 1024) {
  await createResumableUpload({
    file,
    bucket: 'aeromedia-media',
    path: `${packageId}/${Date.now()}_${file.name}`,
    onProgress: (percentage) => updateProgress(percentage),
    onError: (error) => handleError(error),
    onSuccess: async (url) => {
      // Create database entry
      await createMediaItem(url);
    }
  });
} else {
  // Standard upload for smaller files
  const { data, error } = await supabase.storage
    .from('aeromedia-media')
    .upload(path, file);
}
```

### 4. Media Type Detection

#### Auto-categorization Logic
```typescript
const detectMediaType = (file: MediaFile): MediaType => {
  const filename = file.name.toLowerCase();
  
  if (file.type.startsWith('video/')) {
    // Check for reel indicators
    if (filename.includes('reel') || 
        filename.includes('short') || 
        filename.includes('vertical') ||
        file.aspectRatio < 1) { // Portrait video
      return 'reel';
    }
    
    // Check for drone footage
    if (filename.includes('drone') || 
        filename.includes('dji') || 
        filename.includes('aerial')) {
      return 'drone';
    }
    
    return 'video';
  }
  
  if (file.type.startsWith('image/')) {
    // Check for drone photos
    if (filename.includes('drone') || 
        filename.includes('dji') || 
        filename.includes('aerial')) {
      return 'drone';
    }
    
    return 'photo';
  }
  
  return 'photo'; // default
};
```

### 5. Offline Queue Management

#### Queue Implementation
```typescript
interface QueueItem {
  id: string;
  packageId: string;
  file: File;
  type: MediaType;
  status: 'pending' | 'uploading' | 'complete' | 'error';
  progress: number;
  retryCount: number;
  createdAt: Date;
}

// Store queue in AsyncStorage for persistence
const saveQueue = async (queue: QueueItem[]) => {
  await AsyncStorage.setItem('upload_queue', JSON.stringify(queue));
};

// Process queue when online
const processQueue = async () => {
  const queue = await getQueue();
  const pendingItems = queue.filter(item => item.status === 'pending');
  
  for (const item of pendingItems) {
    if (isOnline()) {
      await uploadQueueItem(item);
    }
  }
};
```

### 6. Required Features

#### Core Functionality
1. **Package Selection/Creation**
   - List existing packages
   - Create new package with metadata
   - Switch between packages quickly

2. **Media Import**
   - Camera roll access
   - Direct camera capture
   - Cloud storage integration (Google Drive, Dropbox)
   - Batch selection with preview

3. **Quick Edit**
   - Basic crop/rotate
   - Add watermarks
   - Tag media type (photo/video/drone/reel)
   - Batch operations

4. **Upload Management**
   - Queue visualization
   - Progress tracking
   - Pause/resume capability
   - Error recovery

5. **Field Operations**
   - Offline mode indicator
   - Storage space monitoring
   - Battery optimization
   - Quick stats dashboard

### 7. UI/UX Guidelines

#### Design Principles
- **Field-First**: Large touch targets, high contrast
- **Speed**: Minimal taps to upload
- **Clarity**: Clear status indicators
- **Reliability**: Visible queue and sync status

#### Navigation Structure
```
Home
├── Quick Actions
│   ├── Import Media
│   ├── Camera Capture
│   └── Current Package Info
├── Package Management
│   ├── Select Package
│   ├── Create Package
│   └── Package Details
├── Upload Queue
│   ├── Pending Items
│   ├── Uploading Progress
│   └── Completed/Failed
└── Settings
    ├── Account
    ├── Upload Preferences
    └── Storage Management
```

### 8. API Integration Points

#### Essential Endpoints
```typescript
// Check admin status
GET /api/admin/verify
Authorization: Bearer {token}

// Get packages for admin
GET /api/packages
Authorization: Bearer {token}

// Create new package
POST /api/packages
{
  "flight_date": "2024-08-04",
  "passenger_names": ["John Doe", "Jane Smith"]
}

// Get upload URL (for resumable uploads)
POST /api/upload/create-session
{
  "filename": "video.mp4",
  "size": 104857600,
  "package_id": "pkg_123"
}
```

### 9. Security Considerations

#### Authentication
- Store tokens in Expo SecureStore
- Implement biometric authentication option
- Auto-logout after inactivity
- Secure API key storage

#### Data Protection
- Encrypt sensitive data at rest
- Use HTTPS for all communications
- Implement certificate pinning
- Validate file types before upload

### 10. Development Setup

#### Environment Variables
```env
EXPO_PUBLIC_SUPABASE_URL=https://[project].supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJ...
EXPO_PUBLIC_API_URL=https://aerostatic.io/api
```

#### Required Dependencies
```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.x",
    "expo-secure-store": "^13.x",
    "expo-media-library": "^16.x",
    "expo-camera": "^15.x",
    "expo-file-system": "^17.x",
    "expo-av": "^14.x",
    "@react-native-async-storage/async-storage": "^1.x"
  }
}
```

### 11. Testing Checklist

#### Functional Tests
- [ ] Admin login and verification
- [ ] Package creation with unique codes
- [ ] Media import from various sources
- [ ] Correct media type detection
- [ ] Upload with progress tracking
- [ ] Offline queue persistence
- [ ] Resume interrupted uploads
- [ ] Error handling and recovery

#### Integration Tests
- [ ] Uploaded media visible on web platform
- [ ] Metadata correctly stored in database
- [ ] File paths match web platform structure
- [ ] Access controls working correctly
- [ ] Analytics tracking functional

### 12. Deployment Considerations

#### App Store Requirements
- Privacy policy mentioning data usage
- Clear permission explanations
- Age rating appropriate for content
- Export compliance (encryption)

#### Performance Optimization
- Lazy load package lists
- Thumbnail generation for previews
- Chunk large file uploads
- Background upload capability
- Memory management for large videos

### 13. Future Enhancements

#### Planned Features
1. **Live Streaming**: Direct stream to platform
2. **Collaborative Editing**: Multi-operator support
3. **AI Tagging**: Automatic content categorization
4. **Geolocation**: Tag media with flight coordinates
5. **Weather Integration**: Attach conditions to packages
6. **Client Preview**: Generate preview links in field

#### Integration Opportunities
- Drone SDK integration for direct import
- Cloud storage providers API
- Social media preview generation
- Print service integration

## Conclusion

This mobile companion app complements the web platform by enabling efficient field operations while maintaining consistency in data structure and user experience. The integration ensures seamless workflow from capture to client delivery, with robust offline capabilities essential for field operations.

For technical questions or implementation support, refer to the main AeroMedia documentation or contact the development team.