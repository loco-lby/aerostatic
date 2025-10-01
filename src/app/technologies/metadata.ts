import { Metadata } from 'next';
import { config } from '@/config';
import { signOgImageUrl } from '@/lib/og-image';

export const metadata: Metadata = {
  title: "Technologies - AeroMedia, AeroStatus & Custom Balloon Software",
  description: "Discover Aerostatic's tech solutions: AeroMedia for photo distribution, AeroStatus for flight operations, and custom software built by balloon pilots for real operational challenges.",
  keywords: [
    "balloon flight software",
    "AeroMedia",
    "AeroStatus",
    "photo distribution software",
    "balloon operations software",
    "aviation technology",
    "balloon pilot tools",
    "flight management software",
    "event photo sharing",
    "balloon industry software"
  ],
  openGraph: {
    title: "Technologies - AeroMedia, AeroStatus & Custom Balloon Software",
    description: "Tech solutions built by balloon pilots for real operational challenges. AeroMedia, AeroStatus, and custom software.",
    url: `${config.baseUrl}/technologies`,
    siteName: "Aerostatic",
    images: [
      {
        url: signOgImageUrl({
          title: "Technologies",
        }),
        width: 1200,
        height: 630,
        alt: "Aerostatic Technologies - Balloon Industry Software",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Technologies - AeroMedia, AeroStatus & Custom Balloon Software",
    description: "Tech solutions built by balloon pilots for real operational challenges.",
    images: [
      signOgImageUrl({
        title: "Technologies",
      }),
    ],
  },
  alternates: {
    canonical: `${config.baseUrl}/technologies`,
  },
};
