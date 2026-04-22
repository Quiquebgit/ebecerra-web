"use client";

import { useState, useTransition } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const NAV_IDS = [
  { id: "servicios", key: "services" },
  { id: "casos", key: "cases" },
  { id: "sobre-mí", key: "about" },
  { id: "proceso", key: "process" },
  { id: "contacto", key: "contact" },
] as const;

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function LanguageSwitcher() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const other: Locale = locale === "es" ? "en" : "es";

  return (
    <button
      type="button"
      aria-label={t("language")}
      onClick={() =>
        startTransition(() => router.replace(pathname, { locale: other }))
      }
      disabled={isPending}
      className="text-[#aaa] text-[11px] font-mono tracking-[0.1em] px-2.5 py-1 rounded border border-[#222] hover:text-[#00ff88] hover:border-[#00ff88] uppercase transition-all duration-200 cursor-pointer disabled:opacity-50"
    >
      <span className={locale === "es" ? "text-[#00ff88]" : "text-[#555]"}>
        ES
      </span>
      <span className="text-[#333] mx-1">/</span>
      <span className={locale === "en" ? "text-[#00ff88]" : "text-[#555]"}>
        EN
      </span>
    </button>
  );
}

export default function Nav() {
  const t = useTranslations("nav");
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

      <div className="hidden md:flex items-center gap-1">
        {NAV_IDS.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="text-[#aaa] text-[13px] font-mono tracking-[0.05em] px-3 py-1.5 rounded hover:text-[#00ff88] hover:bg-[#00ff88]/[0.06] uppercase transition-all duration-200 cursor-pointer"
          >
            {t(item.key)}
          </button>
        ))}
        <div className="ml-2">
          <LanguageSwitcher />
        </div>
      </div>

      <div className="flex items-center gap-2 md:hidden">
        <LanguageSwitcher />
        <button
          className="flex flex-col gap-1 p-2 bg-transparent border-none cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label={t("menu")}
        >
          <span className="block w-5 h-[2px] bg-white transition-all" />
          <span className="block w-5 h-[2px] bg-white transition-all" />
          <span className="block w-5 h-[2px] bg-white transition-all" />
        </button>
      </div>

      {open && (
        <div className="fixed top-[60px] left-0 right-0 bg-[#080808]/95 backdrop-blur-[12px] flex flex-col items-center py-5 gap-1 md:hidden z-[99]">
          {NAV_IDS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                scrollTo(item.id);
                setOpen(false);
              }}
              className="text-[#aaa] text-[13px] font-mono tracking-[0.05em] px-3 py-2 rounded hover:text-[#00ff88] uppercase transition-all duration-200 w-full text-center cursor-pointer"
            >
              {t(item.key)}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
