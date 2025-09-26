export const footerContent = {
  description: "A media production company built for people in motion. We chase the light, ride the wind, and tell stories that move.",
  
  sections: {
    services: {
      title: "Services",
      links: [
        { name: "Media Production", href: "/media" },
        { name: "Tech Solutions", href: "/tech" },
        { name: "Event Services", href: "/events" },
        { name: "Partnerships", href: "/partnerships" },
        { name: "Work With Us", href: "/work-with-us" },
        { name: "About", href: "/about" }
      ]
    },
    connect: {
      title: "Connect",
      socialLinks: [
        // { name: "Email", href: "mailto:info@aerostatic.io" },
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
    copyright: "© 2024 Aerostatic. All rights reserved. Designed & Developed by Colby @ Aerostatic",
    links: [
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" }
    ]
  }
};

export type FooterContent = typeof footerContent; 