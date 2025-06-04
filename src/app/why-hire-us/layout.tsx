import { Metadata } from "next";
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";

export const metadata: Metadata = {
    title: "Why Choose Aerostatic - Expert Hot Air Balloon Professionals",
    description: "Discover why Aerostatic is the premier choice for hot air balloon services. Expert pilots, safety-first approach, stunning visuals, and unforgettable experiences. Third-generation aeronauts you can trust.",
    keywords: [
        "why choose aerostatic",
        "expert balloon pilots",
        "professional balloon services",
        "certified instructors",
        "safety first",
        "experienced aeronauts",
        "trusted balloon company",
        "quality balloon displays",
        "reliable balloon services",
        "third generation pilots"
    ],
    openGraph: {
        title: "Why Choose Aerostatic - Expert Hot Air Balloon Professionals | Aerostatic",
        description: "Discover why Aerostatic is the premier choice for hot air balloon services. Expert pilots, safety-first approach, stunning visuals, and unforgettable experiences.",
        url: `${config.baseUrl}/why-hire-us`,
        images: [
            {
                url: signOgImageUrl({
                    title: "Why Choose Aerostatic - Expert Hot Air Balloon Professionals",
                }),
                width: 1200,
                height: 630,
                alt: "Why Choose Aerostatic for Professional Hot Air Balloon Services",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Why Choose Aerostatic - Expert Hot Air Balloon Professionals | Aerostatic",
        description: "Discover why Aerostatic is the premier choice for hot air balloon services. Expert pilots, safety-first approach, stunning visuals.",
    },
    alternates: {
        canonical: `${config.baseUrl}/why-hire-us`,
    },
};

export default function WhyHireUsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
} 