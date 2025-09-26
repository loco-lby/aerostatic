export const navigationContent = {
  menuItems: [
    { name: "Academia", href: "/academia" },
    { name: "Productions", href: "/productions" },
    { name: "Technologies", href: "/technologies" },
    { name: "Merchandise", href: "/merch" },
  ],
  cta: "Work with us",
  secondaryCta: {
    text: "Explore Academia",
    href: "/academia"
  }
};

export type NavigationContent = typeof navigationContent; 