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
          source: 'hero'
        })

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast.success("You're already on board!")
        } else {
          console.error("Error signing up for newsletter:", error)
          toast.error("Failed to sign up. Please try again.")
        }
      } else {
        toast.success("Welcome aboard!")
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
              <Link href="/work-with-us">
                {content.home.hero.cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-12 py-6 text-lg"
            >
              <Link href="/tools/aeromedia">
                Access Your Photos
                <Camera className="ml-2 h-5 w-5" />
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
                              pillar.id === 'media' ? "/videos/wine_train.mp4" :
                                pillar.id === 'tech' ? "/videos/your_event.mp4" :
                                  pillar.id === 'events' ? "/videos/tether.mp4" :
                                    pillar.id === 'gear' ? "/videos/thailand.mp4" :
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

      <Footer />
    </div>
  );
}
