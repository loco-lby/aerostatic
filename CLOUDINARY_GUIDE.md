# Cloudinary Video Setup Guide for Aerostatic

## 🚀 Quick Start

Your Cloudinary is configured and ready! Here's how to use it:

## 📤 Uploading Videos to Cloudinary

### Option 1: Web Interface (Easiest)
1. Go to [cloudinary.com](https://cloudinary.com) and log in
2. Navigate to Media Library
3. Click "Upload" → Select your video files
4. Note the "Public ID" of each uploaded video

### Option 2: Upload Script (For bulk uploads)
Create a file `upload-videos.js`:

```javascript
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: 'aerostatic',
  api_key: '346891437179414',
  api_secret: 'eDdmOGmYGVKxluqgurtqzeu9_Ro'
});

// Upload a single video
async function uploadVideo(filePath, publicId) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'video',
      public_id: publicId,
      folder: 'aerostatic', // Optional: organize in folders
      overwrite: true,
      transformation: [
        { quality: 'auto:best' },
        { fetch_format: 'auto' }
      ]
    });
    console.log(`✅ Uploaded: ${publicId}`);
    return result;
  } catch (error) {
    console.error(`❌ Failed to upload ${publicId}:`, error);
  }
}

// Upload all videos from public/videos
async function uploadAllVideos() {
  const videosDir = './public/videos';
  const files = fs.readdirSync(videosDir);

  for (const file of files) {
    if (file.endsWith('.mp4') || file.endsWith('.mov')) {
      const publicId = path.basename(file, path.extname(file));
      await uploadVideo(path.join(videosDir, file), `aerostatic/${publicId}`);
    }
  }
}

uploadAllVideos();
```

Run with: `node upload-videos.js`

## 🎬 Using Videos in Your Components

### Method 1: BackgroundVideo Component (Recommended)
```jsx
import { BackgroundVideo } from '@/components/CloudinaryVideo';

// For Cloudinary videos (just use the public ID)
<BackgroundVideo
  src="aerostatic/hero"
  className="w-full h-full object-cover"
/>

// For local videos (fallback)
<BackgroundVideo
  src="/videos/hero.mp4"
  className="w-full h-full object-cover"
/>
```

### Method 2: Direct HTML Video (More control)
```jsx
// Cloudinary optimized URL
<video
  autoPlay
  muted
  loop
  playsInline
  className="w-full h-full object-cover"
>
  <source
    src="https://res.cloudinary.com/aerostatic/video/upload/f_webm,q_auto/aerostatic/hero"
    type="video/webm"
  />
  <source
    src="https://res.cloudinary.com/aerostatic/video/upload/f_mp4,q_auto/aerostatic/hero"
    type="video/mp4"
  />
</video>
```

### Method 3: Advanced Video Player
```jsx
import { CloudinaryVideo } from '@/components/CloudinaryVideo';

<CloudinaryVideo
  src="aerostatic/hero"
  poster="aerostatic/hero-poster" // Optional poster image
  autoplay={true}
  muted={true}
  loop={true}
  controls={false}
/>
```

## 🎯 Video Optimization Tips

### Automatic Optimizations (Applied by default)
- `q_auto` - Automatic quality based on user's connection
- `f_auto` - Best format for browser (WebM, MP4, etc.)
- `so_0` - First frame as poster image

### Manual Optimizations
```jsx
// Mobile-optimized version
src="https://res.cloudinary.com/aerostatic/video/upload/w_720,q_auto:low/aerostatic/hero"

// High-quality for desktop
src="https://res.cloudinary.com/aerostatic/video/upload/w_1920,q_auto:best/aerostatic/hero"

// Create thumbnail
src="https://res.cloudinary.com/aerostatic/video/upload/so_2,w_400,h_300,c_fill/aerostatic/hero.jpg"
```

## 📁 Recommended Folder Structure in Cloudinary

```
aerostatic/
├── hero/           # Hero section videos
│   ├── main
│   ├── mobile
│   └── tablet
├── backgrounds/    # Background videos
│   ├── wine_train
│   ├── thailand
│   └── your_event
├── events/        # Event footage
└── products/      # Product showcases
```

## 🔄 Migration from Local Videos

Your current videos in `/public/videos/`:
- hero.mp4 → Upload as `aerostatic/backgrounds/hero`
- hero1.mp4 → Upload as `aerostatic/backgrounds/hero1`
- wine_train.mp4 → Upload as `aerostatic/backgrounds/wine_train`
- thailand.mp4 → Upload as `aerostatic/backgrounds/thailand`
- your_event.mp4 → Upload as `aerostatic/backgrounds/your_event`

## 📊 Monitoring & Analytics

View your usage at: https://cloudinary.com/console
- Free tier: 25 GB bandwidth/month
- 25 GB storage
- 25,000 transformations

## 🚨 Important Notes

1. **Never commit API secrets** - Already in .env.local (safe)
2. **Use public IDs** without file extensions
3. **Cloudinary automatically creates WebM versions** for better compression
4. **Lazy loading** is automatic with the components

## Need Help?

- [Cloudinary Docs](https://cloudinary.com/documentation)
- [Next Cloudinary Docs](https://next-cloudinary.dev)