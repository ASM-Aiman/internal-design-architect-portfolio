"use client";
import { motion } from "framer-motion";

export default function Artifacts() {
  const attributes = [
    { 
      title: "Material Soul", 
      desc: "Honoring the raw grain of oak, the cold vein of marble, and the honest weave of linen to create grounded sanctuaries." 
    },
    { 
      title: "Chiaroscuro", 
      desc: "Mastering the interplay of shadow and light to define volume and evoke a sense of quiet mystery within a room." 
    },
    { 
      title: "Spatial Poetics", 
      desc: "Designing transitions that flow like a verse, where every doorway and corridor serves a narrative purpose." 
    },
    { 
      title: "The Human Scale", 
      desc: "Precision in proportion; ensuring grand designs never lose their intimacy or their connection to the inhabitant." 
    },
  ];

  const inkColor = "#3b1f06";
  const borderInk = "rgba(139, 98, 48, 0.2)";

  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
      {/* Header with an archaic flourish */}
      <div className="text-center mb-2">
        <h2 className="text-[#3b1f06] text-2xl font-serif italic">Design Philosophies</h2>
        <div className="flex items-center justify-center gap-2 mt-1">
          <div className="h-[1px] w-12 bg-[#8b6230]/30" />
          <span className="text-[#8b6230] text-[10px] tracking-[0.3em]">FOLIO III</span>
          <div className="h-[1px] w-12 bg-[#8b6230]/30" />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {attributes.map((attr, index) => (
          <motion.div 
            key={attr.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative border-l-2 border-[#8b6230]/20 pl-6 py-1 hover:border-[#8b6230] transition-colors"
          >
            {/* Small decorative index number */}
            <span className="absolute -left-[9px] top-1/2 -translate-y-1/2 w-4 h-4 bg-[#f2e3c9] text-[#8b6230] text-[8px] flex items-center justify-center border border-[#8b6230]/30 rounded-full font-serif italic">
              {index + 1}
            </span>

            <h3 className="text-base text-[#3b1f06] font-serif font-bold tracking-tight mb-1">
              {attr.title}
            </h3>
            <p className="text-[11px] leading-relaxed text-[#5c3810]/80 font-serif italic">
              {attr.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Footer detail */}
      <div className="mt-8 flex justify-center opacity-20">
        <div className="w-24 h-[1px] bg-[#3b1f06]" />
      </div>
    </div>
  );
}