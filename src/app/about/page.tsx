import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";
import Markdown from "react-markdown";

const content = `# What is Aerostatic?

Our mission is to revitalize the ancient art of ballooning by creating experiences that challenge modern perspectives on time, nature, and our relationship with the world around us.
## Our Story
Aerostatic was born from a pivotal realization: in an era where everything is accelerating—travel, communication, entertainment, life itself—something magical has been lost. The modern world races forward on highways and jet streams, always seeking the fastest route, the most efficient path.
As a second-generation pilot carrying the torch of this remarkable tradition, our founder discovered a profound truth: ballooning offers more than just flight—it offers liberation from the tyranny of speed and control that defines modern life.
This insight ignited a vision: to preserve the wisdom of ballooning while boldly reimagining how this ancient art can speak to contemporary culture and transform how we experience the world.
## What We Do
Aerostatic operates at the intersection of adventure, perspective, and rebellion:
### Sky-Bound Experiences
We create immersive ballooning journeys that challenge participants to surrender control, embrace nature's rhythm, and see familiar landscapes from entirely new perspectives.
### Cultural Rebellion
Through our content and experiences, we infuse ballooning with fresh energy—bringing humor, irreverence, and rock & roll attitude to the skies, making this ancient art accessible to new generations.
### Legacy Preservation
We document and share the rich heritage, techniques, and wisdom of ballooning while innovating to ensure this remarkable tradition remains relevant in a changing world.
## Our Approach
Aerostatic is guided by core principles that inform everything we do:

- Embracing slowness as a revolutionary act in a speed-obsessed world
- Celebrating the dance between human ingenuity and natural forces
- Viewing physical perspective as a catalyst for mental and spiritual perspective
- Honoring tradition while fearlessly evolving
- Creating experiences that don't just fill your social media feed but genuinely shift your relationship with the world

In a civilization increasingly defined by speed, efficiency, and digital distance from natural forces, Aerostatic stands for something radical:
---
the profound belief that sometimes the most revolutionary act is to slow down, look around, and allow yourself to be carried by forces larger than yourself.
---
Join us in rediscovering the lost art of drifting with purpose—one flame, one flight, one perspective shift at a time.`;

export async function generateMetadata() {
  return {
    title: "About Us",
    description: "Learn more about Aerostatic",
    openGraph: {
      title: "About Us",
      description: "Learn more about Aerostatic",
      images: [
        signOgImageUrl({
          title: "About",
          label: "Aerostatic",
          brand: config.blog.name,
        }),
      ],
    },
  };
}

export default async function AboutPage() {
  return (
    <div className="container mx-auto px-5 flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <div className="prose lg:prose-lg dark:prose-invert prose-headings:font-gin m-auto mt-20 mb-10 blog-content">
          <Markdown>{content}</Markdown>
        </div>
      </div>
      <Footer />
    </div>
  );
}
