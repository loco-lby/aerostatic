export const navigationContent = {
  menuItems: [
    { name: "Home", href: "/" },
    {
      name: "Services",
      href: "#",
      dropdown: [
        { name: "Productions", href: "/productions" },
        { name: "Technologies", href: "/technologies" },
        { name: "Events", href: "/events" },
        { name: "Merchandise", href: "/merch" },
      ]
    },
    { name: "Goldilocks", href: "/goldilocks" },
  ],
  cta: "Work with us",
  secondaryCta: {
    text: "Join the Movement",
    href: "/#join"
  }
};

export type NavigationContent = typeof navigationContent;
