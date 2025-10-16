"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const BANNER_STORAGE_KEY = "aerostatic-goldilocks-banner-dismissed";

export const AnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if banner was previously dismissed
    const isDismissed = localStorage.getItem(BANNER_STORAGE_KEY);
    if (!isDismissed) {
      setIsVisible(true);
    }
    setIsLoaded(true);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(BANNER_STORAGE_KEY, "true");
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="sticky top-0 z-[60] w-full bg-gradient-to-r from-black via-purple-950 to-black border-b border-purple-500/20"
          data-announcement-banner
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-3 sm:py-4 md:py-5 gap-4">
              {/* Content */}
              <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center justify-center gap-2 sm:gap-4 text-center sm:text-left">
                <p className="text-white text-sm sm:text-base md:text-lg font-light">
                  <span className="font-medium">Introducing Goldilocks:</span>{" "}
                  <span className="text-white/90">
                    A fractal balloon demonstrating the aerostatic transition
                  </span>
                  {" "}|{" "}
                  <span className="text-purple-300/90">
                    A collaboration with Fractal Foundation
                  </span>
                </p>

                <Button
                  asChild
                  className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-medium px-4 sm:px-6 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25 whitespace-nowrap text-sm sm:text-base shrink-0"
                >
                  <Link href="/goldilocks">
                    Learn More →
                  </Link>
                </Button>
              </div>

              {/* Dismiss Button */}
              <button
                onClick={handleDismiss}
                className="text-white/60 hover:text-white transition-colors p-1 hover:bg-white/10 rounded shrink-0"
                aria-label="Dismiss announcement"
              >
                <X size={20} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
