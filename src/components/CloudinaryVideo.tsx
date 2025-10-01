"use client";

import { CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';

interface CloudinaryVideoProps {
  src: string; // Public ID of the video in Cloudinary
  poster?: string; // Poster image public ID
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  className?: string;
  width?: number | string;
  height?: number | string;
}

export function CloudinaryVideo({
  src,
  poster,
  autoplay = true,
  muted = true,
  loop = true,
  controls = false,
  className,
  width = "100%",
  height = "100%",
}: CloudinaryVideoProps) {
  return (
    <CldVideoPlayer
      src={src}
      poster={poster}
      autoPlay={autoplay}
      muted={muted}
      loop={loop}
      controls={controls}
      className={className}
      width={width}
      height={height}
      transformation={{
        quality: "auto:best",
        fetchFormat: "auto",
      }}
      sourceTypes={['webm', 'mp4']}
    />
  );
}

// Lightweight version for background videos
interface BackgroundVideoProps {
  src: string; // Can be Cloudinary public ID or regular path
  fallbackSrc?: string; // Fallback local video
  className?: string;
  overlay?: boolean; // Add gradient overlay
}

export function BackgroundVideo({
  src,
  fallbackSrc = "https://res.cloudinary.com/aerostatic/video/upload/v1759347722/videos/hero_xonr3g.mp4",
  className = "w-full h-full object-cover",
  overlay = true,
}: BackgroundVideoProps) {
  const isCloudinary = !src.startsWith('/') && !src.startsWith('http');

  if (isCloudinary) {
    // Use Cloudinary URL with automatic optimization
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const videoUrl = `https://res.cloudinary.com/${cloudName}/video/upload/f_auto,q_auto/${src}`;
    const posterUrl = `https://res.cloudinary.com/${cloudName}/video/upload/so_0,f_jpg,q_auto/${src}`;

    return (
      <>
        <video
          autoPlay
          muted
          loop
          playsInline
          className={className}
          poster={posterUrl}
        >
          <source src={videoUrl.replace('f_auto', 'f_webm')} type="video/webm" />
          <source src={videoUrl.replace('f_auto', 'f_mp4')} type="video/mp4" />
          {fallbackSrc && <source src={fallbackSrc} type="video/mp4" />}
        </video>
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 z-10" />
        )}
      </>
    );
  }

  // Regular video (local file)
  return (
    <>
      <video
        autoPlay
        muted
        loop
        playsInline
        className={className}
      >
        <source src={src} type="video/mp4" />
      </video>
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 z-10" />
      )}
    </>
  );
}