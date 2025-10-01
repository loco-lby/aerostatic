import { Metadata } from 'next';
import { config } from '@/config';
import { signOgImageUrl } from '@/lib/og-image';

export const metadata: Metadata = {
  title: "Productions - Hot Air Balloon Events & Cinematic Coverage",
  description: "Explore Aerostatic's portfolio of balloon event productions, festival coverage, and aerial cinematography. From Cathedral City to Burning Man, we create unforgettable experiences.",
  keywords: [
    "hot air balloon events",
    "balloon festival coverage",
    "aerial cinematography",
    "event production",
    "balloon displays",
    "Cathedral City Balloon Festival",
    "Singha International Festival",
    "Burning Man balloons",
    "event videography",
    "brand activations"
  ],
  openGraph: {
    title: "Productions - Hot Air Balloon Events & Cinematic Coverage",
    description: "Explore Aerostatic's portfolio of balloon event productions, festival coverage, and aerial cinematography.",
    url: `${config.baseUrl}/productions`,
    siteName: "Aerostatic",
    images: [
      {
        url: signOgImageUrl({
          title: "Productions",
        }),
        width: 1200,
        height: 630,
        alt: "Aerostatic Productions - Hot Air Balloon Events",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Productions - Hot Air Balloon Events & Cinematic Coverage",
    description: "Explore Aerostatic's portfolio of balloon event productions, festival coverage, and aerial cinematography.",
    images: [
      signOgImageUrl({
        title: "Productions",
      }),
    ],
  },
  alternates: {
    canonical: `${config.baseUrl}/productions`,
  },
};
