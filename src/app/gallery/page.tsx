"use client";

import { motion } from "framer-motion";

export default function Gallery() {
  // We use a fixed brown/ink color because the book page is always parchment
  const inkColor = "#3b1f06";
  const faintInk = "rgba(139, 98, 48, 0.4)";

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="h-full flex flex-col items-center justify-center text-center p-6"
    >
      {/* Decorative Header Ornament */}
      <div className="text-[#8b6230] opacity-30 text-2xl mb-4">❦</div>

      <h2 className="text-3xl md:text-4xl font-serif italic mb-6" style={{ color: inkColor }}>
        The Gallery
      </h2>

      {/* A small divider line */}
      <div className="w-16 h-[1px] mb-8" style={{ background: faintInk }} />

      <div className="space-y-6">
        <p className="text-sm md:text-base leading-loose font-serif italic" style={{ color: inkColor }}>
          "I build experiences that bridge the gap between classical aesthetics 
          and modern engineering."
        </p>
        
        <p className="text-[11px] tracking-[0.2em] uppercase font-serif" style={{ color: "rgba(92, 56, 16, 0.7)" }}>
          Every pixel is treated like a brushstroke on a digital canvas.
        </p>
      </div>

      {/* Decorative Footer Ornament */}
      <div className="mt-12 opacity-10">
        <svg width="100" height="40" viewBox="0 0 100 40" fill="none">
          <path d="M10,20 Q50,0 90,20 Q50,40 10,20" stroke={inkColor} strokeWidth="0.5" />
        </svg>
      </div>

      <div className="absolute bottom-4 text-[9px] italic opacity-30 font-serif" style={{ color: inkColor }}>
        Exhibit Collection MDXXVI
      </div>
    </motion.div>
  );
}