import { NextResponse } from 'next/server';

// Mock Instagram data for demo purposes
// In production, you would replace this with Instagram Basic Display API
const mockInstagramPosts = [
  {
    node: {
      shortcode: "mock1",
      display_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop",
      thumbnail_src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
      edge_media_to_caption: {
        edges: [{ node: { text: "Soaring above the clouds with our latest aerial production. The perspective from up here never gets old! ✈️ #aerialcinematography #drone #filmmaking" } }]
      },
      taken_at_timestamp: Date.now() - 86400000,
      is_video: false
    }
  },
  {
    node: {
      shortcode: "mock2",
      display_url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=800&fit=crop",
      thumbnail_src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop",
      edge_media_to_caption: {
        edges: [{ node: { text: "Behind the scenes of our latest project. The team working hard to capture that perfect shot 🎬 #behindthescenes #production #aerostatic" } }]
      },
      taken_at_timestamp: Date.now() - 172800000,
      is_video: true
    }
  },
  {
    node: {
      shortcode: "mock3",
      display_url: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=800&fit=crop",
      thumbnail_src: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=400&fit=crop",
      edge_media_to_caption: {
        edges: [{ node: { text: "Golden hour flights are absolutely magical. The light, the shadows, the atmosphere - everything comes together perfectly ✨ #goldenhour #aerial #cinematography" } }]
      },
      taken_at_timestamp: Date.now() - 259200000,
      is_video: false
    }
  },
  {
    node: {
      shortcode: "mock4",
      display_url: "https://images.unsplash.com/photo-1569074187119-c87815b476da?w=800&h=800&fit=crop",
      thumbnail_src: "https://images.unsplash.com/photo-1569074187119-c87815b476da?w=400&h=400&fit=crop",
      edge_media_to_caption: {
        edges: [{ node: { text: "Equipment check complete! Ready for another day of capturing stunning aerial footage 📷 #equipment #professional #aerialfilming" } }]
      },
      taken_at_timestamp: Date.now() - 345600000,
      is_video: false
    }
  },
  {
    node: {
      shortcode: "mock5",
      display_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop",
      thumbnail_src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      edge_media_to_caption: {
        edges: [{ node: { text: "City landscapes from above reveal patterns and beauty invisible from ground level 🏙️ #cityscape #urban #perspective" } }]
      },
      taken_at_timestamp: Date.now() - 432000000,
      is_video: true
    }
  },
  {
    node: {
      shortcode: "mock6",
      display_url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=800&fit=crop",
      thumbnail_src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop",
      edge_media_to_caption: {
        edges: [{ node: { text: "Nature documentaries require patience, skill, and the right moment. Today was one of those perfect days 🌿 #naturedocumentary #wildlife #patience" } }]
      },
      taken_at_timestamp: Date.now() - 518400000,
      is_video: false
    }
  }
];

export async function GET() {
  try {
    // For development purposes, we're using mock data
    // To implement real Instagram integration, you would need to:
    // 1. Apply for Instagram Basic Display API access
    // 2. Set up proper OAuth flow
    // 3. Use the official Instagram API endpoints
    
    console.log('Serving mock Instagram data due to Instagram API restrictions');
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return NextResponse.json({
      success: true,
      posts: mockInstagramPosts,
      note: "Using mock data. For production, implement Instagram Basic Display API."
    });

  } catch (error: any) {
    console.error('Error serving Instagram data:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to load Instagram content',
      posts: []
    }, { status: 500 });
  }
}

/* 
PRODUCTION IMPLEMENTATION NOTES:
================================

Due to Instagram API restrictions, the instagram-web-api package no longer works reliably.
For production use, implement the Instagram Basic Display API:

1. Create a Facebook App at developers.facebook.com
2. Add Instagram Basic Display product
3. Configure OAuth redirect URIs
4. Use the following endpoints:
   - Authorization: https://api.instagram.com/oauth/authorize
   - Token Exchange: https://api.instagram.com/oauth/access_token
   - Media: https://graph.instagram.com/me/media

5. Replace this file with proper OAuth implementation:

```typescript
// Example structure for production:
export async function GET(request: Request) {
  const accessToken = await getInstagramAccessToken(); // Implement OAuth
  
  const response = await fetch(
    `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,caption,permalink&access_token=${accessToken}`
  );
  
  const data = await response.json();
  return NextResponse.json({ success: true, posts: data.data });
}
```

6. Environment variables needed:
   - INSTAGRAM_CLIENT_ID
   - INSTAGRAM_CLIENT_SECRET
   - INSTAGRAM_REDIRECT_URI
   - INSTAGRAM_ACCESS_TOKEN (from OAuth flow)
*/ 