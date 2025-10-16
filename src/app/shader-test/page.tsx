"use client";

import { FractalsShaders } from "@/components/ui/shadcn-io/fractals-shaders";

export default function ShaderTestPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
      <h1 className="text-white text-4xl font-bold mb-8 z-10 relative">
        Fractal Shader Test
      </h1>

      <div className="w-full max-w-4xl aspect-video bg-gray-900 rounded-lg overflow-hidden border-4 border-white">
        <FractalsShaders
          speed={0.5}
          iterations={4}
          colorShift={0}
          brightness={1.0}
          zoom={1.0}
        />
      </div>

      <div className="mt-8 text-white text-center z-10 relative">
        <p className="mb-2">If you see animated fractals above, the shader is working!</p>
        <p className="text-sm text-gray-400">Check browser console for any errors</p>
      </div>
    </div>
  );
}
