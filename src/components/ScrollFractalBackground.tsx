"use client";

import React, { useEffect, useState } from "react";
import { FractalsShaders } from "@/components/ui/shadcn-io/fractals-shaders";

export function ScrollFractalBackground() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress (0 to 1)
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = Math.min(scrolled / documentHeight, 1);

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Map scroll progress to shader parameters for interesting evolution
  // As you scroll, the fractal evolves through different states
  const speed = 0.2 + scrollProgress * 0.5; // Speeds up as you scroll (slower overall for more meditative feel)
  const iterations = 3.0 + scrollProgress * 1.5; // More complexity as you dive deeper
  const colorShift = scrollProgress * 3.0; // Color palette shifts more dramatically
  const brightness = 0.5 + Math.sin(scrollProgress * Math.PI * 3) * 0.25; // Pulsing brightness with more variation
  const zoom = 1.0 + scrollProgress * 0.8; // More pronounced zoom

  return (
    <div className="fixed inset-0 -z-10">
      {/* Adding a gradient overlay to tint the fractals towards orange/purple */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-950/40 via-transparent to-purple-950/40 mix-blend-multiply" />

      {/* Fractal shader background */}
      <div className="absolute inset-0 opacity-30 mix-blend-screen">
        <FractalsShaders
          speed={speed}
          iterations={iterations}
          colorShift={colorShift}
          brightness={brightness}
          zoom={zoom}
        />
      </div>
    </div>
  );
}
