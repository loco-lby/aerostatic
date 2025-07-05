# Instagram Integration

## Current Implementation

The media page (`src/app/media/page.tsx`) displays an Instagram-style timeline with demo content due to Instagram API restrictions.

### Files Involved

- `src/app/media/page.tsx` - Media page with Instagram timeline
- `src/app/api/instagram/route.ts` - API route serving mock data

### Current Features

- Responsive grid layout (1-3 columns)
- Hover effects with post details
- Video indicators for video posts
- Loading states and error handling
- Links to Instagram profile
- Demo content notice

## Instagram API Issues

The tutorial approach using `instagram-web-api` package no longer works due to:

1. **CORS restrictions** - Instagram blocks cross-origin requests
2. **Rate limiting** - Instagram heavily rate limits unofficial access
3. **API changes** - Instagram has deprecated many unofficial access methods

## Production Implementation

For a production Instagram integration, implement the **Instagram Basic Display API**:

### 1. Setup Instagram App

1. Visit [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add "Instagram Basic Display" product
4. Configure redirect URIs

### 2. Environment Variables

Add to `.env.local`:

```env
INSTAGRAM_CLIENT_ID=your_client_id
INSTAGRAM_CLIENT_SECRET=your_client_secret
INSTAGRAM_REDIRECT_URI=https://yourdomain.com/api/instagram/callback
INSTAGRAM_ACCESS_TOKEN=your_access_token
```

### 3. OAuth Implementation

Replace `src/app/api/instagram/route.ts` with:

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,caption,permalink&access_token=${accessToken}`
    );
    
    const data = await response.json();
    
    // Transform data to match current interface
    const posts = data.data.map(item => ({
      node: {
        shortcode: item.id,
        display_url: item.media_url,
        thumbnail_src: item.thumbnail_url || item.media_url,
        edge_media_to_caption: {
          edges: [{ node: { text: item.caption || '' } }]
        },
        taken_at_timestamp: Date.now(),
        is_video: item.media_type === 'VIDEO'
      }
    }));
    
    return NextResponse.json({ success: true, posts });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch Instagram posts',
      posts: [] 
    }, { status: 500 });
  }
}
```

### 4. OAuth Callback Handler

Create `src/app/api/instagram/callback/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  
  if (!code) {
    return NextResponse.json({ error: 'No authorization code' }, { status: 400 });
  }
  
  // Exchange code for access token
  const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.INSTAGRAM_CLIENT_ID!,
      client_secret: process.env.INSTAGRAM_CLIENT_SECRET!,
      grant_type: 'authorization_code',
      redirect_uri: process.env.INSTAGRAM_REDIRECT_URI!,
      code
    })
  });
  
  const tokenData = await tokenResponse.json();
  
  // Store the access token securely
  // You'll need to implement token storage (database, etc.)
  
  return NextResponse.redirect('/media');
}
```

### 5. Authorization Flow

Create a page to initiate OAuth:

```typescript
// src/app/instagram/auth/page.tsx
export default function InstagramAuth() {
  const authorize = () => {
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID!,
      redirect_uri: process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI!,
      scope: 'user_profile,user_media',
      response_type: 'code'
    });
    
    window.location.href = `https://api.instagram.com/oauth/authorize?${params}`;
  };
  
  return (
    <button onClick={authorize}>
      Connect Instagram
    </button>
  );
}
```

## Alternative Approaches

1. **Manual Content Management** - Upload images manually to your CMS
2. **Third-party Services** - Use services like Zapier to sync Instagram posts
3. **Instagram Embeds** - Use Instagram's official embed widgets
4. **Static Generation** - Fetch posts at build time only

## Current Demo Content

The demo uses high-quality aerial photography from Unsplash to showcase the intended design and functionality.

## Security Notes

- Never expose Instagram credentials in client-side code
- Use environment variables for all sensitive data
- Implement proper error handling for API failures
- Consider rate limiting for production API calls 