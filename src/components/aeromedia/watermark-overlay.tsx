'use client'

import { ReactNode } from 'react'

interface WatermarkOverlayProps {
  children: ReactNode
  type: 'photo' | 'video'
  showWatermark: boolean
  operatorName?: string
}

export function WatermarkOverlay({ 
  children, 
  type, 
  showWatermark,
  operatorName = 'Aerostatic'
}: WatermarkOverlayProps) {
  if (!showWatermark) return <>{children}</>

  return (
    <div className="relative group">
      {children}
      
      {/* Photo watermark overlay */}
      {type === 'photo' && (
        <>
          {/* Diagonal watermark */}
          <div className="absolute inset-0 pointer-events-none select-none">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <text
                x="50"
                y="50"
                fontSize="8"
                fill="white"
                fillOpacity="0.4"
                textAnchor="middle"
                dominantBaseline="middle"
                transform="rotate(-45 50 50)"
                className="font-bold uppercase tracking-wider"
              >
                {operatorName} • PREVIEW
              </text>
            </svg>
          </div>

          {/* Corner logo */}
          <div className="absolute bottom-4 right-4 pointer-events-none select-none">
            <div className="bg-black/50 backdrop-blur-sm px-3 py-2 rounded">
              <p className="text-white/80 text-sm font-medium">
                {operatorName}
              </p>
              <p className="text-white/60 text-xs">Preview Only</p>
            </div>
          </div>

          {/* Disable right-click context menu */}
          <div 
            className="absolute inset-0" 
            onContextMenu={(e) => e.preventDefault()}
            style={{ pointerEvents: 'auto' }}
          />
        </>
      )}

      {/* Video watermark overlay */}
      {type === 'video' && (
        <>
          {/* Semi-transparent corner bug */}
          <div className="absolute top-4 left-4 pointer-events-none select-none z-10">
            <div className="bg-black/60 backdrop-blur-sm px-3 py-2 rounded">
              <p className="text-white text-sm font-bold">{operatorName}</p>
              <p className="text-white/80 text-xs">Preview</p>
            </div>
          </div>

          {/* Center diagonal text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10">
            <div className="transform -rotate-45">
              <p className="text-white/30 text-4xl font-bold uppercase tracking-widest">
                Preview Only
              </p>
            </div>
          </div>

          {/* Disable video controls on hover */}
          <style jsx>{`
            video::-webkit-media-controls-download-button {
              display: none !important;
            }
            video::-webkit-media-controls-enclosure {
              overflow: hidden;
            }
          `}</style>
        </>
      )}
    </div>
  )
}

interface MediaPreviewProps {
  src: string
  alt?: string
  type: 'photo' | 'video'
  showWatermark: boolean
  operatorName?: string
  className?: string
  thumbnail?: string
}

export function MediaPreview({
  src,
  alt = '',
  type,
  showWatermark,
  operatorName = 'Aerostatic',
  className = '',
  thumbnail
}: MediaPreviewProps) {
  // For watermarked content, use lower quality preview
  const previewSrc = showWatermark && thumbnail ? thumbnail : src

  return (
    <WatermarkOverlay
      type={type}
      showWatermark={showWatermark}
      operatorName={operatorName}
    >
      {type === 'photo' ? (
        <img
          src={previewSrc}
          alt={alt}
          className={className}
          draggable={false}
          onContextMenu={(e) => showWatermark && e.preventDefault()}
        />
      ) : (
        <video
          src={previewSrc}
          className={className}
          controls={!showWatermark}
          controlsList={showWatermark ? "nodownload" : undefined}
          onContextMenu={(e) => showWatermark && e.preventDefault()}
          disablePictureInPicture={showWatermark}
        />
      )}
    </WatermarkOverlay>
  )
}