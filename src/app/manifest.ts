import { MetadataRoute } from 'next'
import { config } from '@/config'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Aerostatic - Adventure is in the Air',
    short_name: 'Aerostatic',
    description: 'Professional hot air balloon displays and cinematic coverage for festivals, brand launches, and private experiences.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#ea580c',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/images/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['business', 'entertainment', 'lifestyle'],
    lang: 'en',
    dir: 'ltr',
    orientation: 'portrait-primary',
  }
} 