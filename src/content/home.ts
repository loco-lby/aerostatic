export const homeContent = {
  hero: {
    title: "The Future of Ballooning",
    subtitle: "Stories and technology for the next generation of aeronauts",
    cta: "Join the Movement"
  },

  mission: {
    title: "Our Mission",
    paragraphs: [
      "Ballooning is more than a hobby. It's a philosophy, a way of seeing the world, a community of people who chase the wind and live for those perfect mornings when the air is still and the world is waking up. But this sport is at a crossroads. The average age is climbing. The barriers to entry are high. The tools are stuck in the past.",
      "We're here to change that.",
      "Aerostatic exists to make ballooning accessible, safe, and irresistible to the next generation. We're doing this on two fronts: media that captures the soul of ballooning, and technology that removes the friction."
    ]
  },

  twoFronts: {
    title: "Two Fronts",
    subtitle: "How we're making ballooning matter",

    media: {
      title: "Media: The Stories That Need Telling",
      content: [
        "We're giving voice to the philosophy and stories of ballooning—the ones you only hear if you've been in a chase vehicle at dawn, or stood in a field watching an envelope fill. The moments of beauty, the hard-earned wisdom, the culture that exists between flights.",
        "Through video, photography, and authentic storytelling, we're showing the world what ballooning really is: not a bucket list item for tourists, but a way of life for people who refuse to stay grounded."
      ],
      features: [
        "Philosophy videos exploring what it means to fly with the wind",
        "Profiles of pilots, crew, and operators keeping the sport alive",
        "Behind-the-scenes looks at the culture, the camaraderie, the chaos",
        "Educational content that lowers the barrier for newcomers"
      ],
      cta: "Watch Our Stories",
      href: "/productions"
    },

    tech: {
      title: "Tech: Tools That Actually Work",
      content: [
        "If you're a pilot, operator, or crew member, you know the pain. The spreadsheets. The outdated software. The paper logbooks. The weather apps that weren't built for balloons. The communication chaos when coordinating a flight.",
        "We're building the tools that should have existed years ago."
      ],
      tools: [
        {
          name: "AeroStatus",
          description: "Operations management designed for balloon companies. Crew scheduling, flight logging, maintenance tracking, and everything else you're currently doing the hard way."
        },
        {
          name: "AeroNav",
          description: "Flight planning and navigation built specifically for balloonists. Real-time weather integration, route planning that understands how balloons actually fly, and tools that keep you safe in the air."
        }
      ],
      footer: "More tools are coming. We're listening to what you need, and we're building it.",
      cta: "See Our Tech",
      href: "/technologies"
    }
  },

  about: {
    title: "About Colby",
    content: [
      "I'm Colby, and I was raised in this sport. My dad, brother, and sister are all pilots. I grew up in chase vehicles, helping with inflations, hearing the stories around burners after flights.",
      "Being the youngest person in a sea of an aging industry instilled something in me: this sport is too incredible to let fade away. There's a generation of young people who would fall in love with ballooning if they knew it existed, if it was accessible, if someone was speaking their language.",
      "That's what Aerostatic is. It's the company I wish had existed when I was younger. It's my contribution to keeping this sport alive, vibrant, and growing.",
      "And honestly, it goes beyond just the sport for me. The lessons ballooning teaches - reading conditions, adapting, working as a crew - those are life skills. That's a philosophy I think can empower the ones who need it, even if it's not inspiring them to become balloonist, it's inspiring them to think outside the box."
    ],
    imagePlaceholder: true
  },

  joinMovement: {
    title: "Join the Movement",
    subtitle: "This is just the beginning. Whether you're a veteran pilot, a first-time crew member, or someone who's never been in a balloon but feels the pull—there's a place for you here.",

    ctas: [
      {
        type: "email",
        title: "Stay Updated",
        description: "Get stories, product updates, and invitations to events",
        action: "email-signup"
      },
      {
        type: "social",
        title: "Follow Along",
        description: "Join us on Instagram, TikTok, and YouTube",
        links: {
          instagram: "https://instagram.com/aerostatic",
          tiktok: "https://tiktok.com/@aerostatic",
          youtube: "https://youtube.com/@aerostatic"
        }
      },
      {
        type: "contact",
        title: "Have a Story or Idea?",
        description: "We want to hear from you",
        href: "/work-with-us"
      }
    ]
  },

  footer: {
    tagline: "Let's Talk Balloons",
    subtitle: "If you see us at Fiesta, at a rally, or anywhere balloons gather—come say hi. We're here to listen, to learn, and to build something together."
  },

  // Legacy pillars - keeping for potential use on other pages
  pillars: [
    {
      id: "academia",
      title: "Academia",
      description: "Your hub for all things hot air.",
      content: "Dive deep into the untold stories of aeronauts, the rich history of ballooning, and answers to every question about life in the sky. From technical breakdowns to legendary tales, we're documenting and sharing the knowledge that keeps this culture alive.",
      cta: "Explore Academia",
      href: "/academia"
    },
    {
      id: "media",
      title: "Media",
      description: "Producing cinematic adventure marketing.",
      content: "From docuseries and branded campaigns to full-scale event coverage, we bring the camera where others don't. Documentary-style storytelling that captures reality while it's still breathing. Every flight becomes portfolio content that extends your event's reach.",
      cta: "Book us for your event",
      href: "/productions"
    },
    {
      id: "development",
      title: "Development",
      description: "Building practical, field-tested software.",
      content: "AeroStatus for flight operations and AeroKnot for navigation & planning. Purpose-built software for real balloon operations. Not flashy, not bloated—just sharp, reliable tech that solves real problems and builds trust within the community.",
      cta: "Explore our tools",
      href: "/technologies"
    },
    {
      id: "merchandise",
      title: "Merchandise",
      description: "Adventure gear for those who get it.",
      content: "Caps, embroidered patches, and Napa Valley-specific apparel designed by balloonists for balloonists. Each piece tells a story from the sky. Future drops include leather goods and premium embroidered pieces. Every purchase directly supports our mission of preserving ballooning culture.",
      cta: "Shop the collection",
      href: "/merch"
    }
  ]
};

export type HomeContent = typeof homeContent;
