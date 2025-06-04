import { MetadataRoute } from 'next'
import { config } from '@/config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/auth/',
          '/profile/',
          '/submit/',
          '/_next/',
          '/admin/',
          '*.json',
        ],
      },
    ],
    sitemap: `${config.baseUrl}/sitemap.xml`,
    host: config.baseUrl,
  }
} 