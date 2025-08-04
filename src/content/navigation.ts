export const navigationContent = {
  menuItems: [
    { name: "Media", href: "/media" },
    { name: "Tech", href: "/tech" },
    { name: "Events", href: "/events" },
    { name: "About", href: "/about" },
    
    // { name: "Collabs", href: "/collabs" },
  ],
  cta: "Work With Us",
  secondaryCta: {
    text: "Access Your Photos",
    href: "/tools/aeromedia"
  }
};

export type NavigationContent = typeof navigationContent; 