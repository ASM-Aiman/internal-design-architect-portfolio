"use client";
import { motion } from "framer-motion";

export default function Artifacts({ darkMode }: { darkMode: boolean }) {
  const concepts = [
    { title: "Symmetry", desc: "Balance, proportional grace." },
    { title: "Narrative", desc: "The quiet story an object tells." },
    { title: "Atmosphere", desc: "The silent geometry of light and air." },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      <h2 className="text-[#3b1f06] text-xl font-serif italic border-b border-[#8b6230]/20 pb-2">Artifacts</h2>
      <div className="flex flex-col gap-4">
        {concepts.map((concept) => (
          <motion.div 
            key={concept.title}
            className="border border-[#8b6230]/20 p-4 rounded-sm bg-[#8b6230]/5"
          >
            <h3 className="text-lg text-[#3b1f06] font-serif">{concept.title}</h3>
            <p className="text-[10px] tracking-widest uppercase text-[#5c3810]/70">{concept.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}