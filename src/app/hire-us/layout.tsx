import { Metadata } from "next";
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";

export const metadata: Metadata = {
    title: "Hire Us - Professional Hot Air Balloon Services",
    description: "Book Aerostatic for your next event. Professional hot air balloon displays, rides, and cinematic coverage for festivals, brand launches, and private experiences. Get a custom quote today.",
    keywords: [
        "hire hot air balloon",
        "book balloon display",
        "event balloon services",
        "balloon rental",
        "festival entertainment",
        "brand activation",
        "corporate events",
        "balloon pilots for hire",
        "custom balloon experiences",
        "aerial marketing"
    ],
    openGraph: {
        title: "Hire Us - Professional Hot Air Balloon Services | Aerostatic",
        description: "Book Aerostatic for your next event. Professional hot air balloon displays, rides, and cinematic coverage for festivals, brand launches, and private experiences.",
        url: `${config.baseUrl}/hire-us`,
        images: [
            {
                url: signOgImageUrl({
                    title: "Hire Us - Professional Hot Air Balloon Services",
                }),
                width: 1200,
                height: 630,
                alt: "Hire Aerostatic for Professional Hot Air Balloon Services",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Hire Us - Professional Hot Air Balloon Services | Aerostatic",
        description: "Book Aerostatic for your next event. Professional hot air balloon displays, rides, and cinematic coverage.",
    },
    alternates: {
        canonical: `${config.baseUrl}/hire-us`,
    },
};

export default function HireUsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
} 