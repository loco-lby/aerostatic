"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Palette, Wind, Globe, Users, Shield, Award, Play, BookOpen } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useContent } from "@/hooks/useContent";
import { BackgroundVideo } from "@/components/CloudinaryVideo";

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
      // For static site, just show success message
      // In production, this would integrate with your email service
      toast.success("Welcome aboard! We'll be in touch soon.")
      setEmail("")
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
            // Option 1: Use Cloudinary video (once uploaded)
            // <BackgroundVideo
            //   src="aerostatic/hero1" // Cloudinary public ID
            //   fallbackSrc="/videos/hero1.mp4" // Local fallback
            //   className="w-full h-full object-cover"
            //   overlay={false} // We add our own overlay below
            // />

            // Option 2: Keep using local video for now
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
        <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <div className="text-2xl md:text-4xl lg:text-4xl font-gelica font-light text-white/90 tracking-wide mb-6 min-h-[3rem]">
              {isMounted ? (
                <>
                  {typedText}
                  {showCursor && <span className="animate-pulse">|</span>}
                </>
              ) : (
                <span className="opacity-0">placeholder</span>
              )}
            </div>
            <p className="text-xl md:text-2xl text-white/70 font-light mb-12">
              {content.home.hero.subtitle}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium px-12 py-6 text-lg rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25"
            >
              <Link href="/academia">
                I&apos;m curious about hot air balloons
                <BookOpen className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 font-medium px-12 py-6 text-lg rounded-lg transition-all duration-300"
            >
              <Link href="/work-with-us">
                {content.home.hero.cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Six Pillars Sections */}
      <div className="py-32 bg-black">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid gap-32">
            {content.home.pillars.map((pillar, index) => (
              <section
                key={pillar.id}
                id={pillar.id}
                data-animate
                className={getAnimationClass(pillar.id)}
              >
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}>
                  {/* Content */}
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="space-y-6">
                      <div>
                        <Badge variant="outline" className="text-orange-400 border-orange-400/30 mb-4">
                          {String(index + 1).padStart(2, '0')}
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-gelica font-bold text-white mb-4">
                          {pillar.title}
                        </h2>
                        <p className="text-xl text-orange-400 font-medium mb-6">
                          {pillar.description}
                        </p>
                        <p className="text-lg text-white/70 leading-relaxed mb-8">
                          {pillar.content}
                        </p>
                      </div>
                      <Button
                        asChild
                        className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25"
                      >
                        <Link href={pillar.href}>
                          {pillar.cta}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Visual */}
                  <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                    <div className="relative aspect-square bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-2xl overflow-hidden group">
                      {isMounted && (
                        <video
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 grayscale"
                        >
                          <source
                            src={
                              pillar.id === 'academia' ? "/videos/hero.mp4" :
                                pillar.id === 'media' ? "/videos/wine_train.mp4" :
                                  pillar.id === 'development' ? "/videos/your_event.mp4" :
                                    pillar.id === 'merchandise' ? "/videos/thailand.mp4" :
                                      "/videos/hero.mp4"
                            }
                            type="video/mp4"
                          />
                        </video>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60"></div>
                      <div className="absolute bottom-6 left-6">
                        <Badge variant="outline" className="text-white border-white/30">
                          {String(index + 1).padStart(2, '0')}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <section
        id="about"
        data-animate
        className={`py-24 px-6 bg-gradient-to-b from-black via-black/95 to-black ${getAnimationClass('about')}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="text-orange-400 border-orange-400/30 mb-4">
              About Aerostatic
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-gelica font-bold text-white mb-6">
              Meet the Crew
            </h2>
            <p className="text-lg font-sans text-white/60 max-w-3xl mx-auto">
              Industry born balloon crew blending aircraft with storycraft.
              Available for events, activations, and brand partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-8">
              <div className="space-y-6 text-lg font-sans text-white/70 leading-relaxed">
                <p>
                  Aerostatic didn&apos;t start with a pitch deck. For <span className="font-picnic italic text-orange-400">Colby</span>, it began on a stepping stool he used to reach the burner when he was 10. For <span className="font-picnic italic text-orange-400">Matteo</span>, it started with a pieced together trailer, a stinky balloon, and a weird obsession with whatever this is that we do.
                </p>
                <p>
                  Today, we bring that same authentic passion to every event and brand activation. Static displays that stop crowds. Tethered rides that create memories. Aerial coverage that captures perspectives no one else can.
                </p>
                <p>
                  Every activation we create is designed to capture attention, create memories, and deliver content that lives far beyond the moment, while following industry-leading safety standards.
                </p>
              </div>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium px-12 py-6 text-lg rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25"
              >
                <Link href="/work-with-us">
                  Book Us For Your Next Event
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                {/* Team Member Cards */}
                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-600 rounded-full mb-4 flex items-center justify-center">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-gelica font-bold text-white">Colby</CardTitle>
                    <p className="text-sm font-sans text-orange-400">Third-Gen Pilot & Creative Director</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-sans text-white/70">
                      FAA-certified instructor. Leads design, media production, and tech development. Born into ballooning.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-600 rounded-full mb-4 flex items-center justify-center">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-gelica font-bold text-white">Matteo</CardTitle>
                    <p className="text-sm font-sans text-orange-400">Pilot & Brand Partnerships</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-sans text-white/70">
                      Commercial pilot. Manages event activations and brand partnerships. Background in music production.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Contractor Badges */}
              <div className="mt-8 space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-white/70 border-white/20 px-3 py-1">
                    <span className="font-medium">Will Macdonald</span>
                    <span className="ml-2 text-white/50">Developer</span>
                  </Badge>
                  <Badge variant="outline" className="text-white/70 border-white/20 px-3 py-1">
                    <span className="font-medium">Sam Barsketis</span>
                    <span className="ml-2 text-white/50">Designer</span>
                  </Badge>
                </div>
                <div className="text-xs font-sans text-white/40 italic">and growing...</div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "FAA Certified",
                description: "Licensed pilots, insured operations, zero compromises on safety"
              },
              {
                icon: Palette,
                title: "Content That Converts",
                description: "Every flight generates shareable moments that extend your reach"
              },
              {
                icon: Award,
                title: "Proven Track Record",
                description: "From Burning Man to brand launches—we deliver spectacle"
              }
            ].map((value, index) => (
              <div key={index} className="text-center">
                <value.icon className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-gelica font-bold text-white mb-2">{value.title}</h3>
                <p className="font-sans text-white/60 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
