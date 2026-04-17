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
        title: "Hostel Design – UVPA Colombo",
        year: "MMXXIII",
        description: "The student hostel, located at No. 217, Sri Saddharma Mawatha, Colombo 10, is designed for multidisciplinary students of the Faculty of Visual Arts, University of Visual & Performing Arts, Colombo. The design is inspired by the philosophy of Yin and Yang, translating the idea of balance into a spatial experience that harmonizes work and rest. Organized across five levels, the building separates functions vertically, with communal and administrative spaces on the ground floor, dedicated study areas at the core, and restful bedroom zones positioned above and below to create a rhythmic balance between activity and retreat. The use of exposed concrete establishes a raw, neutral backdrop that reflects stability and focus, while mahogany wood elements introduce warmth and human scale through partitions and furniture. Accommodating 22 students, the hostel becomes more than a living space—it is a carefully curated environment that supports creativity, discipline, and well-being within a dense urban context.",
        images: ["/assets/images/s1-1.png", "/assets/images/s1-2.png", "/assets/images/s1-3.png", "/assets/images/s1-4.png", "/assets/images/s1-5.png", "/assets/images/s1-6.png", "/assets/images/s1-7.png", "/assets/images/s1-8.png", "/assets/images/s1-9.png", "/assets/images/s1-10.png", "/assets/images/s1-11.png", "/assets/images/s1-12.png", "/assets/images/s1-13.png", "/assets/images/s1-14.png", "/assets/images/s1-15.png", "/assets/images/s1-16.png", "/assets/images/s1-17.png", "/assets/images/s1-18.png", "/assets/images/s1-19.png", "/assets/images/s1-20.png", "/assets/images/s1-21.png"]
      },
          {
        id: "int-2",
        title: "Dilly & Carlo Mobile Retail Kiosk",
        year: "MMXXIII",
        description: "The Dilly & Carlo kiosk, located within the historic context of Galle Fort, is conceived as a compact yet expressive retail intervention that reflects the brand’s identity of timeless elegance and cultural refinement. Responding to the fort’s rich colonial fabric and pedestrian character, the design is inspired by the idea of a central bloom, organizing the space around a subtle focal point that encourages intuitive movement and interaction. The kiosk integrates Sri Lankan craftsmanship through materials such as cane, wood, and soft fabric textures, while maintaining a contemporary language of clean lines and minimal forms that harmonize with the heritage surroundings. Carefully planned zoning — from the welcoming entrance display to the central shelving and rear functional areas — ensures both spatial efficiency and visual clarity within a limited footprint. Transparent elements enhance visibility and invite engagement, while the overall composition balances openness and intimacy, echoing both the spatial qualities of Galle Fort and the philosophy of the brand. The result is a refined, culturally responsive retail experience that creates a meaningful connection between place, product, and user.",
        images: ["/assets/images/s2-1.png", "/assets/images/s2-2.png", "/assets/images/s2-3.png", "/assets/images/s2-4.png", "/assets/images/s2-5.png", "/assets/images/s2-6.png", "/assets/images/s2-7.png", "/assets/images/s2-8.png", "/assets/images/s2-9.png"]
      },
       {
        id: "int-3",
        title: "Colombo Campus Bus Stop",
        year: "MMXXIII",
        description: "This project reimagines the Colombo Campus bus stop as a contemporary interpretation of the Sri Lankan *ambalama*, focusing on its philosophy of shade, comfort, and community rather than its physical form. Retaining the existing steel structure, the design introduces a living creeper canopy for natural cooling, air-purifying moss panels with an activated carbon filter to reduce roadside pollution, passive-cooling seating, and permeable self-cooling paving. An existing advertising panel is repurposed into an interactive educational display curated by university students. Together, these strategies transform the bus stop into a sustainable urban oasis that enhances environmental performance while serving as a meaningful and comfortable space for everyday commuters.",
        images: ["/assets/images/s3-1.png", "/assets/images/s3-2.png", "/assets/images/s3-3.png", "/assets/images/s3-4.png", "/assets/images/s3-5.png"]
      },


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
        title: "Lotus-inspired chair",
        year: "MMXXIII",
        description: "The lotus-inspired chair is designed as a sculptural expression of calmness, balance, and cultural symbolism, drawing from the elegant form of the lotus flower. The design translates the organic curves of blooming petals into a functional seating element, where each line and surface is carefully shaped to evoke a sense of softness and fluidity. Rooted in Sri Lankan cultural identity, the chair embodies the idea of purity and serenity, while its minimal yet expressive form aligns with contemporary design sensibilities. Crafted using natural materials, the piece highlights texture, craftsmanship, and material honesty, allowing it to age gracefully over time. Beyond its function, the chair acts as a statement object within a space, inviting users to pause, sit, and experience a moment of stillness — making it not just furniture, but an emotional and spatial focal point.",
        images: ["/assets/images/f1-1.png", "/assets/images/f1-2.png"]
      },
          {
        id: "fur-2",
        title: "Cascade Cantilever",
        year: "MMXXIII",
        description: "This office chair is designed in the style of the Frank Lloyd Wright movement, drawing inspiration from his iconic architectural masterpiece, Fallingwater.The design reflects Wright's philosophy of harmony between nature, structure, and function. The chair is crafted entirely from teak wood, showcasing warm natural tones and clean horizontal lines reminiscent of the cantilevered planes seen in Fallingwater. The backrest is woven with synthetic wire, adding texture and lightness while emphasizing craftsmanship and geometric order. The seat is cushioned with synthetic leather, ensuring comfort while maintaining a refined, modern aesthetic.Designed to be rotatable, the chair balances practicality with organic elegance, embodying Frank Lloyd Wright's vision of functional design seamlessly integrated with natural beauty and architectural rhythm.",
        images: ["/assets/images/f2-1.png", "/assets/images/f2-2.jpeg", "/assets/images/f2-3.jpeg", "/assets/images/f2-4.jpeg"]
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