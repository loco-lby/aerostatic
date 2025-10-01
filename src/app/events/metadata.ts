import { Metadata } from 'next';
import { config } from '@/config';
import { signOgImageUrl } from '@/lib/og-image';

export const metadata: Metadata = {
  title: "Book Hot Air Balloon Events - Static Displays & Ride Activations",
  description: "Book Aerostatic for your next event. We provide hot air balloon static displays, tethered rides, and aerial coverage for festivals, corporate events, and brand activations.",
  keywords: [
    "book hot air balloon",
    "balloon event services",
    "hot air balloon displays",
    "tethered balloon rides",
    "festival entertainment",
    "corporate event balloon",
    "brand activation balloon",
    "balloon rental",
    "event entertainment",
    "balloon pilots for hire"
  ],
  openGraph: {
    title: "Book Hot Air Balloon Events - Static Displays & Ride Activations",
    description: "Book Aerostatic for your next event. We provide hot air balloon static displays, tethered rides, and aerial coverage.",
    url: `${config.baseUrl}/events`,
    siteName: "Aerostatic",
    images: [
      {
        url: signOgImageUrl({
          title: "Events",
        }),
        width: 1200,
        height: 630,
        alt: "Book Aerostatic for Hot Air Balloon Events",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Hot Air Balloon Events - Static Displays & Ride Activations",
    description: "Book Aerostatic for your next event. We provide hot air balloon static displays, tethered rides, and aerial coverage.",
    images: [
      signOgImageUrl({
        title: "Events",
      }),
    ],
  },
  alternates: {
    canonical: `${config.baseUrl}/events`,
  },
};
