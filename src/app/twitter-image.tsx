import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Aerostatic - Adventure is in the Air'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 30% 50%, rgba(249, 115, 22, 0.2) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(220, 38, 38, 0.2) 0%, transparent 50%)',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: 120,
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: 20,
            }}
          >
            Aerostatic
          </div>
          <div
            style={{
              fontSize: 40,
              color: 'rgba(255, 255, 255, 0.8)',
              textAlign: 'center',
              maxWidth: 900,
            }}
          >
            Adventure is in the Air
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
