"use client";

import { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "@/components/layout/RoomLayout";

export default function Artifacts() {
  const { darkMode } = useContext(ThemeContext);

  const concepts = [
    { title: "Symmetry", desc: "Balance, proportional grace." },
    { title: "Narrative", desc: "The quiet story an object tells." },
    { title: "Atmosphere", desc: "The silent geometry of light and air." },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full w-full flex flex-col items-center justify-center p-10 pt-40 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {concepts.map((concept) => (
          <motion.div 
            key={concept.title}
            whileHover={{ y: -10 }}
            className={`border transition-colors ${darkMode ? 'border-[#c6a97a]/30 hover:border-[#ffd27a]/60' : 'border-[#8a724d]/30 hover:border-[#3a2f22]/60'} flex flex-col items-center p-10 text-center rounded-sm aspect-[3/4]`}
          >
            <div className={`w-12 h-12 border transition-colors rotate-45 mb-10 ${darkMode ? 'border-[#c6a97a]/40' : 'border-[#8a724d]/40'}`}/>
            <h3 className={`text-2xl mb-4 ${darkMode ? 'text-[#e7d8b4]' : 'text-[#2a241b]'}`}>
              {concept.title}
            </h3>
            <p className={`text-xs tracking-[0.2em] uppercase transition-colors ${darkMode ? 'text-[#c6a97a]/80' : 'text-[#5c4f3d]'}`}>
              {concept.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}