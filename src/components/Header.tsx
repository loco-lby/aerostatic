"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { config } from "@/config";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FunctionComponent, useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface MenuItem {
  name: string;
  href: string;
  openInNewTab?: boolean;
}
const menuItems: MenuItem[] = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
];
export const Navigation: FunctionComponent = () => {
  const pathname = usePathname();

  return (
    <nav>
      <div className="hidden md:flex items-center">
        {menuItems.map((item) => (
          <div key={item.href} className="ml-4 md:ml-8">
            <a
              href={item.href}
              target={item.openInNewTab ? "_blank" : "_self"}
              className={cn(
                "hover:text-gray-900",
                pathname === item.href && "font-semibold"
              )}
            >
              {item.name}
            </a>
          </div>
        ))}
      </div>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu size="24" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetDescription>
                {menuItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    target={item.openInNewTab ? "_blank" : "_self"}
                    className={cn(
                      "block py-2",
                      pathname === item.href && "font-semibold"
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export const Header: FunctionComponent = () => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After mounting, we have access to the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  // Choose the logo based on the current theme
  const logoSrc = mounted && (theme === 'dark' || resolvedTheme === 'dark')
    ? '/images/condor-logo-dark.svg'
    : '/images/condor-logo-light.svg';

  return (
    <section className="flex items-center justify-between mt-8 md:mt-16 mb-12">
      <Link href="/" className="flex items-center gap-2">
        <div className="relative w-20 h-20 mr-4">
          {mounted ? (
            <Image
              src={logoSrc}
              alt="Condor Collective Logo"
              width={80}
              height={80}
              className="text-current"
            />
          ) : (
            <div className="w-10 h-10" /> // Placeholder while mounting to prevent layout shift
          )}
        </div>
        <h1 className="text-4xl md:text-6xl font-gelica tracking-tighter leading-tight">
          {config.blog.name}
        </h1>
      </Link>
      <Navigation />
    </section>
  );
};
