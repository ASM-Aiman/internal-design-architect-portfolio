"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Artifacts() {
  const sections = [
    {
      category: "The Visionary",
      content: "I am an Interior Architecture Undergraduate student passionate about creating meaningful spatial experiences that balance aesthetics, functionality, and cultural identity. My design approach is rooted in storytelling, often drawing inspiration from nature, heritage, and conceptual narratives. I am particularly interested in crafting environments that encourage human interaction while respecting privacy, reflecting a thoughtful understanding of user needs. I am skilled in translating design concepts into precise technical drawings and visualizations, with experience in both manual and digital workflows."
    },
    {
      category: "My Philosophy",
      content: "Interior architecture is about responding thoughtfully to functional needs and transforming spaces to serve their purpose with clarity and comfort. I believe design is fundamentally a problem-solving process—one that requires delivering the most appropriate and honest solution to each unique situation. While aesthetics play an important role, visual appeal alone does not define a successful space. True quality lies in how well a space supports its users and meets their needs. Therefore, I prioritize function and purpose, while carefully integrating aesthetic value to enhance the overall experience without compromising the integrity of the solution."
    },
    {
      category: "Technical Arsenal",
      tools: [
        { 
          name: "AutoCAD", 
          color: "bg-red-600",
          textColor: "text-red-600",
          logo: (
            <svg viewBox="0 0 100 100" className="w-8 h-8">
              <rect x="10" y="10" width="80" height="80" fill="currentColor" opacity="0.1"/>
              <text x="50" y="60" fontSize="40" fontWeight="bold" textAnchor="middle" fill="currentColor">A</text>
            </svg>
          )
        },
        { 
          name: "SketchUp", 
          color: "bg-blue-500",
          textColor: "text-blue-500",
          logo: (
            <svg viewBox="0 0 100 100" className="w-8 h-8">
              <path d="M30 70 L50 30 L70 70 Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="2"/>
              <circle cx="50" cy="50" r="8" fill="currentColor"/>
            </svg>
          )
        },
        { 
          name: "3ds Max", 
          color: "bg-yellow-600",
          textColor: "text-yellow-600",
          logo: (
            <svg viewBox="0 0 100 100" className="w-8 h-8">
              <rect x="20" y="20" width="20" height="20" fill="currentColor" opacity="0.7"/>
              <rect x="45" y="20" width="20" height="20" fill="currentColor" opacity="0.5"/>
              <rect x="70" y="20" width="20" height="20" fill="currentColor" opacity="0.3"/>
              <rect x="20" y="50" width="70" height="30" fill="none" stroke="currentColor" strokeWidth="2"/>
            </svg>
          )
        },
        { 
          name: "D5 Render", 
          color: "bg-purple-600",
          textColor: "text-purple-600",
          logo: (
            <svg viewBox="0 0 100 100" className="w-8 h-8">
              <circle cx="50" cy="50" r="35" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2"/>
              <path d="M50 30 L65 50 L50 70 L35 50 Z" fill="currentColor" opacity="0.6"/>
            </svg>
          )
        },
        { 
          name: "Photoshop", 
          color: "bg-blue-700",
          textColor: "text-blue-700",
          logo: (
            <svg viewBox="0 0 100 100" className="w-8 h-8">
              <rect x="15" y="15" width="70" height="70" fill="currentColor" opacity="0.15" rx="8"/>
              <text x="50" y="65" fontSize="35" fontWeight="bold" textAnchor="middle" fill="currentColor">Ps</text>
            </svg>
          )
        },
        { 
          name: "Illustrator", 
          color: "bg-yellow-500",
          textColor: "text-yellow-500",
          logo: (
            <svg viewBox="0 0 100 100" className="w-8 h-8">
              <rect x="15" y="15" width="70" height="70" fill="currentColor" opacity="0.15" rx="8"/>
              <text x="50" y="65" fontSize="35" fontWeight="bold" textAnchor="middle" fill="currentColor">Ai</text>
            </svg>
          )
        },
        { 
          name: "MS Office", 
          color: "bg-orange-500",
          textColor: "text-orange-500",
          logo: (
            <svg viewBox="0 0 100 100" className="w-8 h-8">
              <rect x="20" y="20" width="15" height="60" fill="currentColor" opacity="0.7"/>
              <rect x="42" y="30" width="15" height="50" fill="currentColor" opacity="0.5"/>
              <rect x="64" y="40" width="15" height="40" fill="currentColor" opacity="0.3"/>
            </svg>
          )
        }
      ]
    },
    {
      category: "Design Competencies",
      skills: [
        "Space Planning",
        "3D Visualization",
        "Concept Development",
        "Material Selection",
        "Lighting Design",
        "Furniture Design",
        "Model Making",
        "Presentation Design"
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-12 w-full max-w-2xl mx-auto py-8 px-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center border-b border-[#8b6230]/10 pb-6"
      >
        <h2 className="text-[#3b1f06] text-3xl font-serif italic mb-2">Personal Folio</h2>
        <div className="flex items-center justify-center gap-3">
          <div className="h-[1px] w-16 bg-[#8b6230]/20" />
          <span className="text-[#8b6230] text-[10px] tracking-[0.5em] font-light">AMR ABDULLAH</span>
          <div className="h-[1px] w-16 bg-[#8b6230]/20" />
        </div>
      </motion.div>

      {/* Profile Image */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0 }}
        className="flex justify-center"
      >
        <div className="relative w-48 h-56 rounded-sm border border-[#8b6230]/20 overflow-hidden bg-gradient-to-br from-[#8b6230]/5 to-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Image
            src="/assets/images/me-pic.jpeg"
            alt="Amr Abdullah"
            fill
            className="object-cover"
            priority
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/5 pointer-events-none" />
        </div>
      </motion.div>

      {/* About Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <h3 className="text-[11px] tracking-[0.35em] uppercase text-[#8b6230] font-bold text-center">
          {sections[0].category}
        </h3>
        <p className="text-[13px] leading-relaxed text-[#5c3810]/85 font-serif italic text-justify">
          {sections[0].content}
        </p>
      </motion.div>

      {/* Philosophy Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4 border-y border-[#8b6230]/10 py-6"
      >
        <h3 className="text-[11px] tracking-[0.35em] uppercase text-[#8b6230] font-bold text-center">
          {sections[1].category}
        </h3>
        <p className="text-[13px] leading-relaxed text-[#5c3810]/85 font-serif italic text-justify">
          {sections[1].content}
        </p>
      </motion.div>

      {/* Technical Arsenal */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-5"
      >
        <h3 className="text-[11px] tracking-[0.35em] uppercase text-[#8b6230] font-bold text-center">
          {sections[2].category}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {sections[2].tools?.map((tool, i) => (
            <motion.div 
              key={tool.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              whileHover={{ y: -4, scale: 1.05 }}
              className="flex flex-col items-center gap-3 p-3 rounded-lg hover:bg-[#8b6230]/5 transition-colors duration-300 cursor-pointer group"
              title={tool.name}
            >
              <div className={`w-14 h-14 flex items-center justify-center border border-[#8b6230]/20 bg-white rounded-lg text-2xl group-hover:border-[#8b6230]/40 group-hover:shadow-md transition-all duration-300 text-[#3b1f06]`}>
                {tool.logo}
              </div>
              <span className="text-[9px] tracking-wider text-[#8b6230] font-semibold uppercase text-center leading-tight">
                {tool.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Competencies */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h3 className="text-[11px] tracking-[0.35em] uppercase text-[#8b6230] font-bold text-center">
          {sections[3].category}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {sections[3].skills?.map((skill, i) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.03 }}
            >
              <span 
                className="text-[11px] font-serif border border-[#8b6230]/15 px-3 py-2 bg-gradient-to-br from-white to-[#8b6230]/3 text-[#3b1f06] italic inline-block rounded-sm hover:border-[#8b6230]/30 hover:bg-[#8b6230]/5 transition-all duration-300 cursor-default"
              >
                {skill}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Signature */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center border-t border-[#8b6230]/10 pt-6"
      >
        <span className="text-2xl font-serif italic text-[#3b1f06]">Amr.</span>
      </motion.div>

      {/* Footer */}
      {/* <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center space-y-1 opacity-50"
      >
        <p className="text-[8px] font-serif tracking-[0.2em] text-[#8b6230] uppercase">
          Design & Development by <span className="font-bold">ASM Aiman</span>
        </p>
        <p className="text-[7px] font-serif italic text-[#8b6230]">
          © {new Date().getFullYear()} — Proprietary Archive
        </p>
      </motion.div> */}
    </div>
  );
}