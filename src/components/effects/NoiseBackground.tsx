"use client";

import { useEffect, useRef } from "react";

/**
 * NoiseBackground — Animated static/grain for the Terminal UI.
 *
 * Uses a tiny offscreen canvas to generate random noise frames,
 * then tiles the result as a CSS background via a data URL.
 * Includes a heavy radial vignette to darken edges.
 *
 * Performance notes:
 * - Canvas is only 128x128 (tiny), tiled via CSS repeat.
 * - Runs at ~8 FPS (every 125ms) — enough to feel "alive" without GPU strain.
 * - Fully pointer-events-none.
 */
export default function NoiseBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const overlay = overlayRef.current;
    if (!canvas || !overlay) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SIZE = 128;
    canvas.width = SIZE;
    canvas.height = SIZE;

    const imageData = ctx.createImageData(SIZE, SIZE);
    const data = imageData.data;

    let animFrameId: number;
    let lastTime = 0;
    const INTERVAL = 125; // ~8 FPS

    function generateNoise(timestamp: number) {
      animFrameId = requestAnimationFrame(generateNoise);

      if (timestamp - lastTime < INTERVAL) return;
      lastTime = timestamp;

      // Fill with random grayscale noise at low alpha
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;     // R
        data[i + 1] = v; // G
        data[i + 2] = v; // B
        data[i + 3] = 18; // A — very subtle (max 255)
      }

      ctx!.putImageData(imageData, 0, 0);

      // Convert to data URL and set as tiled background
      overlay!.style.backgroundImage = `url(${canvas!.toDataURL("image/png")})`;
    }

    animFrameId = requestAnimationFrame(generateNoise);

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <>
      {/* Hidden canvas for noise generation */}
      <canvas
        ref={canvasRef}
        className="hidden"
        aria-hidden="true"
      />

      {/* Noise overlay — tiled across the screen */}
      <div
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-[1] bg-repeat"
        style={{ backgroundSize: "128px 128px" }}
        aria-hidden="true"
      />

      {/* Vignette — heavy darkening at edges */}
      <div
        className="pointer-events-none fixed inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
        }}
        aria-hidden="true"
      />
    </>
  );
}
