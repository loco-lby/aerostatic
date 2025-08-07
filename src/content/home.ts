export const homeContent = {
  hero: {
    title: "We rise to meet your moment.",
    subtitle: "Tech that works. Media that moves. Just look up, we're Aerostatic.",
    cta: "Work With Us"
  },
  
  pillars: [
    {
      id: "media",
      title: "Media Production",
      description: "Cinematic content that moves.",
      content: "From docuseries and branded campaigns to full-scale event coverage, we bring the camera where others don't. Documentary-style storytelling that captures reality while it's still breathing.",
      cta: "Let's make something",
      href: "/media"
    },
    {
      id: "tech",
      title: "Tech Solutions",
      description: "Built in the field, refined through daily use.",
      content: "Purpose-built software for real operations. AeroStatus for balloon operations, custom tools for your unique challenges. Not flashy, not bloated. Just sharp, reliable tech that solves real problems.",
      cta: "Explore solutions",
      href: "/tech"
    },
    {
      id: "events",
      title: "Event Services",
      description: "Spectacle that stops crowds.",
      content: "We've elevated Cathedral City, Singha International, and Balloons Over Bend. Static displays, tethered rides, aerial coverage. When the moment calls for it, we bring visuals that make your audience stop and feel something.",
      cta: "Book your event",
      href: "/events"
    }
  ]
};

export type HomeContent = typeof homeContent; 