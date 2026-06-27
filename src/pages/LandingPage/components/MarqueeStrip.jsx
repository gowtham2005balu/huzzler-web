import React from "react";

export default function MarqueeStrip() {
  return (
    <div className="relative bg-[#f5c945] text-[#0b0b0f] text-xs font-semibold py-2.5 overflow-hidden whitespace-nowrap">
      <div className="flex gap-8 animate-marquee">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex gap-8 shrink-0">
            <span>HASSLE-FREE FREELANCE MADE SIMPLE</span>
            <span>✦</span>
            <span>AI-POWERED MATCHING</span>
            <span>✦</span>
            <span>MILLION-DOLLAR ESCROW PROTECTION</span>
            <span>✦</span>
            <span>HUZZLER, FREELANCE MADE SIMPLE</span>
            <span>✦</span>
            <span>HASSLE-FREE FREELANCE MADE SIMPLE</span>
          </div>
        ))}
      </div>
    </div>
  );
}
