import { Metadata } from "next";
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";

export const metadata: Metadata = {
    title: "About Our Team - Meet the Aeronauts",
    description: "Meet Colby and Matteo, the expert aeronauts behind Aerostatic. Third-generation pilots and storytellers creating unforgettable hot air balloon experiences.",
    keywords: [
        "aeronauts",
        "hot air balloon pilots",
        "balloon team",
        "certified instructors",
        "balloon crew",
        "aviation experts",
        "storytellers",
        "creative directors"
    ],
    openGraph: {
        title: "About Our Team - Meet the Aeronauts | Aerostatic",
        description: "Meet Colby and Matteo, the expert aeronauts behind Aerostatic. Third-generation pilots and storytellers creating unforgettable hot air balloon experiences.",
        url: `${config.baseUrl}/about`,
        images: [
            {
                url: signOgImageUrl({
                    title: "About Our Team - Meet the Aeronauts",
                }),
                width: 1200,
                height: 630,
                alt: "Aerostatic Team - Professional Hot Air Balloon Pilots",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "About Our Team - Meet the Aeronauts | Aerostatic",
        description: "Meet Colby and Matteo, the expert aeronauts behind Aerostatic. Third-generation pilots and storytellers.",
    },
    alternates: {
        canonical: `${config.baseUrl}/about`,
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
} 