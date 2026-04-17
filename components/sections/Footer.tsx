import type { FooterLink } from "@/lib/content";

interface FooterProps {
  links: FooterLink[];
}

export default function Footer({ links }: FooterProps) {
  return (
    <footer className="border-t border-[#111] py-6 px-[clamp(20px,5vw,80px)]">
      <div className="flex flex-col items-center gap-2 w-full">
        <span className="text-[#666] text-xs font-mono">
          © 2026 ebecerra.es — hecho con ❤️ y con un poco de 🔍 y 🧪
        </span>
        <div className="flex gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              className="text-[#777] text-[13px] font-mono hover:text-[#00ff88] transition-colors duration-200 no-underline"
              target={link.url.startsWith("http") ? "_blank" : undefined}
              rel={
                link.url.startsWith("http") ? "noopener noreferrer" : undefined
              }
            >
              {link.label}
            </a>
          ))}
        </div>
        <span className="text-[#666] text-xs font-mono">
          v2.0.0 ·{" "}
          <span className="text-[#00ff88]">online</span>
        </span>
      </div>
    </footer>
  );
}
