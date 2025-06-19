"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Camera, Users, Shield, Award, MapPin, Calendar, Star } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [isMounted, setIsMounted] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Ensure component is mounted before running client-side code
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Add structured data for the team
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      mainEntity: {
        "@type": "Organization",
        name: "Aerostatic",
        employee: [
          {
            "@type": "Person",
            name: "Colby",
            jobTitle: "Third-Generation Pilot & Creative Director",
            description: "Certified instructor and the brain behind design, media, and tech development.",
            hasCredential: {
              "@type": "EducationalOccupationalCredential",
              credentialCategory: "Certified Flight Instructor",
            },
          },
          {
            "@type": "Person",
            name: "Matteo",
            jobTitle: "Pilot & Client Relations Manager",
            description: "Pilot and gifted communicator with roots in the music industry, managing client relations and crafting custom activations.",
          },
        ],
      },
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

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
          source: 'about_page'
        })

      if (error) {
        if (error.code === '23505') {
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

  // Helper function to get animation classes with hydration safety
  const getAnimationClass = (sectionId: string, baseClass: string = '') => {
    const baseClasses = `${baseClass} transition-all duration-1000`;

    if (!isMounted) {
      return `${baseClasses} opacity-100`;
    }

    return `${baseClasses} ${isVisible[sectionId] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`;
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-60 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-900/10 to-transparent"></div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <Badge variant="outline" className="border-orange-500/30 text-orange-400 mb-6">
            Meet the Team
          </Badge>
          <h1 className="hero-text text-white mb-6">
            We&apos;re Aeronauts and Storytellers
          </h1>
          <p className="subhead-text my-12 max-w-4xl mx-auto">
            Industry born balloon crew blending aircraft with storycraft.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section
        id="story"
        data-animate
        className={`py-20 px-6 relative ${getAnimationClass('story')}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-gelica font-bold mb-8 leading-tight">
                We work in the field.
              </h2>
              <div className="space-y-6 text-lg text-white/80 leading-relaxed">
                <p>
                  Aerostatic didn’t start with a pitch deck. For Colby, it began on a stepping stool he used to reach the burner when he was 10. For Matteo, it started with a pieced together trailer, a stinky balloon, and a weird obsession with whatever this is that we do.
                </p>
                <p>
                  We film as we go, partly to share the experience, partly so we don’t forget how wild this all felt at the beginning.
                </p>
                <p>
                  Every activation we create is designed to capture attention, create memories, and deliver content that lives far beyond the moment, while following industry leading safety standards.
                </p>
              </div>
            </div>

            {/* Photo Grid - Updated to match home page */}
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

      {/* Team Profiles */}
      <section
        id="team"
        data-animate
        className={`py-20 px-6 bg-white/[0.02] transition-all duration-1000 ${isVisible.team ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-gelica font-bold mb-6">
              The Aeronauts
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Two dudes bought a balloon.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Colby */}
            <Card className="glass hover:glass-warm smooth-transition hover-lift group animate-fade-in-up animation-delay-200">
              <CardHeader className="pb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform cinematic-glow mx-auto">
                  <span className="text-3xl font-gelica font-bold text-white">C</span>
                </div>
                <CardTitle className="text-3xl font-gelica text-white text-center">Colby</CardTitle>
                <CardDescription className="text-orange-400 text-center font-medium">
                  Third-Generation Pilot & Creative Director
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  <Badge variant="outline" className="border-orange-500/30 text-orange-400">
                    <Shield className="w-3 h-3 mr-1" />
                    Instructor & Commercial Pilot
                  </Badge>
                  <Badge variant="outline" className="border-orange-500/30 text-orange-400">
                    <Camera className="w-3 h-3 mr-1" />
                    Media Director
                  </Badge>
                  <Badge variant="outline" className="border-orange-500/30 text-orange-400">
                    <Award className="w-3 h-3 mr-1" />
                    Tech Development
                  </Badge>
                </div>
                <p className="text-white/80 leading-relaxed text-center">
                  Leads design, tech, media, and operations. Background in aviation and software. Pockets full of dust (for wind checks) and loose SD cards (not for wind checks).
                </p>
                <p className="text-white/80 leading-relaxed text-center">
                  <strong>Quote:</strong> "Think with your hands"
                </p>
              </CardContent>
            </Card>

            {/* Matteo */}
            <Card className="glass hover:glass-warm smooth-transition hover-lift group animate-fade-in-up animation-delay-400">
              <CardHeader className="pb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform cinematic-glow mx-auto">
                  <span className="text-3xl font-gelica font-bold text-white">M</span>
                </div>
                <CardTitle className="text-3xl font-gelica text-white text-center">Matteo</CardTitle>
                <CardDescription className="text-orange-400 text-center font-medium">
                  Pilot & Client Relations Director
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  <Badge variant="outline" className="border-orange-500/30 text-orange-400">
                    <Users className="w-3 h-3 mr-1" />
                    Client Relations
                  </Badge>
                  <Badge variant="outline" className="border-orange-500/30 text-orange-400">
                    <MapPin className="w-3 h-3 mr-1" />
                    Operations Director
                  </Badge>
                  <Badge variant="outline" className="border-orange-500/30 text-orange-400">
                    <Star className="w-3 h-3 mr-1" />
                    Private Pilot
                  </Badge>
                </div>
                <p className="text-white/80 leading-relaxed text-center">
                  Handles communications, logistics, and event planning. Background in music and production. Can back a trailer better than your uncle Steve.
                </p>
                <p className="text-white/80 leading-relaxed text-center">
                  <strong>Quote:</strong> "Dance like no one is watching"
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section
        id="approach"
        data-animate
        className={`py-20 px-6 transition-all duration-1000 ${isVisible.approach ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-gelica font-bold mb-6">
              Our Approach
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Safety first, creativity always
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass hover:glass-warm smooth-transition hover-lift group text-center animate-fade-in-up animation-delay-200">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform cinematic-glow mx-auto">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-gelica text-white">Safety Standards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 leading-relaxed">
                  Industry leading safety protocols with certified instructors and rigorous equipment maintenance.
                  Every flight meets or exceeds FAA requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="glass hover:glass-warm smooth-transition hover-lift group text-center animate-fade-in-up animation-delay-400">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform cinematic-glow mx-auto">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-gelica text-white">Visual Storytelling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 leading-relaxed">
                  Every activation is designed for maximum visual impact. We don&apos;t just fly balloons –
                  we create moments that demand to be shared.
                </p>
              </CardContent>
            </Card>

            <Card className="glass hover:glass-warm smooth-transition hover-lift group text-center animate-fade-in-up animation-delay-600">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform cinematic-glow mx-auto">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-gelica text-white">Client Partnership</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 leading-relaxed">
                  We work closely with your team to understand your vision and deliver experiences
                  that exceed expectations and create lasting memories.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        id="cta"
        data-animate
        className={`py-20 px-6 bg-white/[0.02] transition-all duration-1000 ${isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-gelica font-bold mb-6">
            Ready to Elevate Your Event?
          </h2>
          <p className="text-xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
            Let&apos;s create something unforgettable together. From concept to execution,
            we&apos;ll help your brand rise above the ordinary.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button
              size="lg"
              className="text-lg px-10 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 cinematic-glow font-semibold hover-lift"
              asChild
            >
              <Link href="/hire-us">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-10 py-4 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm hover-lift"
              asChild
            >
              <Link href="/#services">View Our Services</Link>
            </Button>
          </div>

          <div className="max-w-md mx-auto">
            <p className="text-white/70 mb-4 font-medium">Stay updated on our latest flights</p>
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
      </section>

      <Footer />
    </div>
  );
}
