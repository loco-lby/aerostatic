import { Metadata } from "next";
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";

export const metadata: Metadata = {
    title: "Our Services - Hot Air Balloon Displays & Experiences",
    description: "Discover our comprehensive hot air balloon services: static displays, ride activations, media coverage, content creation, branded flights, and multi-day events. Professional aeronauts serving the Western US.",
    keywords: [
        "hot air balloon services",
        "balloon displays",
        "balloon rides",
        "aerial cinematography",
        "branded flights",
        "event entertainment",
        "festival services",
        "corporate activations",
        "media coverage",
        "content creation"
    ],
    openGraph: {
        title: "Our Services - Hot Air Balloon Displays & Experiences | Aerostatic",
        description: "Discover our comprehensive hot air balloon services: static displays, ride activations, media coverage, content creation, branded flights, and multi-day events.",
        url: `${config.baseUrl}/services`,
        images: [
            {
                url: signOgImageUrl({
                    title: "Our Services - Hot Air Balloon Displays & Experiences",
                }),
                width: 1200,
                height: 630,
                alt: "Aerostatic Hot Air Balloon Services and Experiences",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Our Services - Hot Air Balloon Displays & Experiences | Aerostatic",
        description: "Discover our comprehensive hot air balloon services: static displays, ride activations, media coverage, and more.",
    },
    alternates: {
        canonical: `${config.baseUrl}/services`,
    },
};

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
} 