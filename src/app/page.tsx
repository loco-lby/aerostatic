"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { EmailCapture } from "@/components/EmailCapture";
import { MerchCTA } from "@/components/MerchCTA";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Instagram, Music2 as TikTok, Youtube, Mail } from 'lucide-react';
import { useContent } from "@/hooks/useContent";
import { track } from "@vercel/analytics";

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const content = useContent();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
          <div className="w-full h-full bg-gradient-to-br from-orange-900/20 to-red-900/20"></div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 z-10"></div>

        {/* Hero Content */}
        <div className="relative z-20 text-center max-w-5xl mx-auto px-6 pt-32 pb-20">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-gelica font-bold text-white mb-8 leading-tight">
            {content.home.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-light mb-12 max-w-3xl mx-auto leading-relaxed">
            {content.home.hero.subtitle}
          </p>

          <Button
            onClick={() => {
              track("cta_click", { location: "hero", action: "join_movement" });
              setShowEmailModal(true);
            }}
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium px-12 py-6 text-lg rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25"
          >
            {content.home.hero.cta}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Email Capture Modal */}
      <EmailCapture
        variant="modal"
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        source="Homepage Hero"
      />

      {/* Mission Section */}
      <section className="py-24 px-6 bg-black">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="text-orange-400 border-orange-400/30 mb-6">
              {content.home.mission.title}
            </Badge>
          </div>

          <div className="space-y-8 text-lg md:text-xl text-white/80 leading-relaxed">
            {content.home.mission.paragraphs.map((paragraph, index) => (
              <p key={index} className={index === 1 ? "text-2xl md:text-3xl font-gelica font-bold text-orange-400 text-center py-4" : ""}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Two Fronts Section */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-gelica font-bold text-white mb-4">
              {content.home.twoFronts.title}
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              {content.home.twoFronts.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Media Card */}
            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-8 h-full flex flex-col">
                <h3 className="text-2xl md:text-3xl font-gelica font-bold text-white mb-6">
                  {content.home.twoFronts.media.title}
                </h3>

                <div className="space-y-4 mb-6 flex-grow">
                  {content.home.twoFronts.media.content.map((paragraph, index) => (
                    <p key={index} className="text-white/70 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}

                  <div className="pt-4">
                    <p className="text-white font-medium mb-3">What we&apos;re creating:</p>
                    <ul className="space-y-2">
                      {content.home.twoFronts.media.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                          <span className="text-white/70">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button
                  asChild
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium mt-4"
                  onClick={() => track("cta_click", { location: "two_fronts", action: "watch_stories" })}
                >
                  <Link href={content.home.twoFronts.media.href}>
                    {content.home.twoFronts.media.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Tech Card */}
            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-8 h-full flex flex-col">
                <h3 className="text-2xl md:text-3xl font-gelica font-bold text-white mb-6">
                  {content.home.twoFronts.tech.title}
                </h3>

                <div className="space-y-4 mb-6 flex-grow">
                  {content.home.twoFronts.tech.content.map((paragraph, index) => (
                    <p key={index} className="text-white/70 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}

                  <div className="pt-4 space-y-4">
                    {content.home.twoFronts.tech.tools.map((tool, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-4">
                        <h4 className="text-orange-400 font-gelica font-bold mb-2">
                          {tool.name}
                        </h4>
                        <p className="text-white/70 text-sm">
                          {tool.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  <p className="text-white/60 italic text-sm pt-2">
                    {content.home.twoFronts.tech.footer}
                  </p>
                </div>

                <Button
                  asChild
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium mt-4"
                  onClick={() => track("cta_click", { location: "two_fronts", action: "see_tech" })}
                >
                  <Link href={content.home.twoFronts.tech.href}>
                    {content.home.twoFronts.tech.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Colby Section */}
      <section className="py-24 px-6 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-gelica font-bold text-white mb-6">
                {content.home.about.title}
              </h2>

              {content.home.about.content.map((paragraph, index) => (
                <p key={index} className="text-lg text-white/70 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="relative aspect-[4/5] bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-2xl overflow-hidden">
              {isMounted && (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/profile.mp4" type="video/mp4" />
                </video>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Join the Movement Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-black via-white/[0.02] to-black">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-gelica font-bold text-white mb-6">
              {content.home.joinMovement.title}
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              {content.home.joinMovement.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {content.home.joinMovement.ctas.map((cta, index) => {
              if (cta.type === "email") {
                return (
                  <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                    <CardContent className="p-8 text-center">
                      <Mail className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                      <h3 className="text-xl font-gelica font-bold text-white mb-2">
                        {cta.title}
                      </h3>
                      <p className="text-white/70 mb-6 text-sm">
                        {cta.description}
                      </p>
                      <Button
                        onClick={() => setShowEmailModal(true)}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                      >
                        Sign Up
                      </Button>
                    </CardContent>
                  </Card>
                );
              }

              if (cta.type === "social" && "links" in cta && cta.links) {
                return (
                  <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                    <CardContent className="p-8 text-center">
                      <div className="flex justify-center gap-2 mb-4">
                        <Instagram className="w-8 h-8 text-orange-400" />
                        <TikTok className="w-8 h-8 text-orange-400" />
                        <Youtube className="w-8 h-8 text-orange-400" />
                      </div>
                      <h3 className="text-xl font-gelica font-bold text-white mb-2">
                        {cta.title}
                      </h3>
                      <p className="text-white/70 mb-6 text-sm">
                        {cta.description}
                      </p>
                      <div className="flex flex-col gap-2">
                        <Button
                          asChild
                          variant="outline"
                          className="w-full border-white/20 hover:bg-white/10 text-white"
                        >
                          <a href={cta.links.instagram} target="_blank" rel="noopener noreferrer">
                            <Instagram className="w-4 h-4 mr-2" />
                            Instagram
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              }

              if (cta.type === "contact" && "href" in cta && cta.href) {
                return (
                  <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                    <CardContent className="p-8 text-center">
                      <ArrowRight className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                      <h3 className="text-xl font-gelica font-bold text-white mb-2">
                        {cta.title}
                      </h3>
                      <p className="text-white/70 mb-6 text-sm">
                        {cta.description}
                      </p>
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                      >
                        <Link href={cta.href}>
                          Get in Touch
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              }

              return null;
            })}
          </div>

          {/* Inline Email Capture */}
          <div className="max-w-2xl mx-auto">
            <EmailCapture
              variant="inline"
              source="Homepage Join Movement"
            />
          </div>
        </div>
      </section>

      {/* Footer Tagline Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-black to-orange-900/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-3xl md:text-4xl font-gelica font-bold text-white mb-4">
            {content.home.footer.tagline}
          </h3>
          <p className="text-lg text-white/70 leading-relaxed">
            {content.home.footer.subtitle}
          </p>
        </div>
      </section>

      <MerchCTA />

      <Footer />
    </div>
  );
}
