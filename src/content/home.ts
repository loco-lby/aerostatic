export const homeContent = {
  hero: {
    title: "Adventure is in the air... just look up.",
    subtitle: "A pilot-run production and technology project keeping ballooning alive through field-tested tools and cinematic storytelling.",
    cta: "Get on board"
  },
  
  pillars: [
    {
      id: "media",
      title: "Media & Stories",
      description: "Documenting reality, not manufacturing vibes.",
      content: "Short-form videos, long-form episodes, and branded event coverage designed to reignite public imagination about what ballooning can be. Watch, share, then write your own chapter.",
      cta: "Stream the latest episode",
      href: "/media"
    },
    {
      id: "tech",
      title: "Tech & Tools",
      description: "Built in the field, refined through daily use.",
      content: "We build what we need: Aerostatus for ops, Aether for certification. Tools for sky people, quietly offered to others walking the same path. Request early access.",
      cta: "Request beta invite",
      href: "/tech"
    },
    {
      id: "events",
      title: "Events",
      description: "Every event we fly becomes a story.",
      content: "We don't just show up, we document the magic. Elevate your event with a sight the whole county can see while we capture it for the world.",
      cta: "Book an event",
      href: "/events"
    },
    {
      id: "gear",
      title: "Support the Mission",
      description: "You don't need a hat to be part of this.",
      content: "But it helps fund the next flight. Every piece supports the mission, proof that flight still matters. We'll fly it forward.",
      cta: "Shop merch",
      href: "/merch"
    },
   
    // {
    //   id: "kits",
    //   title: "Adventure Kits",
    //   description: "Route packs, field notes, and van-life hacks.",
    //   content: "Downloadable, editable, shareable. If it shaved hours off our planning, it's in here. Name your price or grab the free starters and get moving.",
    //   cta: "Browse kits",
    //   href: "/kits"
    // },
    // {
    //   id: "collabs",
    //   title: "Partnerships & Collabs",
    //   description: "From Elevated Partnerships to Craft in Motion.",
    //   content: "We build alliances that lift both banners. Pitch us your cause, product, or film idea; we'll bring the lift and the lens.",
    //   cta: "Start a collab",
    //   href: "/collabs"
    // }
  ]
};

export type HomeContent = typeof homeContent; 