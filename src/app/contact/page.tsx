"use client";

import { useContext, useState } from "react";
import { motion, easeInOut } from "framer-motion";
import { ThemeContext } from "@/components/layout/RoomLayout";

const inkVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 1.5, ease: easeInOut } },
};

export default function Contact() {
  const { darkMode } = useContext(ThemeContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  const gold = darkMode ? "#c6a97a" : "#8a724d";
  const goldFaint = darkMode ? "rgba(198,169,122,0.25)" : "rgba(138,114,77,0.25)";
  const textColor = darkMode ? "#e7d8b4" : "#2a241b";
  const placeholderColor = darkMode ? "rgba(198,169,122,0.35)" : "rgba(138,114,77,0.35)";
  const bgColor = darkMode ? "rgba(10,8,5,0.6)" : "rgba(245,235,215,0.4)";

  // Optimized Gmail Deep Link Function
  const handleGmailDispatch = () => {
    const recipient = "amrarchitect1@gmail.com";
    const subject = encodeURIComponent(`Inquiry from ${name || "Visitor"}`);
    const body = encodeURIComponent(
      `Appellative: ${name}\nCommuniqué Pathway: ${email}\n\nIntentions:\n${message}`
    );
    
    // This URL bypasses default OS mail apps and goes straight to Gmail
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`;
    
    // Open in a new tab
    window.open(gmailUrl, "_blank");
  };

  const inputStyle = (field: string) => ({
    width: "100%",
    background: focused === field ? (darkMode ? "rgba(198,169,122,0.05)" : "rgba(138,114,77,0.05)") : bgColor,
    border: "none",
    borderBottom: `1px solid ${focused === field ? gold : goldFaint}`,
    color: textColor,
    outline: "none",
    fontFamily: "Cinzel, Playfair Display, serif",
    fontSize: "10px",
    letterSpacing: "0.35em",
    textTransform: "uppercase" as const,
    padding: "12px 4px",
    transition: "all 0.3s",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="h-full w-full flex items-center justify-center px-4 md:px-10 pt-24 md:pt-36 pb-10"
    >
      <div className="flex flex-col items-center w-full max-w-xl mx-auto">

        {/* ── Ink flourish header ── */}
        <div className="mb-6 md:mb-10 flex flex-col items-center">
          <svg width="120" height="24" viewBox="0 0 120 24" fill="none" className="mb-3 md:mb-5">
            <motion.path
              d="M10,12 Q30,4 60,12 Q90,20 110,12"
              stroke={gold}
              strokeWidth="0.8"
              fill="none"
              variants={inkVariants}
              initial="hidden"
              animate="visible"
            />
            <motion.path
              d="M20,12 Q40,18 60,12 Q80,6 100,12"
              stroke={gold}
              strokeWidth="0.4"
              strokeDasharray="3,4"
              fill="none"
              variants={inkVariants}
              initial="hidden"
              animate="visible"
            />
            <motion.circle cx="60" cy="12" r="2.5" fill={gold} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2, duration: 0.3 }} />
          </svg>
          <h2 className="text-2xl md:text-4xl font-light mb-2 text-center" style={{ color: textColor, fontFamily: "Cinzel, Playfair Display, serif", letterSpacing: "0.15em" }}>
            Inscribe Your Message
          </h2>
        </div>

        {/* ── Parchment container ── */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }} className="relative w-full"
          style={{
            background: darkMode
              ? "linear-gradient(180deg, rgba(15,10,5,0.85) 0%, rgba(10,7,3,0.9) 100%)"
              : "linear-gradient(180deg, rgba(245,238,220,0.85) 0%, rgba(235,225,200,0.9) 100%)",
            border: `1px solid ${goldFaint}`,
            padding: "2px",
          }}
        >
          <div className="absolute -top-[6px] left-4 right-4 h-3 rounded-t-full"
            style={{
              background: darkMode ? "linear-gradient(90deg, #0a0705, #1a1208, #0a0705)" : "linear-gradient(90deg, #e0d0b0, #f0e0c0, #e0d0b0)",
              border: `1px solid ${goldFaint}`, borderBottom: "none",
            }}
          />

          <div className="relative p-5 md:p-8" style={{ background: bgColor }}>
            {/* Corner ornaments */}
            {["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"].map((pos) => (
              <div key={pos} className={`absolute ${pos} w-5 h-5`}
                style={{
                  borderTop: pos.includes("bottom") ? "none" : `1px solid ${gold}`,
                  borderBottom: pos.includes("top") ? "none" : `1px solid ${gold}`,
                  borderLeft: pos.includes("right") ? "none" : `1px solid ${gold}`,
                  borderRight: pos.includes("left") ? "none" : `1px solid ${gold}`,
                  opacity: 0.5,
                }}
              />
            ))}

            <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-5 md:mb-7">
              <div className="flex-1 relative">
                <label className="block mb-1" style={{ color: gold, fontSize: "8px", letterSpacing: "0.3em", fontFamily: "Cinzel, serif" }}>APPELLATIVE</label>
                <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} style={inputStyle("name") as React.CSSProperties} />
                <style>{`input::placeholder { color: ${placeholderColor}; }`}</style>
              </div>
              <div className="flex-1 relative">
                <label className="block mb-1" style={{ color: gold, fontSize: "8px", letterSpacing: "0.3em", fontFamily: "Cinzel, serif" }}>COMMUNIQUÉ PATHWAY</label>
                <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} style={inputStyle("email") as React.CSSProperties} />
              </div>
            </div>

            <div className="mb-6 md:mb-8 relative">
              <label className="block mb-1" style={{ color: gold, fontSize: "8px", letterSpacing: "0.3em", fontFamily: "Cinzel, serif" }}>YOUR INTENTIONS</label>
              <textarea placeholder="Inscribe your message here..." rows={5} value={message} onChange={(e) => setMessage(e.target.value)} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                style={{ ...inputStyle("message"), resize: "none", borderBottom: "none", border: `1px solid ${focused === "message" ? gold : goldFaint}`, padding: "12px", lineHeight: "1.8" } as React.CSSProperties}
              />
            </div>

            <div className="flex flex-col items-center gap-3">
              <button
                onClick={handleGmailDispatch}
                className="relative group px-10 py-4 transition-all duration-400"
                style={{
                  color: gold, fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase",
                  border: `1.5px solid ${goldFaint}`, background: "transparent",
                  fontFamily: "Cinzel, serif", cursor: "pointer",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.letterSpacing = "0.5em"; e.currentTarget.style.borderColor = gold; }}
                onMouseLeave={(e) => { e.currentTarget.style.letterSpacing = "0.4em"; e.currentTarget.style.borderColor = goldFaint; }}
              >
                {["top-[-4px] left-[-4px]", "top-[-4px] right-[-4px]", "bottom-[-4px] left-[-4px]", "bottom-[-4px] right-[-4px]"].map((pos) => (
                  <span key={pos} className={`absolute ${pos} w-2 h-2 rounded-full`} style={{ background: gold, opacity: 0.6 }} />
                ))}
                DISPATCH VIA GMAIL
              </button>
              <p style={{ color: placeholderColor, fontSize: "7px", letterSpacing: "0.25em", fontFamily: "Cinzel, serif", textTransform: "uppercase" }}>
                ✦ Directly to amrarchitect1@gmail.com ✦
              </p>
            </div>
          </div>

          <div className="absolute -bottom-[6px] left-4 right-4 h-3 rounded-b-full"
            style={{
              background: darkMode ? "linear-gradient(90deg, #0a0705, #1a1208, #0a0705)" : "linear-gradient(90deg, #e0d0b0, #f0e0c0, #e0d0b0)",
              border: `1px solid ${goldFaint}`, borderTop: "none",
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}