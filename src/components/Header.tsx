"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FunctionComponent, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface MenuItem {
  name: string;
  href: string;
  isSection?: boolean;
  openInNewTab?: boolean;
}

const menuItems: MenuItem[] = [
  { name: "Services", href: "#services", isSection: true },
  { name: "Our Work", href: "/gallery" },
  { name: "Meet the Aeronauts", href: "/about" },
];

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

  const handleMeetAeronautsClick = () => {
    if (pathname === '/') {
      smoothScrollToSection('mission');
    } else {
      router.push('/');
      setTimeout(() => {
        smoothScrollToSection('mission');
      }, 100);
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        {menuItems.map((item) => (
          <motion.div
            key={item.href}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.isSection ? (
              <button
                onClick={() => handleNavClick(item)}
                className={cn(
                  "text-white/80 hover:text-white transition-colors font-medium tracking-wide cursor-pointer",
                  pathname === '/' && "text-white"
                )}
              >
                {item.name}
              </button>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  "text-white/80 hover:text-white transition-colors font-medium tracking-wide",
                  pathname === item.href && "text-white"
                )}
              >
                {item.name}
              </Link>
            )}
          </motion.div>
        ))}
      </nav>

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
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-6 right-6 text-white hover:text-orange-400"
                onClick={() => setIsOpen(false)}
              >
                <X size="24" />
              </Button>

              {menuItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.isSection ? (
                    <button
                      onClick={() => handleNavClick(item)}
                      className={cn(
                        "text-2xl font-gelica text-white/80 hover:text-white transition-colors cursor-pointer",
                        pathname === '/' && "text-orange-400"
                      )}
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "text-2xl font-gelica text-white/80 hover:text-white transition-colors",
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
                className="flex flex-col gap-4 mt-8"
              >
                {/* <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10"
                  onClick={handleMeetAeronautsClick}
                >
                  Meet the Aeronauts
                </Button> */}
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                  asChild
                >
                  <Link href="/hire-us" onClick={() => setIsOpen(false)}>
                    Hire Us
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
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMeetAeronautsClick = () => {
    const pathname = window.location.pathname;
    if (pathname === '/') {
      smoothScrollToSection('mission');
    } else {
      router.push('/');
      setTimeout(() => {
        smoothScrollToSection('mission');
      }, 100);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-black/90 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative h-12 w-auto transition-transform duration-300"
            >
              <Image
                src="/images/logo.svg"
                alt="Aerostatic"
                width={180}
                height={48}
                className="object-contain filter brightness-0 invert"
                priority
              />
            </motion.div>
          </Link>

          {/* Navigation */}
          <Navigation />

          {/* CTA Section */}
          <div className="flex items-center gap-4">
            {/* Secondary CTA - Meet the Aeronauts */}
            {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                onClick={handleMeetAeronautsClick}
                className="text-white/80 hover:text-white hover:bg-white/10 hidden lg:inline-flex font-medium cursor-pointer"
              >
                Meet the Aeronauts
              </Button>
            </motion.div> */}

            {/* Primary CTA - Hire Us */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold px-6 py-2 cinematic-glow"
              >
                <Link href="/hire-us">Hire Us</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
