"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FunctionComponent, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useContent } from "@/hooks/useContent";

interface MenuItem {
  name: string;
  href: string;
  isSection?: boolean;
  openInNewTab?: boolean;
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
      <nav className="hidden md:flex items-center gap-8">
        {content.navigation.menuItems.map((item) => (
          <motion.div
            key={item.href}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={item.href}
              className={cn(
                "text-white/80 hover:text-white transition-colors font-medium tracking-wide",
                pathname === item.href && "text-white"
              )}
            >
              {item.name}
            </Link>
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

              {content.navigation.menuItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
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
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col gap-4 mt-8"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-orange-400/30 text-orange-400 hover:bg-orange-400/10"
                  asChild
                >
                  <Link href={content.navigation.secondaryCta.href} onClick={() => setIsOpen(false)}>
                    {content.navigation.secondaryCta.text}
                  </Link>
                </Button>
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
  const router = useRouter();
  const content = useContent();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      )}
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

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              className="border-orange-400/30 text-orange-400 hover:bg-orange-400/10 hover:border-orange-400 font-medium px-5 py-2 rounded-lg transition-all duration-300"
              asChild
            >
              <Link href={content.navigation.secondaryCta.href}>
                {content.navigation.secondaryCta.text}
              </Link>
            </Button>
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
