"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const inkColor = "#3b1f06";
const mutedInk = "rgba(92, 56, 16, 0.7)";

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
        images: ["/assets/images/amber-study.jpg", "/assets/images/amber-study-sketch.jpg"]
      },
            {
        id: "int-",
        title: "The Amber Study - 2  ",
        year: "MMXXIII",
        description: "A private study bathed in warm candlelight tones — raw walnut shelving and aged leather.",
        images: ["/assets/images/amber-study.jpg", "/assets/images/amber-study-sketch.jpg"]
      },
              {
        id: "int-",
        title: "The Amber Study -3 ",
        year: "MMXXIII",
        description: "A private study bathed in warm candlelight tones — raw walnut shelving and aged leather.",
        images: ["/assets/images/amber-study.jpg", "/assets/images/amber-study-sketch.jpg"]
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
      },
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

function CarouselLightbox({ images, initialIndex, onClose }: { images: string[], initialIndex: number, onClose: () => void }) {
  const [index, setIndex] = useState(initialIndex);

  // Keyboard navigation
  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setIndex((prev) => (prev + 1) % images.length);
      if (e.key === "ArrowLeft") setIndex((prev) => (prev - 1 + images.length) % images.length);
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
        className="fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-[#050302]/95 backdrop-blur-xl p-4"
      >
        <div className="absolute top-10 text-[10px] tracking-[0.4em] uppercase text-[#c6a97a] font-serif pointer-events-none">
          Plate {index + 1} / {images.length}
        </div>

        {images.length > 1 && (
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between z-[2010] pointer-events-none">
            <button onClick={(e) => { e.stopPropagation(); setIndex((prev) => (prev - 1 + images.length) % images.length); }} 
              className="pointer-events-auto p-4 text-[#c6a97a] opacity-50 hover:opacity-100 transition-all">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button onClick={(e) => { e.stopPropagation(); setIndex((prev) => (prev + 1) % images.length); }} 
              className="pointer-events-auto p-4 text-[#c6a97a] opacity-50 hover:opacity-100 transition-all">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        )}

        <motion.img
          key={index}
          initial={{ opacity: 0, scale: 0.95, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          src={images[index]}
          className="max-h-[75vh] object-contain shadow-2xl border border-[#c6a97a]/10"
          onClick={(e) => e.stopPropagation()}
        />

        <button onClick={onClose} className="absolute bottom-12 font-serif italic text-[10px] text-[#c6a97a]/60 uppercase tracking-widest">
          Close image
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Gallery() {
  const [view, setView] = useState<"menu" | "category">("menu");
  const [activeCatId, setActiveCatId] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  const activeCategory = categories.find((c) => c.id === activeCatId);

  return (
    // THE OVERFLOW-Y-AUTO HERE ENSURES SCROLLING HAPPENS INSIDE THE BOOK PAGE
    <div className="w-full h-full flex flex-col font-serif bg-transparent">
      <AnimatePresence mode="wait">
        {view === "menu" ? (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center text-center gap-8 py-8"
          >
            <div className="text-[#8b6230] opacity-30 text-2xl">❧</div>
            <h2 className="text-3xl italic text-[#3b1f06]">The Gallery Archive</h2>
            
            <div className="grid grid-cols-1 gap-4 w-full px-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCatId(cat.id); setView("category"); }}
                  className="p-6 border border-[#8b6230]/20 hover:bg-[#8b6230]/5 transition-all text-left"
                >
                  <span className="text-[10px] opacity-30 block">{cat.roman}</span>
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
            className="flex flex-col gap-12 py-4"
          >
            <button onClick={() => setView("menu")} className="text-[9px] uppercase tracking-widest opacity-50 hover:opacity-100 flex items-center gap-2">
              ← Archive Index
            </button>
            
            <h2 className="text-2xl italic text-[#3b1f06] border-b border-[#8b6230]/20 pb-2">
              {activeCategory?.label}
            </h2>

            <div className="space-y-16">
              {activeCategory?.projects.map((project) => (
                <div key={project.id} className="space-y-4">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-lg italic text-[#3b1f06]">{project.title}</h3>
                    <span className="text-[9px] opacity-40">{project.year}</span>
                  </div>

                  <div 
                    className="relative aspect-[16/9] bg-[#8b6230]/5 cursor-zoom-in overflow-hidden border border-[#8b6230]/10"
                    onClick={() => setLightbox({ images: project.images, index: 0 })}
                  >
                    <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover" />
                  </div>

                  <p className="text-[11px] leading-relaxed italic text-[#5c3810]/80">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-auto pt-12 border-t border-[#8b6230]/10 text-center pb-8 opacity-40">
       
        {/* ── COPYRIGHT & ATTRIBUTION ── */}
        <div className="mt-2 text-center flex flex-col gap-1">
          <p className="text-[8px] font-serif tracking-[0.2em] text-[#8b6230]/50 uppercase">
            Design & Development by <span className="text-[#8b6230]/80 font-bold">ASM Aiman</span>
          </p>
          <p className="text-[7px] font-serif italic text-[#8b6230]/40">
            © {new Date().getFullYear()} — All rights reserved in perpetuity.
          </p>
        </div>
      </footer>

      {lightbox && (
        <CarouselLightbox images={lightbox.images} initialIndex={lightbox.index} onClose={() => setLightbox(null)} />
      )}
    </div>
  );
}