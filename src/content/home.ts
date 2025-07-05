export const homeContent = {
  hero: {
    title: "Adventure is in the air... just look up.",
    subtitle: "Built by working pilots. Focused on keeping ballooning alive through merch, media, and tools.",
    cta: "Get on board"
  },
  
  pillars: [
    {
      id: "gear",
      title: "Merch",
      description: "Wear the mission.",
      content: "Tested in the field and designed by pilots. Every sale funds the next flight. Grab it, then get out there.",
      cta: "Shop the drop",
      href: "/merch"
    },
    {
      id: "media",
      title: "Media", 
      // description: "Just look up isn't a slogan, it's a plea.",
      content: "Watch, share, then write your own chapter.",
      cta: "Stream the latest episode",
      href: "/media"
    },
    {
      id: "tech",
      title: "Tech & Tools",
      description: "Learn how to fly.",
      content: "We build what we need: Aerostatus for ops, Aether for certification. Tools for sky people... request early access.",
      cta: "Request beta invite",
      href: "/tech"
    },
    {
      id: "events",
      title: "Events & Displays",
      description: "Spectacles that stop traffic.",
      content: "Elevate your event with a sight the whole county can see. We just want to share the view and will work with you to make it happen.",
      cta: "Book an event",
      href: "/events"
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