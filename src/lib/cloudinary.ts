import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary (server-side only)
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

// Helper to generate optimized video URLs
export function getOptimizedVideoUrl(publicId: string, options?: {
  quality?: string;
  format?: string;
  width?: number;
  height?: number;
}) {
  const {
    quality = 'auto:best',
    format = 'auto',
    width,
    height
  } = options || {};

  const transformations = [
    `q_${quality}`,
    `f_${format}`,
    width && `w_${width}`,
    height && `h_${height}`,
  ].filter(Boolean).join(',');

  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/${transformations}/${publicId}`;
}

// Helper to generate video poster/thumbnail
export function getVideoThumbnail(publicId: string) {
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/so_0,f_jpg,q_auto/${publicId}`;
}