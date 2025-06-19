"use client";
import Link from "next/link";
import { FunctionComponent, useState } from "react";
import { Button } from "./ui/button";
import { MapPin, Mail, Twitter, Instagram, Youtube } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import Image from "next/image";
import { useContent } from "@/hooks/useContent";

export const Footer: FunctionComponent = () => {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const content = useContent();

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)

    try {
      const supabase = createClient()

      const { error } = await supabase
        .from('newsletter_signups')
        .insert({
          email: email,
          source: 'footer'
        })

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast.success(content.footer.newsletter.alreadySubscribed)
        } else {
          console.error("Error signing up for newsletter:", error)
          toast.error(content.footer.newsletter.error)
        }
      } else {
        toast.success(content.footer.newsletter.success)
        setEmail("")
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error(content.footer.newsletter.error)
    } finally {
      setIsSubmitting(false)
    }
  }

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
                  className={`block text-white/70 hover:text-orange-400 transition-colors ${link.disabled ? 'opacity-35 pointer-events-none' : ''
                    }`}
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
                    {social.name === 'Twitter' && <Twitter className="h-5 w-5" />}
                    {social.name === 'Instagram' && <Instagram className="h-5 w-5" />}
                    {social.name === 'YouTube' && <Youtube className="h-5 w-5" />}
                    {social.name === 'Email' && <Mail className="h-5 w-5" />}
                  </Link>
                </Button>
              ))}
            </div>
            <div className="pt-4">
              <p className="text-white/70 mb-4 font-medium">{content.footer.newsletter.title}</p>
              <form onSubmit={handleNewsletterSignup} className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={content.footer.newsletter.placeholder}
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50"
                  required
                />
                <Button
                  type="submit"
                  size="default"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 cinematic-glow"
                >
                  {isSubmitting ? content.footer.newsletter.submitting : content.footer.newsletter.button}
                </Button>
              </form>
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
