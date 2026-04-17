"use client";

import { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "@/components/layout/RoomLayout";

export default function Home() {
  const { darkMode } = useContext(ThemeContext);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute inset-0 flex items-center justify-center text-center px-4 sm:px-6 pt-20 md:pt-32"
    >
      {/* CREATIVE VERSION 1: Centered Stacked Layout with Decorative Elements */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-6 max-w-2xl"
      >
        {/* Name - Prominent */}
        <motion.h1
          variants={itemVariants}
          className={`text-3xl sm:text-4xl md:text-5xl font-serif tracking-wide transition-all duration-300 ${
            darkMode ? "text-[#e7d8b4]" : "text-[#2a241b]"
          }`}
        >
          Amr Abdullah
        </motion.h1>

        {/* Decorative line */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-4"
        >
          <div className={`h-[1px] w-12 ${darkMode ? "bg-[#c6a97a]/40" : "bg-[#8a724d]/40"}`} />
          <span className={`text-xs tracking-[0.3em] ${darkMode ? "text-[#c6a97a]/60" : "text-[#8a724d]/60"}`}>
            ARCHITECT
          </span>
          <div className={`h-[1px] w-12 ${darkMode ? "bg-[#c6a97a]/40" : "bg-[#8a724d]/40"}`} />
        </motion.div>

        {/* Professional Info - Organized Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full"
        >
          {/* Institution */}
          <div className={`${darkMode ? "text-[#c6a97a]" : "text-[#8a724d]"}`}>
            <p className="text-[10px] tracking-[0.2em] uppercase opacity-60 mb-1">Education</p>
            <p className="text-sm font-serif italic">Interior Architecture</p>
            <p className="text-xs font-light opacity-70">NIBM</p>
          </div>

          {/* Contact - Center */}
          <div className={`border-l border-r ${darkMode ? "border-[#c6a97a]/20" : "border-[#8a724d]/20"} px-4 sm:px-0 sm:px-6`}>
            <p className="text-[10px] tracking-[0.2em] uppercase opacity-60 mb-2">Contact</p>
            <a 
              href="tel:+94777368893"
              className={`block text-sm font-serif italic hover:opacity-70 transition-opacity ${
                darkMode ? "text-[#c6a97a]" : "text-[#8a724d]"
              }`}
            >
              +94 777 368 893
            </a>
            <a 
              href="mailto:amrarchitect1@gmail.com"
              className={`block text-xs font-light opacity-80 hover:opacity-100 transition-opacity break-all ${
                darkMode ? "text-[#c6a97a]" : "text-[#8a724d]"
              }`}
            >
              amrarchitect1@gmail.com
            </a>
          </div>

          {/* Year */}
          <div className={`${darkMode ? "text-[#c6a97a]" : "text-[#8a724d]"}`}>
            <p className="text-[10px] tracking-[0.2em] uppercase opacity-60 mb-1">Portfolio</p>
            <p className="text-2xl font-serif font-light">2026</p>
          </div>
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div
          variants={itemVariants}
          className={`mt-4 h-[1px] w-8 ${darkMode ? "bg-[#c6a97a]/30" : "bg-[#8a724d]/30"}`}
        />
      </motion.div>
    </motion.div>
  );
}