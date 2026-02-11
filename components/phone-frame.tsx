"use client";

import type { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="relative mx-auto w-[300px] md:w-[320px]">
      {/* Outer glow */}
      <div
        className="absolute -inset-4 rounded-[52px] opacity-30 blur-2xl"
        style={{ background: "radial-gradient(circle, #0938BD 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Phone body */}
      <div
        className="relative overflow-hidden rounded-[44px] border shadow-2xl"
        style={{ background: "#1C1C1E", borderColor: "rgba(0,0,0,0.18)" }}
      >
        {/* Top bezel with Dynamic Island */}
        <div className="relative flex h-10 items-center justify-center" style={{ background: "#1C1C1E" }}>
          <div
            className="h-[22px] w-[90px] rounded-full"
            style={{ background: "#000000" }}
            aria-hidden="true"
          />
        </div>

        {/* Screen area */}
        <div className="relative h-[560px] overflow-hidden md:h-[600px]">
          {children}
        </div>

        {/* Bottom bar */}
        <div className="flex h-5 items-end justify-center pb-1" style={{ background: "#F0F0F0" }}>
          <div
            className="h-[4px] w-[120px] rounded-full"
            style={{ background: "#C4C4C6" }}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
