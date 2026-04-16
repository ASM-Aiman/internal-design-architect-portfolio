"use client";
import { motion } from "framer-motion";

export default function Artifacts() {
  const sections = [
    {
      category: "The Visionary",
      content: "I am Amr, an undergraduate Interior Design student dedicated to the alchemy of space. I bridge the gap between classical architectural principles and the contemporary human experience."
    },
    {
      category: "Design Philosophies",
      principles: [
        { title: "Narrative Spaces", desc: "Every room should tell the dweller's story through light and shadow." },
        { title: "Sustainable Luxury", desc: "Eco-conscious material curation without compromising aesthetic grandeur." },
        { title: "Ergonomic Soul", desc: "Prioritizing the human form within the spatial geometry." }
      ]
    },
    {
      category: "Technical Arsenal",
      // These placeholders are ready for your Logo SVGs or Images
      tools: [
        { name: "AutoCAD", icon: "📐" }, 
        { name: "Photoshop", icon: "🎨" },
        { name: "SketchUp", icon: "🏗️" },
        { name: "V-Ray", icon: "💡" },
        { name: "Revit", icon: "🧱" },
        { name: "InDesign", icon: "📖" }
      ]
    },
    {
      category: "Design Competencies",
      skills: ["Spatial Planning", "Material Curation", "3D Visualization", "Furniture Design", "Sustainable Theory", "Color Psychology"]
    }
  ];

  return (
    <div className="flex flex-col gap-10 w-full max-w-md mx-auto py-4">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-[#3b1f06] text-2xl font-serif italic">Personal Folio</h2>
        <div className="flex items-center justify-center gap-2 mt-1">
          <div className="h-[1px] w-12 bg-[#8b6230]/30" />
          <span className="text-[#8b6230] text-[9px] tracking-[0.4em]">AMR</span>
          <div className="h-[1px] w-12 bg-[#8b6230]/30" />
        </div>
      </div>

      {/* Intro Section */}
      <motion.div 
        initial={{ opacity: 0, y: 5 }} 
        animate={{ opacity: 1, y: 0 }}
        className="text-center px-4"
      >
        <p className="text-[12px] leading-relaxed text-[#5c3810]/90 font-serif italic">
          {sections[0].content}
        </p>
      </motion.div>

      {/* Design Philosophies - NEW SECTION */}
      <div className="space-y-4">
        <h3 className="text-[10px] tracking-[0.3em] uppercase text-[#8b6230] font-bold text-center">
          {sections[1].category}
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {sections[1].principles?.map((p, i) => (
            <motion.div 
              key={p.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="p-3 border border-[#8b6230]/10 bg-[#8b6230]/5 rounded-sm"
            >
              <h4 className="text-[11px] font-serif font-bold text-[#3b1f06] mb-1 italic">{p.title}</h4>
              <p className="text-[10px] font-serif text-[#5c3810]/80 leading-snug">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Technical Arsenal - Logo Placeholder Version */}
      <div className="space-y-4">
        <h3 className="text-[10px] tracking-[0.3em] uppercase text-[#8b6230] font-bold">
          {sections[2].category}
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {sections[2].tools?.map((tool, i) => (
            <motion.div 
              key={tool.name}
              whileHover={{ y: -2 }}
              className="flex flex-col items-center gap-2"
            >
              {/* This Box is where your actual Logo Images will go */}
              <div className="w-12 h-12 flex items-center justify-center border border-[#8b6230]/20 bg-white/50 rounded-full text-xl grayscale hover:grayscale-0 transition-all cursor-help" title={tool.name}>
                {tool.icon}
              </div>
              <span className="text-[8px] tracking-widest text-[#8b6230] uppercase">{tool.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Competencies */}
      <div className="border-t border-[#8b6230]/20 pt-6">
        <h3 className="text-[10px] tracking-[0.3em] uppercase text-[#8b6230] mb-3 font-bold">
          {sections[3].category}
        </h3>
        <div className="flex flex-wrap gap-2">
          {sections[3].skills?.map((item) => (
            <span 
              key={item}
              className="text-[9px] font-serif border border-[#8b6230]/10 px-2 py-1 bg-white/30 text-[#3b1f06] italic"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Signature */}
      <div className="mt-4 text-center opacity-40">
        <span className="text-xl font-serif italic text-[#3b1f06]">Amr.</span>
      </div>

      {/* COPYRIGHT & ATTRIBUTION */}
      <div className="mt-4 text-center flex flex-col gap-1 border-t border-[#8b6230]/5 pt-4">
        <p className="text-[8px] font-serif tracking-[0.2em] text-[#8b6230]/50 uppercase">
          Design & Development by <span className="text-[#8b6230]/80 font-bold">ASM Aiman</span>
        </p>
        <p className="text-[7px] font-serif italic text-[#8b6230]/40">
          © {new Date().getFullYear()} — Proprietary Archive
        </p>
      </div>
    </div>
  );
}