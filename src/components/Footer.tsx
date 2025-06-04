"use client";
import Link from "next/link";
import { FunctionComponent, useState } from "react";
import { Button } from "./ui/button";
import { MapPin, Mail, Twitter, Instagram, Youtube } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import Image from "next/image";

export const Footer: FunctionComponent = () => {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

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
          toast.success("You&apos;re already on our list!")
        } else {
          console.error("Error signing up for newsletter:", error)
          toast.error("Failed to sign up. Please try again.")
        }
      } else {
        toast.success("Thanks for signing up!")
        setEmail("")
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error("An unexpected error occurred. Please try again.")
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
                  src="/images/logo.svg"
                  alt="Aerostatic"
                  width={150}
                  height={40}
                  className="object-contain filter brightness-0 invert"
                />
              </div>
            </Link>
            <p className="text-white/70 leading-relaxed">
              Creating unforgettable balloon experiences that elevate you to new heights.
              The sky is our canvas.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-white font-gelica font-bold text-xl">Services</h3>
            <div className="space-y-3">
              <Link href="/hire-us" className="block text-white/70 hover:text-orange-400 transition-colors">
                Hire Us
              </Link>
              <Link href="/about" className="block text-white/70 hover:text-orange-400 transition-colors">
                Meet the Aeronauts
              </Link>
              <Link href="/adventures" className="block opacity-35 pointer-events-none text-white/70 hover:text-orange-400 transition-colors">
                Our Adventures
              </Link>
              <Link href="/submit" className="block opacity-35 pointer-events-none text-white/70 hover:text-orange-400 transition-colors">
                Submit an Adventure
              </Link>
            </div>
          </div>

          {/* Community */}
          <div className="space-y-6">
            {/* <h3 className="text-white font-gelica font-bold text-xl">Community</h3>
            <div className="space-y-3">
              <Link href="/guidelines" className="block text-white/70 hover:text-orange-400 transition-colors">
                Community Guidelines
              </Link>
              <Link href="/help" className="block text-white/70 hover:text-orange-400 transition-colors">
                Help & Support
              </Link>
              <Link href="/blog" className="block text-white/70 hover:text-orange-400 transition-colors">
                Stories & Updates
              </Link>
              <Link href="/contact" className="block text-white/70 hover:text-orange-400 transition-colors">
                Contact Us
              </Link>
            </div> */}
          </div>

          {/* Connect */}
          <div className="space-y-6">
            <h3 className="text-white font-gelica font-bold text-xl">Connect</h3>
            <div className="flex gap-3">
              <Button size="icon" variant="ghost" className="text-white/70 hover:text-orange-400 hover:bg-white/10" asChild>
                <Link href="https://twitter.com/aerostatic" target="_blank">
                  <Twitter className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="icon" variant="ghost" className="text-white/70 hover:text-orange-400 hover:bg-white/10" asChild>
                <Link href="https://instagram.com/aerostatic" target="_blank">
                  <Instagram className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="icon" variant="ghost" className="text-white/70 hover:text-orange-400 hover:bg-white/10" asChild>
                <Link href="https://youtube.com/aerostatic" target="_blank">
                  <Youtube className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="icon" variant="ghost" className="text-white/70 hover:text-orange-400 hover:bg-white/10" asChild>
                <Link href="mailto:hello@aerostatic.com">
                  <Mail className="h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="pt-4">
              <p className="text-white/70 mb-4 font-medium">Join our newsletter</p>
              <form onSubmit={handleNewsletterSignup} className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50"
                  required
                />
                <Button
                  type="submit"
                  size="default"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 cinematic-glow"
                >
                  {isSubmitting ? "..." : "Join"}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white/60">
            {/* © 
            {new Date().getFullYear()}  */}
            Aerostatic.
            {/* All rights reserved. */}
          </div>
          <div className="flex items-center gap-8">
            <Link href="/privacy" className="text-white/60 hover:text-orange-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/60 hover:text-orange-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-white/60 hover:text-orange-400 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
