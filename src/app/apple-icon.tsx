import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

export const size = {
  width: 180,
  height: 180,
}

export const contentType = 'image/png'

export default async function AppleIcon() {
  // Read and resize the icon_white.png file from public/images
  const iconPath = path.join(process.cwd(), 'public', 'images', 'icon_white.png')

  // Use sharp to resize with proper aspect ratio and padding
  const resizedImage = await sharp(iconPath)
    .resize(180, 180, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 1 }
    })
    .png()
    .toBuffer()

  return new Response(resizedImage as BodyInit, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
