import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";

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
    "sky advertising",
    "hot air balloon events",
    "balloon festival",
    "tethered balloon rides",
    "balloon media production",
    "documentary production",
    "event coverage",
    "Cathedral City Balloon Festival",
    "Singha International",
    "Burning Man",
    "AeroMedia",
    "balloon operations software"
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
    google: "sVVe3BcMY-ogD8lIMh4r4HRBBTE3MFD2IMDtUZ9s3r8",
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
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${config.baseUrl}/#organization`,
        name: "Aerostatic",
        url: config.baseUrl,
        logo: {
          "@type": "ImageObject",
          "@id": `${config.baseUrl}/#logo`,
          url: `${config.baseUrl}/images/logo.png`,
          contentUrl: `${config.baseUrl}/images/logo.png`,
          caption: "Aerostatic",
        },
        image: { "@id": `${config.baseUrl}/#logo` },
        description: "Professional hot air balloon displays and cinematic coverage for festivals, brand launches, and private experiences.",
        sameAs: [
          "https://instagram.com/aerostatic",
          "https://youtube.com/@team.aerostatic",
          "https://www.tiktok.com/@aerostatic",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: "info@aerostatic.io",
          url: `${config.baseUrl}/work-with-us`,
          availableLanguage: ["English"],
        },
        founder: [
          {
            "@type": "Person",
            "@id": `${config.baseUrl}/#founder-colby`,
            name: "Colby",
            jobTitle: "Third-Generation Pilot & Creative Director",
            knowsAbout: ["Hot Air Ballooning", "Cinematography", "Software Development", "Aviation Safety"],
          },
          {
            "@type": "Person",
            "@id": `${config.baseUrl}/#founder-matteo`,
            name: "Matteo",
            jobTitle: "Pilot & Client Relations Manager",
            knowsAbout: ["Hot Air Ballooning", "Event Management", "Client Relations", "Music Production"],
          },
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": `${config.baseUrl}/#localbusiness`,
        name: "Aerostatic",
        image: `${config.baseUrl}/images/logo.png`,
        description: "Professional hot air balloon displays and cinematic coverage for festivals, brand launches, and private experiences.",
        url: config.baseUrl,
        telephone: "+1-XXX-XXX-XXXX",
        email: "info@aerostatic.io",
        address: {
          "@type": "PostalAddress",
          addressCountry: "US",
          addressRegion: "Western United States",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "37.7749",
          longitude: "-122.4194",
        },
        areaServed: {
          "@type": "GeoCircle",
          geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: "37.7749",
            longitude: "-122.4194",
          },
          geoRadius: "1000000",
        },
        priceRange: "$$$",
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "00:00",
          closes: "23:59",
        },
        sameAs: [
          "https://instagram.com/aerostatic",
          "https://youtube.com/@team.aerostatic",
          "https://www.tiktok.com/@aerostatic",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${config.baseUrl}/#website`,
        url: config.baseUrl,
        name: "Aerostatic",
        description: "Professional hot air balloon displays and cinematic coverage for festivals, brand launches, and private experiences.",
        publisher: { "@id": `${config.baseUrl}/#organization` },
        inLanguage: "en-US",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${config.baseUrl}/?s={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Service",
        "@id": `${config.baseUrl}/#service-events`,
        serviceType: "Hot Air Balloon Event Services",
        provider: { "@id": `${config.baseUrl}/#organization` },
        areaServed: {
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
                description: "Hot air balloon displays for events, festivals, and brand activations",
                provider: { "@id": `${config.baseUrl}/#organization` },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Ride Activations",
                description: "Tethered hot air balloon rides for special events and brand experiences",
                provider: { "@id": `${config.baseUrl}/#organization` },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Media Production",
                description: "Cinematic coverage, documentary production, and aerial photography",
                provider: { "@id": `${config.baseUrl}/#organization` },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Tech Solutions",
                description: "Custom software development for balloon operations and event management",
                provider: { "@id": `${config.baseUrl}/#organization` },
              },
            },
          ],
        },
      },
    ],
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
          <AnnouncementBanner />
          <main>{children}</main>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
