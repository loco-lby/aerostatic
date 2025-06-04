import { NotFound } from "@/components/NotFound";
import { Metadata } from "next";
import { config } from "@/config";

export const metadata: Metadata = {
    title: "Page Not Found - Aerostatic",
    description: "The page you&apos;re looking for doesn&apos;t exist. Explore our hot air balloon services, about our team, or contact us for your next event.",
    robots: {
        index: false,
        follow: true,
    },
    alternates: {
        canonical: `${config.baseUrl}/404`,
    },
};

export default function NotFoundPage() {
    return <NotFound />;
}
