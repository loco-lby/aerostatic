"use client";

import React, { forwardRef, useMemo } from "react";
import { Shader } from "react-shaders";
import { cn } from "@/lib/utils";

export interface FractalsShadersProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number;
  iterations?: number;
  colorShift?: number;
  brightness?: number;
  zoom?: number;
}

const fragmentShader = `
vec3 palette( float t ) {
    // Custom palette for Goldilocks theme - orange to purple gradient
    vec3 a = vec3(0.5, 0.3, 0.4);
    vec3 b = vec3(0.5, 0.4, 0.5);
    vec3 c = vec3(1.0, 0.9, 1.0);
    vec3 d = vec3(0.05, 0.3, 0.6);
    return a + b*cos( 6.28318*(c*t+d) );
}

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;
    uv /= uZoom;
    vec2 uv0 = uv;
    vec3 finalColor = vec3(0.0);

    for (float i = 0.0; i < 4.0; i++) {
        if (i >= uIterations) break;

        uv = fract(uv * 1.5) - 0.5;

        float d = length(uv) * exp(-length(uv0));

        vec3 col = palette(length(uv0) + i*0.4 + iTime * uSpeed * 0.4 + uColorShift);

        d = sin(d*8.0 + iTime * uSpeed)/8.0;
        d = abs(d);

        d = pow(0.01 / d, 1.2);

        finalColor += col * d;
    }

    finalColor *= uBrightness;
    fragColor = vec4(finalColor, 1.0);
}
`;

export const FractalsShaders = forwardRef<HTMLDivElement, FractalsShadersProps>(({
  className,
  speed = 1.0,
  iterations = 4.0,
  colorShift = 0.0,
  brightness = 1.0,
  zoom = 1.0,
  ...props
}, ref) => {
  // Memoize uniforms to ensure they update when props change
  const uniforms = useMemo(() => ({
    uSpeed: { type: '1f' as const, value: speed },
    uIterations: { type: '1f' as const, value: iterations },
    uColorShift: { type: '1f' as const, value: colorShift },
    uBrightness: { type: '1f' as const, value: brightness },
    uZoom: { type: '1f' as const, value: zoom },
  }), [speed, iterations, colorShift, brightness, zoom]);

  return (
    <div
      ref={ref}
      className={cn('w-full h-full', className)}
      {...props}
    >
      <Shader
        fs={fragmentShader}
        uniforms={uniforms}
      />
    </div>
  );
});

FractalsShaders.displayName = "FractalsShaders";