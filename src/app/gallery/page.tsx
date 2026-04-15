"use client";

import { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "@/components/layout/RoomLayout";

export default function Gallery() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col items-center justify-center text-center p-8 pt-12 max-w-2xl mx-auto"
    >
      <h2 className={`text-3xl font-serif mb-6 transition-colors ${darkMode ? "text-[#e7d8b4]" : "text-[#2a241b]"}`}>
        Gallery
      </h2>
      <p className={`text-sm leading-relaxed transition-colors ${darkMode ? "text-[#c6a97a]/80" : "text-[#5c4f3d]"}`}>
        I build experiences that bridge the gap between classical aesthetics and modern engineering. 
        Every pixel is treated like a brushstroke on canvas.
      </p>
    </motion.div>
  );
}