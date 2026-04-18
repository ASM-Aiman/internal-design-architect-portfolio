"use client";

import { useState, createContext, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const ThemeContext = createContext({ darkMode: true, openness: 50 });

export default function RoomLayout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(true);
  const [openness, setOpenness] = useState(50);
  const [catState, setCatState] = useState<"sleeping" | "waking" | "yawning" | "walking" | "settling" | "eating">("sleeping");
  const [catPosition, setCatPosition] = useState({ x: 0, y: 0 });
  const pathname = usePathname();
  const router = useRouter();
  const [isSubPage, setIsSubPage] = useState(false);
  useEffect(() => {
    setIsSubPage(pathname !== "/");
  }, [pathname]);
  const [bookOpen, setBookOpen] = useState(false);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  const handleCloseBook = () => {
    setBookOpen(false);
    if (pathname !== "/") {
      router.push("/");
    }
  };
  const [catHunger, setCatHunger] = useState(45);
  const [currentFood, setCurrentFood] = useState<string | null>(null);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const sparkleParticles = useMemo(() => 
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: (i * 17 + 10) % 100,
      duration: 2 + (i * 0.3),
    })), []
  );

  const emberParticles = useMemo(() => [
    { id: 0, x: -15, delay: 0.3, dur: 2.0 },
    { id: 1, x: 10, delay: 0.8, dur: 1.8 },
    { id: 2, x: -5, delay: 1.2, dur: 2.2 },
    { id: 3, x: 20, delay: 0.5, dur: 1.6 },
  ], []);

  const rayOpacity = openness / 100;
  const curtainWidth = `${50 - openness * 0.4}%`;
  const curtainFringeCount = useMemo(() => {
    const num = Math.floor((50 - openness * 0.4) / 8);
    return Math.max(2, Math.min(num, 15));
  }, [openness]);

  // Cat hunger system - pre-existing, kept for future use
  useEffect(() => {
    const timer = setInterval(() => {
      setCatHunger((prev: number) => Math.min(100, prev + 8));
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
  { name: "About me", path: "/about" },
  { name: "Galleria", path: "/gallery" },
  { name: "Contact", path: "/contact" },
  { name: "Resume", path: "/assets/cv.pdf" }, // Point directly to the file
  { name: "Close Book", path: "/" },
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
          darkMode ? "bg-[#0e0a06]" : "bg-[#2a1a0e]"
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

                {/* Stars (night only) - simplified on mobile */}
                {darkMode &&
                  [
                    { top: "15%", left: "20%" },
                    { top: "8%", left: "60%" },
                    { top: "25%", left: "75%" },
                    { top: "12%", left: "40%" },
                    { top: "30%", left: "30%" },
                  ].slice(0, isMobile ? 3 : 5).map((s, j) => (
                    <motion.div
                      key={j}
                      className="absolute w-[2px] h-[2px] bg-white rounded-full"
                      style={{ top: s.top, left: s.left }}
                      animate={isMobile ? {} : { opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }}
                      transition={isMobile ? { duration: 3, repeat: Infinity } : { duration: 2 + j * 0.7, repeat: Infinity, delay: j * 0.4 }}
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
                      {[...Array(curtainFringeCount)].map((_, k) => (
                        <div
                          key={k}
                          className="w-[3px] md:w-[4px] h-5 md:h-8 rounded-full curtain-fringe"
                          style={{
                            background: "linear-gradient(to bottom, #c6a97a, #5c4a32, #2a1f10)",
                            animationDelay: `${k * 0.08}s`,
                            animationDuration: `${2 + k * 0.1}s`,
                          }}
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
                      {[...Array(curtainFringeCount)].map((_, k) => (
                        <div
                          key={k}
                          className="w-[3px] md:w-[4px] h-5 md:h-8 rounded-full curtain-fringe"
                          style={{
                            background: "linear-gradient(to bottom, #c6a97a, #5c4a32, #2a1f10)",
                            animationDelay: `${k * 0.08}s`,
                            animationDuration: `${2 + k * 0.1}s`,
                          }}
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
                { left: "4%", right: undefined as string | undefined, armW: "w-20 md:w-30", curve: "border-b border-l rounded-bl-[70px] md:rounded-bl-[100px]", side: "left-0", candleL: "-left-2" },
                { left: "26%", right: undefined as string | undefined, armW: "w-12 md:w-18", curve: "border-b border-l rounded-bl-[45px] md:rounded-bl-[65px]", side: "left-0", candleL: "-left-2" },
                { left: "50%", right: undefined as string | undefined, armW: "w-0", curve: "", side: "", candleL: "-left-1" },
                { left: undefined as string | undefined, right: "26%", armW: "w-12 md:w-18", curve: "border-b border-r rounded-br-[45px] md:rounded-br-[65px]", side: "right-0", candleL: "-right-2" },
                { left: undefined as string | undefined, right: "4%", armW: "w-20 md:w-30", curve: "border-b border-r rounded-br-[70px] md:rounded-br-[100px]", side: "right-0", candleL: "-right-2" },
              ].map((arm, i) => (
                <div
                  key={i}
                  className={`absolute bottom-0 h-10 md:h-16 border-[#c6a97a]/55 ${arm.armW} ${arm.curve}`}
                  style={{ left: arm.right ? "auto" : arm.left, right: arm.right || "auto" }}
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
                    {/* Flame - simplified on mobile */}
                    {darkMode && (
                      <motion.div
                        className="absolute top-0 left-1/2 -translate-x-1/2"
                        animate={isMobile ? {} : { scaleY: [1, 1.18, 0.88, 1.12, 1], scaleX: [1, 0.9, 1.1, 0.95, 1] }}
                        transition={isMobile ? {} : { duration: 0.45 + i * 0.07, repeat: Infinity }}
                      >
                        {/* Outer flame */}
                        <div
                          className="w-3 md:w-4 h-4 md:h-5 rounded-t-full rounded-bl-full"
                          style={{
                            background: "radial-gradient(ellipse at 40% 80%, #fbbf24, #f97316, #ef4444)",
                            boxShadow: isMobile ? "0 0 8px 4px rgba(251,191,36,0.6)" : "0 0 20px 8px rgba(251,191,36,0.85), 0 0 50px 18px rgba(249,115,22,0.45)",
                            transformOrigin: "center bottom",
                          }}
                        />
                        {/* Inner blue core - hidden on mobile */}
                        {!isMobile && (
                          <div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[4px] md:w-[6px] h-2 md:h-3 rounded-t-full"
                            style={{ background: "linear-gradient(to top, #93c5fd, #fff)" }}
                          />
                        )}
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
              {/* Lower crystal drops - simplified on mobile */}
              {[0, 72, 144, 216, 288].slice(0, isMobile ? 3 : 5).map((angle, i) => (
                <motion.div
                  key={`crystal-${i}`}
                  className="absolute"
                  style={{
                    top: "55%",
                    left: "50%",
                    transform: `rotate(${angle}deg) translateX(40px)`,
                  }}
                  animate={isMobile ? {} : { rotate: [`${angle}deg`, `${angle + 5}deg`, `${angle}deg`] }}
                  transition={isMobile ? {} : { duration: 3 + i * 0.4, repeat: Infinity }}
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


          {/* ── WALL SCONCES (original - right one will be duplicated forward below) ── */}
          <div className={`absolute inset-0 pointer-events-none z-50 transition-all duration-700 ${isSubPage ? "opacity-15 blur-sm" : "opacity-100"}`}>
            {[
              { posClass: "left-2 md:left-8", armDir: "left" },
            ].map((sconce, i) => (
              <div
                key={i}
                className={`absolute top-[22vh] md:top-[28vh] ${sconce.posClass} flex flex-col items-center drop-shadow-[0_12px_22px_rgba(0,0,0,0.99)]`}
                style={{ transform: "scale(0.6)", transformOrigin: "top center" }}
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
                  {/* Candle - simplified on mobile */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3 md:w-4 h-5 md:h-7">
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 md:w-3 h-4 md:h-6"
                      style={{ background: "linear-gradient(90deg, rgba(231,216,180,0.5), rgba(198,169,122,0.3))" }}
                    />
                    {darkMode && (
                      <motion.div
                        className="absolute top-0 left-1/2 -translate-x-1/2"
                        animate={isMobile ? {} : { opacity: [0.85, 1, 0.9, 0.95, 0.88, 1], scaleY: [1, 1.08, 0.95, 1.05, 0.98, 1] }}
                        transition={isMobile ? {} : { duration: 3, repeat: Infinity }}
                      >
                        <div
                          className="w-2 md:w-3 h-3 md:h-4 rounded-t-full"
                          style={{
                            background: "radial-gradient(ellipse at 40% 70%, #fbbf24, #f97316)",
                            boxShadow: isMobile ? "0 0 10px 5px rgba(251,191,36,0.6)" : "0 0 24px 10px rgba(251,191,36,0.85), 0 0 50px 18px rgba(249,115,22,0.45)",
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
          {/* ── WOODEN FLOOR (3D Perspective - Full Coverage) ── */}
<div
  className="absolute bottom-0 left-0 right-0 z-[5] pointer-events-none overflow-hidden"
  style={{ 
    height: "40vh", // Total area reserved for the floor
    perspective: "1000px", 
    perspectiveOrigin: "50% 0%",
  }}
>
  <div 
    className="absolute bottom-0 left-1/2 -translate-x-1/2" 
    style={{
      // Width is much larger than 100% to cover gaps created by perspective narrowing
      width: "150%", 
      height: "120%", // Extra height to ensure it tucks under the wall shadow
      background: "linear-gradient(180deg, #3d2208 0%, #2e1a06 60%, #1e1004 100%)",
      transform: "rotateX(60deg)", 
      transformOrigin: "bottom center",
    }}
  >
    {/* Wood plank grain lines */}
    <div className="absolute inset-0" style={{
      backgroundImage: `
        repeating-linear-gradient(
          180deg,
          transparent 0px,
          transparent 38px,
          rgba(0,0,0,0.3) 38px,
          rgba(0,0,0,0.3) 40px
        ),
        repeating-linear-gradient(
          90deg,
          rgba(255,180,80,0.02) 0px,
          transparent 2px,
          transparent 120px,
          rgba(0,0,0,0.1) 120px,
          rgba(0,0,0,0.1) 122px
        )
      `,
    }} />

    {/* Light reflection/Ambient occlusion */}
    <div className="absolute inset-0" style={{
      background: "radial-gradient(ellipse 50% 80% at 50% 0%, rgba(255,180,100,0.08) 0%, transparent 80%)",
    }} />
  </div>

  {/* Junction shadow (The 'Kickplate' area where floor meets wall) */}
  <div className="absolute top-[8vh] left-0 right-0 h-[6px] z-10" style={{
    background: "rgba(0,0,0,0.85)",
    boxShadow: "0 15px 35px 15px rgba(0,0,0,0.95)",
  }} />
</div>

          {/* ── AMBIENT ROOM LIGHT (brighter) ── */}
          <div className="absolute inset-0 z-[4] pointer-events-none" style={{
            background: darkMode
              ? "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(200,140,50,0.13) 0%, transparent 65%)"
              : "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(255,200,100,0.22) 0%, transparent 70%)",
            transition: "background 1s",
          }} />

        {/* ─── END BACKGROUND LAYER ─── */}

      {/* ── LARGE WALNUT WRITING TABLE (Center, elevated viewer angle) ── */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[200]"
        style={{ width: "clamp(320px, 62vw, 680px)" }}>

        {/* ── TABLE SURFACE (top-down perspective illusion) ── */}
        <div className="relative" style={{ height: "clamp(90px, 14vh, 150px)" }}>

          {/* Table top surface — warm walnut, slight perspective skew */}
          <div className="absolute inset-x-0 bottom-0" style={{
            height: "100%",
            background: `
              repeating-linear-gradient(88deg, transparent 0px, transparent 22px, rgba(0,0,0,0.06) 22px, rgba(0,0,0,0.06) 23px),
              linear-gradient(175deg, #7a4820 0%, #5c3214 35%, #3e2009 70%, #2a1508 100%)
            `,
            borderRadius: "6px 6px 0 0",
            boxShadow: "0 -6px 30px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,200,100,0.12), inset 0 -1px 0 rgba(0,0,0,0.4)",
            transform: "perspective(400px) rotateX(8deg)",
            transformOrigin: "bottom center",
          }}>
            {/* Subtle sheen stripe */}
            <div className="absolute inset-0 rounded-t pointer-events-none" style={{
              background: "linear-gradient(160deg, rgba(255,210,130,0.06) 0%, transparent 40%)",
            }} />

            {/* ── PAPER WEIGHT — brass dome, top-left area ── */}
            <div className="absolute" style={{ top: "14%", left: "8%" }}>
              <div style={{
                width: "clamp(22px,3.5vw,38px)", height: "clamp(14px,2.2vw,24px)",
                background: "radial-gradient(ellipse 60% 50% at 40% 35%, #e8c96a, #b8952a, #7a5f10)",
                borderRadius: "50%",
                boxShadow: "0 3px 10px rgba(0,0,0,0.55), inset 0 1px 3px rgba(255,240,160,0.4)",
              }} />
              {/* Shadow under it */}
              <div style={{
                width: "clamp(24px,3.8vw,42px)", height: "5px", marginTop: "1px",
                background: "radial-gradient(ellipse, rgba(0,0,0,0.45) 0%, transparent 70%)",
                filter: "blur(2px)",
              }} />
            </div>

            {/* ── ROLLED ARCHITECTURAL DRAWING — far left ── */}
            <div className="absolute" style={{ top: "10%", left: "2%", transform: "rotate(-6deg)" }}>
              <div style={{
                width: "clamp(32px,5vw,58px)", height: "clamp(10px,1.6vw,18px)",
                background: "linear-gradient(180deg, #f0e8d0 0%, #d4c8a8 50%, #b8ab88 100%)",
                borderRadius: "9px",
                boxShadow: "2px 3px 8px rgba(0,0,0,0.5), inset 0 1px rgba(255,255,255,0.3)",
                border: "0.5px solid rgba(180,150,80,0.4)",
              }} />
              {/* End caps */}
              <div style={{
                position:"absolute", left:"-3px", top:0, bottom:0, width:"6px",
                background:"linear-gradient(90deg,#c6a97a,#8b6b30)",
                borderRadius:"50%",
              }} />
              <div style={{
                position:"absolute", right:"-3px", top:0, bottom:0, width:"6px",
                background:"linear-gradient(90deg,#8b6b30,#c6a97a)",
                borderRadius:"50%",
              }} />
            </div>

            {/* ── FLAT PAPERS / SKETCHES — center left ── */}
            {/* Back sheet */}
            <div className="absolute" style={{ top: "8%", left: "18%", transform: "rotate(3deg)" }}>
              <div style={{
                width: "clamp(44px,7vw,80px)", height: "clamp(32px,5vw,58px)",
                background: "linear-gradient(160deg, #f5f0e4 0%, #e8e0cc 100%)",
                borderRadius: "1px",
                boxShadow: "2px 4px 12px rgba(0,0,0,0.5)",
                border: "0.5px solid rgba(180,160,100,0.3)",
              }}>
                {/* Sketch lines */}
                {[20,35,50,65].map(y=>(
                  <div key={y} style={{ position:"absolute", top:`${y}%`, left:"10%", right:"10%", height:"1px", background:"rgba(80,50,20,0.2)" }} />
                ))}
                <div style={{ position:"absolute", top:"15%", left:"12%", width:"36%", height:"30%", border:"0.5px solid rgba(80,50,20,0.25)", borderRadius:"1px" }} />
              </div>
            </div>
            {/* Front sheet — slightly overlapping */}
            <div className="absolute" style={{ top: "18%", left: "22%", transform: "rotate(-2deg)" }}>
              <div style={{
                width: "clamp(38px,6vw,68px)", height: "clamp(28px,4.5vw,52px)",
                background: "linear-gradient(160deg, #faf6ec 0%, #ede5cf 100%)",
                borderRadius: "1px",
                boxShadow: "1px 3px 8px rgba(0,0,0,0.45)",
                border: "0.5px solid rgba(180,160,100,0.25)",
              }}>
                {[25,45,65].map(y=>(
                  <div key={y} style={{ position:"absolute", top:`${y}%`, left:"10%", right:"10%", height:"1px", background:"rgba(60,30,10,0.18)" }} />
                ))}
              </div>
            </div>

            {/* ── PENCIL — diagonal, resting on papers ── */}
            <div className="absolute" style={{ top: "28%", left: "14%", transform: "rotate(-18deg)", transformOrigin:"left center" }}>
              <div style={{ display:"flex", alignItems:"center" }}>
                {/* Eraser */}
                <div style={{ width:"clamp(5px,0.8vw,9px)", height:"clamp(5px,0.8vw,9px)", background:"#d4847a", borderRadius:"1px", border:"0.5px solid #a05850" }} />
                {/* Ferrule */}
                <div style={{ width:"clamp(4px,0.6vw,7px)", height:"clamp(5px,0.8vw,9px)", background:"linear-gradient(90deg,#a8a090,#c8c0a8)", border:"0.5px solid #888" }} />
                {/* Body */}
                <div style={{ width:"clamp(38px,5.5vw,64px)", height:"clamp(5px,0.8vw,9px)", background:"linear-gradient(180deg,#e8c840,#c8a820,#a88010)", borderRadius:"0 1px 1px 0" }} />
                {/* Tip */}
                <div style={{ width:0, height:0, borderTop:`clamp(2px,0.4vw,5px) solid transparent`, borderBottom:`clamp(2px,0.4vw,5px) solid transparent`, borderLeft:`clamp(6px,1vw,12px) solid #d4956a` }} />
                <div style={{ width:0, height:0, borderTop:`clamp(1px,0.25vw,3px) solid transparent`, borderBottom:`clamp(1px,0.25vw,3px) solid transparent`, borderLeft:`clamp(4px,0.6vw,8px) solid #2a1508` }} />
              </div>
            </div>

            {/* ── SMALL OPEN NOTEBOOK — right of center ── */}
            <div className="absolute" style={{ top: "6%", right: "22%", transform: "rotate(2deg)" }}>
              {/* Left page */}
              <div style={{
                position:"absolute", right:"clamp(20px,3.2vw,38px)", top:0,
                width:"clamp(28px,4.5vw,52px)", height:"clamp(36px,5.8vw,66px)",
                background:"linear-gradient(170deg,#f0ead8,#e0d8c0)",
                borderRadius:"1px 0 0 1px",
                boxShadow:"-2px 3px 10px rgba(0,0,0,0.4)",
                border:"0.5px solid rgba(160,130,80,0.3)",
                borderRight:"none",
              }}>
                {[18,32,46,60,74].map(y=>(
                  <div key={y} style={{ position:"absolute", top:`${y}%`, left:"12%", right:"8%", height:"1px", background:"rgba(100,160,200,0.3)" }} />
                ))}
              </div>
              {/* Spine */}
              <div style={{
                position:"absolute", right:"clamp(17px,2.8vw,35px)", top:0, width:"clamp(5px,0.8vw,9px)", height:"clamp(36px,5.8vw,66px)",
                background:"linear-gradient(90deg,#1a0e04,#3a2010,#1a0e04)",
                boxShadow:"0 2px 6px rgba(0,0,0,0.6)",
              }} />
              {/* Right page */}
              <div style={{
                position:"absolute", right:0, top:0,
                width:"clamp(28px,4.5vw,52px)", height:"clamp(36px,5.8vw,66px)",
                background:"linear-gradient(170deg,#faf5e8,#ede5d0)",
                borderRadius:"0 1px 1px 0",
                boxShadow:"2px 3px 10px rgba(0,0,0,0.4)",
                border:"0.5px solid rgba(160,130,80,0.3)",
                borderLeft:"none",
              }}>
                {[18,32,46,60,74].map(y=>(
                  <div key={y} style={{ position:"absolute", top:`${y}%`, left:"8%", right:"12%", height:"1px", background:"rgba(100,160,200,0.3)" }} />
                ))}
                {/* Small pencil mark */}
                <div style={{ position:"absolute", top:"22%", left:"14%", width:"40%", height:"8%", background:"rgba(60,30,10,0.12)", borderRadius:"1px" }} />
              </div>
            </div>

            {/* ── BRASS RULER — right side, diagonal ── */}
            <div className="absolute" style={{ top: "55%", right: "8%", transform: "rotate(8deg)", transformOrigin:"right center" }}>
              <div style={{
                width:"clamp(50px,8vw,90px)", height:"clamp(6px,1vw,12px)",
                background:"linear-gradient(180deg, #d4a830 0%, #b88820 40%, #8a6010 100%)",
                borderRadius:"1px",
                boxShadow:"1px 2px 6px rgba(0,0,0,0.5), inset 0 1px rgba(255,240,160,0.3)",
                border:"0.5px solid rgba(180,130,40,0.5)",
              }}>
                {/* Tick marks */}
                {[10,20,30,40,50,60,70,80,90].map(x=>(
                  <div key={x} style={{ position:"absolute", left:`${x}%`, top:0, width:"1px", height: x%30===0?"60%":"35%", background:"rgba(60,30,0,0.5)" }} />
                ))}
              </div>
            </div>

            {/* ── SMALL GLASS INK BOTTLE — far right ── */}
            <div className="absolute" style={{ top: "8%", right: "5%" }}>
              {/* Cap */}
              <div style={{ width:"clamp(10px,1.6vw,18px)", height:"clamp(5px,0.8vw,9px)", background:"linear-gradient(180deg,#1a1208,#0a0804)", borderRadius:"2px 2px 0 0", margin:"0 auto", border:"0.5px solid rgba(198,169,122,0.3)" }} />
              {/* Body */}
              <div style={{
                width:"clamp(14px,2.2vw,24px)", height:"clamp(18px,3vw,32px)",
                background: darkMode
                  ? "linear-gradient(160deg,rgba(20,10,40,0.9),rgba(10,5,20,0.95))"
                  : "linear-gradient(160deg,rgba(30,15,50,0.7),rgba(15,8,30,0.8))",
                borderRadius:"2px 2px 3px 3px",
                border:"0.5px solid rgba(140,100,180,0.35)",
                boxShadow:"1px 3px 8px rgba(0,0,0,0.6), inset 1px 1px rgba(180,140,220,0.15)",
              }}>
                {/* Ink level */}
                <div style={{ position:"absolute", bottom:"15%", left:"15%", right:"15%", top:"45%", background:"rgba(60,20,90,0.6)", borderRadius:"1px" }} />
                {/* Glass highlight */}
                <div style={{ position:"absolute", top:"8%", left:"15%", width:"25%", height:"35%", background:"rgba(255,255,255,0.1)", borderRadius:"1px" }} />
              </div>
              {/* Shadow */}
              <div style={{ width:"clamp(16px,2.6vw,28px)", height:"4px", background:"radial-gradient(ellipse,rgba(0,0,0,0.5) 0%,transparent 70%)", filter:"blur(2px)" }} />
            </div>

            {/* ── THE BOOK (3D Perspective Folio with Directional Arrow) ── */}
              <div
                className="absolute left-1/2 -translate-x-1/2 z-[300] cursor-pointer"
                style={{ 
                  bottom: "22%", 
                  perspective: "1200px" 
                }}
                onClick={() => setBookOpen(true)}
              >
                {/* 1. LAYERED AMBIENT SHADOW */}
                <div 
                  className="absolute inset-0 bg-black/70 blur-xl rounded-sm"
                  style={{ 
                    transform: "rotateX(60deg) scaleY(0.4) translateY(35px)",
                    opacity: 0.8,
                  }}
                />

                {/* 2. THE 3D BOOK OBJECT */}
                <div
                  className="relative group"
                  style={{
                    width: "clamp(110px, 12vw, 150px)",
                    height: "clamp(80px, 9vw, 115px)",
                    transformStyle: "preserve-3d",
                    transform: "rotateX(58deg) rotateZ(-1deg)", 
                  }}
                >
                  {/* Bottom Cover */}
                  <div 
                    className="absolute inset-0 bg-[#2a120a] rounded-sm shadow-2xl"
                    style={{ transform: "translateZ(-10px)" }}
                  />

                  {/* Paper Stack */}
                  <div 
                    className="absolute inset-0 bg-[#e8d5b0] rounded-sm border-r border-b border-black/30"
                    style={{ 
                      transform: "translateZ(-5px)",
                      boxShadow: "inset 0 0 10px rgba(0,0,0,0.2)"
                    }}
                  >
                    <div className="absolute inset-0 opacity-30" 
                      style={{ 
                        backgroundImage: "linear-gradient(90deg, transparent 97%, rgba(0,0,0,0.5) 100%)", 
                        backgroundSize: "2px 100%" 
                      }} 
                    />
                  </div>

                  {/* Front Cover */}
                  <div
                    className="absolute inset-0 bg-[#3d1a10] rounded-sm flex flex-col items-center justify-center overflow-hidden"
                    style={{
                      border: "1px solid #5c2d1d",
                      background: "linear-gradient(to bottom, #4d2216 0%, #3d1a10 100%)",
                      boxShadow: "inset -2px 0 10px rgba(0,0,0,0.5)",
                      transform: "translateZ(0px)"
                    }}
                  >
                    <div className="absolute inset-1.5 border border-[#c6a97a]/20 rounded-sm pointer-events-none" />
                    <div className="relative z-10 flex flex-col items-center">
                      <span className="text-[#c6a97a] text-[8px] md:text-[10px] tracking-[0.4em] font-serif font-bold drop-shadow-md">
                        AMR&apos;S
                      </span>
                      <span className="text-[#c6a97a] text-[6px] md:text-[7px] tracking-[0.2em] font-serif opacity-60 uppercase mt-0.5">
                        Archive
                      </span>
                    </div>
                  </div>

                  {/* Sparkles */}
                  {sparkleParticles.map((p) => (
                    <motion.div
                      key={p.id}
                      animate={{ y: [0, -25], opacity: [0, 0.7, 0], scale: [0, 1.2, 0] }}
                      transition={{ duration: p.duration, repeat: Infinity, delay: p.id * 0.4 }}
                      className="absolute w-[1px] h-[1px] bg-white rounded-full shadow-[0_0_5px_#fff]"
                      style={{ left: `${p.x}%`, top: '40%', transform: "translateZ(8px)" }}
                    />
                  ))}
                </div>

                {/* 3. FLOATING INSTRUCTION + ARROW */}
                <motion.div 
                  className="absolute -top-20 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-white text-[7px] md:text-[8px] tracking-[0.3em] font-bold uppercase mb-2 drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] font-serif whitespace-nowrap">
                    Click to Open Book
                  </span>
                  
                  {/* Animated Hand-drawn Style Arrow */}
                  <svg 
                    width="24" 
                    height="32" 
                    viewBox="0 0 24 32" 
                    fill="none" 
                    className="drop-shadow-lg"
                  >
                    <motion.path 
                      d="M12 2V28M12 28L6 22M12 28L18 22" 
                      stroke="#c6a97a" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    {/* Hand-drawn swirl flourish */}
                    <path 
                      d="M4 8C4 8 8 4 12 4C16 4 20 8 20 8" 
                      stroke="#c6a97a" 
                      strokeWidth="0.5" 
                      strokeDasharray="2 2" 
                      opacity="0.5"
                    />
                  </svg>
                </motion.div>
              </div>

          </div>{/* end table surface */}

          {/* Table front edge / apron */}
          <div className="absolute bottom-0 inset-x-0 h-[10px]" style={{
            background: "linear-gradient(180deg, #2a1508 0%, #160c04 100%)",
            boxShadow: "0 6px 24px rgba(0,0,0,0.8)",
          }} />
        </div>{/* end relative surface wrapper */}

        {/* ── TABLE LEGS (four, visible in perspective) ── */}
        <div className="absolute bottom-[-clamp(50px,8vh,80px)] inset-x-0 flex justify-between px-[4%]"
          style={{ height:"clamp(50px,8vh,80px)" }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{
              width:"clamp(10px,1.4vw,16px)",
              height:"100%",
              background:"linear-gradient(90deg, #1e0e04 0%, #5a3318 40%, #3a2010 70%, #1a0c04 100%)",
              borderRadius:"2px",
              boxShadow:"2px 4px 12px rgba(0,0,0,0.6)",
              transform: i < 2 ? "skewX(-2deg)" : "skewX(2deg)",
            }} />
          ))}
        </div>

        {/* Table ground shadow */}
        <div className="absolute -bottom-2 left-[5%] right-[5%] h-[8px]" style={{
          background:"radial-gradient(ellipse, rgba(0,0,0,0.55) 0%, transparent 70%)",
          filter:"blur(4px)",
        }} />
      </div>

         {/* book open animation start */}
      <AnimatePresence>
  {bookOpen && (
    <motion.div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-3 md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { delay: 0.5 } }}
    >
      {/* ── Backdrop with dust-particle feel ── */}
      <div
        className={`absolute inset-0 bg-[#050302]/95 ${isMobile ? '' : 'backdrop-blur-xl'}`}
        onClick={handleCloseBook}
        style={{
          backgroundImage: isMobile ? undefined : `
            radial-gradient(ellipse 60% 40% at 50% 50%, rgba(90,50,10,0.18) 0%, transparent 70%),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")
          `,
        }}
      />

      {/* ── Ambient candle-glow ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "600px", height: "400px",
          background: "radial-gradient(ellipse, rgba(180,110,30,0.07) 0%, transparent 65%)",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* ── Perspective wrapper ── */}
      <div className="relative w-full max-w-5xl" style={{ perspective: "1800px" }}>

        {/* ── Book shell ── */}
        <div
          className="relative w-full flex"
          style={{
            height: "min(650px, 88vh)",
            transformStyle: "preserve-3d",
            filter: "drop-shadow(0 30px 80px rgba(0,0,0,0.95)) drop-shadow(0 0 40px rgba(100,60,10,0.25))",
          }}
        >

          {/* ════════════════════════════════
            LEFT PAGE (hidden on mobile → slides in via tab)
        ════════════════════════════════ */}
        <motion.div
          className="hidden md:flex w-[46%] relative flex-col rounded-l-sm overflow-hidden"
          style={{
            transformOrigin: "right center",
            transformStyle: "preserve-3d",
            background: "#e8d5b0",
            backgroundImage: `
              url('https://www.transparenttextures.com/patterns/aged-paper.png'),
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 27px,
                rgba(139,98,48,0.06) 27px,
                rgba(139,98,48,0.06) 28px
              )
            `,
            boxShadow: "inset -18px 0 35px rgba(0,0,0,0.15), inset 4px 0 8px rgba(0,0,0,0.05)",
          }}
          initial={{ rotateY: 90 }}
          animate={{ rotateY: 0 }}
          exit={{ rotateY: 90, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Worn edge — left side */}
            <div className="absolute left-0 top-0 bottom-0 w-3 pointer-events-none"
              style={{ background: "linear-gradient(to right, rgba(100,60,10,0.12), transparent)" }} />

            {/* Foxing / age spots */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12%" cy="18%" r="18" fill="#7a4a10" />
              <circle cx="80%" cy="8%"  r="9"  fill="#7a4a10" />
              <circle cx="70%" cy="88%" r="14" fill="#7a4a10" />
              <circle cx="22%" cy="75%" r="7"  fill="#7a4a10" />
              <circle cx="55%" cy="55%" r="5"  fill="#7a4a10" />
            </svg>

            {/* Coffee stain ring */}
            <svg className="absolute pointer-events-none opacity-[0.06]"
              style={{ bottom: "14%", right: "8%", width: "90px", height: "90px" }}
              viewBox="0 0 90 90">
              <circle cx="45" cy="45" r="38" stroke="#7a4a10" strokeWidth="6" fill="none" />
              <circle cx="45" cy="45" r="32" stroke="#7a4a10" strokeWidth="1.5" fill="none" />
            </svg>

            {/* Decorative inner border */}
            <div className="absolute inset-5 pointer-events-none"
              style={{ border: "1px solid rgba(139,98,48,0.18)", borderRadius: "1px" }} />
            <div className="absolute inset-[22px] pointer-events-none"
              style={{ border: "0.5px solid rgba(139,98,48,0.08)" }} />

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full p-10 pt-12">
              {/* Corner ornament */}
              <svg className="absolute top-8 left-8 opacity-20" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M2 2 L12 2 L2 12 Z" stroke="#3b1f06" strokeWidth="0.8" fill="none"/>
                <path d="M2 2 L2 8" stroke="#3b1f06" strokeWidth="0.8"/>
                <path d="M2 2 L8 2" stroke="#3b1f06" strokeWidth="0.8"/>
              </svg>

              <div className="text-[#8b6230] opacity-20 text-xl mb-5 text-center">✦</div>

              <h3 className="font-serif text-[#3b1f06] text-[9px] tracking-[.45em] uppercase pb-4 mb-2 text-center"
                style={{ borderBottom: "0.5px solid rgba(139,98,48,0.25)" }}>
                Table of Contents
              </h3>

              <div className="w-4 h-[1px] bg-[#8b6230]/30 mx-auto mb-8" />

             <nav className="flex flex-col gap-5">
            {navLinks.map((item, i) => {
              const isCloseAction = item.name === "Close Book";
              const isResume = item.name === "Resume";

              // Scenario A: The Resume (Opens your PDF in a new tab)
              if (isResume) {
                return (
                  <a
                    key={item.name}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-baseline gap-3 font-serif text-sm text-[#5c3810] hover:text-[#1a0800] transition-colors duration-300"
                  >
                    <span className="text-[9px] tracking-widest opacity-40 font-serif" style={{ minWidth: "18px" }}>
                      {["I", "II", "III", "IV", "V"][i]}
                    </span>
                    <span className="flex-1 tracking-wider">{item.name}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px]">↗</span>
                  </a>
                );
              }

              // Scenario B: Close Book (Runs your handleCloseBook function)
              if (isCloseAction) {
                return (
                  <button
                    key={item.name}
                    onClick={handleCloseBook}
                    className="group flex items-baseline gap-3 font-serif text-sm text-[#5c3810] hover:text-[#8b0000] transition-colors duration-300 text-left"
                  >
                    <span className="text-[9px] tracking-widest opacity-40 font-serif" style={{ minWidth: "18px" }}>
                      {["I", "II", "III", "IV", "V"][i]}
                    </span>
                    <span className="flex-1 tracking-wider uppercase font-bold">{item.name}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px]">✕</span>
                  </button>
                );
              }

              // Scenario C: Standard Links (Galleria, About, etc.)
              return (
                <Link 
                  key={item.name} 
                  href={item.path}
                  className="group flex items-baseline gap-3 font-serif text-sm text-[#5c3810] hover:text-[#1a0800] transition-colors duration-300"
                >
                  <span className="text-[9px] tracking-widest opacity-40 font-serif" style={{ minWidth: "18px" }}>
                    {["I", "II", "III", "IV", "V"][i]}
                  </span>
                  <span className="flex-1 tracking-wider">{item.name}</span>
                  <span className="opacity-0 group-hover:opacity-30 transition-opacity text-[8px] tracking-widest">
                    ···
                  </span>
                </Link>
              );
            })}
          </nav>

              {/* Page number */}
              <div className="mt-auto text-center">
                <div className="w-8 h-[0.5px] bg-[#8b6230]/25 mx-auto mb-3" />
                <span className="font-serif italic text-[9px] text-[#8b6230]/40 tracking-widest">i</span>
              </div>
            </div>
          </motion.div>

          {/* ════════════════════════════════
              SPINE
          ════════════════════════════════ */}
          <div
            className="hidden md:block relative z-10 flex-shrink-0"
            style={{
              width: "18px",
              background: "linear-gradient(to right, #0e0600, #2a1200, #0e0600)",
              boxShadow: "inset -1px 0 3px rgba(0,0,0,0.6), inset 1px 0 3px rgba(0,0,0,0.6)",
            }}
          >
            {/* Spine stitching */}
            {[15, 25, 38, 50, 62, 75, 85].map((pct) => (
              <div key={pct}
                className="absolute left-1/2 -translate-x-1/2 w-[1px] h-[6px] rounded-full"
                style={{ top: `${pct}%`, background: "rgba(180,110,40,0.35)" }} />
            ))}
            {/* Spine title — rotated */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="font-serif text-[6px] tracking-[0.5em] uppercase opacity-20 whitespace-nowrap"
                style={{ color: "#d4a96a", transform: "rotate(90deg)" }}>
                AMR ✦ MMXXIV
              </span>
            </div>
          </div>

          {/* ════════════════════════════════
              RIGHT PAGE
          ════════════════════════════════ */}
          <motion.div
            className="flex-1 relative overflow-hidden rounded-r-sm md:rounded-l-none rounded-l-sm"
            style={{
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
              background: "#ede0c4",
              backgroundImage: `
                url('https://www.transparenttextures.com/patterns/aged-paper.png'),
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 27px,
                  rgba(139,98,48,0.05) 27px,
                  rgba(139,98,48,0.05) 28px
                )
              `,
              boxShadow: "inset 18px 0 35px rgba(0,0,0,0.12), inset -4px 0 8px rgba(0,0,0,0.05)",
            }}
            initial={{ rotateY: -90 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: -90, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Worn edge — right side */}
            <div className="absolute right-0 top-0 bottom-0 w-4 pointer-events-none"
              style={{ background: "linear-gradient(to left, rgba(100,60,10,0.1), transparent)" }} />

            {/* Foxing spots — right page */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06]">
              <circle cx="90%" cy="20%" r="11" fill="#7a4a10" />
              <circle cx="8%"  cy="60%" r="16" fill="#7a4a10" />
              <circle cx="45%" cy="92%" r="8"  fill="#7a4a10" />
              <circle cx="75%" cy="70%" r="5"  fill="#7a4a10" />
            </svg>

            {/* Decorative inner border */}
            <div className="absolute inset-5 pointer-events-none"
              style={{ border: "1px solid rgba(139,98,48,0.15)", borderRadius: "1px" }} />

            {/* Page curl — bottom right */}
            <svg className="absolute bottom-0 right-0 pointer-events-none opacity-60"
              width="48" height="48" viewBox="0 0 48 48">
              <path d="M48 48 L24 48 Q36 36 48 24 Z"
                fill="rgba(180,140,80,0.15)" stroke="rgba(139,98,48,0.2)" strokeWidth="0.5" />
              <path d="M30 48 Q38 38 48 30"
                stroke="rgba(139,98,48,0.1)" strokeWidth="0.5" fill="none" />
            </svg>

           
   {/* ── Mobile TOC toggle (Illuminated Tab) ── */}
<button
  className="md:hidden absolute top-4 left-4 z-30 flex items-center gap-2 px-3 py-1.5 rounded-sm transition-all duration-500 group"
  onClick={() => setMobileTocOpen((v) => !v)}
  style={{
    background: "rgba(232, 213, 176, 0.4)", // Matches paper color but translucent
    border: "0.5px solid rgba(139, 98, 48, 0.2)",
    backdropFilter: "blur(4px)" // Corrected property name from backdropBlur
  }}
>
  {/* The Glowing Aura behind the text */}
  <motion.div
    animate={{ opacity: [0.1, 0.4, 0.1], scale: [1, 1.1, 1] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    className="absolute inset-0 bg-[#ffcc00] blur-md rounded-sm -z-10"
  />

  {/* Icon with subtle shake to grab attention */}
  <motion.div
    animate={{ x: [0, 2, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    className="text-[#3b1f06]"
  >
    <svg width="16" height="14" viewBox="0 0 14 12" fill="none">
      <line x1="0" y1="1.5" x2="14" y2="1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="0" y1="6"   x2="10" y2="6"   stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="0" y1="10.5" x2="14" y2="10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  </motion.div>

  <span className="font-serif italic text-[11px] tracking-[0.25em] text-[#3b1f06] font-bold uppercase">
    contents
  </span>
</button>

         {/* ── Mobile TOC overlay ── */}
<AnimatePresence>
  {mobileTocOpen && (
    <motion.div
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      className="md:hidden absolute inset-0 z-[100] flex flex-col p-10 pt-20"
      style={{
        background: "#e8d5b0",
        backgroundImage: "url('https://www.transparenttextures.com/patterns/aged-paper.png')",
        boxShadow: "inset -20px 0 40px rgba(0,0,0,0.1)"
      }}
    >
      {/* Background Soft Glow for the Text Area */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#ffcc00]/10 blur-[80px] pointer-events-none" />

      <button 
        className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full border border-[#3b1f06]/10 text-[#3b1f06]/60 text-xl"
        onClick={() => setMobileTocOpen(false)}
      >
        ✕
      </button>

      <div className="mb-12 border-b border-[#3b1f06]/10 pb-4">
        <h2 className="font-serif italic text-2xl text-[#3b1f06]">Index</h2>
        <p className="text-[9px] tracking-[0.3em] uppercase opacity-40 mt-1">Design Folio</p>
      </div>

      <nav className="flex flex-col gap-8 relative z-10">
        {navLinks.map((item, i) => {
          const isCloseAction = item.name === "Close Book";
          const isResume = item.name === "Resume";

          const linkClass = "flex items-center gap-5 font-serif text-lg transition-all active:scale-95";

          // 1. MOBILE CLOSE ACTION
          if (isCloseAction) {
            return (
              <button
                key={item.name}
                onClick={() => {
                  setMobileTocOpen(false);
                  handleCloseBook();
                }}
                className={`${linkClass} text-[#8b0000] mt-4`}
              >
                <span className="text-xs opacity-40 italic font-sans">{["I", "II", "III", "IV", "V"][i]}</span>
                <span className="tracking-widest uppercase font-bold border-b border-[#8b0000]/20">{item.name}</span>
              </button>
            );
          }

          // 2. MOBILE RESUME / LINKS
          const content = (
            <>
              <span className="text-xs opacity-40 italic font-sans">{["I", "II", "III", "IV", "V"][i]}</span>
              <span className="tracking-wide text-[#3b1f06]">{item.name} {isResume && "↗"}</span>
            </>
          );

          return isResume ? (
            <a key={item.name} href={item.path} target="_blank" rel="noopener noreferrer" 
               onClick={() => setMobileTocOpen(false)} className={linkClass}>
              {content}
            </a>
          ) : (
            <Link key={item.name} href={item.path} onClick={() => setMobileTocOpen(false)} className={linkClass}>
              {content}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto text-center opacity-30">
        <div className="text-[18px] mb-2">❧</div>
        <p className="text-[8px] tracking-[0.4em] uppercase">Amr Abdullah</p>
      </div>
    </motion.div>
  )}
</AnimatePresence>

            {/* ── Page content ── */}
            <div className="relative z-10 h-full overflow-y-auto p-6 sm:p-10 md:p-12 pt-12">
              <motion.div
                className="h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
              >
                {pathname === "/" ? (
                  <div className="h-full flex flex-col items-center justify-center gap-4">
                    {/* Wax seal monogram */}
                    <div className="relative mb-2">
                      <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                        <circle cx="36" cy="36" r="32" fill="rgba(139,98,48,0.08)" stroke="rgba(139,98,48,0.2)" strokeWidth="0.8"/>
                        <circle cx="36" cy="36" r="28" stroke="rgba(139,98,48,0.1)" strokeWidth="0.5" strokeDasharray="2 3"/>
                        {/* Tiny star points around seal */}
                        {[0,45,90,135,180,225,270,315].map((deg) => (
                          <line key={deg}
                            x1={36 + 30 * Math.cos((deg * Math.PI) / 180)}
                            y1={36 + 30 * Math.sin((deg * Math.PI) / 180)}
                            x2={36 + 33 * Math.cos((deg * Math.PI) / 180)}
                            y2={36 + 33 * Math.sin((deg * Math.PI) / 180)}
                            stroke="rgba(139,98,48,0.2)" strokeWidth="1"/>
                        ))}
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-2xl font-serif text-[#8b6230]/20 tracking-widest">
                        AMR
                      </span>
                    </div>
                    <p className="italic font-serif text-[#5c3810]/50 text-sm tracking-widest">
                      Select a chapter by clicking on contents.
                    </p>
                    <div className="w-8 h-[0.5px] bg-[#8b6230]/25 mt-1" />
                  </div>
                ) : (
                  <div key={pathname}>{children}</div>
                )}
              </motion.div>
            </div>

            {/* Page number */}
            <div className="absolute bottom-4 right-6 z-10 text-center pointer-events-none">
              <span className="font-serif italic text-[9px] text-[#8b6230]/30 tracking-widest">ii</span>
            </div>
          </motion.div>

        </div>{/* end book shell */}
      </div>{/* end perspective wrapper */}
    </motion.div>
  )}
</AnimatePresence>
         {/* book close animation */}


        {/* ── LEFT FLOOR LAMP ── */}
        <div
          className={`absolute bottom-0 left-[3vw] md:left-[5vw] z-[240] pointer-events-none transition-all duration-700 ${isSubPage ? "opacity-15 blur-sm" : "opacity-100"}`}
        >
          {/* Lamp glow on floor/wall */}
          <div className="absolute pointer-events-none" style={{
            bottom: "160px", left: "-20px", width: "180px", height: "180px",
            background: darkMode
              ? "radial-gradient(ellipse, rgba(251,191,36,0.18) 0%, transparent 70%)"
              : "radial-gradient(ellipse, rgba(251,191,36,0.10) 0%, transparent 70%)",
            borderRadius: "50%",
            transition: "background 1s",
          }} />
          {/* Shade — arc floor lamp style */}
          <div className="absolute" style={{ bottom: "148px", left: "-6px" }}>
            {/* Outer shade */}
            <div style={{
              width: "56px", height: "34px",
              background: "linear-gradient(180deg, #3a2208 0%, #1e0e04 100%)",
              clipPath: "polygon(8% 0%, 92% 0%, 100% 100%, 0% 100%)",
              border: "1.5px solid rgba(198,169,122,0.4)",
              boxShadow: "inset 0 2px 8px rgba(255,180,80,0.08)",
            }} />
            {/* Shade top rim */}
            <div style={{
              width: "44px", height: "5px", marginLeft: "6px", marginTop: "-1px",
              background: "linear-gradient(90deg, #2a1508, #5a3318, #2a1508)",
              borderRadius: "2px 2px 0 0",
            }} />
            {/* Inner glow when dark */}
            {darkMode && (
              <motion.div
                className="absolute"
                style={{ bottom: "2px", left: "4px", right: "4px", height: "18px",
                  background: "radial-gradient(ellipse, rgba(251,191,36,0.55) 0%, transparent 80%)",
                  filter: "blur(4px)",
                }}
                animate={{ opacity: [0.7, 1, 0.8, 1, 0.75, 1] }}
                transition={{ duration: 3.5, repeat: Infinity }}
              />
            )}
            {/* Bulb glow cast downward */}
            {darkMode && (
              <motion.div
                className="absolute pointer-events-none"
                style={{ top: "28px", left: "-14px", width: "84px", height: "100px",
                  background: "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(251,191,36,0.25) 0%, transparent 80%)",
                  filter: "blur(6px)",
                }}
                animate={{ opacity: [0.6, 1, 0.7, 1, 0.65, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            )}
          </div>
          {/* Curved arm */}
          <div className="absolute" style={{
            bottom: "72px", left: "16px", width: "10px", height: "90px",
            background: "linear-gradient(90deg, #2a1508 0%, #5a3318 50%, #2a1508 100%)",
            borderRadius: "3px",
          }} />
          {/* Arc curve at top */}
          <div className="absolute" style={{
            bottom: "155px", left: "10px", width: "18px", height: "18px",
            borderTop: "2px solid rgba(198,169,122,0.5)",
            borderLeft: "2px solid rgba(198,169,122,0.5)",
            borderRadius: "60% 0 0 0",
          }} />
          {/* Main pole */}
          <div className="absolute" style={{
            bottom: "0px", left: "19px", width: "8px",
            height: "155px",
            background: "linear-gradient(90deg, #1e0e04 0%, #5a3318 45%, #3a2010 100%)",
            borderRadius: "2px",
          }} />
          {/* Base disk */}
          <div style={{
            position: "absolute", bottom: "0px", left: "5px",
            width: "36px", height: "10px",
            background: "linear-gradient(180deg, #3a2010, #1e0e04)",
            borderRadius: "4px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.7)",
          }} />
          {/* Base feet */}
          {[-8, 8].map((off, fi) => (
            <div key={fi} style={{
              position: "absolute", bottom: "0px", left: `${23 + off}px`,
              width: "18px", height: "5px",
              background: "linear-gradient(180deg, #2a1508, #0f0702)",
              borderRadius: "0 0 3px 3px",
            }} />
          ))}
        </div>

        {/* ── FORWARD RIGHT LANTERN (brought in front of tapestry without touching tapestry z-index or navigation) ── */}
        {/* The original right sconce stays in the background layer (now only left remains there). This duplicate lantern + arm + plate sits at z-[250] with pointer-events-none so the tapestry nav remains fully clickable. */}
        <div
          className={`absolute top-[22vh] md:top-[28vh] right-2 md:right-8 z-[250] pointer-events-none drop-shadow-[0_12px_22px_rgba(0,0,0,0.99)] transition-all duration-700 ${isSubPage ? "opacity-15 blur-sm" : "opacity-100"}`}
          style={{ transform: "scale(0.6)", transformOrigin: "top center" }}
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
            {/* Candle - simplified on mobile */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3 md:w-4 h-5 md:h-7">
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 md:w-3 h-4 md:h-6"
                style={{ background: "linear-gradient(90deg, rgba(231,216,180,0.5), rgba(198,169,122,0.3))" }}
              />
              {darkMode && (
                <motion.div
                  className="absolute top-0 left-1/2 -translate-x-1/2"
                  animate={isMobile ? {} : { opacity: [0.85, 1, 0.9, 0.95, 0.88, 1], scaleY: [1, 1.08, 0.95, 1.05, 0.98, 1] }}
                  transition={isMobile ? {} : { duration: 3, repeat: Infinity }}
                >
                  <div
                    className="w-2 md:w-3 h-3 md:h-4 rounded-t-full"
                    style={{
                      background: "radial-gradient(ellipse at 40% 70%, #fbbf24, #f97316)",
                      boxShadow: isMobile ? "0 0 10px 5px rgba(251,191,36,0.6)" : "0 0 24px 10px rgba(251,191,36,0.85), 0 0 50px 16px rgba(249,115,22,0.45)",
                    }}
                  />
                </motion.div>
              )}
            </div>
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
            {/* ── DRAGGABLE CURTAIN SLIDER (Positioned Bottom-Right) ── */}
          <motion.div
            drag
            dragMomentum={false}
            // Constraints updated: allow dragging 300px to the left, 0 to the right
            dragConstraints={{ left: -300, right: 0, top: -500, bottom: 50 }} 
            className="absolute bottom-[4vh] right-[3vw] w-[130px] md:w-[160px] flex flex-col items-center z-[2000] pointer-events-auto p-3 rounded-lg backdrop-blur-md cursor-grab active:cursor-grabbing"
            style={{ 
              background: "rgba(0,0,0,0.6)", 
              border: "1px solid rgba(198,169,122,0.3)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              touchAction: "none" 
            }}
          >
            {/* Drag Handle Visual */}
            <div className="flex gap-1.5 mb-2 opacity-40">
              <div className="w-1 h-1 rounded-full bg-[#c6a97a]" />
              <div className="w-1 h-1 rounded-full bg-[#c6a97a]" />
              <div className="w-1 h-1 rounded-full bg-[#c6a97a]" />
            </div>

            {/* Instruction Hint with Pulse Animation */}
            <motion.div 
              className="flex flex-col items-center mb-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <span
                className="text-[7px] md:text-[9px] tracking-[0.2em] uppercase font-sans font-bold text-center select-none pointer-events-none"
                style={{ color: darkMode ? "#c6a97a" : "#fcd34d" }}
              >
                Drape Pulley
              </span>
              <span className="text-[5px] md:text-[7px] tracking-[0.1em] italic opacity-60 text-white font-sans text-center mt-0.5">
                Slide to open/close curtains
              </span>
            </motion.div>

            <input
              type="range"
              min="0"
              max="100"
              value={openness}
              onChange={(e) => setOpenness(Number(e.target.value))}
              onPointerDown={(e) => e.stopPropagation()} 
              className="w-full h-4 cursor-pointer"
              style={{ WebkitAppearance: "none", appearance: "none", background: "transparent" }}
            />

            <style jsx>{`
              input[type=range]::-webkit-slider-runnable-track { 
                width: 100%; height: 4px; background: #1a120c; border-radius: 9999px; border: 1px solid #3a2f22; 
              }
              input[type=range]::-webkit-slider-thumb { 
                height: 16px; width: 16px; border-radius: 9999px; background: #c6a97a; border: 1.5px solid #3a2f22; 
                -webkit-appearance: none; margin-top: -6px; box-shadow: 0 0 10px rgba(198,169,122,0.8); 
              }
              input[type=range]::-moz-range-track { 
                width: 100%; height: 4px; background: #1a120c; border-radius: 9999px; border: 1px solid #3a2f22; 
              }
              input[type=range]::-moz-range-thumb { 
                height: 16px; width: 16px; border-radius: 9999px; background: #c6a97a; border: 1.5px solid #3a2f22; 
                box-shadow: 0 0 10px rgba(198,169,122,0.8); 
              }
            `}</style>
          </motion.div>
            
          {/* ── PAGE CONTENT (Background Layer) ── */}
        <div className={`relative z-50 w-full h-full overflow-y-auto pointer-events-none 
          ${(bookOpen || pathname !== "/") ? 'hidden' : 'block'}`}> 
          <div className="w-full h-full pointer-events-auto">
            {children}
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}