export const footerContent = {
  description: "Dedicated aeronauts floating upstream against a disappearing craft.",
  
  sections: {
    services: {
      title: "Services",
      links: [
        { name: "Events & Displays", href: "/events" },
        { name: "Media", href: "/media" },
        { name: "Gear & Merch", href: "/merch" },
        { name: "Tech & Tools", href: "/tech", disabled: true },
        { name: "Adventure Kits", href: "/kits" },
        { name: "Partnerships", href: "/collabs" }
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