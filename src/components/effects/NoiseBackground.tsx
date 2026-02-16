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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const offscreen = document.createElement("canvas");
    const SIZE = 128;
    offscreen.width = SIZE;
    offscreen.height = SIZE;

    const offscreenCtx = offscreen.getContext("2d");
    if (!offscreenCtx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const imageData = offscreenCtx.createImageData(SIZE, SIZE);
    const data = imageData.data;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animFrameId = 0;
    let lastTime = 0;
    const INTERVAL = 125; // ~8 FPS

    const drawFrame = () => {
      offscreenCtx.putImageData(imageData, 0, 0);
      const pattern = ctx.createPattern(offscreen, "repeat");
      if (!pattern) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

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

      drawFrame();
    }

    if (prefersReducedMotion) {
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 18;
      }
      drawFrame();
    } else {
      animFrameId = requestAnimationFrame(generateNoise);
    }

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      {/* Visible canvas for tiled noise rendering */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      />

      {/* Vignette — heavy darkening at edges */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
        }}
        aria-hidden="true"
      />
    </>
  );
}
