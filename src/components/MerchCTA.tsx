"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ExternalLink } from 'lucide-react';
import { track } from '@vercel/analytics';
import Image from 'next/image';

const FOURTHWALL_STORE_URL = 'https://aerostatic-shop.fourthwall.com/en-usd/collections/all';

const merchImages = [
  { src: '/images/merch/hoodie.png', alt: 'Aerostatic Hoodie', id: 1 },
  { src: '/images/merch/hat1.png', alt: 'Aerostatic Hat Black', id: 2 },
  { src: '/images/merch/hat2.png', alt: 'Aerostatic Hat Orange', id: 3 },
];

export function MerchCTA() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleCardClick = () => {
    track('merch_card_click', {
      location: typeof window !== 'undefined' ? window.location.pathname : 'unknown'
    });
    window.open(FOURTHWALL_STORE_URL, '_blank', 'noopener,noreferrer');
  };

  const handleButtonClick = () => {
    track('merch_cta_click', {
      location: typeof window !== 'undefined' ? window.location.pathname : 'unknown'
    });
    window.open(FOURTHWALL_STORE_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-br from-orange-500/5 via-transparent to-red-600/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto max-w-6xl"
      >
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-600/10 border border-orange-400/20 p-6 md:p-12">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.015] mix-blend-overlay" />

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Stacked Cards */}
            <div className="relative h-[300px] md:h-[400px] flex items-center justify-center order-2 lg:order-1">
              <div className="relative w-[220px] md:w-[280px] h-[280px] md:h-[350px]">
                {merchImages.map((image, index) => {
                  const isHovered = hoveredCard === image.id;
                  const isOtherHovered = hoveredCard !== null && hoveredCard !== image.id;

                  return (
                    <motion.div
                      key={image.id}
                      className="absolute inset-0 cursor-pointer"
                      initial={false}
                      animate={{
                        rotate: isHovered ? 0 : (index - 1) * 3,
                        x: isHovered ? 0 : (index - 1) * 15,
                        y: isHovered ? 0 : (index - 1) * 10,
                        scale: isHovered ? 1.05 : isOtherHovered ? 0.95 : 1,
                        zIndex: isHovered ? 50 : merchImages.length - index,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 25,
                      }}
                      onHoverStart={() => setHoveredCard(image.id)}
                      onHoverEnd={() => setHoveredCard(null)}
                      onClick={handleCardClick}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="relative w-full h-full bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-white/10">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 220px, 280px"
                        />
                        {/* Overlay on hover */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end justify-center pb-6"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isHovered ? 1 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className="text-white font-medium text-sm">
                            Click to Shop
                          </span>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Text Content */}
            <div className="relative z-10 text-center lg:text-left order-1 lg:order-2">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-orange-500/20 mb-4 md:mb-6 lg:mx-0 mx-auto">
                <ShoppingBag className="w-6 h-6 md:w-8 md:h-8 text-orange-400" />
              </div>

              <h2 className="text-2xl md:text-4xl lg:text-5xl font-gelica font-bold text-white mb-3 md:mb-4">
                Support the Movement
              </h2>

              <p className="text-base md:text-lg lg:text-xl text-white/70 mb-6 md:mb-8 leading-relaxed">
                Every purchase helps us bring ballooning into the 21st century. Wear the mission, support the cause.
              </p>

              <Button
                onClick={handleButtonClick}
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium text-base md:text-lg px-6 md:px-8 py-4 md:py-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25 w-full sm:w-auto"
              >
                Shop Merch
                <ExternalLink className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
