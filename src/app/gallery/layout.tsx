import { Metadata } from "next";
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";

export const metadata: Metadata = {
    title: "Gallery - Hot Air Balloon Photography & Content",
    description: "Explore our stunning collection of hot air balloon photography, aerial cinematography, and event coverage. See the magic we create from sky-high perspectives.",
    keywords: [
        "hot air balloon photography",
        "aerial photography",
        "balloon gallery",
        "event photography",
        "cinematic coverage",
        "balloon content",
        "aerial cinematography",
        "festival photography",
        "brand activation photos",
        "sky photography"
    ],
    openGraph: {
        title: "Gallery - Hot Air Balloon Photography & Content | Aerostatic",
        description: "Explore our stunning collection of hot air balloon photography, aerial cinematography, and event coverage. See the magic we create from sky-high perspectives.",
        url: `${config.baseUrl}/gallery`,
        images: [
            {
                url: signOgImageUrl({
                    title: "Gallery - Hot Air Balloon Photography & Content",
                }),
                width: 1200,
                height: 630,
                alt: "Aerostatic Gallery - Hot Air Balloon Photography and Content",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Gallery - Hot Air Balloon Photography & Content | Aerostatic",
        description: "Explore our stunning collection of hot air balloon photography, aerial cinematography, and event coverage.",
    },
    alternates: {
        canonical: `${config.baseUrl}/gallery`,
    },
};

export default function GalleryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
} 