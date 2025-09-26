import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academia - Aeronaut History & Aviation Science",
  description: "Explore the rich history of aeronautics, the science behind hot air balloons, and the stories of the pioneers who dared to touch the sky. Educational content about aviation, ballooning, and aeronaut heritage.",
  keywords: [
    "aeronaut history",
    "aviation science",
    "hot air balloon history",
    "ballooning education",
    "aeronautics",
    "flight history",
    "aviation pioneers",
    "balloon technology",
    "aerostatic history"
  ],
  openGraph: {
    title: "Academia - Aeronaut History & Aviation Science | Aerostatic",
    description: "Explore the rich history of aeronautics, the science behind hot air balloons, and the stories of the pioneers who dared to touch the sky.",
    type: "website",
    images: [
      {
        url: "/images/academia-og.jpg",
        width: 1200,
        height: 630,
        alt: "Aerostatic Academia - Aviation History and Science",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Academia - Aeronaut History & Aviation Science",
    description: "Explore the rich history of aeronautics and the science behind hot air balloons.",
  },
};

export default function AcademiaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}