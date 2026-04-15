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

  const gold = "#8b6230"; // Archaic ink color for the book
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
      <h2 className="text-[#3b1f06] text-xl font-serif italic border-b border-[#8b6230]/20 pb-2 mb-6">
        Inscribe a Message
      </h2>

      <div className="flex flex-col gap-5 flex-1 justify-center">
        {/* Row 1: Name & Email */}
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

        {/* Message Area */}
        <div className="relative">
          <label className="text-[8px] tracking-[0.3em] text-[#8b6230]/70 uppercase font-serif">Your Intentions</label>
          <textarea 
            placeholder="Write your message here..." 
            rows={4} 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            onFocus={() => setFocused("message")} 
            onBlur={() => setFocused(null)}
            style={{ 
              ...inputStyle("message"), 
              resize: "none", 
              fontSize: "12px", 
              lineHeight: "1.6",
              fontFamily: "Georgia, serif", 
              textTransform: "none" 
            } as React.CSSProperties}
          />
        </div>

        {/* Dispatch Button */}
        <div className="mt-4 flex flex-col items-center gap-2">
          <button
            onClick={handleGmailDispatch}
            className="w-full py-3 transition-all duration-300 border border-[#8b6230]/30 text-[#8b6230] text-[10px] tracking-[0.4em] uppercase font-serif hover:bg-[#8b6230]/5 hover:border-[#8b6230]"
          >
            Dispatch via Gmail
          </button>
          <p className="text-[7px] tracking-widest text-[#8b6230]/40 uppercase italic">
            ✦ Direct to amrarchitect1@gmail.com ✦
          </p>
        </div>
      </div>
    </motion.div>
  );
}