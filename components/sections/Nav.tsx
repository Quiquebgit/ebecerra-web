"use client";

import { useState } from "react";
import { navItems } from "@/lib/content";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#080808]/90 backdrop-blur-[12px] border-b border-[#1a1a1a] px-[clamp(20px,5vw,80px)] flex items-center justify-between h-[60px]">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 bg-gradient-to-br from-[#00ff88] to-[#00ccff] rounded-[6px] flex items-center justify-center font-mono font-bold text-sm text-[#080808]">
          E
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-white font-medium text-[15px]">
            Enrique Becerra
          </span>
          <span className="text-[#666] text-[13px] font-mono">ebecerra.es</span>
        </div>
      </div>

      <div className="hidden md:flex gap-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="text-[#aaa] text-[13px] font-mono tracking-[0.05em] px-3 py-1.5 rounded hover:text-[#00ff88] hover:bg-[#00ff88]/[0.06] uppercase transition-all duration-200 cursor-pointer"
          >
            {item.label}
          </button>
        ))}
      </div>

      <button
        className="md:hidden flex flex-col gap-1 p-2 bg-transparent border-none cursor-pointer"
        onClick={() => setOpen(!open)}
        aria-label="Menú"
      >
        <span className="block w-5 h-[2px] bg-white transition-all" />
        <span className="block w-5 h-[2px] bg-white transition-all" />
        <span className="block w-5 h-[2px] bg-white transition-all" />
      </button>

      {open && (
        <div className="fixed top-[60px] left-0 right-0 bg-[#080808]/95 backdrop-blur-[12px] flex flex-col items-center py-5 gap-1 md:hidden z-[99]">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                scrollTo(item.id);
                setOpen(false);
              }}
              className="text-[#aaa] text-[13px] font-mono tracking-[0.05em] px-3 py-2 rounded hover:text-[#00ff88] uppercase transition-all duration-200 w-full text-center cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
