"use client";

import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "@/components/layout/RoomLayout";

export default function Contact() {
  const { darkMode } = useContext(ThemeContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  const gold = "#8b6230"; 
  const goldFaint = "rgba(139, 98, 48, 0.2)";
  const textColor = "#3b1f06";
  const placeholderColor = "rgba(139, 98, 48, 0.4)";

  const handleGmailDispatch = () => {
    const recipient = "amrarchitect1@gmail.com";
    const subject = encodeURIComponent(`Inquiry from ${name || "Visitor"}`);
    const body = encodeURIComponent(`Appellative: ${name}\nCommuniqué Pathway: ${email}\n\nIntentions:\n${message}`);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");
  };

  const inputStyle = (field: string) => ({
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${focused === field ? gold : goldFaint}`,
    color: textColor,
    outline: "none",
    fontFamily: "Cinzel, serif",
    fontSize: "11px",
    letterSpacing: "0.2em",
    padding: "8px 0",
    transition: "all 0.3s",
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full flex flex-col h-full"
    >
      <h2 className="text-[#3b1f06] text-xl font-serif italic border-b border-[#8b6230]/20 pb-2 mb-4">
        Inscribe a Message
      </h2>

      <div className="flex flex-col gap-4 flex-1 justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-[8px] tracking-[0.3em] text-[#8b6230]/70 uppercase font-serif">Appellative</label>
            <input 
              type="text" 
              placeholder="YOUR NAME" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              onFocus={() => setFocused("name")} 
              onBlur={() => setFocused(null)} 
              style={inputStyle("name")} 
            />
          </div>
          <div className="relative">
            <label className="text-[8px] tracking-[0.3em] text-[#8b6230]/70 uppercase font-serif">Pathway</label>
            <input 
              type="email" 
              placeholder="YOUR EMAIL" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              onFocus={() => setFocused("email")} 
              onBlur={() => setFocused(null)} 
              style={inputStyle("email")} 
            />
          </div>
        </div>

        <div className="relative">
          <label className="text-[8px] tracking-[0.3em] text-[#8b6230]/70 uppercase font-serif">Your Intentions</label>
          <textarea 
            placeholder="Write your message here..." 
            rows={3} 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            onFocus={() => setFocused("message")} 
            onBlur={() => setFocused(null)}
            style={{ 
              ...inputStyle("message"), 
              resize: "none", 
              fontSize: "12px", 
              lineHeight: "1.4",
              fontFamily: "Georgia, serif", 
              textTransform: "none" 
            } as React.CSSProperties}
          />
        </div>

        <div className="mt-2 flex flex-col items-center gap-2">
          <button
            onClick={handleGmailDispatch}
            className="w-full py-3 transition-all duration-300 border border-[#8b6230]/30 text-[#8b6230] text-[10px] tracking-[0.4em] uppercase font-serif hover:bg-[#8b6230]/5 hover:border-[#8b6230]"
          >
            Dispatch via Gmail
          </button>
        </div>

            {/* ── SOCIALS FOOTER ── */}
          <div className="flex justify-center gap-8 py-2">
            {/* LinkedIn */}
            <motion.a 
              whileHover={{ y: -2 }} 
              href="https://www.linkedin.com/in/amr-abdullah-b8a0622b1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#8b6230]/60 hover:text-[#3b1f06]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
              </svg>
            </motion.a>

            {/* Instagram */}
            <motion.a 
              whileHover={{ y: -2 }} 
              href="https://www.instagram.com/amrabdullah_mt?igsh=YWk5ajZ4NXl3ZGw2&utm_source=qr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#8b6230]/60 hover:text-[#3b1f06]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </motion.a>

    
          </div>

        {/* ── COPYRIGHT & ATTRIBUTION ──
        <div className="mt-2 text-center flex flex-col gap-1">
          <p className="text-[8px] font-serif tracking-[0.2em] text-[#8b6230]/50 uppercase">
            Design & Development by <span className="text-[#8b6230]/80 font-bold">ASM Aiman</span>
          </p>
          <p className="text-[7px] font-serif italic text-[#8b6230]/40">
            © {new Date().getFullYear()} — All rights reserved in perpetuity.
          </p>
        </div> */}
      </div>
    </motion.div>
  );
}