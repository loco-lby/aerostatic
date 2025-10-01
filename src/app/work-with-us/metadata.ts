import { Metadata } from 'next';
import { config } from '@/config';
import { signOgImageUrl } from '@/lib/og-image';

export const metadata: Metadata = {
  title: "Work With Us - Hire Balloon Pilots & Media Production Crew",
  description: "Partner with Aerostatic for media production, event services, and tech solutions. Expert balloon pilots and cinematographers serving the Western United States.",
  keywords: [
    "hire balloon pilots",
    "balloon event services",
    "aerial cinematography services",
    "hot air balloon media",
    "event production company",
    "balloon pilots for hire",
    "documentary production",
    "branded content production",
    "aviation cinematography",
    "balloon consulting"
  ],
  openGraph: {
    title: "Work With Us - Hire Balloon Pilots & Media Production Crew",
    description: "Partner with Aerostatic for media production, event services, and tech solutions. Expert balloon pilots and cinematographers.",
    url: `${config.baseUrl}/work-with-us`,
    siteName: "Aerostatic",
    images: [
      {
        url: signOgImageUrl({
          title: "Work With Us",
        }),
        width: 1200,
        height: 630,
        alt: "Work With Aerostatic - Balloon Pilots & Media Production",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Work With Us - Hire Balloon Pilots & Media Production Crew",
    description: "Partner with Aerostatic for media production, event services, and tech solutions.",
    images: [
      signOgImageUrl({
        title: "Work With Us",
      }),
    ],
  },
  alternates: {
    canonical: `${config.baseUrl}/work-with-us`,
  },
};
