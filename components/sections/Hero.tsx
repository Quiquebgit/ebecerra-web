"use client";

import { useState, useEffect, useRef } from "react";
import { terminalLines, terminalCommands, type TerminalLine } from "@/lib/content";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function TerminalHero() {
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([]);
  const [userLines, setUserLines] = useState<TerminalLine[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [isWaiting, setIsWaiting] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    terminalLines.forEach((line, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines((prev) => [...prev, line]);
          if (i === terminalLines.length - 1) {
            setTimeout(() => setIsWaiting(false), 400);
          }
        }, line.delay)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [visibleLines, userLines]);

  function handleCommand(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    let response: string;
    if (terminalCommands[cmd]) {
      response = terminalCommands[cmd]();
    } else if (cmd.startsWith("cd ")) {
      response = "bash: cd: no puedes escapar de aquí 🔒";
    } else if (cmd.startsWith("sudo")) {
      response = "este portfolio no ejecuta como root 🙅";
    } else if (cmd.startsWith("rm")) {
      response = "rm: operation not permitted (nice try) 😅";
    } else {
      response = `comando no encontrado: ${cmd}. Escribe 'help' para ver los comandos.`;
    }

    setUserLines((prev) => [
      ...prev,
      { delay: 0, type: "cmd", text: cmd },
      { delay: 0, type: "out", text: response },
    ]);
    setInputVal("");
  }

  const allLines = [...visibleLines, ...userLines];

  return (
    <div className="bg-[#0d0d0d] border border-[#333] rounded-[10px] font-mono overflow-hidden max-w-[620px] w-full shadow-[0_0_60px_rgba(0,255,136,0.08)]">
      <div className="bg-[#1a1a1a] px-4 py-2.5 flex items-center gap-2 border-b border-[#2a2a2a]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        <span className="ml-3 text-[#555] text-xs">~/portfolio</span>
      </div>
      <div
        ref={contentRef}
        className="p-6 min-h-[220px] max-h-[320px] overflow-y-auto"
      >
        {allLines.map((line, i) => (
          <div
            key={i}
            className={`mb-1 text-sm leading-[1.8] animate-fade-in-line ${
              line.type === "cmd" ? "text-[#00ff88]" : "text-[#c8c8c8]"
            }`}
          >
            {line.type === "cmd" && (
              <span className="text-[#555]">→ </span>
            )}
            {line.text}
          </div>
        ))}
        {isWaiting ? (
          <span className="text-[#00ff88] text-sm animate-blink">█</span>
        ) : (
          <div className="flex items-center text-sm mt-1">
            <span className="text-[#555]">→ </span>
            <input
              ref={inputRef}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleCommand}
              className="bg-transparent border-none text-[#e0e0e0] font-mono text-sm outline-none flex-1 ml-1"
              placeholder="escribe un comando..."
              autoFocus
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center px-[clamp(20px,5vw,80px)] pt-20 pb-10 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,136,0.08)_0%,rgba(0,204,255,0.05)_40%,transparent_70%)]" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,136,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
        }}
      />

      <div className="max-w-[1100px] w-full mx-auto relative">
        <div className="flex items-center gap-[60px] flex-wrap">
          <div className="flex-1 min-w-[280px]">
            <div className="text-[#00ff88] font-mono text-[13px] tracking-[0.15em] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse-glow" />
              DISPONIBLE
            </div>
            <h1 className="text-[clamp(36px,6vw,72px)] font-bold leading-[1.05] tracking-tight text-white mb-5">
              Enrique
              <br />
              <span className="bg-gradient-to-r from-[#00ff88] to-[#00ccff] bg-clip-text text-transparent">
                Becerra
              </span>
            </h1>
            <p className="text-lg text-[#888] leading-relaxed max-w-[440px] mb-8">
              Tech Architect Lead — construyo software que funciona, forma
              equipos y perdura.
            </p>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => scrollTo("contacto")}
                className="bg-transparent border border-[#00ff88] text-[#00ff88] px-7 py-3 rounded-md font-mono text-[13px] tracking-[0.05em] hover:bg-[#00ff88]/10 hover:shadow-[0_0_20px_rgba(0,255,136,0.2)] transition-all duration-200 cursor-pointer"
              >
                → contactar
              </button>
              <button
                onClick={() => scrollTo("proyectos")}
                className="bg-transparent border border-[#333] text-[#888] px-7 py-3 rounded-md font-mono text-[13px] tracking-[0.05em] hover:text-[#00ff88] hover:border-[#00ff88] hover:bg-[#00ff88]/10 transition-all duration-200 cursor-pointer"
              >
                → ver proyectos
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-[300px] flex justify-center">
            <TerminalHero />
          </div>
        </div>
      </div>
    </section>
  );
}
