"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Camera, Palette, Wind, Globe, Users, Shield, Award, Play } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useContent } from "@/hooks/useContent";

export default function HomePage() {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [isMounted, setIsMounted] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const content = useContent();

  const heroText = content.home.hero.title;

  // Ensure component is mounted before running client-side code
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Typewriter effect for hero text - only starts after mounting
  useEffect(() => {
    if (!isMounted) return;

    // Small delay to ensure hydration is complete
    const startDelay = setTimeout(() => {
      setShowCursor(true);

      let index = 0;
      const timer = setInterval(() => {
        if (index <= heroText.length) {
          setTypedText(heroText.slice(0, index));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 50);

      return () => {
        clearInterval(timer);
      };
    }, 500); // Wait 500ms after mount before starting animation

    return () => {
      clearTimeout(startDelay);
    };
  }, [isMounted, heroText]);

  useEffect(() => {
    if (!isMounted) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    // Observe all sections with animation
    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => {
      if (observerRef.current) {
        observerRef.current.observe(section);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isMounted]);

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
          toast.success("You're already on our list!")
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

  // Helper function to get animation classes with hydration safety
  const getAnimationClass = (sectionId: string, baseClass: string = '') => {
    // Always return the same initial state for SSR consistency
    const baseClasses = `${baseClass} transition-all duration-1000`;

    if (!isMounted) {
      // Server-side: return neutral state without transforms
      return `${baseClasses} opacity-100`;
    }

    // Client-side: apply visibility-based animations
    return `${baseClasses} ${isVisible[sectionId] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`;
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          {isMounted && (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.4) contrast(1.1)' }}
            >
              <source src="/videos/hero1.mp4" type="video/mp4" />
            </video>
          )}
          {/* Fallback gradient - always rendered for SSR */}
          <div className="w-full h-full bg-gradient-to-br from-orange-900/20 to-red-900/20"></div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 z-10"></div>

        {/* Hero Content */}
        <div className="relative z-20 text-center max-w-2xl mx-auto px-0">
          <div className="mb-8">
            <div className="text-2xl md:text-3xl font-gelica font-light text-white/90 tracking-wide mb-2 min-h-[2.5rem]">
              {isMounted ? (
                <>
                  {typedText}
                  {showCursor && <span className="animate-pulse">|</span>}
                </>
              ) : (
                <span className="opacity-0">placeholder</span>
              )}
            </div>
          </div>

          <div className="flex gap-4 justify-center opacity-80">
            <Button
              size="sm"
              variant="outline"
              className="text-sm px-6 py-2 border-white/20 text-white/80 hover:text-white hover:bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-orange-400/30"
              asChild
            >
              <Link href="/hire-us">
                {content.home.hero.primaryButton}
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-sm px-6 py-2 text-white/60 hover:text-white/80 transition-all duration-300"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  const element = document.getElementById('mission');
                  if (element) {
                    element.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  }
                }
              }}
            >
              {content.home.hero.secondaryButton}
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce opacity-60">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/40 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section
        id="mission"
        data-animate
        className={`py-32 px-6 relative ${getAnimationClass('mission')}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div>
                <Badge variant="outline" className="border-orange-500/30 text-orange-400 mb-6">
                  {content.home.mission.badge}
                </Badge>
                <h2 className="text-5xl md:text-6xl font-gelica font-bold mb-8 leading-tight">
                  {content.home.mission.title}
                </h2>
              </div>

              <div className="space-y-6 text-lg text-white/80 leading-relaxed">
                {content.home.mission.content.map((paragraph, index) => (
                  <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
              </div>

              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 mt-8"
                asChild
              >
                {/* <Link href="/about">
                  Our Story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link> */}
              </Button>
            </div>

            {/* Retro Photo Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-lg polaroid hover-lift overflow-hidden relative group">
                  <Image
                    src="/images/stinky.jpg"
                    alt="Hot air balloon flight"
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="aspect-square bg-gradient-to-br from-amber-900/20 to-orange-900/20 rounded-lg polaroid hover-lift overflow-hidden relative group">
                  {isMounted && (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    >
                      <source src="/videos/wine_train.mp4" type="video/mp4" />
                    </video>
                  )}
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-lg polaroid hover-lift overflow-hidden relative group">
                  {isMounted && (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    >
                      <source src="/videos/thailand.mp4" type="video/mp4" />
                    </video>
                  )}
                </div>
                <div className="aspect-[3/4] bg-gradient-to-br from-orange-900/20 to-amber-900/20 rounded-lg polaroid hover-lift overflow-hidden relative group">
                  <Image
                    src="/images/me_and_matteo.jpg"
                    alt="Professional balloon operations"
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section
        id="services"
        data-animate
        className={`py-32 px-6 bg-white/[0.02] relative ${getAnimationClass('services')}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-gelica font-bold mb-6">
              What We Offer
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              We've flown in tight spaces, wild places, and everything in between... this isn't our first rodeo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Static Displays */}
            <Card className="glass hover:glass-warm smooth-transition hover-lift group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-gelica text-white">Static Displays</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/70 text-base leading-relaxed">
                  Our checkered &quot;billboard in the sky&quot; balloon draws attention wherever it stands. Perfect for festivals, races, and outdoor events looking for something iconic.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Ride Tethering */}
            <Card className="glass hover:glass-warm smooth-transition hover-lift group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Wind className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-gelica text-white">Ride Activations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/70 text-base leading-relaxed">
                  Tethered balloon rides that leave your guests with a core memory. Safe, controlled ascents with breathtaking views and photo opportunities.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Media Coverage */}
            <Card className="glass hover:glass-warm smooth-transition hover-lift group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-gelica text-white">Media Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/70 text-base leading-relaxed">
                  A balloon floating over your event doesn't just turn heads, it elevates the entire experience. Our team provides crafted content that lives far beyond the moment.                </CardDescription>
              </CardContent>
            </Card>

            {/* Branded Flights */}
            <Card className="glass hover:glass-warm smooth-transition hover-lift group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-gelica text-white">Content Creators</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/70 text-base leading-relaxed">
                  Need content that stands above the noise? We collaborate with creators to deliver cinematic aerials, unforgettable backdrops, and moments that ignite engagement.              </CardDescription>
              </CardContent>
            </Card>

            {/* Custom Design */}
            <Card className="glass hover:glass-warm smooth-transition hover-lift group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-gelica text-white">Branded Balloon Flights</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/70 text-base leading-relaxed">
                  Put your logo in the sky. We design and fly custom branded envelopes or banners, turning your message into an airborne spectacle. Rise above your competitors... literally.                </CardDescription>
              </CardContent>
            </Card>

            {/* Multi-day Events */}
            <Card className="glass hover:glass-warm smooth-transition hover-lift group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-gelica text-white">Custom Services</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/70 text-base leading-relaxed">
                  Need something off the beaten flight path? From aerial cinematography to fully tailored balloon ops, we bring experience, flexibility, and a knack for making magic from scratch.                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-lg px-10 py-4"
              asChild
            >
              <Link href="/hire-us">
                Drop us a line
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Media Reel Section */}
      {/* <section
        id="media"
        data-animate
        className={`py-32 px-6 ${getAnimationClass('media')}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-gelica font-bold mb-6">
              See Our Work
            </h2>

            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Every flight tells a story
            </p>
            <div className="text-center mt-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-lg px-10 py-4 cinematic-glow hover-lift animate-fade-in-up animation-delay-700"
                asChild
              >
                <Link href="/fallery">
                  View Gallery
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative aspect-video bg-gradient-to-br from-orange-900/10 to-red-900/10 rounded-3xl overflow-hidden glass hover-lift group">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform cinematic-glow">
                  <Play className="w-16 h-16 text-white ml-2" />
                </div>
                <h3 className="text-3xl font-gelica font-bold text-white mb-4">Media Reel Coming Soon</h3>
                <p className="text-white/70 text-lg">Dawn flights, festival displays, and aerial cinematography</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Second Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          {isMounted && (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.4) contrast(1.1)' }}
            >
              <source src="/videos/your_event.mp4" type="video/mp4" />
            </video>
          )}
          {/* Fallback gradient - always rendered for SSR */}
          <div className="w-full h-full bg-gradient-to-br from-orange-900/20 to-red-900/20"></div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 z-10"></div>

        {/* Hero Content */}
        <div className="relative z-20 text-center max-w-2xl mx-auto px-6">
          <div className="mb-8">
            <div className="text-2xl md:text-3xl font-gelica font-light text-white/90 tracking-wide mb-2">
              Elevate your event with a spectacle the whole county can see
            </div>
          </div>

          <div className="flex gap-4 justify-center opacity-80">
            <Button
              size="sm"
              variant="outline"
              className="text-sm px-6 py-2 border-white/20 text-white/80 hover:text-white hover:bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-orange-400/30"
              asChild
            >
              <Link href="/hire-us">
                Let&apos;s Talk
              </Link>
            </Button>
            {/* <Button
              variant="ghost"
              size="sm"
              className="text-sm px-6 py-2 text-white/60 hover:text-white/80 transition-all duration-300"
              asChild
            >
              <Link href="/gallery">
                View Gallery
              </Link>
            </Button> */}
          </div>
        </div>
      </section>

      {/* Platform Teaser Section */}
      <section
        id="platform"
        data-animate
        className={`py-32 px-6 bg-white/[0.02] ${getAnimationClass('platform')}`}
      >
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-12">
            <Globe className="w-20 h-20 mx-auto mb-8 text-orange-500" />
            <h2 className="text-4xl md:text-5xl font-gelica font-bold mb-6">
              This is more than a show in the sky.
            </h2>
            <p className="text-xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
              It&apos;s a return to awe. A slow rebellion against the rushed and the ordinary.
            </p>
            <p className="text-lg text-white/80 mb-8">Stay tuned - adventure is in the air.</p>

            <div className="max-w-md mx-auto">
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
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6"
                >
                  {isSubmitting ? "..." : "Join"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
