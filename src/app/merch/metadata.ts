import { Metadata } from 'next';
import { config } from '@/config';
import { signOgImageUrl } from '@/lib/og-image';

export const metadata: Metadata = {
  title: "Merch - Aerostatic Apparel & Hot Air Balloon Gear",
  description: "Shop Aerostatic merchandise. Apparel and gear inspired by hot air ballooning, adventure, and the sky. Designed by balloon pilots who live the lifestyle.",
  keywords: [
    "hot air balloon merchandise",
    "balloon pilot apparel",
    "aviation clothing",
    "aerostatic merch",
    "balloon festival gear",
    "adventure apparel",
    "pilot clothing",
    "balloon enthusiast gifts",
    "aviation lifestyle",
    "ballooning apparel"
  ],
  openGraph: {
    title: "Merch - Aerostatic Apparel & Hot Air Balloon Gear",
    description: "Shop Aerostatic merchandise. Apparel and gear inspired by hot air ballooning, adventure, and the sky.",
    url: `${config.baseUrl}/merch`,
    siteName: "Aerostatic",
    images: [
      {
        url: signOgImageUrl({
          title: "Merch",
        }),
        width: 1200,
        height: 630,
        alt: "Aerostatic Merchandise - Hot Air Balloon Apparel",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Merch - Aerostatic Apparel & Hot Air Balloon Gear",
    description: "Shop Aerostatic merchandise. Apparel and gear inspired by hot air ballooning and adventure.",
    images: [
      signOgImageUrl({
        title: "Merch",
      }),
    ],
  },
  alternates: {
    canonical: `${config.baseUrl}/merch`,
  },
};
