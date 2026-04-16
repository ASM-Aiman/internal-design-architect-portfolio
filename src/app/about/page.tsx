"use client";
import { motion } from "framer-motion";

export default function Artifacts() {
  const sections = [
    {
      category: "The Visionary",
      content: "I am Amr, an undergraduate Interior Design student dedicated to the alchemy of space. I bridge the gap between classical architectural principles and the contemporary human experience."
    },
    {
      category: "Technical Arsenal",
      tools: ["AutoCAD", "Adobe Photoshop", "SketchUp", "V-Ray", "Revit", "Adobe InDesign"]
    },
    {
      category: "Design Competencies",
      skills: ["Spatial Planning", "Material Curation", "3D Visualization", "Furniture Design", "Sustainable Theory", "Color Psychology"]
    }
  ];

  return (
    <div className="flex flex-col gap-8 w-full max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-2">
        <h2 className="text-[#3b1f06] text-2xl font-serif italic">Personal Folio</h2>
        <div className="flex items-center justify-center gap-2 mt-1">
          <div className="h-[1px] w-12 bg-[#8b6230]/30" />
          <span className="text-[#8b6230] text-[9px] tracking-[0.4em]">AMR ARCHITECT</span>
          <div className="h-[1px] w-12 bg-[#8b6230]/30" />
        </div>
      </div>

      {/* Description Section */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="text-center px-4"
      >
        <p className="text-[12px] leading-relaxed text-[#5c3810]/90 font-serif italic">
          {sections[0].content}
        </p>
      </motion.div>

      {/* Tools & Skills Grid */}
      <div className="grid grid-cols-1 gap-6 mt-2">
        {sections.slice(1).map((sec, idx) => (
          <motion.div 
            key={sec.category}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.2 }}
            className="border-t border-[#8b6230]/20 pt-4"
          >
            <h3 className="text-[10px] tracking-[0.3em] uppercase text-[#8b6230] mb-3 font-bold">
              {sec.category}
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {(sec.tools || sec.skills || []).map((item) => (
                <span 
                  key={item}
                  className="text-[10px] font-serif border border-[#8b6230]/10 px-2 py-1 bg-[#8b6230]/5 text-[#3b1f06] italic"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Sign-off */}
      <div className="mt-6 text-center opacity-30">
        <span className="text-[14px] font-serif italic">Amr.</span>
      </div>

             {/* ── COPYRIGHT & ATTRIBUTION ── */}
        <div className="mt-2 text-center flex flex-col gap-1">
          <p className="text-[8px] font-serif tracking-[0.2em] text-[#8b6230]/50 uppercase">
            Design & Development by <span className="text-[#8b6230]/80 font-bold">ASM Aiman</span>
          </p>
          <p className="text-[7px] font-serif italic text-[#8b6230]/40">
            © {new Date().getFullYear()} — All rights reserved in perpetuity.
          </p>
        </div>
    </div>

    
  );
}