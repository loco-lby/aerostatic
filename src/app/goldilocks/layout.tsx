import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Goldilocks - The Aerostatic Transition",
    description: "A 100,000 cubic foot hot air balloon printed with nature's fractal geometry. Technology that respects planetary limits and works with the atmosphere, not against it.",
    keywords: [
        "Goldilocks balloon",
        "fractal hot air balloon",
        "sustainable ballooning",
        "Mandelbox fractal",
        "aerostatic transition",
        "mature technosphere",
        "regenerative technology",
        "climate awareness",
        "nature-inspired design",
        "hot air balloon philosophy",
        "Adam Frank immature technosphere",
        "autopoietic technology",
        "climate-conscious ballooning"
    ],
    openGraph: {
        title: "Goldilocks - The Aerostatic Transition",
        description: "Nature's Blueprint. Flying 10 Stories Tall. A hot air balloon that represents technology learning from nature.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Goldilocks - The Aerostatic Transition",
        description: "Nature's Blueprint. Flying 10 Stories Tall.",
    },
};

export default function GoldilocksLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
