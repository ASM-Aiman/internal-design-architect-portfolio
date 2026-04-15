"use client";

import { useState, createContext, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const ThemeContext = createContext({ darkMode: true, openness: 50 });

export default function RoomLayout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(true);
  const [openness, setOpenness] = useState(50);
  const [catState, setCatState] = useState<"sleeping" | "waking" | "yawning" | "walking" | "settling">("sleeping");
  const [catPosition, setCatPosition] = useState({ x: 0, y: 0 });
  const [emberParticles, setEmberParticles] = useState<{ id: number; x: number; delay: number; dur: number }[]>([]);
  const pathname = usePathname();
  const isSubPage = pathname !== "/";

  const rayOpacity = openness / 100;
  const curtainWidth = `${50 - openness * 0.4}%`;

  useEffect(() => {
    const particles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 60 - 30,
      delay: Math.random() * 2,
      dur: 1.5 + Math.random() * 1.5,
    }));
    setEmberParticles(particles);
  }, []);

  const handleCatInteraction = async () => {
    if (catState !== "sleeping") return;
    setCatState("waking");
    await new Promise((r) => setTimeout(r, 800));
    setCatState("yawning");
    await new Promise((r) => setTimeout(r, 1500));
    setCatState("walking");
    const newX = (Math.random() - 0.5) * 80;
    const newY = (Math.random() - 0.5) * 20;
    setCatPosition({ x: newX, y: newY });
    await new Promise((r) => setTimeout(r, 2000));
    setCatState("settling");
    await new Promise((r) => setTimeout(r, 800));
    setCatState("sleeping");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Artifacts", path: "/about" },
    { name: "Masterpieces", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  // Rich velvet fabric with deep folds - layered for depth
  const velvetFabric = (base: string, mid: string, dark: string) => `
    repeating-linear-gradient(
      90deg,
      ${dark} 0px,
      ${mid} 2px,
      ${base} 5px,
      ${mid} 9px,
      ${dark} 12px,
      ${mid} 16px,
      ${base} 19px,
      ${dark} 22px,
      ${mid} 26px,
      ${base} 30px,
      ${dark} 34px
    )
  `;

  const dayVelvet = velvetFabric("#3d2e1e", "#2a2016", "#0f0c08");
  const nightVelvet = velvetFabric("#1a1410", "#0d0a07", "#050302");

  const curtainFabric = darkMode ? nightVelvet : dayVelvet;

  return (
    <ThemeContext.Provider value={{ darkMode, openness }}>
      <div
        className={`relative w-full h-screen overflow-hidden font-serif transition-colors duration-1000 ${
          darkMode ? "bg-[#050302]" : "bg-[#1a120c]"
        }`}
      >
        {/* ─── BACKGROUND LAYER ─── */}
        <div
          className={`absolute inset-0 z-0 transition-all duration-700 ease-in-out ${
            isSubPage ? "blur-[14px] opacity-30 scale-[1.03]" : "blur-0 opacity-100 scale-100"
          }`}
        >
          {/* Atmospheric light shafts */}
          <div
            className="absolute top-[-10%] left-[3%] w-[180vw] h-[160vh] origin-top-left pointer-events-none z-20 transition-opacity duration-500"
            style={{ opacity: rayOpacity * 1.4, transform: "rotate(-33deg)" }}
          >
            {/* Primary shaft */}
            <div
              className="absolute inset-0 transition-opacity duration-1000"
              style={{
                opacity: darkMode ? 0 : 1,
                background:
                  "linear-gradient(to bottom, rgba(251,191,36,0.25) 0%, rgba(234,88,12,0.12) 40%, transparent 80%)",
              }}
            />
            {/* Secondary shaft with dust motes */}
            <div
              className="absolute inset-0 top-[10%] left-[8%] w-[25vw] h-full transition-opacity duration-1000"
              style={{
                opacity: darkMode ? 0 : 0.7,
                background:
                  "linear-gradient(to bottom, rgba(253,224,71,0.18) 0%, rgba(251,191,36,0.08) 50%, transparent 90%)",
                filter: "blur(8px)",
              }}
            />
            {/* Night light */}
            <div
              className="absolute inset-0 transition-opacity duration-1000"
              style={{
                opacity: darkMode ? 1 : 0,
                background:
                  "linear-gradient(to bottom, rgba(107,133,171,0.15) 0%, rgba(107,133,171,0.04) 50%, transparent 80%)",
              }}
            />
          </div>

          {/* ── WINDOWS ── */}
          <div className="absolute inset-x-0 top-0 h-[68vh] md:h-[78vh] flex justify-center gap-1 md:gap-5 px-2 md:px-14 pt-3 md:pt-7 z-10">
            {[
              { width: "w-[31%] md:w-[29%]" },
              { width: "w-[38%] md:w-[42%]" },
              { width: "w-[31%] md:w-[29%]" },
            ].map((win, i) => (
              <div
                key={i}
                className={`relative ${win.width} h-full flex flex-col overflow-hidden rounded-t-[35px] md:rounded-t-[180px] transition-colors duration-1000`}
                style={{
                  border: `8px solid ${darkMode ? "#080604" : "#160e08"}`,
                  borderBottom: "none",
                  boxShadow: "inset 0 0 80px rgba(0,0,0,0.97), 0 0 60px rgba(0,0,0,0.9)",
                }}
              >
                {/* Sky gradient */}
                <div
                  className="absolute inset-0 transition-opacity duration-1000"
                  style={{
                    opacity: darkMode ? 0 : 1,
                    background: "linear-gradient(to bottom, #c2410c 0%, #ea580c 35%, #fbbf24 70%, #fef3c7 100%)",
                  }}
                />
                <div
                  className="absolute inset-0 transition-opacity duration-1000"
                  style={{
                    opacity: darkMode ? 1 : 0,
                    background: "linear-gradient(to bottom, #020408 0%, #060c1a 50%, #040608 100%)",
                  }}
                />

                {/* Stars (night only) */}
                {darkMode &&
                  [
                    { top: "15%", left: "20%" },
                    { top: "8%", left: "60%" },
                    { top: "25%", left: "75%" },
                    { top: "12%", left: "40%" },
                    { top: "30%", left: "30%" },
                  ].map((s, j) => (
                    <motion.div
                      key={j}
                      className="absolute w-[2px] h-[2px] bg-white rounded-full"
                      style={{ top: s.top, left: s.left }}
                      animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }}
                      transition={{ duration: 2 + j * 0.7, repeat: Infinity, delay: j * 0.4 }}
                    />
                  ))}

                {/* Window muntins */}
                <div
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={{
                    borderLeft: `3px solid ${darkMode ? "#040302" : "#120a05"}`,
                    borderRight: `3px solid ${darkMode ? "#040302" : "#120a05"}`,
                    left: "33%",
                    right: "auto",
                    width: "3px",
                  }}
                />
                <div
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={{
                    left: "66%",
                    width: "3px",
                    background: darkMode ? "#040302" : "#120a05",
                  }}
                />
                <div
                  className="absolute w-full z-10 pointer-events-none"
                  style={{
                    top: "30%",
                    height: "3px",
                    background: darkMode ? "#040302" : "#120a05",
                  }}
                />
                <div
                  className="absolute w-full z-10 pointer-events-none"
                  style={{
                    top: "60%",
                    height: "2px",
                    background: darkMode ? "#040302" : "#120a05",
                  }}
                />

                {/* ── LEFT CURTAIN PANEL ── */}
                <div
                  className="absolute top-0 left-0 h-[112%] z-20 transition-all duration-400 ease-out"
                  style={{
                    width: curtainWidth,
                    background: curtainFabric,
                    boxShadow: "inset -15px 0 25px rgba(0,0,0,0.85), inset -5px 0 8px rgba(0,0,0,0.6), 12px 0 35px rgba(0,0,0,0.95)",
                    borderRight: "2px solid rgba(0,0,0,0.9)",
                  }}
                >
                  {/* Highlight fold */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,255,255,0.03) 0%, transparent 20%, rgba(255,255,255,0.02) 40%, transparent 60%, rgba(0,0,0,0.2) 100%)",
                    }}
                  />
                  {/* Edge shadow */}
                  <div
                    className="absolute right-0 top-0 w-6 h-full pointer-events-none"
                    style={{ background: "linear-gradient(to left, rgba(0,0,0,0.7) 0%, transparent 100%)" }}
                  />
                  {/* Fringe */}
                  <div className="absolute bottom-0 left-0 right-0 h-10 md:h-14" style={{ borderTop: "1px solid rgba(198,169,122,0.25)" }}>
                    <div className="flex justify-center gap-[3px] pt-1">
                      {[...Array(Math.max(2, Math.floor(parseInt(curtainWidth) / 8)))].map((_, k) => (
                        <motion.div
                          key={k}
                          className="w-[3px] md:w-[4px] h-5 md:h-8 rounded-full"
                          style={{ background: "linear-gradient(to bottom, #c6a97a, #5c4a32, #2a1f10)" }}
                          animate={{ rotate: [0, 1, -1, 0] }}
                          transition={{ duration: 2 + k * 0.1, repeat: Infinity, delay: k * 0.08 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── RIGHT CURTAIN PANEL ── */}
                <div
                  className="absolute top-0 right-0 h-[112%] z-20 transition-all duration-400 ease-out"
                  style={{
                    width: curtainWidth,
                    background: curtainFabric,
                    boxShadow: "inset 15px 0 25px rgba(0,0,0,0.85), inset 5px 0 8px rgba(0,0,0,0.6), -12px 0 35px rgba(0,0,0,0.95)",
                    borderLeft: "2px solid rgba(0,0,0,0.9)",
                  }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(270deg, rgba(255,255,255,0.03) 0%, transparent 20%, rgba(255,255,255,0.02) 40%, transparent 60%, rgba(0,0,0,0.2) 100%)",
                    }}
                  />
                  <div
                    className="absolute left-0 top-0 w-6 h-full pointer-events-none"
                    style={{ background: "linear-gradient(to right, rgba(0,0,0,0.7) 0%, transparent 100%)" }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-10 md:h-14" style={{ borderTop: "1px solid rgba(198,169,122,0.25)" }}>
                    <div className="flex justify-center gap-[3px] pt-1">
                      {[...Array(Math.max(2, Math.floor(parseInt(curtainWidth) / 8)))].map((_, k) => (
                        <motion.div
                          key={k}
                          className="w-[3px] md:w-[4px] h-5 md:h-8 rounded-full"
                          style={{ background: "linear-gradient(to bottom, #c6a97a, #5c4a32, #2a1f10)" }}
                          animate={{ rotate: [0, -1, 1, 0] }}
                          transition={{ duration: 2 + k * 0.1, repeat: Infinity, delay: k * 0.08 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── VALANCE (swagged cornice) ── */}
                <div
                  className="absolute top-0 left-0 w-full z-30"
                  style={{
                    height: "22%",
                    background: curtainFabric,
                    boxShadow: "0 18px 45px rgba(0,0,0,0.95), inset 0 -12px 24px rgba(0,0,0,0.6)",
                    borderBottom: "2px solid rgba(0,0,0,0.9)",
                  }}
                >
                  {/* Swag curves */}
                  <svg
                    className="absolute -bottom-1 left-0 w-full"
                    style={{ height: "30px" }}
                    preserveAspectRatio="none"
                    viewBox="0 0 200 30"
                  >
                    <path
                      d="M0,0 Q25,28 50,8 Q75,28 100,8 Q125,28 150,8 Q175,28 200,0 V30 H0 Z"
                      fill={darkMode ? "#050302" : "#160e08"}
                    />
                  </svg>
                  {/* Gold trim line */}
                  <div
                    className="absolute bottom-[18px] left-0 right-0 h-[1px]"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(198,169,122,0.5), transparent)" }}
                  />
                  {/* Valance pleats */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "repeating-linear-gradient(90deg, rgba(0,0,0,0.3) 0px, transparent 4px, transparent 18px, rgba(0,0,0,0.2) 22px)",
                    }}
                  />
                  {/* Center tassel */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div
                      className="w-3 h-3 rounded-full border border-[#c6a97a]/60"
                      style={{ background: "radial-gradient(circle, #c6a97a 30%, #5c4a32 100%)" }}
                    />
                    <div className="w-[2px] h-4 bg-gradient-to-b from-[#c6a97a] to-[#2a1f10]" />
                    <div className="flex gap-[2px]">
                      {[...Array(3)].map((_, k) => (
                        <div key={k} className="w-[2px] h-3 rounded-full bg-gradient-to-b from-[#c6a97a] to-[#2a1f10]" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── GOTHIC ARMOR (left wall) ── */}
          <div className="absolute bottom-[8vh] md:bottom-[10vh] left-[1vw] md:left-[3vw] w-[90px] md:w-[170px] h-[260px] md:h-[400px] z-30 flex flex-col items-center opacity-95 pointer-events-none">
            {/* Helmet with plume */}
            <div className="relative w-10 md:w-18 h-9 md:h-13 -mb-2 z-0">
              <div
                className="w-10 md:w-16 h-9 md:h-12 rounded-t-full rounded-bl-full"
                style={{
                  background: "linear-gradient(135deg, #ef4444 0%, #b91c1c 50%, #7f1d1d 100%)",
                  boxShadow: "inset -4px -4px 12px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.8)",
                }}
              >
                <div
                  className="absolute inset-0 rounded-t-full rounded-bl-full opacity-20"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(0,0,0,0.4) 3px, rgba(0,0,0,0.4) 5px)",
                  }}
                />
              </div>
              {/* Plume */}
              <div className="absolute -top-4 md:-top-6 left-1/2 -translate-x-1/2 flex gap-[2px]">
                {[6, 9, 7].map((h, k) => (
                  <motion.div
                    key={k}
                    className="w-[3px] rounded-full"
                    style={{ height: `${h * 3}px`, background: "linear-gradient(to top, #991b1b, #ef4444, #fca5a5)" }}
                    animate={{ rotate: [-2, 2, -2] }}
                    transition={{ duration: 1.5 + k * 0.3, repeat: Infinity }}
                  />
                ))}
              </div>
            </div>
            {/* Gorget + Cuirass */}
            <div
              className="relative w-9 md:w-13 h-14 md:h-22 rounded-t-3xl rounded-b-lg z-10"
              style={{
                background: "linear-gradient(180deg, #718096 0%, #4a5568 50%, #1a202c 100%)",
                border: "2px solid #4a5568",
                boxShadow: "0 8px 20px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,255,255,0.1)",
              }}
            >
              {/* Visor slot */}
              <div
                className="absolute top-3 md:top-4 left-1/2 -translate-x-1/2 w-5 md:w-8 h-5 md:h-7 bg-[#0d1117] rounded-sm"
                style={{ boxShadow: "inset 0 0 12px rgba(0,0,0,0.95)" }}
              />
              {/* Cheek guards */}
              <div
                className="absolute top-9 md:top-13 -left-2 md:-left-3 w-3 md:w-5 h-5 md:h-8 rounded-l-lg"
                style={{ background: "linear-gradient(90deg, #4a5568, #2d3748)", border: "1.5px solid #718096" }}
              />
              <div
                className="absolute top-9 md:top-13 -right-2 md:-right-3 w-3 md:w-5 h-5 md:h-8 rounded-r-lg"
                style={{ background: "linear-gradient(270deg, #4a5568, #2d3748)", border: "1.5px solid #718096" }}
              />
              {/* Gold filigree */}
              <div className="absolute top-1.5 w-full h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(198,169,122,0.5), transparent)" }} />
            </div>
            {/* Pauldrons + chest */}
            <div className="relative w-14 md:w-22 h-18 md:h-26 mt-0.5 z-20 flex justify-center">
              {[-1, 1].map((side, idx) => (
                <div
                  key={idx}
                  className={`absolute top-0 w-5 md:w-9 h-9 md:h-13 rounded-full ${idx === 0 ? "-left-2 md:-left-3" : "-right-2 md:-right-3"}`}
                  style={{
                    background: `linear-gradient(${idx === 0 ? "135" : "225"}deg, #718096, #2d3748)`,
                    border: "2px solid #4a5568",
                    boxShadow: "0 6px 14px rgba(0,0,0,0.8)",
                  }}
                >
                  <div
                    className="absolute inset-1 rounded-full opacity-30"
                    style={{ border: "1px solid rgba(198,169,122,0.4)" }}
                  />
                </div>
              ))}
              <div
                className="w-9 md:w-14 h-full rounded-b-2xl"
                style={{
                  background: "linear-gradient(180deg, #718096 0%, #4a5568 60%, #1a202c 100%)",
                  border: "2px solid #4a5568",
                  boxShadow: "inset 0 0 18px rgba(0,0,0,0.5)",
                  position: "relative",
                }}
              >
                <div className="absolute left-1/2 -translate-x-1/2 w-[1.5px] h-full bg-[#2d3748]" />
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-5 md:w-7 h-5 md:h-7" style={{ border: "1px solid rgba(198,169,122,0.35)", borderRadius: "50%" }} />
                <div className="absolute top-6 md:top-9 left-1/2 -translate-x-1/2 w-4 md:w-5 h-4 md:h-5 rotate-45" style={{ border: "1px solid rgba(198,169,122,0.25)" }} />
              </div>
            </div>
            {/* Faulds */}
            <div className="w-12 md:w-18 h-8 md:h-12 mt-[-2px] flex flex-col gap-[2px] z-10">
              {[...Array(4)].map((i) => (
                <div
                  key={i}
                  className="flex-1 w-full rounded-b-md"
                  style={{
                    background: "linear-gradient(180deg, #4a5568, #1a202c)",
                    border: "1.5px solid #4a5568",
                    borderTop: "none",
                  }}
                />
              ))}
            </div>
            {/* Greaves */}
            <div className="w-9 md:w-12 h-18 md:h-26 mt-1 flex justify-between z-0">
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="w-3 md:w-5 h-full rounded-b-md"
                  style={{
                    background: "linear-gradient(180deg, #4a5568, #2d3748, #0d1117)",
                    border: "1.5px solid #4a5568",
                  }}
                >
                  {[3, 7, 11].map((top) => (
                    <div key={top} className="absolute w-full h-[1px]" style={{ top: `${top * 4}px`, background: "rgba(198,169,122,0.12)" }} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* ── CHANDELIER (enhanced) ── */}
          <div
            className={`absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center z-50 pointer-events-none transition-all duration-700 ${
              isSubPage ? "opacity-15 blur-sm" : "opacity-100"
            }`}
          >
            {/* Chain */}
            <div className="flex flex-col items-center">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-[3px] h-[14px] md:h-5 rounded-full mb-[2px]"
                  style={{ background: "linear-gradient(180deg, rgba(198,169,122,0.5), rgba(198,169,122,0.7))" }}
                />
              ))}
            </div>
            {/* Ceiling rose */}
            <div
              className="w-8 md:w-12 h-3 md:h-4 rounded-full border border-[#c6a97a]/50"
              style={{ background: "radial-gradient(ellipse, #2a2016, #0a0805)" }}
            />
            {/* Main shaft */}
            <div
              className="relative w-[10px] md:w-3 h-16 md:h-24"
              style={{ background: "linear-gradient(90deg, rgba(198,169,122,0.4), rgba(198,169,122,0.7), rgba(198,169,122,0.4))" }}
            >
              {/* Decorative rings */}
              {[20, 45, 65].map((pos) => (
                <div
                  key={pos}
                  className="absolute left-1/2 -translate-x-1/2 w-4 md:w-5 h-[6px] rounded-full border border-[#c6a97a]/60"
                  style={{ top: `${pos}%`, background: "radial-gradient(ellipse, #c6a97a 0%, #5c4a32 100%)" }}
                />
              ))}
            </div>
            {/* Crown / bobeche */}
            <div
              className="relative w-6 md:w-9 h-6 md:h-9 rounded-full border-2 border-[#c6a97a]/60"
              style={{ background: "radial-gradient(circle, #1a1208, #0a0805)" }}
            >
              <div className="absolute inset-1 rounded-full border border-[#c6a97a]/30" />
            </div>
            {/* Arms container */}
            <div className="absolute top-[80px] md:top-[110px] w-[220px] md:w-[360px] h-[110px] md:h-[150px]">
              {[
                { left: "4%", armW: "w-20 md:w-30", curve: "border-b border-l rounded-bl-[70px] md:rounded-bl-[100px]", side: "left-0", candleL: "-left-2" },
                { left: "26%", armW: "w-12 md:w-18", curve: "border-b border-l rounded-bl-[45px] md:rounded-bl-[65px]", side: "left-0", candleL: "-left-2" },
                { left: "50%", armW: "w-0", curve: "", side: "", candleL: "-left-1" },
                { left: "auto", right: "26%", armW: "w-12 md:w-18", curve: "border-b border-r rounded-br-[45px] md:rounded-br-[65px]", side: "right-0", candleL: "-right-2" },
                { left: "auto", right: "4%", armW: "w-20 md:w-30", curve: "border-b border-r rounded-br-[70px] md:rounded-br-[100px]", side: "right-0", candleL: "-right-2" },
              ].map((arm, i) => (
                <div
                  key={i}
                  className={`absolute bottom-0 h-10 md:h-16 border-[#c6a97a]/55 ${arm.armW} ${arm.curve}`}
                  style={{ left: (arm as any).right ? "auto" : arm.left, right: (arm as any).right || "auto" }}
                >
                  {/* Arm end globe */}
                  {i !== 2 && (
                    <div
                      className={`absolute bottom-0 ${arm.side} w-[10px] md:w-3 h-[10px] md:h-3 rounded-full border border-[#c6a97a]/50`}
                      style={{ background: "radial-gradient(circle, #c6a97a 20%, #5c4a32 80%)" }}
                    />
                  )}
                  {/* Candle */}
                  <div
                    className={`absolute ${arm.candleL} ${i < 2 ? "bottom-[8px]" : i === 2 ? "bottom-[14px]" : "bottom-[8px]"} w-4 md:w-5 h-6 md:h-8`}
                  >
                    {/* Wax body */}
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 md:w-4 h-5 md:h-7 rounded-t-sm"
                      style={{ background: "linear-gradient(90deg, rgba(231,216,180,0.6), rgba(198,169,122,0.3), rgba(231,216,180,0.5))" }}
                    >
                      {/* Drip */}
                      <div className="absolute top-0 left-1 w-1 h-2 rounded-b-full" style={{ background: "rgba(231,216,180,0.5)" }} />
                    </div>
                    {/* Bobeche dish */}
                    <div
                      className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 w-5 md:w-6 h-[3px] rounded-full border border-[#c6a97a]/60"
                      style={{ background: "#1a1208" }}
                    />
                    {/* Flame */}
                    {darkMode && (
                      <motion.div
                        className="absolute top-0 left-1/2 -translate-x-1/2"
                        animate={{ scaleY: [1, 1.18, 0.88, 1.12, 1], scaleX: [1, 0.9, 1.1, 0.95, 1] }}
                        transition={{ duration: 0.45 + i * 0.07, repeat: Infinity }}
                      >
                        {/* Outer flame */}
                        <div
                          className="w-3 md:w-4 h-4 md:h-5 rounded-t-full rounded-bl-full"
                          style={{
                            background: "radial-gradient(ellipse at 40% 80%, #fbbf24, #f97316, #ef4444)",
                            boxShadow: "0 0 12px 4px rgba(251,191,36,0.6), 0 0 25px 8px rgba(249,115,22,0.35)",
                            transformOrigin: "center bottom",
                          }}
                        />
                        {/* Inner blue core */}
                        <div
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[4px] md:w-[6px] h-2 md:h-3 rounded-t-full"
                          style={{ background: "linear-gradient(to top, #93c5fd, #fff)" }}
                        />
                      </motion.div>
                    )}
                    {!darkMode && (
                      <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-2 rounded-full opacity-50"
                        style={{ background: "#2d1e0a" }}
                      />
                    )}
                  </div>
                </div>
              ))}
              {/* Lower crystal drops */}
              {[0, 72, 144, 216, 288].map((angle, i) => (
                <motion.div
                  key={`crystal-${i}`}
                  className="absolute"
                  style={{
                    top: "55%",
                    left: "50%",
                    transform: `rotate(${angle}deg) translateX(40px)`,
                  }}
                  animate={{ rotate: [`${angle}deg`, `${angle + 5}deg`, `${angle}deg`] }}
                  transition={{ duration: 3 + i * 0.4, repeat: Infinity }}
                >
                  <div
                    className="w-2 md:w-3 h-3 md:h-5 rounded-b-full border border-[#c6a97a]/40"
                    style={{
                      background: darkMode
                        ? "linear-gradient(180deg, rgba(198,169,122,0.3), rgba(255,255,255,0.1))"
                        : "linear-gradient(180deg, rgba(255,200,100,0.4), rgba(255,255,255,0.2))",
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── FIREPLACE (enhanced) ── */}
          <div
            className={`absolute bottom-0 w-full z-40 transition-all duration-700 pointer-events-none ${
              isSubPage ? "opacity-15 blur-md translate-y-8" : "opacity-100 translate-y-0"
            }`}
          >
            {/* Floor */}
            <div
              className="absolute bottom-0 w-full h-[16vh] md:h-[20vh]"
              style={{
                background: "linear-gradient(to top, #020100, #080604, #120e09)",
                borderTop: `6px solid ${darkMode ? "#080604" : "#0a0705"}`,
              }}
            />
            {/* Hearth surround */}
            <div
              className="absolute bottom-[10vh] md:bottom-[13vh] left-1/2 -translate-x-1/2 w-[220px] md:w-[500px] h-[130px] md:h-[200px]"
              style={{
                background: "linear-gradient(180deg, #2a1f14 0%, #1a120c 50%, #0a0805 100%)",
                border: `8px solid ${darkMode ? "#1a120c" : "#2a1f14"}`,
                borderBottom: "none",
                boxShadow: "inset 0 -20px 50px rgba(0,0,0,0.99), 0 0 80px rgba(0,0,0,0.9)",
              }}
            >
              {/* Back wall of firebox */}
              <div
                className="absolute inset-0"
                style={{
                  background: darkMode
                    ? "radial-gradient(ellipse at 50% 80%, #5c1818 0%, #3a0f0f 40%, #1a0303 100%)"
                    : "radial-gradient(ellipse at 50% 80%, #3a0f0f 0%, #1a0303 70%)",
                }}
              />
              {/* Brick pattern */}
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 14px, rgba(0,0,0,0.4) 14px, rgba(0,0,0,0.4) 16px), repeating-linear-gradient(90deg, transparent, transparent 28px, rgba(0,0,0,0.2) 28px, rgba(0,0,0,0.2) 30px)",
                }}
              />

              {/* Log pile */}
              <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 w-28 md:w-48">
                {[
                  { w: "w-28 md:w-44", rot: "-rotate-6", bottom: "bottom-0", z: "z-0" },
                  { w: "w-24 md:w-36", rot: "rotate-4", bottom: "bottom-2 md:bottom-3", z: "z-0" },
                  { w: "w-16 md:w-24", rot: "-rotate-2", bottom: "bottom-4 md:bottom-6", z: "z-0" },
                ].map((log, i) => (
                  <div
                    key={i}
                    className={`absolute left-1/2 -translate-x-1/2 ${log.w} h-3 md:h-5 ${log.rot} ${log.bottom} ${log.z} rounded-full`}
                    style={{
                      background: "linear-gradient(180deg, #2d1810, #1a0d08, #0d0604)",
                      border: "1px solid rgba(0,0,0,0.5)",
                      boxShadow: "inset 0 -2px 6px rgba(0,0,0,0.8)",
                    }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-full" style={{ background: darkMode ? "rgba(180,80,20,0.4)" : "transparent" }} />
                  </div>
                ))}
              </div>

              {/* Fire */}
              {darkMode && (
                <div className="absolute bottom-7 md:bottom-10 left-1/2 -translate-x-1/2 w-24 md:w-40 h-20 md:h-32 mix-blend-screen">
                  {/* Base coals glow */}
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 md:w-36 h-4 md:h-6 rounded-full"
                    style={{ background: "radial-gradient(ellipse, #dc2626, #991b1b, transparent)", filter: "blur(6px)" }}
                    animate={{ scaleX: [1, 1.1, 0.95, 1], opacity: [0.8, 1, 0.85, 1] }}
                    transition={{ duration: 0.7, repeat: Infinity }}
                  />
                  {/* Main flame mass */}
                  <motion.div
                    className="absolute bottom-2 md:bottom-3 left-1/2 -translate-x-1/2 w-20 md:w-32 h-16 md:h-26"
                    style={{ background: "radial-gradient(ellipse at 50% 90%, #dc2626, #f97316, rgba(251,146,60,0))", filter: "blur(12px)", borderRadius: "50%" }}
                    animate={{ scaleY: [1, 1.2, 0.9, 1.15, 1], scaleX: [1, 0.95, 1.05, 0.98, 1] }}
                    transition={{ duration: 0.55, repeat: Infinity }}
                  />
                  {/* Mid flame */}
                  <motion.div
                    className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 w-14 md:w-22 h-12 md:h-20"
                    style={{ background: "radial-gradient(ellipse at 50% 85%, #f97316, #fbbf24, rgba(253,224,71,0))", filter: "blur(8px)", borderRadius: "50%" }}
                    animate={{ scaleY: [1, 1.25, 0.88, 1.18, 1], scaleX: [1, 0.9, 1.1, 0.95, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                  />
                  {/* Hot core */}
                  <motion.div
                    className="absolute bottom-5 md:bottom-8 left-1/2 -translate-x-1/2 w-6 md:w-10 h-8 md:h-14"
                    style={{ background: "radial-gradient(ellipse at 50% 80%, #fef3c7, #fbbf24, rgba(253,224,71,0))", filter: "blur(4px)", borderRadius: "50%" }}
                    animate={{ scaleY: [1, 1.3, 0.9, 1.2, 1] }}
                    transition={{ duration: 0.4, repeat: Infinity, delay: 0.2 }}
                  />
                  {/* Embers */}
                  {emberParticles.map((p) => (
                    <motion.div
                      key={p.id}
                      className="absolute bottom-0 w-[3px] h-[3px] rounded-full"
                      style={{ left: `calc(50% + ${p.x}px)`, background: "#fbbf24" }}
                      animate={{ y: [0, -40, -80], opacity: [1, 0.8, 0], x: [0, p.x / 4, p.x / 2] }}
                      transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeOut" }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Mantle shelf */}
            <div
              className="absolute left-1/2 -translate-x-1/2 w-[240px] md:w-[540px] h-[16px] md:h-[24px]"
              style={{
                bottom: "calc(10vh + 120px)",
                background: "linear-gradient(180deg, #3a2f22, #2a2016, #1a1208)",
                borderTop: "1px solid rgba(198,169,122,0.3)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.99), inset 0 1px 2px rgba(198,169,122,0.15)",
              }}
            />

            {/* Mantle legs */}
            {[-1, 1].map((side) => (
              <div
                key={side}
                className="absolute"
                style={{
                  bottom: "calc(10vh + 24px)",
                  left: side === -1 ? "calc(50% - 120px) md:calc(50% - 270px)" : "auto",
                  right: side === 1 ? "calc(50% - 120px) md:calc(50% - 270px)" : "auto",
                  width: "16px",
                  height: "100px",
                  background: "linear-gradient(180deg, #3a2f22, #2a2016, #1a1208)",
                  borderLeft: side === -1 ? "1px solid rgba(198,169,122,0.25)" : "none",
                  borderRight: side === 1 ? "1px solid rgba(198,169,122,0.25)" : "none",
                }}
              />
            ))}

            {/* Floor glow */}
            {darkMode && (
              <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[80px] md:h-[120px] pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 50% 100%, rgba(220,38,38,0.25), rgba(249,115,22,0.1), transparent)",
                  filter: "blur(20px)",
                }}
                animate={{ opacity: [0.6, 1, 0.7, 0.9, 0.6] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
            )}
          </div>

          {/* ── WALL SCONCES ── */}
          <div className={`absolute inset-0 pointer-events-none z-50 transition-all duration-700 ${isSubPage ? "opacity-15 blur-sm" : "opacity-100"}`}>
            {[
              { posClass: "left-2 md:left-8", armDir: "left" },
              { posClass: "right-2 md:right-8", armDir: "right" },
            ].map((sconce, i) => (
              <div
                key={i}
                className={`absolute top-[22vh] md:top-[28vh] ${sconce.posClass} flex flex-col items-center drop-shadow-[0_12px_22px_rgba(0,0,0,0.99)]`}
                style={{ transform: "scale(0.55) md:scale(0.85)", transformOrigin: "top center" }}
              >
                {/* Wall plate */}
                <div
                  className="w-5 md:w-8 h-16 md:h-24 rounded-full border border-[#c6a97a]/40"
                  style={{ background: "linear-gradient(180deg, #1a120c, #0a0705)", boxShadow: "inset 0 0 10px rgba(0,0,0,0.8)" }}
                >
                  {[1, 2].map((j) => (
                    <div key={j} className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border border-[#c6a97a]/30" style={{ top: j === 1 ? "15%" : "75%" }} />
                  ))}
                </div>
                {/* Horizontal arm */}
                <div
                  className={`absolute top-12 md:top-16 w-12 md:w-18 h-8 md:h-10 border-b-2 border-[#c6a97a]/60 ${sconce.armDir === "left" ? "border-l-2 rounded-bl-full left-3" : "border-r-2 rounded-br-full right-3"}`}
                />
                {/* Lantern */}
                <div
                  className={`absolute top-2 md:top-4 ${sconce.armDir === "left" ? "left-9 md:left-14" : "right-9 md:right-14"} w-7 md:w-11 h-11 md:h-16 rounded-sm backdrop-blur-sm relative`}
                  style={{ border: "1.5px solid rgba(198,169,122,0.6)", background: "rgba(0,0,0,0.45)", boxShadow: "inset 0 0 12px rgba(0,0,0,0.95)" }}
                >
                  {/* Top finial */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0" style={{ borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderBottom: "6px solid rgba(198,169,122,0.6)" }} />
                  <div className="absolute -top-[1px] left-0 right-0 h-[1.5px]" style={{ background: "rgba(198,169,122,0.5)" }} />
                  <div className="absolute inset-2 rounded-sm border border-[#c6a97a]/20" />
                  <div className="absolute top-1/2 left-0 right-0 h-[1px]" style={{ background: "rgba(198,169,122,0.2)" }} />
                  {/* Glass panels */}
                  {[0, 1].map((p) => (
                    <div
                      key={p}
                      className="absolute top-1 bottom-3 w-[2px]"
                      style={{ [p === 0 ? "left" : "right"]: "33%", background: "rgba(198,169,122,0.25)" }}
                    />
                  ))}
                  {/* Candle */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3 md:w-4 h-5 md:h-7">
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 md:w-3 h-4 md:h-6"
                      style={{ background: "linear-gradient(90deg, rgba(231,216,180,0.5), rgba(198,169,122,0.3))" }}
                    />
                    {darkMode && (
                      <motion.div
                        className="absolute top-0 left-1/2 -translate-x-1/2"
                        animate={{ opacity: [0.85, 1, 0.9, 0.95, 0.88, 1], scaleY: [1, 1.08, 0.95, 1.05, 0.98, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <div
                          className="w-2 md:w-3 h-3 md:h-4 rounded-t-full"
                          style={{
                            background: "radial-gradient(ellipse at 40% 70%, #fbbf24, #f97316)",
                            boxShadow: "0 0 20px 8px rgba(251,191,36,0.7), 0 0 40px 12px rgba(249,115,22,0.35)",
                          }}
                        />
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* ─── END BACKGROUND LAYER ─── */}

        {/* ── TAPESTRY NAV ── */}
        <div className="absolute top-[10vh] md:top-[14vh] right-[2vw] md:right-[3vw] w-[140px] md:w-[230px] h-[340px] md:h-[460px] z-[200] shadow-[12px_12px_28px_rgba(0,0,0,0.95)] rotate-1 origin-top pointer-events-auto">
          <div
            className="absolute -top-2 left-[-8px] right-[-8px] h-3 md:h-4 rounded-full border border-black"
            style={{ background: "#0a0705" }}
          />
          <div
            className="w-full h-full flex flex-col items-center p-2 md:p-3 relative overflow-hidden"
            style={{
              background: "linear-gradient(180deg, #4a0e0e 0%, #2d0808 50%, #1a0303 100%)",
              border: "3px solid rgba(198,169,122,0.5)",
              borderBottom: "6px solid rgba(198,169,122,0.5)",
              boxShadow: "inset 0 0 25px rgba(0,0,0,0.9)",
            }}
          >
            {/* Ornate top band */}
            <div className="w-full h-7 md:h-9 flex items-center justify-center mt-1 mb-1" style={{ borderTop: "1.5px solid rgba(198,169,122,0.45)", borderBottom: "1.5px solid rgba(198,169,122,0.45)" }}>
              <div className="w-full h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(198,169,122,0.3), transparent)" }} />
            </div>

            {/* AMR monogram */}
            <div
              className="relative w-24 md:w-32 h-28 md:h-38 my-2 flex items-center justify-center"
              style={{
                border: "2.5px solid #c6a97a",
                borderRadius: "6px",
                boxShadow: "0 0 18px rgba(198,169,122,0.25), inset 0 0 12px rgba(0,0,0,0.5)",
              }}
            >
              <div
                className="absolute inset-1.5"
                style={{ border: "1px solid rgba(198,169,122,0.45)", borderRadius: "4px" }}
              />
              {/* Corner ornaments */}
              {["top-1 left-1", "top-1 right-1", "bottom-1 left-1", "bottom-1 right-1"].map((pos) => (
                <div key={pos} className={`absolute ${pos} w-3 h-3`}>
                  <div
                    className="w-full h-full"
                    style={{
                      borderTop: pos.includes("bottom") ? "none" : "1.5px solid #c6a97a",
                      borderBottom: pos.includes("top") ? "none" : "1.5px solid #c6a97a",
                      borderLeft: pos.includes("right") ? "none" : "1.5px solid #c6a97a",
                      borderRight: pos.includes("left") ? "none" : "1.5px solid #c6a97a",
                    }}
                  />
                </div>
              ))}
              <div className="flex flex-col items-center gap-1">
                <span
                  className="text-[#e8d4b8] text-2xl md:text-4xl font-bold tracking-widest leading-none"
                  style={{
                    textShadow: "2px 2px 5px rgba(0,0,0,1), 0 0 25px rgba(198,169,122,0.5)",
                    fontFamily: "Cinzel, Playfair Display, serif",
                  }}
                >
                  AMR
                </span>
                <div
                  className="w-10 md:w-14 h-[1.5px]"
                  style={{ background: "linear-gradient(90deg, transparent, #c6a97a, transparent)" }}
                />
              </div>
            </div>

            {/* Decorative band */}
            <div
              className="w-full h-5 md:h-6 rounded-full opacity-55 my-1 md:my-2"
              style={{ border: "1.5px solid rgba(198,169,122,0.35)", background: "rgba(26,3,3,0.4)" }}
            />

            {/* Nav links */}
            <nav className="w-full flex flex-col items-center gap-[3px] md:gap-1 px-1">
              {navLinks.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`w-full text-center py-[7px] md:py-[10px] px-2 md:px-3 text-[8px] md:text-[10px] tracking-[0.18em] uppercase transition-all duration-300 rounded-sm ${
                      isActive
                        ? "text-[#fff8e7] font-semibold"
                        : "text-[#d4c4a8] hover:text-[#fff8e7]"
                    }`}
                    style={{
                      fontFamily: "Cinzel, serif",
                      background: isActive ? "rgba(198,169,122,0.25)" : "transparent",
                      border: isActive ? "1px solid rgba(198,169,122,0.5)" : "1px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.background = "rgba(198,169,122,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent";
                    }}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div
              className="w-full h-5 md:h-6 rounded-full opacity-55 my-1 md:my-2"
              style={{ border: "1.5px solid rgba(198,169,122,0.35)", background: "rgba(26,3,3,0.4)" }}
            />

            {/* Tassels */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-[6px] md:w-2 h-6 md:h-8 rounded-full"
                  style={{ background: "linear-gradient(to bottom, #c6a97a, #3d3020)" }}
                  animate={{ rotate: [-1, 1, -1] }}
                  transition={{ duration: 2 + i * 0.2, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── CAT ── */}
        <motion.div
          className="absolute z-[200] cursor-pointer"
          style={{ bottom: "calc(8vh + 175px)", left: "50%" }}
          onClick={handleCatInteraction}
          animate={{ x: catPosition.x, y: catPosition.y, opacity: isSubPage ? 0.25 : 1 }}
          transition={{ duration: catState === "walking" ? 2 : 0.5, ease: "easeInOut" }}
          whileHover={{ scale: 1.06 }}
        >
          <motion.div
            className="w-20 md:w-28 h-12 md:h-16 flex items-end relative origin-bottom"
            animate={{
              scaleY: catState === "yawning" ? [1, 0.9, 1.1, 1] : catState === "sleeping" ? [1, 1.02, 1] : 1,
              rotate: catState === "walking" ? [0, 3, -3, 0] : 0,
            }}
            transition={{
              scaleY: { duration: catState === "sleeping" ? 3 : 0.5, repeat: catState === "sleeping" ? Infinity : 0 },
              rotate: { duration: 0.4, repeat: catState === "walking" ? Infinity : 0 },
            }}
          >
            <div
              className="w-14 md:w-20 h-7 md:h-10 rounded-full border-t border-[#3a332d] relative overflow-hidden"
              style={{ background: "#14100c", boxShadow: "0 8px 18px rgba(0,0,0,0.99)" }}
            >
              <div
                className="absolute inset-0 opacity-15"
                style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(0,0,0,0.4) 4px, rgba(0,0,0,0.4) 5px)" }}
              />
            </div>
            <motion.div
              className="absolute left-10 md:left-14 bottom-1.5 md:bottom-2 w-7 md:w-10 h-7 md:h-10 rounded-full border-t border-[#3a332d]"
              style={{ background: "#14100c" }}
              animate={{ y: catState === "yawning" ? [-3, -6, -3] : 0, scale: catState === "yawning" ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute top-2 md:top-3 left-1.5 md:left-2 w-1.5 md:w-2 h-[1.5px] bg-[#3a332d] rounded-full" />
              <div className="absolute top-2 md:top-3 right-1.5 md:right-2 w-1.5 md:w-2 h-[1.5px] bg-[#3a332d] rounded-full" />
            </motion.div>
            <motion.div
              className="absolute left-10 md:left-14 bottom-7 md:bottom-10 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[7px] border-b-[#14100c] -rotate-12"
              animate={{ rotate: catState === "yawning" ? -20 : -12 }}
            />
            <motion.div
              className="absolute left-14 md:left-20 bottom-7 md:bottom-10 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[7px] border-b-[#14100c] rotate-12"
              animate={{ rotate: catState === "yawning" ? 20 : 12 }}
            />
            <motion.div
              className="absolute -left-3 md:-left-4 bottom-0 w-8 md:w-12 h-3 md:h-4 rounded-full -rotate-12 origin-right"
              style={{ background: "#14100c" }}
              animate={{ rotate: catState === "walking" ? [-12, -25, -12] : -12 }}
              transition={{ duration: 0.6, repeat: catState === "walking" ? Infinity : 0 }}
            />
            {catState === "sleeping" && (
              <>
                <motion.span animate={{ opacity: [0, 1, 0], y: [0, -8, -16], x: [0, 4, 8] }} transition={{ duration: 2, repeat: Infinity, delay: 0 }} className="absolute left-12 md:left-16 -top-2 md:-top-4 text-[10px] md:text-[12px] text-[#c6a97a] font-serif font-bold" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>z</motion.span>
                <motion.span animate={{ opacity: [0, 1, 0], y: [0, -10, -20], x: [0, -2, -4] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }} className="absolute left-16 md:left-20 -top-4 md:-top-6 text-[12px] md:text-[14px] text-[#c6a97a] font-serif font-bold" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>Z</motion.span>
              </>
            )}
            {catState === "yawning" && (
              <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0], y: [0, -8, -16] }} transition={{ duration: 1.5 }} className="absolute left-14 -top-3 text-[#c6a97a] text-xl font-serif">○</motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* ── DAY / NIGHT TOGGLE ── */}
        <div className="absolute top-3 md:top-8 right-3 md:right-8 z-[100]">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-[8px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] transition-all duration-500 px-3 md:px-5 py-2 md:py-3 rounded-sm flex items-center gap-1.5 backdrop-blur-md cursor-pointer"
            style={{
              border: `1px solid ${darkMode ? "rgba(198,169,122,0.6)" : "rgba(26,18,12,0.4)"}`,
              background: darkMode ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.2)",
              color: darkMode ? "#c6a97a" : "#1a120c",
            }}
          >
            {darkMode ? <><span>☾</span><span className="hidden md:inline"> NIGHT</span></> : <><span>☀</span><span className="hidden md:inline"> MORNING</span></>}
          </button>
        </div>

        {/* ── CURTAIN SLIDER ── */}
        <div
          className="absolute bottom-[3vh] md:bottom-[6vh] right-2 md:right-8 w-[130px] md:w-[170px] flex flex-col items-end z-[100] pointer-events-auto p-2 md:p-3 rounded-lg backdrop-blur-sm"
          style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(198,169,122,0.2)" }}
        >
          <span
            className="text-[7px] md:text-[9px] tracking-[0.2em] uppercase mb-2 md:mb-3 font-sans transition-colors duration-500"
            style={{ color: darkMode ? "#c6a97a" : "#fcd34d" }}
          >
            Drape Pulley
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={openness}
            onChange={(e) => setOpenness(Number(e.target.value))}
            className="w-full h-6 cursor-pointer"
            style={{ WebkitAppearance: "none", appearance: "none", background: "transparent" }}
          />
          <style jsx>{`
            input[type=range]::-webkit-slider-runnable-track { width: 100%; height: 6px; cursor: pointer; background: #1a120c; border-radius: 9999px; border: 1px solid #3a2f22; }
            input[type=range]::-webkit-slider-thumb { height: 20px; width: 20px; border-radius: 9999px; background: #c6a97a; border: 2px solid #3a2f22; cursor: pointer; -webkit-appearance: none; appearance: none; margin-top: -7px; box-shadow: 0 0 12px rgba(198,169,122,0.9); }
            input[type=range]::-moz-range-track { width: 100%; height: 6px; cursor: pointer; background: #1a120c; border-radius: 9999px; border: 1px solid #3a2f22; }
            input[type=range]::-moz-range-thumb { height: 20px; width: 20px; border-radius: 9999px; background: #c6a97a; border: 2px solid #3a2f22; cursor: pointer; box-shadow: 0 0 12px rgba(198,169,122,0.9); }
          `}</style>
        </div>

        {/* ── PAGE CONTENT ── */}
        <div className="relative z-50 w-full h-full overflow-y-auto pointer-events-none">
          <div className="w-full h-full pointer-events-auto">{children}</div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}