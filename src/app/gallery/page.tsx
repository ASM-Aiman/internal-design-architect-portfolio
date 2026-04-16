"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const inkColor = "#3b1f06";
const faintInk = "rgba(139, 98, 48, 0.4)";
const mutedInk = "rgba(92, 56, 16, 0.7)";

// ─── Add your filenames here once dropped into /public/assets/images/ ───────
const categories = [
  {
    id: "interior",
    label: "Interior Designing",
    roman: "I",
    projects: [
      {
        id: "int-1",
        title: "The Amber Study",
        year: "MMXXIII",
        description:
          "A private study bathed in warm candlelight tones — raw walnut shelving, aged leather seating, and hand-laid herringbone parquet floors. Conceived as a sanctuary for thought.",
        imageSrc: "/assets/images/amber-study.jpg",        // ← replace with actual filename
        sketchSrc: "/assets/images/amber-study-sketch.jpg",
      },
      {
        id: "int-2",
        title: "Ivory Drawing Room",
        year: "MMXXII",
        description:
          "A formal drawing room balancing Georgian symmetry with modern restraint. Ivory plasterwork, fluted columns, and a statement fireplace as the room's singular focal axis.",
        imageSrc: "/assets/images/ivory-room.jpg",
        sketchSrc: "/assets/images/ivory-room-sketch.jpg",
      },
      {
        id: "int-3",
        title: "The Garden Loft",
        year: "MMXXIV",
        description:
          "An open-plan urban loft that dissolves the boundary between indoors and outdoors. Exposed brick, botanical murals, and floor-to-ceiling steel-framed windows frame the sky.",
        imageSrc: "/assets/images/garden-loft.jpg",
        sketchSrc: "/assets/images/garden-loft-sketch.jpg",
      },
    ],
  },
  {
    id: "furniture",
    label: "Furniture Designing",
    roman: "II",
    projects: [
      {
        id: "fur-1",
        title: "The Cartographer's Desk",
        year: "MMXXIII",
        description:
          "A bespoke writing desk crafted from reclaimed oak. The surface is inlaid with a hand-drawn map motif, and brass compass-rose hardware anchors each drawer.",
        imageSrc: "/assets/images/cartographer-desk.jpg",
        sketchSrc: "/assets/images/cartographer-desk-sketch.jpg",
      },
      {
        id: "fur-2",
        title: "Arch Lounge Chair",
        year: "MMXXIV",
        description:
          "A sculptural lounge chair in steam-bent ash and saddle leather. The arched backrest references Romanesque architecture while remaining ergonomically precise.",
        imageSrc: "/assets/images/arch-chair.jpg",
        sketchSrc: "/assets/images/arch-chair-sketch.jpg",
      },
    ],
  },
];

// ─── Lightbox ────────────────────────────────────────────────────────────────
function Lightbox({
  src,
  label,
  onClose,
}: {
  src: string;
  label: string;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        key="lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-6"
        style={{ background: "rgba(24, 12, 4, 0.82)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      >
   {/* Close button */}
<button
  onClick={onClose}
  className="absolute top-5 left-5 flex items-center gap-1.5 font-serif italic text-[11px] tracking-widest transition-opacity hover:opacity-70"
  style={{ color: "rgba(245, 230, 200, 0.85)" }}
>
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <line x1="13" y1="7" x2="1" y2="7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <polyline points="5,2 1,7 5,12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
  <span>back</span>
</button>

        {/* Image */}
        <motion.div
          key="lightbox-img"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.88 }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
          className="flex flex-col items-center gap-3 max-w-2xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={src}
            alt={label}
            className="w-full max-h-[75vh] object-contain rounded"
            style={{ boxShadow: "0 8px 48px rgba(0,0,0,0.55)" }}
          />
          <p
            className="text-[9px] tracking-[0.22em] uppercase font-serif italic"
            style={{ color: "rgba(245, 230, 200, 0.45)" }}
          >
            {label}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Thumbnail (photo or sketch) ─────────────────────────────────────────────
function Thumbnail({
  src,
  label,
  isSketch,
  onClick,
}: {
  src: string;
  label: string;
  isSketch: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full h-full rounded overflow-hidden relative group focus:outline-none"
      style={{
        border: isSketch ? `1px dashed ${faintInk}` : `1px solid ${faintInk}`,
        background: "rgba(139,98,48,0.05)",
      }}
    >
      <img
        src={src}
        alt={label}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        onError={(e) => {
          // Show placeholder SVG overlay if image missing
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />

      {/* Fallback shown behind img when it fails to load */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 pointer-events-none">
        {isSketch ? (
          <svg width="36" height="28" viewBox="0 0 48 36" fill="none">
            <rect x="4" y="4" width="40" height="28" stroke={faintInk} strokeWidth="0.8" strokeDasharray="2 2" />
            <line x1="4" y1="20" x2="44" y2="20" stroke={faintInk} strokeWidth="0.5" />
            <line x1="24" y1="4" x2="24" y2="32" stroke={faintInk} strokeWidth="0.5" />
            <circle cx="24" cy="20" r="5" stroke={faintInk} strokeWidth="0.6" />
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <rect x="3" y="6" width="26" height="20" rx="1" stroke={faintInk} strokeWidth="0.8" />
            <circle cx="11" cy="13" r="3" stroke={faintInk} strokeWidth="0.7" />
            <path d="M3 22 L10 16 L16 21 L22 15 L29 22" stroke={faintInk} strokeWidth="0.7" />
          </svg>
        )}
        <span
          className="text-[8px] tracking-widest uppercase font-serif italic text-center px-2 leading-relaxed"
          style={{ color: mutedInk }}
        >
          {label}
        </span>
      </div>

      {/* Zoom hint on hover */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: "rgba(59,31,6,0.28)" }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="8.5" cy="8.5" r="5.5" stroke="rgba(245,230,200,0.8)" strokeWidth="1.2" />
          <line x1="12.5" y1="12.5" x2="17" y2="17" stroke="rgba(245,230,200,0.8)" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="6" y1="8.5" x2="11" y2="8.5" stroke="rgba(245,230,200,0.8)" strokeWidth="1" strokeLinecap="round" />
          <line x1="8.5" y1="6" x2="8.5" y2="11" stroke="rgba(245,230,200,0.8)" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </div>
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<"interior" | "furniture">("interior");
  const [lightbox, setLightbox] = useState<{ src: string; label: string } | null>(null);

  const current = categories.find((c) => c.id === activeCategory)!;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="h-full flex flex-col p-6 overflow-y-auto"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6 shrink-0">
          <div className="text-[#8b6230] opacity-30 text-2xl mb-3">❦</div>
          <h2 className="text-3xl md:text-4xl font-serif italic mb-3" style={{ color: inkColor }}>
            The Gallery
          </h2>
          <div className="w-16 h-[1px] mb-5" style={{ background: faintInk }} />

          {/* Category Tabs */}
          <div className="flex gap-6 items-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as "interior" | "furniture")}
                className="relative font-serif italic text-xs md:text-sm tracking-wide transition-all duration-300"
                style={{
                  color: activeCategory === cat.id ? inkColor : mutedInk,
                  opacity: activeCategory === cat.id ? 1 : 0.6,
                }}
              >
                {cat.label}
                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[1px]"
                    style={{ background: faintInk }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Projects */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col gap-5"
        >
          <p
            className="text-[9px] tracking-[0.25em] uppercase font-serif text-center"
            style={{ color: mutedInk }}
          >
            Vol. {current.roman} — {current.label}
          </p>

          {current.projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.35 }}
              className="flex flex-col gap-3"
              style={{ paddingBottom: "1.25rem", borderBottom: `1px solid ${faintInk}` }}
            >
              <div className="flex items-baseline justify-between">
                <h3
                  className="font-serif italic text-base md:text-lg leading-tight"
                  style={{ color: inkColor }}
                >
                  {project.title}
                </h3>
                <span
                  className="text-[9px] tracking-widest font-serif ml-3 shrink-0"
                  style={{ color: mutedInk }}
                >
                  {project.year}
                </span>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-2 gap-3" style={{ height: "120px" }}>
                <Thumbnail
                  src={project.imageSrc}
                  label="Photo"
                  isSketch={false}
                  onClick={() => setLightbox({ src: project.imageSrc, label: project.title })}
                />
                <Thumbnail
                  src={project.sketchSrc}
                  label="Sketch"
                  isSketch={true}
                  onClick={() => setLightbox({ src: project.sketchSrc, label: `${project.title} — Sketch` })}
                />
              </div>

              <p
                className="text-[11px] md:text-xs leading-relaxed font-serif italic"
                style={{ color: mutedInk }}
              >
                {project.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <div className="mt-8 flex justify-center opacity-10 shrink-0">
          <svg width="100" height="40" viewBox="0 0 100 40" fill="none">
            <path d="M10,20 Q50,0 90,20 Q50,40 10,20" stroke={inkColor} strokeWidth="0.5" />
          </svg>
        </div>
        <div
          className="text-center text-[9px] italic opacity-30 font-serif shrink-0"
          style={{ color: inkColor }}
        >
          Exhibit Collection MDXXVI
        </div>
      </motion.div>

      {/* Lightbox portal */}
      {lightbox && (
        <Lightbox
          src={lightbox.src}
          label={lightbox.label}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}