"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Camera, Palette, Wind, Globe, Users, Shield, Award, Play } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function HomePage() {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
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
  }, []);

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
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.4) contrast(1.1)' }}
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
            {/* Fallback gradient if video doesn't load */}
            <div className="w-full h-full bg-gradient-to-br from-orange-900/20 to-red-900/20"></div>
          </video>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 z-10"></div>

        {/* Hero Content */}
        <div className="relative z-20 text-center max-w-6xl mx-auto px-6">
          <h1 className="hero-text text-white mb-6 animate-fade-in-up">
            The Sky Is Our Canvas
          </h1>
          <p className="subhead-text mb-12 max-w-4xl mx-auto animate-fade-in-up animation-delay-300">
            We create unforgettable hot air balloon displays and cinematic coverage for festivals, brand launches, and private experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up animation-delay-600">
            <Button
              size="lg"
              className="text-lg px-10 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 cinematic-glow font-semibold hover-lift"
              asChild
            >
              <Link href="/hire-us">
                Hire Us for Your Event
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-10 py-4 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm hover-lift cursor-pointer"
              onClick={() => {
                const element = document.getElementById('mission');
                if (element) {
                  element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  });
                }
              }}
            >
              Meet the Aeronauts
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section
        id="mission"
        data-animate
        className={`py-32 px-6 relative transition-all duration-1000 ${isVisible.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div>
                <Badge variant="outline" className="border-orange-500/30 text-orange-400 mb-6 animate-glow-pulse">
                  Meet the Aeronauts
                </Badge>
                <h2 className="text-5xl md:text-6xl font-gelica font-bold mb-8 leading-tight">
                  We&apos;re Aeronauts and Storytellers
                </h2>
              </div>

              <div className="space-y-6 text-lg text-white/80 leading-relaxed">
                They say the only way to shut a pilot up is to tie his hands behind his back. So we found a better way: let the visuals do the talking.
                <p />
                <p className="animate-fade-in-up animation-delay-200">
                  At Aerostatic, we bring our lifelong love of ballooning into the modern age of storytelling. From sky high displays to the ground chase below, our team turns every flight into something worth watching.
                </p>
                <p className="animate-fade-in-up animation-delay-400">
                  <strong className="text-white">Colby</strong> is a third-generation pilot, certified instructor, and the brain behind our design, media, and tech development.
                </p>
                <p className="animate-fade-in-up animation-delay-600">
                  <strong className="text-white">Matteo</strong> is a pilot and gifted communicator. With roots in the music industry, he brings a sharp ear for rhythm and detail to managing client relations and crafting custom activations across the West.
                </p>
                <p className="animate-fade-in-up animation-delay-800">
                  Together, we help brands and event teams rediscover what wonder feels like. One balloon at a time
                </p>
              </div>

              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 mt-8 hover-lift animate-fade-in-up animation-delay-800"
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
                <div className="aspect-[3/4] bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-lg polaroid hover-lift animate-fade-in-up animation-delay-300">
                  <div className="w-full h-full flex items-center justify-center text-white/60">
                    <Camera className="w-12 h-12" />
                  </div>
                </div>
                <div className="aspect-square bg-gradient-to-br from-amber-900/20 to-orange-900/20 rounded-lg polaroid hover-lift animate-fade-in-up animation-delay-700">
                  <div className="w-full h-full flex items-center justify-center text-white/60">
                    <Users className="w-10 h-10" />
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-lg polaroid hover-lift animate-fade-in-up animation-delay-500">
                  <div className="w-full h-full flex items-center justify-center text-white/60">
                    <Wind className="w-10 h-10" />
                  </div>
                </div>
                <div className="aspect-[3/4] bg-gradient-to-br from-orange-900/20 to-amber-900/20 rounded-lg polaroid hover-lift animate-fade-in-up animation-delay-900">
                  <div className="w-full h-full flex items-center justify-center text-white/60">
                    <Shield className="w-12 h-12" />
                  </div>
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
        className={`py-32 px-6 bg-white/[0.02] relative transition-all duration-1000 ${isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-gelica font-bold mb-6">
              What We Offer
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              We&apos;ve flown in tight spaces, wild places, and everything in between... this isn&apos;t our first rodeo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Static Displays */}
            <Card className="glass hover:glass-warm smooth-transition hover-lift group animate-fade-in-up animation-delay-100">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform cinematic-glow">
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
            <Card className="glass hover:glass-warm smooth-transition hover-lift group animate-fade-in-up animation-delay-200">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform cinematic-glow">
                  <Wind className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-gelica text-white">Ride Activations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/70 text-base leading-relaxed">
                  Tethered balloon rides that give your guests an unforgettable sunrise or sunset perspective. Safe, controlled ascents with breathtaking views and photo opportunities.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Media Coverage */}
            <Card className="glass hover:glass-warm smooth-transition hover-lift group animate-fade-in-up animation-delay-300">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform cinematic-glow">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-gelica text-white">Media Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/70 text-base leading-relaxed">
                  A balloon floating over your event doesn&apos;t just turn heads, it elevates the entire experience. Our team provides crafted content that lives far beyond the moment.                </CardDescription>
              </CardContent>
            </Card>

            {/* Branded Flights */}
            <Card className="glass hover:glass-warm smooth-transition hover-lift group animate-fade-in-up animation-delay-400">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform cinematic-glow">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-gelica text-white">Content Creators</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/70 text-base leading-relaxed">
                  Looking for something visually striking to share? Our balloon activations offer cinematic views, rare experiences, and a backdrop your followers won&apos;t forget.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Custom Design */}
            <Card className="glass hover:glass-warm smooth-transition hover-lift group animate-fade-in-up animation-delay-500">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform cinematic-glow">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-gelica text-white">Branded Balloon Flights</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/70 text-base leading-relaxed">
                  Custom-branded balloon envelopes and flight experiences that put your brand in the sky. Unforgettable marketing that literally rises above the competition.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Multi-day Events */}
            <Card className="glass hover:glass-warm smooth-transition hover-lift group animate-fade-in-up animation-delay-600">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform cinematic-glow">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-gelica text-white">Multi-day Activations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/70 text-base leading-relaxed">
                  Extended balloon presence for festivals, campaigns, or multi-city events. Content and branding that build momentum throughout your activation.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-lg px-10 py-4 cinematic-glow hover-lift animate-fade-in-up animation-delay-700"
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
      <section
        id="media"
        data-animate
        className={`py-32 px-6 transition-all duration-1000 ${isVisible.media ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
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

          {/* Media reel placeholder */}
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
      </section>

      {/* Platform Teaser Section */}
      <section
        id="platform"
        data-animate
        className={`py-32 px-6 bg-white/[0.02] transition-all duration-1000 ${isVisible.platform ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
      >
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-12">
            <Globe className="w-20 h-20 mx-auto mb-8 text-orange-500 animate-glow-pulse" />
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
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 cinematic-glow"
                >
                  {isSubmitting ? "..." : "Join"}
                </Button>
              </form>
            </div>
          </div>

          {/* <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 py-4 border-orange-500/30 text-orange-400 hover:bg-orange-500/10 hover-lift"
              asChild
            >
              <Link href="/adventures">Explore Adventures</Link>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-lg px-10 py-4 text-white/70 hover:text-white hover:bg-white/10 hover-lift"
              asChild
            >
              <Link href="/submit">Submit an Adventure</Link>
            </Button>
          </div> */}
        </div>
      </section>

      <Footer />
    </div>
  );
}
