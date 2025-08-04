"use client";
import Link from "next/link";
import { FunctionComponent } from "react";
import { Button } from "./ui/button";
import { MapPin, Mail, Twitter, Instagram, Youtube } from "lucide-react";
import Image from "next/image";
import { useContent } from "@/hooks/useContent";

export const Footer: FunctionComponent = () => {
  const content = useContent();

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center group">
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
            <p className="text-white/70 leading-relaxed">
              {content.footer.description}
            </p>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-white font-gelica font-bold text-xl">{content.footer.sections.services.title}</h3>
            <div className="space-y-3">
              {content.footer.sections.services.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-white/70 hover:text-orange-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Community - Empty for now */}
          <div className="space-y-6">
            {/* This section is currently empty in the original design */}
          </div>

          {/* Connect */}
          <div className="space-y-6">
            <h3 className="text-white font-gelica font-bold text-xl">{content.footer.sections.connect.title}</h3>
            <div className="flex gap-3">
              {content.footer.sections.connect.socialLinks.map((social) => (
                <Button
                  key={social.name}
                  size="icon"
                  variant="ghost"
                  className="text-white/70 hover:text-orange-400 hover:bg-white/10"
                  asChild
                >
                  <Link href={social.href} target="_blank">
                    {/* {social.name === 'Twitter' && <Twitter className="h-5 w-5" />} */}
                    {social.name === 'Instagram' && <Instagram className="h-5 w-5" />}
                    {social.name === 'YouTube' && <Youtube className="h-5 w-5" />}
                    {social.name === 'Email' && <Mail className="h-5 w-5" />}
                  </Link>
                </Button>
              ))}
            </div>
            <div className="pt-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white w-full"
              >
                <Link href="/work-with-us">
                  Work With Us
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white/60">
            {content.footer.legal.copyright}
          </div>
          <div className="flex items-center gap-8">
            {content.footer.legal.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/60 hover:text-orange-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
