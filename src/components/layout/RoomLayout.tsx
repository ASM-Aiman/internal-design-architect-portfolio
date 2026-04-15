"use client";

import { useState, createContext, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

export const ThemeContext = createContext({ darkMode: true, openness: 50 });

export default function RoomLayout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(true);
  const [openness, setOpenness] = useState(50);
  const [catState, setCatState] = useState<"sleeping" | "waking" | "yawning" | "walking" | "settling" | "eating">("sleeping");
  const [catPosition, setCatPosition] = useState({ x: 0, y: 0 });
  const [emberParticles, setEmberParticles] = useState<{ id: number; x: number; delay: number; dur: number }[]>([]);
  const [catHunger, setCatHunger] = useState(45);
  const [currentFood, setCurrentFood] = useState<string | null>(null);
  const pathname = usePathname();
  const isSubPage = pathname !== "/";
  const router = useRouter();
const [bookOpen, setBookOpen] = useState(false);

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

  // Slowly increase hunger over time (cat gets hungrier if not fed)
  useEffect(() => {
    const timer = setInterval(() => {
      setCatHunger((prev) => Math.min(100, prev + 8));
    }, 45000);
    return () => clearInterval(timer);
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

  const handleFeed = (foodEmoji: string) => {
    if (catState !== "sleeping") return;
    setCurrentFood(foodEmoji);
    setCatState("eating");
    setCatHunger((prev) => Math.max(0, prev - 25));
    setTimeout(() => {
      setCurrentFood(null);
      setCatState("sleeping");
    }, 1600);
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

          {/* ── WALL SCONCES (original - right one will be duplicated forward below) ── */}
          <div className={`absolute inset-0 pointer-events-none z-50 transition-all duration-700 ${isSubPage ? "opacity-15 blur-sm" : "opacity-100"}`}>
            {[
              { posClass: "left-2 md:left-8", armDir: "left" },
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

        {/* ── SMALL SIDE TABLE & BOOK NAV (Bottom Right) ── */}
        <div className="absolute bottom-[10vh] right-[3vw] w-[200px] md:w-[280px] h-[180px] md:h-[240px] z-[200] flex flex-col items-center">
          
          {/* The Table Top Surface (Depth perspective) */}
          <div className="absolute w-[95%] h-[30px] rounded-t-xl z-10" style={{ bottom: "calc(10vh + 35px)", background: "#2a1f14", transform: "rotateX(70deg)", boxShadow: "0 10px 20px rgba(0,0,0,0.5)" }} />
          
          {/* Table Front Leg & Structure */}
          <div className="absolute bottom-[10vh] w-[90%] h-[120px] md:h-[160px] bg-[#1a120c] z-0" style={{ clipPath: "polygon(5% 0, 95% 0, 85% 100%, 15% 100%)", border: "1.5px solid #2a1f14" }} />

          {/* ── THE BOOK (Sitting ON the table, Spine facing) ── */}
          <div 
            className="absolute bottom-[calc(10vh+60px)] left-1/2 -translate-x-1/2 z-[300] cursor-pointer"
            onClick={() => setBookOpen(true)}
          >
            <motion.div
              className="relative w-40 h-10 bg-[#3d1a10] rounded-sm shadow-[0_10px_20px_rgba(0,0,0,0.8)] border-2 border-[#5c2d1d] flex items-center justify-center group"
              whileHover={{ y: -5, rotateX: 10 }}
            >
              {/* Tassel Bookmark */}
              <motion.div 
                className="absolute -left-2 top-2 w-1.5 h-16 bg-[#8b0000] rounded-b-full origin-top"
                animate={{ rotate: [-3, 3, -3] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              {/* Spine Text (Cinzel archaic font) */}
              <span className="text-[#c6a97a] text-[10px] tracking-[0.4em] font-serif font-bold group-hover:text-white transition-colors">
                AMR'S BOOK
              </span>
              
              {/* Book depth lines */}
              <div className="absolute inset-y-0 right-1 w-[1px] bg-[#c6a97a]/30" />
            </motion.div>
          </div>
        </div>

         <AnimatePresence>
          {bookOpen && (
            <motion.div
              className="fixed inset-0 z-[1000] flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { delay: 0.5 } }} // Backdrop stays until book is fully shut
            >
              <div 
                className="absolute inset-0 bg-[#050302]/95 backdrop-blur-xl" 
                onClick={() => { setBookOpen(false); router.push("/"); }} 
              />

              {/* Perspective wrapper */}
              <div className="relative w-full max-w-5xl" style={{ perspective: "1800px" }}>

                {/* Book shell — NO BORDER here to prevent the "pop" during close */}
                <div
                  className="relative w-full h-[min(650px,90vh)] flex shadow-[0_0_100px_rgba(0,0,0,1)]"
                  style={{ transformStyle: "preserve-3d" }}
                >

                  {/* ── LEFT PAGE ── */}
                  <motion.div
                    className="w-[50%] bg-[#f2e3c9] relative p-10 flex flex-col rounded-l-sm"
                    style={{
                      backgroundImage: "url('https://www.transparenttextures.com/patterns/aged-paper.png')",
                      transformOrigin: "right center",
                      transformStyle: "preserve-3d",
                      boxShadow: "inset -20px 0 30px rgba(0,0,0,0.1)",
                    }}
                    initial={{ rotateY: 90 }} // Starts "past" the screen
                    animate={{ rotateY: 0 }}
                    exit={{ 
                      rotateY: 90, // Closes TOWARDS the viewer
                      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } 
                    }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="absolute inset-6 border border-[#8b6230]/10 pointer-events-none" />
                    <h3 className="font-serif text-[#3b1f06] text-[10px] tracking-[.4em] uppercase border-b border-[#8b6230]/20 pb-4 mb-8">
                      Table of Contents
                    </h3>
                    <nav className="flex flex-col gap-4">
                      {navLinks.map((item) => (
                        <Link key={item.name} href={item.path} className="font-serif text-sm tracking-widest text-[#5c3810] hover:text-black">
                          {item.name}
                        </Link>
                      ))}
                    </nav>
                  </motion.div>

                  {/* ── SPINE (The hinge) ── */}
                  <div className="w-1 bg-[#1a0c00] relative z-10 flex-shrink-0" />

                  {/* ── RIGHT PAGE ── */}
                  <motion.div
                    className="flex-1 bg-[#f2e3c9] relative p-12 overflow-y-auto rounded-r-sm"
                    style={{
                      backgroundImage: "url('https://www.transparenttextures.com/patterns/aged-paper.png')",
                      transformOrigin: "left center",
                      transformStyle: "preserve-3d",
                      boxShadow: "inset 20px 0 30px rgba(0,0,0,0.1)",
                    }}
                    initial={{ rotateY: -90 }} // Starts "past" the screen
                    animate={{ rotateY: 0 }}
                    exit={{ 
                      rotateY: -90, // Closes TOWARDS the viewer
                      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } 
                    }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button
                      onClick={() => { setBookOpen(false); router.push("/"); }}
                      className="absolute top-4 right-6 text-2xl text-[#8b6230]/40 hover:text-black z-30"
                    >✕</button>

                    <motion.div
                      className="relative z-10 h-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.1 } }} // Content disappears instantly when closing
                    >
                      {pathname === "/" ? (
                        <div className="h-full flex flex-col items-center justify-center">
                          <span className="text-6xl font-serif text-[#8b6230]/10 mb-4">AMR</span>
                          <p className="italic font-serif text-[#5c3810]/60">Select a chapter.</p>
                        </div>
                      ) : (
                        <div key={pathname}>{children}</div>
                      )}
                    </motion.div>
                  </motion.div>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>


        {/* ── FORWARD RIGHT LANTERN (brought in front of tapestry without touching tapestry z-index or navigation) ── */}
        {/* The original right sconce stays in the background layer (now only left remains there). This duplicate lantern + arm + plate sits at z-[250] with pointer-events-none so the tapestry nav remains fully clickable. */}
        <div
          className="absolute top-[22vh] md:top-[28vh] right-2 md:right-8 z-[250] pointer-events-none drop-shadow-[0_12px_22px_rgba(0,0,0,0.99)]"
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
          {/* Horizontal arm (right side) */}
          <div
            className="absolute top-12 md:top-16 w-12 md:w-18 h-8 md:h-10 border-b-2 border-[#c6a97a]/60 border-r-2 rounded-br-full right-3"
          />
          {/* Lantern (the glowing part that was previously hidden behind tapestry) */}
          <div
            className="absolute top-2 md:top-4 right-9 md:right-14 w-7 md:w-11 h-11 md:h-16 rounded-sm backdrop-blur-sm relative"
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

        {/* ── CAT ON CARPET (Floor Level) ── */}
<div className="absolute bottom-[2vh] left-[20%] z-[200]">
  {/* Small Ornate Carpet */}
  <div 
    className="relative w-40 h-16 bg-[#3d0f0f] rounded-[50%] opacity-90 shadow-2xl flex items-center justify-center overflow-hidden"
    style={{ 
      border: "2px solid #c6a97a33",
      background: "radial-gradient(ellipse, #4a0e0e, #2d0808)" 
    }}
  >
    {/* Carpet Pattern/Texture */}
    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(45deg, #c6a97a 0px, transparent 2px, transparent 10px)" }} />
    {/* Carpet Fringe */}
    <div className="absolute inset-x-0 top-0 h-1 flex justify-around">
      {[...Array(20)].map((_, i) => <div key={i} className="w-[1px] h-full bg-[#c6a97a66]" />)}
    </div>
    <div className="absolute inset-x-0 bottom-0 h-1 flex justify-around">
      {[...Array(20)].map((_, i) => <div key={i} className="w-[1px] h-full bg-[#c6a97a66]" />)}
    </div>
  </div>

  {/* Cat Silhouette */}
  {/* ── CAT ON CARPET (Floor Level) ── */}
<div className="absolute bottom-[2vh] left-[20%] z-[200]">
  {/* Small Ornate Carpet */}
  <div 
    className="relative w-40 h-16 bg-[#3d0f0f] rounded-[50%] opacity-90 shadow-2xl flex items-center justify-center overflow-hidden"
    style={{ 
      border: "2px solid #c6a97a33",
      background: "radial-gradient(ellipse, #4a0e0e, #2d0808)" 
    }}
  >
    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(45deg, #c6a97a 0px, transparent 2px, transparent 10px)" }} />
    <div className="absolute inset-x-0 top-0 h-1 flex justify-around">
      {[...Array(20)].map((_, i) => <div key={i} className="w-[1px] h-full bg-[#c6a97a66]" />)}
    </div>
    <div className="absolute inset-x-0 bottom-0 h-1 flex justify-around">
      {[...Array(20)].map((_, i) => <div key={i} className="w-[1px] h-full bg-[#c6a97a66]" />)}
    </div>
  </div>

  {/* Detailed Cat */}
  <motion.div
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full cursor-pointer"
    onClick={handleCatInteraction}
    animate={{ x: catPosition.x, y: catPosition.y, opacity: isSubPage ? 0.25 : 1 }}
    transition={{ duration: catState === "walking" ? 2 : 0.5, ease: "easeInOut" }}
    whileHover={{ scale: 1.05 }}
  >
    <motion.div
      className="w-20 md:w-24 h-10 md:h-12 flex items-end relative"
      animate={{
        scaleY: catState === "yawning" ? [1, 0.9, 1.1, 1] : catState === "sleeping" ? [1, 1.02, 1] : 1,
        rotate: catState === "walking" ? [0, 2, -2, 0] : 0,
      }}
      transition={{ 
        scaleY: { duration: 3, repeat: catState === "sleeping" ? Infinity : 0 },
        rotate: { duration: 0.4, repeat: catState === "walking" ? Infinity : 0 } 
      }}
    >
      {/* Body — layered radial gradients for fur depth */}
      <div 
        className="w-14 md:w-18 h-8 md:h-10 rounded-full relative shadow-lg"
        style={{ 
          background: "radial-gradient(ellipse at 40% 30%, #2a2520 0%, #0f0c09 55%, #050302 100%)",
          boxShadow: "inset 0 2px 6px rgba(255,255,255,0.06), inset 0 -2px 4px rgba(0,0,0,0.8)"
        }}
      >
        {/* Subtle fur highlight streak along spine */}
        <div className="absolute top-1 left-3 right-4 h-[2px] rounded-full opacity-10"
          style={{ background: "linear-gradient(to right, transparent, #a08060, transparent)" }} />
        {/* Chest/belly lighter fur patch */}
        <div className="absolute bottom-0 right-1 w-5 h-5 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #4a3d30, transparent)" }} />
      </div>

      {/* Detailed Head */}
      <motion.div
        className="absolute left-10 md:left-12 bottom-2 w-8 md:w-10 h-8 md:h-10 rounded-full"
        style={{
          background: "radial-gradient(ellipse at 45% 35%, #2a2520 0%, #0f0c09 60%, #050302 100%)",
          boxShadow: "inset 0 2px 5px rgba(255,255,255,0.06), inset 0 -2px 3px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.7)"
        }}
        animate={{ 
          y: catState === "yawning" ? [-2, -5, -2] : 0,
          scale: catState === "yawning" ? [1, 1.1, 1] : 1 
        }}
      >
        {/* Outer ears */}
        <div className="absolute -top-2 left-0.5 w-3 h-4 bg-[#0a0805]" 
          style={{ 
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            background: "linear-gradient(to bottom, #181310, #0a0805)"
          }} 
        />
        <div className="absolute -top-2 right-0.5 w-3 h-4 bg-[#0a0805]" 
          style={{ 
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            background: "linear-gradient(to bottom, #181310, #0a0805)"
          }} 
        />
        {/* Inner ear pink */}
        <div className="absolute -top-1 left-1 w-1.5 h-2.5 opacity-60"
          style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)", background: "#7a3535" }} />
        <div className="absolute -top-1 right-1 w-1.5 h-2.5 opacity-60"
          style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)", background: "#7a3535" }} />

      {/* Eyes — closed when sleeping, opening when yawning, open when awake */}
<div className="absolute top-3.5 left-1.5 w-2 h-1.5 rounded-full overflow-hidden">
  {catState === "sleeping" ? (
    /* Closed eye — just a curved line */
    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1.5px] rounded-full opacity-70"
      style={{ background: "#2a2018" }} />
  ) : catState === "yawning" ? (
    /* Half-opening eye during yawn */
    <motion.div
      className="w-full rounded-full overflow-hidden"
      initial={{ height: "1.5px" }}
      animate={{ height: "100%" }}
      transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      style={{ background: darkMode ? "#c1ff3d" : "#4a7a2a", boxShadow: darkMode ? "0 0 6px #c1ff3d" : "none" }}
    >
      <div className="absolute inset-x-0 top-0 h-full flex justify-center">
        <div className="w-[3px] h-full rounded-full" style={{ background: "#080604" }} />
      </div>
      <div className="absolute top-0 left-0.5 w-[2px] h-[2px] rounded-full bg-white opacity-70" />
    </motion.div>
  ) : (
    /* Fully open eye */
    <div className="w-full h-full rounded-full overflow-hidden"
      style={{ background: darkMode ? "#c1ff3d" : "#4a7a2a", boxShadow: darkMode ? "0 0 6px #c1ff3d" : "none" }}>
      <div className="absolute inset-x-0 top-0 h-full flex justify-center">
        <div className="w-[3px] h-full rounded-full" style={{ background: "#080604" }} />
      </div>
      <div className="absolute top-0 left-0.5 w-[2px] h-[2px] rounded-full bg-white opacity-70" />
    </div>
  )}
</div>

<div className="absolute top-3.5 right-1.5 w-2 h-1.5 rounded-full overflow-hidden">
  {catState === "sleeping" ? (
    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1.5px] rounded-full opacity-70"
      style={{ background: "#2a2018" }} />
  ) : catState === "yawning" ? (
    <motion.div
      className="w-full rounded-full overflow-hidden"
      initial={{ height: "1.5px" }}
      animate={{ height: "100%" }}
      transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
      style={{ background: darkMode ? "#c1ff3d" : "#4a7a2a", boxShadow: darkMode ? "0 0 6px #c1ff3d" : "none" }}
    >
      <div className="absolute inset-x-0 top-0 h-full flex justify-center">
        <div className="w-[3px] h-full rounded-full" style={{ background: "#080604" }} />
      </div>
      <div className="absolute top-0 left-0.5 w-[2px] h-[2px] rounded-full bg-white opacity-70" />
    </motion.div>
  ) : (
    <div className="w-full h-full rounded-full overflow-hidden"
      style={{ background: darkMode ? "#c1ff3d" : "#4a7a2a", boxShadow: darkMode ? "0 0 6px #c1ff3d" : "none" }}>
      <div className="absolute inset-x-0 top-0 h-full flex justify-center">
        <div className="w-[3px] h-full rounded-full" style={{ background: "#080604" }} />
      </div>
      <div className="absolute top-0 left-0.5 w-[2px] h-[2px] rounded-full bg-white opacity-70" />
    </div>
  )}
</div>

        {/* Nose — small triangular */}
        <div className="absolute top-[22px] left-1/2 -translate-x-1/2 w-[5px] h-[4px] opacity-80"
          style={{ background: "#7a3535", clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)" }} />

        {/* Mouth lines */}
        <div className="absolute top-[26px] left-1/2 -translate-x-1/2 flex gap-[2px]">
          <div className="w-[4px] h-[1px] rounded-full bg-[#3a2a2a] opacity-60" style={{ transform: "rotate(20deg)" }} />
          <div className="w-[4px] h-[1px] rounded-full bg-[#3a2a2a] opacity-60" style={{ transform: "rotate(-20deg)" }} />
        </div>

        {/* Whiskers — 3 per side, tapered */}
        {/* Left whiskers */}
        <div className="absolute top-[20px] left-[-14px] w-[14px] h-[1px] opacity-60"
          style={{ background: "linear-gradient(to left, transparent, #c8bfb0)", transform: "rotate(-8deg)", transformOrigin: "right" }} />
        <div className="absolute top-[22px] left-[-16px] w-[16px] h-[1px] opacity-50"
          style={{ background: "linear-gradient(to left, transparent, #c8bfb0)", transform: "rotate(0deg)", transformOrigin: "right" }} />
        <div className="absolute top-[24px] left-[-14px] w-[14px] h-[1px] opacity-60"
          style={{ background: "linear-gradient(to left, transparent, #c8bfb0)", transform: "rotate(8deg)", transformOrigin: "right" }} />
        {/* Right whiskers */}
        <div className="absolute top-[20px] right-[-14px] w-[14px] h-[1px] opacity-60"
          style={{ background: "linear-gradient(to right, transparent, #c8bfb0)", transform: "rotate(8deg)", transformOrigin: "left" }} />
        <div className="absolute top-[22px] right-[-16px] w-[16px] h-[1px] opacity-50"
          style={{ background: "linear-gradient(to right, transparent, #c8bfb0)", transform: "rotate(0deg)", transformOrigin: "left" }} />
        <div className="absolute top-[24px] right-[-14px] w-[14px] h-[1px] opacity-60"
          style={{ background: "linear-gradient(to right, transparent, #c8bfb0)", transform: "rotate(-8deg)", transformOrigin: "left" }} />
      </motion.div>

      {/* Front paws — two small rounded bumps */}
      <div className="absolute bottom-[-4px] right-2 flex gap-1">
        <div className="w-3 h-2 rounded-full" style={{ background: "#0f0c09", boxShadow: "inset 0 -1px 2px rgba(255,255,255,0.05)" }} />
        <div className="w-3 h-2 rounded-full" style={{ background: "#0f0c09", boxShadow: "inset 0 -1px 2px rgba(255,255,255,0.05)" }} />
      </div>

      {/* Tail — tapered, curved with tip */}
      <motion.div 
        className="absolute -left-6 top-1 origin-right"
        animate={{ rotate: [0, 15, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        <div style={{
          width: "28px", height: "10px",
          background: "linear-gradient(to left, #050302, #1a1510)",
          borderRadius: "50% 10% 10% 50%",
          boxShadow: "inset 0 1px 2px rgba(255,255,255,0.04)"
        }} />
        {/* Tail tip slightly lighter */}
        <div className="absolute left-0 top-[2px] w-2 h-2 rounded-full opacity-30"
          style={{ background: "#3a3028" }} />
      </motion.div>

      {/* Z's and Yawning */}
      {catState === "sleeping" && (
        <div className="absolute -top-8 left-8">
          <motion.span animate={{ opacity: [0, 1, 0], y: [0, -10], x: [0, 5] }} transition={{ duration: 2, repeat: Infinity }} className="absolute text-[#c6a97a] text-[10px] font-serif">z</motion.span>
          <motion.span animate={{ opacity: [0, 1, 0], y: [0, -15], x: [0, -3] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }} className="absolute text-[#c6a97a] text-[12px] left-3 font-serif">Z</motion.span>
        </div>
      )}
      
      {catState === "yawning" && (
        <motion.div 
          initial={{ scale: 0, opacity: 0 }} 
          animate={{ scale: [0, 1, 0], opacity: [0, 1, 0], y: [0, -10] }} 
          transition={{ duration: 1.5 }} 
          className="absolute left-14 -top-2 text-[#c6a97a] text-lg"
        >
          ○
        </motion.div>
      )}
    </motion.div>
  </motion.div>
</div>
</div>

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
 
     {/* ── PAGE CONTENT (Background Layer) ── */}
<div className="relative z-50 w-full h-full overflow-y-auto pointer-events-none">
  <div className="w-full h-full pointer-events-auto">
    {/* If pathname is "/" (Home), we show nothing in the background.
        If we are on a subpage (Gallery/About), we only show children 
        if the book is CLOSED. This stops the text from appearing behind the book.
    */}
    {pathname !== "/" && !bookOpen ? children : null}
  </div>
</div>
      </div>
    </ThemeContext.Provider>
  );
}