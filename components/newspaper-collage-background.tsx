"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Newspaper collage background layer for the hero section.
 * Uses a single large image + floating SVG recortes for depth.
 * Responds to scroll progress for "squish/focus" effect.
 * Respects prefers-reduced-motion.
 */

const CLIPPINGS = [
  { top: "5%", left: "3%", width: 160, rotate: -6, delay: 0 },
  { top: "12%", right: "5%", width: 140, rotate: 4, delay: 0.8 },
  { top: "55%", left: "8%", width: 130, rotate: 3, delay: 1.6 },
  { top: "60%", right: "10%", width: 150, rotate: -5, delay: 2.4 },
  { top: "30%", left: "15%", width: 120, rotate: 7, delay: 3.2 },
  { top: "75%", right: "3%", width: 110, rotate: -3, delay: 4.0 },
];

export default function NewspaperCollageBackground({
  scrollProgress = 0,
}: {
  scrollProgress: number;
}) {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Scroll-driven transforms
  const collageScale = prefersReduced ? 1 : 1 - scrollProgress * 0.08;
  const collageOpacity = prefersReduced ? 0.08 : 0.1 - scrollProgress * 0.06;
  const collageBlur = prefersReduced ? 4 : 4 + scrollProgress * 6;

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Main collage background image */}
      <div
        className="absolute inset-0 transition-[filter,opacity] duration-300 ease-out"
        style={{
          opacity: Math.max(0.02, collageOpacity),
          filter: `blur(${collageBlur}px) saturate(0.1)`,
          transform: `scale(${collageScale})`,
          willChange: prefersReduced ? "auto" : "transform, opacity, filter",
        }}
      >
        <Image
          src="/newspaper-collage.jpg"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Floating newspaper clippings (SVG abstractions) */}
      {CLIPPINGS.map((clip, i) => {
        const translateX = prefersReduced
          ? 0
          : (i % 2 === 0 ? -1 : 1) * scrollProgress * 40;
        const translateY = prefersReduced ? 0 : scrollProgress * 20;
        const clipOpacity = prefersReduced
          ? 0.04
          : Math.max(0, 0.06 - scrollProgress * 0.05);

        return (
          <div
            key={i}
            className={prefersReduced ? "" : "animate-float-slow"}
            style={{
              position: "absolute",
              top: clip.top,
              left: clip.left,
              right: clip.right,
              width: clip.width,
              opacity: clipOpacity,
              transform: `rotate(${clip.rotate}deg) translate(${translateX}px, ${translateY}px)`,
              transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
              animationDelay: `${clip.delay}s`,
              willChange: prefersReduced ? "auto" : "transform, opacity",
            }}
          >
            <svg
              viewBox="0 0 160 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
            >
              <rect
                width="160"
                height="100"
                rx="4"
                fill="#CAD5F2"
                fillOpacity="0.15"
              />
              {/* Headline line */}
              <rect x="12" y="12" width="100" height="6" rx="2" fill="#FCFDFD" fillOpacity="0.12" />
              {/* Body lines */}
              <rect x="12" y="26" width="136" height="3" rx="1" fill="#FCFDFD" fillOpacity="0.07" />
              <rect x="12" y="34" width="120" height="3" rx="1" fill="#FCFDFD" fillOpacity="0.07" />
              <rect x="12" y="42" width="130" height="3" rx="1" fill="#FCFDFD" fillOpacity="0.07" />
              <rect x="12" y="50" width="110" height="3" rx="1" fill="#FCFDFD" fillOpacity="0.07" />
              {/* Chart line */}
              <polyline
                points="12,80 40,70 60,75 90,60 120,65 148,55"
                stroke="#FCFDFD"
                strokeOpacity="0.1"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
        );
      })}

      {/* Gradient overlay to unify */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, rgba(9,56,189,0.92) 0%, rgba(9,49,172,0.90) 30%, rgba(7,48,170,0.88) 60%, rgba(11,37,114,0.95) 100%)",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(7,15,20,0.4) 100%)",
        }}
      />
    </div>
  );
}
