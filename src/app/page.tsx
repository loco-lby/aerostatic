"use client";

import { useEffect, useState } from 'react';
import { FractalsShaders } from "@/components/ui/shadcn-io/fractals-shaders";
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen relative bg-black">
      {/* Fractal Background */}
      <div className="fixed inset-0 z-0">
        <FractalsShaders
          speed={0.15}
          iterations={4}
          colorShift={0.2}
          brightness={0.4}
          zoom={1.5}
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10">

        {/* Opening silence */}
        <section className="h-screen flex items-center justify-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 2, delay: 1 }}
            className="text-sm md:text-base text-white/30 font-light tracking-widest lowercase"
          >
            take a scroll with me
          </motion.p>
        </section>

        {/* The Story */}
        <div className="max-w-2xl mx-auto px-8">

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-xl md:text-2xl text-white/80 font-light leading-relaxed mb-32"
          >
            When I was a kid I thought adults had it figured out.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-lg md:text-xl text-white/60 font-light leading-relaxed mb-40"
          >
            You grow up, you get the job, you do the thing. Life happens somewhere in there.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-32"
          >
            Then I became an adult and realized... no. Most people are just keeping it together. Trying not to think too hard about whether this is it.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-xl md:text-2xl text-white font-light leading-relaxed mb-24"
          >
            I didn&apos;t want that. I still don&apos;t.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-lg md:text-xl text-white/60 font-light leading-relaxed mb-40"
          >
            So I build stuff. I help people figure out how to leave the country. The insurance, the logistics, the stuff nobody wants to think about but everyone needs before they can actually go.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-lg md:text-xl text-white/50 font-light leading-relaxed mb-48"
          >
            It&apos;s not glamorous. But someone comments &ldquo;I thought this was just for trust funders until I made it happen myself&rdquo; and that&apos;s... I don&apos;t know. That&apos;s real.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-lg md:text-xl text-white/60 font-light leading-relaxed mb-32"
          >
            I live in Mexico. I&apos;m flying to Thailand next month. Then Brazil. I run everything from my laptop. Airports. Cafes. My girlfriend&apos;s couch. Whatever.
          </motion.p>

          <div className="h-16" />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-2xl md:text-3xl text-white font-light leading-relaxed mb-24"
          >
            And I&apos;m broke.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-lg md:text-xl text-white/50 font-light leading-relaxed mb-40"
          >
            Like, actually broke. Not &ldquo;investor money running low&rdquo; broke. Just... the math doesn&apos;t work yet. I&apos;m betting it will. I have to bet it will.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-lg md:text-xl text-white/60 font-light leading-relaxed mb-32"
          >
            Nobody talks about that part. You see the photos. The flights. The freedom. You don&apos;t see the part where you&apos;re not sure how next month works.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-56"
          >
            I&apos;m telling you because I don&apos;t know how else to explain why I&apos;m doing this.
          </motion.p>

          {/* The Balloon */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-xl md:text-2xl text-white/90 font-light leading-relaxed mb-32"
          >
            I fly hot air balloons.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-lg md:text-xl text-white/60 font-light leading-relaxed mb-40"
          >
            I can&apos;t steer them. You go where the wind goes. You can&apos;t optimize it. You can&apos;t scale it. There&apos;s no business model.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-lg md:text-xl text-white/50 font-light leading-relaxed mb-32"
          >
            It&apos;s the most useless thing I do.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-xl md:text-2xl text-white/90 font-light leading-relaxed mb-48"
          >
            And I can&apos;t stop.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-32"
          >
            When I&apos;m up there, my brain goes quiet. Which never happens. I&apos;m always building the next thing, chasing the next thing. That&apos;s just how I am. Probably always will be.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-lg md:text-xl text-white/60 font-light leading-relaxed mb-40"
          >
            But up there... I just look. I look at the world with wonder. Like I used to when I was a kid. Before everything became a problem to solve.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-lg md:text-xl text-white/50 font-light leading-relaxed mb-32"
          >
            I don&apos;t have some big insight about that. I just need it.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-xl md:text-2xl text-white/80 font-light leading-relaxed mb-40"
          >
            I need that look in people&apos;s eyes when they see what I see. A world that&apos;s worth wondering about.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-lg md:text-xl text-white/60 font-light leading-relaxed mb-56"
          >
            So I keep doing it.
          </motion.p>

        </div>

        {/* Fractal Balloon Images */}
        <section className="py-24 md:py-32 px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="relative z-10 -mr-6 md:-mr-12 lg:-mr-20"
              >
                <div className="w-40 md:w-64 lg:w-80 overflow-hidden rounded-sm opacity-70 hover:opacity-100 transition-opacity duration-700">
                  <Image
                    src="/images/goldilocks/image_A8891E0E-03B5-46A5-B4B9-3ACEC48C074E.JPG"
                    alt="Fractal balloon design"
                    width={800}
                    height={1067}
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative z-20"
              >
                <div className="w-48 md:w-72 lg:w-96 overflow-hidden rounded-sm">
                  <Image
                    src="/images/goldilocks/image_4C3CE228-BDAD-4D97-94BD-C8336AAB0775.JPG"
                    alt="Fractal balloon design"
                    width={800}
                    height={1067}
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative z-10 -ml-6 md:-ml-12 lg:-ml-20"
              >
                <div className="w-40 md:w-64 lg:w-80 overflow-hidden rounded-sm opacity-70 hover:opacity-100 transition-opacity duration-700">
                  <Image
                    src="/images/goldilocks/image_DC7AC31A-401B-4F69-95A6-BD6C99F7D40B.JPG"
                    alt="Fractal balloon design"
                    width={800}
                    height={1067}
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-center text-white/30 text-sm mt-8"
            >
              designed by Jonathan at the{' '}
              <a
                href="https://fractalfoundation.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white/60 transition-colors underline underline-offset-2"
              >
                fractalfoundation.org
              </a>
            </motion.p>
          </motion.div>
        </section>

        {/* The Dream */}
        <div className="max-w-2xl mx-auto px-8 pt-24">

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-2xl md:text-3xl text-orange-400/90 font-light leading-relaxed mb-40"
          >
            I want to build a fractal balloon.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-lg md:text-xl text-white/60 font-light leading-relaxed mb-32"
          >
            You know those patterns that repeat at every scale? Ferns. River deltas. The way your lungs branch. Lightning. It&apos;s the same shape over and over, smaller and smaller.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-40"
          >
            I want to share this fascination. I want the look in my passengers&apos; eyes when they see the world from above to be shared with everyone who looks at it from below.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-lg md:text-xl text-white/50 font-light leading-relaxed mb-32"
          >
            I don&apos;t have it yet. I have a balloon that&apos;s kind of beat up. It gets me and mine in the air. That&apos;s enough for now.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-lg md:text-xl text-white/60 font-light leading-relaxed mb-48"
          >
            I don&apos;t know how I&apos;m going to fund the real one. Probably the same way I fund everything. Make stuff, try to share it (and get people to pay for it teehee), figure it out, keep going.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-xl md:text-2xl text-white/80 font-light leading-relaxed mb-32"
          >
            Why?
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-lg md:text-xl text-white/60 font-light leading-relaxed mb-40"
          >
            Honestly I&apos;m not totally sure. I just think... most people never get high enough to see how big everything is. And I think if they did, even once, it might change something.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-lg md:text-xl text-white/50 font-light leading-relaxed mb-32"
          >
            Not in a big way. Just... a little crack in the way they see things.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-lg md:text-xl text-white/60 font-light leading-relaxed mb-56"
          >
            I don&apos;t know. But I&apos;m doing it anyway.
          </motion.p>

        </div>

        {/* This is Aerostatic */}
        <section className="py-32 px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-white/90 tracking-[0.2em] uppercase mb-16">
              Aerostatic
            </h1>
          </motion.div>
        </section>

        <div className="max-w-2xl mx-auto px-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-lg md:text-xl text-white/60 font-light leading-relaxed mb-32"
          >
            If you want to watch someone build a life that doesn&apos;t make sense, I&apos;ll be here.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-lg md:text-xl text-white/50 font-light leading-relaxed mb-24"
          >
            I&apos;m not asking you to follow me.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-xl md:text-2xl text-white/80 font-light leading-relaxed mb-48"
          >
            I&apos;m asking what you&apos;d do if you stopped waiting.
          </motion.p>
        </div>

        {/* Video Section */}
        <section className="py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              {isMounted && (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover opacity-40"
                >
                  <source src="https://res.cloudinary.com/aerostatic/video/upload/v1759347751/videos/profile_ewiluj.mp4" type="video/mp4" />
                </video>
              )}
            </div>
          </motion.div>
        </section>

        {/* Day Jobs */}
        <div className="max-w-2xl mx-auto px-8 py-32">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-lg md:text-xl text-white/50 font-light leading-relaxed mb-16"
          >
            Until I&apos;m able to lift this off the ground, I&apos;ll be attempting to fund it with my day jobs. If you want to help me, maybe one of these will help you. If it helps you, you can help me.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Link
              href="https://travelpact.io"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <p className="text-lg md:text-xl text-white/70 group-hover:text-orange-400/80 transition-colors font-light">
                <span className="text-white/90 group-hover:text-orange-400 transition-colors">travelpact.io</span>
                <span className="text-white/40 ml-3">the travel planner I never had</span>
              </p>
            </Link>

            <Link
              href="https://freedomabroad.io"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <p className="text-lg md:text-xl text-white/70 group-hover:text-orange-400/80 transition-colors font-light">
                <span className="text-white/90 group-hover:text-orange-400 transition-colors">freedomabroad.io</span>
                <span className="text-white/40 ml-3">the advice I never had</span>
              </p>
            </Link>

            <Link
              href="https://expatinsurance.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <p className="text-lg md:text-xl text-white/70 group-hover:text-orange-400/80 transition-colors font-light">
                <span className="text-white/90 group-hover:text-orange-400 transition-colors">expatinsurance.com</span>
                <span className="text-white/40 ml-3">the safety net I never had</span>
              </p>
            </Link>
          </motion.div>
        </div>

        {/* Hire Me */}
        <div className="max-w-2xl mx-auto px-8 py-32 border-t border-white/10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-lg md:text-xl text-white/60 font-light leading-relaxed mb-16"
          >
            And if you REALLY want to throw money at a fractal balloon... hire me.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-lg md:text-xl text-white/50 font-light leading-relaxed mb-16"
          >
            I build websites. Apps. The kind of stuff that actually works and looks good too.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-lg md:text-xl text-white/60 font-light leading-relaxed mb-16"
          >
            A few solid contracts and Goldilocks gets off the ground. You get a real project delivered... and a lifetime priority boarding pass.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
          >
            <Link
              href="https://colbykimball.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg md:text-xl text-white/90 hover:text-orange-400 transition-colors font-light underline underline-offset-4"
            >
              colbykimball.com
            </Link>
          </motion.div>
        </div>

        {/* Final space */}
        <section className="h-64" />

      </div>
    </div>
  );
}
