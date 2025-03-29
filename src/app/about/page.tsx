import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";
import Markdown from "react-markdown";

const content = `# About The Condor Collective

Our mission is to catalyze a global movement of purpose-driven living through immersive experiences, authentic storytelling, and tools for transformation.

## Our Story

The Condor Collective was born from a simple yet profound realization: too many people are sleepwalking through life—following scripts written by society rather than authoring their own stories.

Our founder's personal journey from corporate success to spiritual awakening revealed a truth that now fuels our work: genuine fulfillment comes not from checking society's boxes, but from aligning with one's deepest purpose and living with radical authenticity.

This insight sparked a vision: to create experiences, media, and tools that awaken people to their unique purpose and empower them to live it fully.

## What We Do

The Condor Collective operates at the intersection of transformation, adventure, and storytelling:

### Transformative Experiences
We design and facilitate immersive journeys—both physical and digital—that challenge participants to break free from limiting patterns and connect with their authentic selves.

### Purpose-Driven Media
Through our podcast, films, and publishing platform, we amplify stories of those who have broken from convention to pursue lives of meaning—inspiring others to do the same.

### Tools for Awakening
We develop practical resources that help individuals discover their purpose, overcome barriers to authentic living, and build lives that reflect their deepest values.

## Our Approach

The Condor Collective is guided by core principles that inform everything we do:

- Honoring both ancient wisdom and modern innovation
- Embracing challenge as the pathway to growth
- Celebrating authenticity over perfection
- Fostering genuine connection in an age of digital distraction
- Modeling regenerative business practices that benefit all stakeholders
- Remaining radically honest about both the challenges and rewards of purpose-driven living

In a world increasingly defined by distraction, division, and disconnect, The Condor Collective stands for something vital: the profound belief that each person has a unique purpose to discover, and that collectively, these awakened purposes have the power to transform our world.

Join us in catalyzing a global movement of purpose-driven living—one story, one experience, one transformation at a time.`;

export async function generateMetadata() {
  return {
    title: "About Us",
    description: "Learn more about The Condor Collective",
    openGraph: {
      title: "About Us",
      description: "Learn more about The Condor Collective",
      images: [
        signOgImageUrl({
          title: "About",
          label: "The Condor Collective",
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
        <div className="prose lg:prose-lg dark:prose-invert prose-headings:font-gelica m-auto mt-20 mb-10 blog-content">
          <Markdown>{content}</Markdown>
        </div>
      </div>
      <Footer />
    </div>
  );
}
