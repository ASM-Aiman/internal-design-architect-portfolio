"use client";

import { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "@/components/layout/RoomLayout";

export default function Home() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pt-12"
    >
      <h1
        className={`text-4xl md:text-6xl font-serif leading-tight tracking-wide transition-all duration-300 ${
          darkMode ? "text-[#e7d8b4]" : "text-[#2a241b]"
        }`}
      >
        Design is not what you see,
        <br />
        <span className="italic opacity-90">it’s what you feel.</span>
      </h1>

      <p
        className={`mt-10 text-xs tracking-[0.4em] transition-colors duration-300 ${
          darkMode ? "text-[#c6a97a]/60" : "text-[#8a724d]"
        }`}
      >

      </p>
    </motion.div>
  );
}