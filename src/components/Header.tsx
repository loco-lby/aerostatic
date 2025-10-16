"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FunctionComponent, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useContent } from "@/hooks/useContent";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface MenuItem {
  name: string;
  href: string;
  isSection?: boolean;
  openInNewTab?: boolean;
  dropdown?: {
    name: string;
    href: string;
  }[];
}

const smoothScrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

export const Navigation: FunctionComponent = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const content = useContent();

  const handleNavClick = (item: MenuItem) => {
    if (item.isSection) {
      const sectionId = item.href.replace('#', '');

      if (pathname === '/') {
        // Already on homepage, just scroll
        smoothScrollToSection(sectionId);
      } else {
        // Navigate to homepage first, then scroll
        router.push('/');
        setTimeout(() => {
          smoothScrollToSection(sectionId);
        }, 100);
      }
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList className="gap-8">
          {content.navigation.menuItems.map((item) => (
            <NavigationMenuItem key={item.href}>
              {item.dropdown ? (
                <>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-transparent data-[state=open]:bg-transparent text-white/80 hover:text-white font-picnic font-light italic text-2xl tracking-wide">
                    {item.name}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-56 p-2 bg-black/95 backdrop-blur-md border border-white/10 rounded-lg">
                      {item.dropdown.map((dropdownItem) => (
                        <li key={dropdownItem.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={dropdownItem.href}
                              className={cn(
                                "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/5 hover:text-white focus:bg-white/5 focus:text-white text-white/80 font-picnic font-light italic text-xl",
                                pathname === dropdownItem.href && "text-orange-400 bg-white/5"
                              )}
                            >
                              {dropdownItem.name}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "text-white/80 hover:text-white transition-all font-picnic font-light italic text-2xl tracking-wide hover:scale-105",
                    pathname === item.href && "text-white"
                  )}
                >
                  {item.name}
                </Link>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:text-orange-400 hover:bg-white/10"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size="24" /> : <Menu size="24" />}
        </Button>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black backdrop-blur-md"
            style={{ top: 0 }}
          >
            <div className="flex flex-col items-center justify-center min-h-screen space-y-8 relative">
              <Button
                variant="ghost"
                size="icon"
                className="fixed top-6 right-6 z-[101] text-white hover:text-orange-400"
                onClick={() => setIsOpen(false)}
              >
                <X size="24" />
              </Button>

              {content.navigation.menuItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center gap-4"
                >
                  {item.dropdown ? (
                    <>
                      <div className="text-4xl font-picnic font-light italic text-white/80">
                        {item.name}
                      </div>
                      <div className="flex flex-col items-center gap-3">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            className={cn(
                              "text-2xl font-picnic font-light italic text-white/70 hover:text-white transition-colors",
                              pathname === dropdownItem.href && "text-orange-400"
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "text-4xl font-picnic font-light italic text-white/80 hover:text-white transition-colors",
                        pathname === item.href && "text-orange-400"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                  asChild
                >
                  <Link href="/work-with-us" onClick={() => setIsOpen(false)}>
                    {content.navigation.cta}
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export const Header: FunctionComponent = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [bannerHeight, setBannerHeight] = useState(0);
  const router = useRouter();
  const content = useContent();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const updateBannerHeight = () => {
      const banner = document.querySelector('[data-announcement-banner]');
      if (banner) {
        setBannerHeight(banner.clientHeight);
      } else {
        setBannerHeight(0);
      }
    };

    // Initial check
    updateBannerHeight();

    // Watch for changes (banner dismissal)
    const observer = new MutationObserver(updateBannerHeight);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateBannerHeight);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateBannerHeight);
      observer.disconnect();
    };
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed left-0 right-0 z-40 transition-all duration-300",
        isScrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      )}
      style={{ top: `${bannerHeight}px` }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative h-10 w-auto group-hover:scale-110 transition-transform duration-300">
                <Image
                  src="/images/logo2.svg"
                  alt={content.site.name}
                  width={150}
                  height={40}
                  className="object-contain"
                />
              </div>
            </Link>
          </motion.div>

          {/* Navigation */}
          <Navigation />

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <Button
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25"
              asChild
            >
              <Link href="/work-with-us">
                {content.navigation.cta}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
