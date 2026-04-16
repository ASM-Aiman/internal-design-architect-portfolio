"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const categories = [
  {
    id: "interior",
    label: "Space Design",
    roman: "I",
    description: "Architectural narratives and atmospheric environments.",
    projects: [
      {
        id: "int-1",
        title: "The Amber Study",
        year: "MMXXIII",
        description: "A private study bathed in warm candlelight tones — raw walnut shelving and aged leather.",
        images: ["/assets/images/amber-study.jpg", "/assets/images/amber-study-sketch.jpg", "/assets/images/amber-study-detail.jpg"]
      }
    ]
  },
  {
    id: "furniture",
    label: "Furniture Design",
    roman: "II",
    description: "Bespoke objects and sculptural functionalism.",
    projects: [
      {
        id: "fur-1",
        title: "The Cartographer's Desk",
        year: "MMXXIII",
        description: "A bespoke writing desk crafted from reclaimed oak with brass hardware.",
        images: ["/assets/images/cartographer-desk.jpg", "/assets/images/cartographer-desk-sketch.jpg"]
      }
    ]
  }
];

type ViewState = "menu" | "category";

// ── Breadcrumb ──────────────────────────────────────────────────────────────
function Breadcrumb({
  view,
  categoryLabel,
  onGoHome,
  onGoCategory,
}: {
  view: ViewState;
  categoryLabel: string | null;
  onGoHome: () => void;
  onGoCategory: () => void;
}) {
  return (
    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#8b6230]/50 mb-8 select-none">
      <button
        onClick={onGoHome}
        className={`hover:opacity-100 transition-opacity ${view === "menu" ? "opacity-100 text-[#5c3810]" : "opacity-50"}`}
      >
        Archive
      </button>

      {view === "category" && categoryLabel && (
        <>
          <span className="opacity-30">›</span>
          <span className="opacity-100 text-[#5c3810]">{categoryLabel}</span>
        </>
      )}
    </div>
  );
}

// ── Smart project image — fills available width, respects aspect ratio ──────
function ProjectImage({
  src,
  onOpen,
}: {
  src: string;
  onOpen: () => void;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLandscape, setIsLandscape] = useState<boolean | null>(null);

  const handleLoad = () => {
    const el = imgRef.current;
    if (el) setIsLandscape(el.naturalWidth >= el.naturalHeight);
  };

  // Before the image loads, use a generous placeholder height.
  // Once loaded: landscape → constrain height to ~55vh, portrait → constrain to ~75vh.
  const containerStyle =
    isLandscape === null
      ? "w-full min-h-[280px] max-h-[70vh]"
      : isLandscape
      ? "w-full max-h-[55vh]"  // wide image — shorter container
      : "w-full max-h-[75vh]"; // portrait / square — taller container

  return (
    <div
      className={`${containerStyle} bg-[#8b6230]/5 cursor-zoom-in overflow-hidden border border-[#8b6230]/10 flex items-center justify-center`}
      onClick={onOpen}
    >
      <img
        ref={imgRef}
        src={src}
        onLoad={handleLoad}
        className="w-full h-full object-contain hover:scale-[1.02] transition-transform duration-1000"
      />
    </div>
  );
}

// ── Lightbox ────────────────────────────────────────────────────────────────
function CarouselLightbox({
  images,
  initialIndex,
  onClose,
}: {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setIndex((p) => (p + 1) % images.length);
      if (e.key === "ArrowLeft") setIndex((p) => (p - 1 + images.length) % images.length);
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, [images.length, onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[6000] flex flex-col items-center justify-center bg-[#050302]/98 backdrop-blur-2xl p-4"
      >
        {/* Go Back — top left */}
        <button
          className="absolute top-8 left-8 z-[6010] text-[#c6a97a]/50 hover:text-[#c6a97a] text-[10px] uppercase tracking-[0.4em] cursor-pointer transition-opacity flex items-center gap-2"
          onClick={(e) => { e.stopPropagation(); onClose(); }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Go Back
        </button>

        {/* Counter */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[#c6a97a]/30 text-[10px] uppercase tracking-[0.4em] pointer-events-none">
          Plate {index + 1} / {images.length}
        </div>

        {/* Image */}
        <div className="relative w-full h-full flex items-center justify-center">
          {images.length > 1 && (
            <div className="absolute inset-x-2 flex justify-between z-[6020] pointer-events-none">
              <button
                onClick={(e) => { e.stopPropagation(); setIndex((p) => (p - 1 + images.length) % images.length); }}
                className="pointer-events-auto p-4 text-[#c6a97a] opacity-30 hover:opacity-100 transition-all"
              >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setIndex((p) => (p + 1) % images.length); }}
                className="pointer-events-auto p-4 text-[#c6a97a] opacity-30 hover:opacity-100 transition-all"
              >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full h-full flex items-center justify-center p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[index]}
                className="max-w-full max-h-[85vh] object-contain shadow-2xl border border-[#c6a97a]/10"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Main Gallery ─────────────────────────────────────────────────────────────
export default function Gallery() {
  const [view, setView] = useState<ViewState>("menu");
  const [activeCatId, setActiveCatId] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  const activeCategory = categories.find((c) => c.id === activeCatId);

  const goHome = () => { setView("menu"); setActiveCatId(null); };
  const goCategory = () => setView("category");

  return (
    <div className="w-full h-full flex flex-col font-serif relative">
      {/* Persistent breadcrumb — always visible */}
      <Breadcrumb
        view={view}
        categoryLabel={activeCategory?.label ?? null}
        onGoHome={goHome}
        onGoCategory={goCategory}
      />

      <AnimatePresence mode="wait">
        {view === "menu" ? (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-10"
          >
            <h2 className="text-3xl italic text-[#3b1f06]">The Gallery Archive</h2>
            <div className="grid grid-cols-1 gap-6 w-full max-w-md px-6">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCatId(cat.id); setView("category"); }}
                  className="p-8 border border-[#8b6230]/20 hover:bg-[#8b6230]/5 text-left transition-all"
                >
                  <span className="text-[10px] opacity-30 block mb-2">{cat.roman}</span>
                  <h3 className="text-xl italic text-[#5c3810]">{cat.label}</h3>
                  <p className="text-[10px] opacity-60 italic">{cat.description}</p>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="category"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-10"
          >
            <h2 className="text-2xl italic text-[#3b1f06] border-b border-[#8b6230]/20 pb-4">
              {activeCategory?.label}
            </h2>

            <div className="space-y-24">
              {activeCategory?.projects.map((project) => (
                <div key={project.id} className="space-y-5">
                  <div className="flex justify-between items-end border-l border-[#8b6230]/20 pl-6">
                    <h3 className="text-xl italic text-[#3b1f06]">{project.title}</h3>
                    <span className="text-[10px] opacity-40">{project.year}</span>
                  </div>

                  {/* Smart image — auto-sizes to landscape or portrait */}
                  <ProjectImage
                    src={project.images[0]}
                    onOpen={() => setLightbox({ images: project.images, index: 0 })}
                  />

                  <p className="text-[12px] leading-relaxed italic text-[#5c3810]/80 pr-6">
                    {project.description}
                  </p>

                  {project.images.length > 1 && (
                    <button
                      onClick={() => setLightbox({ images: project.images, index: 0 })}
                      className="text-[10px] uppercase tracking-[0.2em] text-[#8b6230]/40 hover:text-[#8b6230]/80 transition-colors"
                    >
                      View all {project.images.length} plates →
                    </button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {lightbox && (
        <CarouselLightbox
          images={lightbox.images}
          initialIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}