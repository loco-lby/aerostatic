import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(config.baseUrl),
  title: {
    absolute: "Aerostatic - Adventure is in the Air",
    default: "Aerostatic - Adventure is in the Air",
    template: "%s | Aerostatic",
  },
  description: "Professional hot air balloon displays and cinematic coverage for festivals, brand launches, and private experiences. Expert aeronauts creating unforgettable sky-high activations.",
  keywords: [
    "hot air balloon",
    "balloon displays",
    "event marketing",
    "brand activations",
    "aerial cinematography",
    "festival entertainment",
    "corporate events",
    "balloon pilots",
    "aeronauts",
    "sky advertising"
  ],
  authors: [{ name: "Aerostatic Team" }],
  creator: "Aerostatic",
  publisher: "Aerostatic",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: config.baseUrl,
    siteName: "Aerostatic",
    title: "Aerostatic - Adventure is in the Air",
    description: "Professional hot air balloon displays and cinematic coverage for festivals, brand launches, and private experiences. Expert aeronauts creating unforgettable sky-high activations.",
    images: [
      {
        url: signOgImageUrl({
          title: "Aerostatic",
        }),
        width: 1200,
        height: 630,
        alt: "Aerostatic - Hot Air Balloon Displays and Cinematic Coverage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aerostatic - Adventure is in the Air",
    description: "Professional hot air balloon displays and cinematic coverage for festivals, brand launches, and private experiences.",
    images: [
      signOgImageUrl({
        title: "Aerostatic",
      }),
    ],
    creator: "@aerostatic",
    site: "@aerostatic",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
  },
  alternates: {
    canonical: config.baseUrl,
  },
  category: "business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Aerostatic",
    description: "Professional hot air balloon displays and cinematic coverage for festivals, brand launches, and private experiences.",
    url: config.baseUrl,
    logo: `${config.baseUrl}/images/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${config.baseUrl}/hire-us`,
    },
    sameAs: [
      // Add social media URLs when available
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
    founder: [
      {
        "@type": "Person",
        name: "Colby",
        jobTitle: "Third-Generation Pilot & Creative Director",
      },
      {
        "@type": "Person",
        name: "Matteo",
        jobTitle: "Pilot & Client Relations Manager",
      },
    ],
    serviceArea: {
      "@type": "Place",
      name: "Western United States",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Hot Air Balloon Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Static Displays",
            description: "Hot air balloon displays for events and festivals",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Ride Activations",
            description: "Hot air balloon rides for special events",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Media Coverage",
            description: "Cinematic coverage and aerial photography",
          },
        },
      ],
    },
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/xkf7sxu.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
