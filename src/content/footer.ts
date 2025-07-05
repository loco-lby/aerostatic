export const footerContent = {
  description: "Operating at the intersection of adventure and infrastructure, capturing the magic of flight while quietly engineering the systems that make it repeatable.",
  
  sections: {
    services: {
      title: "Services",
      links: [
        { name: "Media Production", href: "/media" },
        { name: "Tech & Tools", href: "/tech" },
        { name: "Balloon Displays", href: "/events" },
        { name: "Support the Mission", href: "/merch" },
        { name: "Work With Us", href: "/hire-us" },
        { name: "About", href: "/about" }
      ]
    },
    connect: {
      title: "Connect",
      socialLinks: [
        // { name: "Email", href: "mailto:creator@aerostatic.io" },
        { name: "Instagram", href: "https://instagram.com/aerostatic" },
        // { name: "Twitter", href: "https://twitter.com/aerostatic" },
        { name: "YouTube", href: "https://youtube.com/@team.aerostatic" }
      ]
    }
  },
  
  newsletter: {
    title: "Stay Connected",
    placeholder: "Enter your email",
    button: "Join",
    submitting: "...",
    success: "Welcome aboard!",
    alreadySubscribed: "You're already on board!",
    error: "Failed to sign up. Please try again."
  },
  
  legal: {
    copyright: "© 2024 Aerostatic. All rights reserved.",
    links: [
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" }
    ]
  }
};

export type FooterContent = typeof footerContent; 