"use client";

import nextDynamic from "next/dynamic";

export const dynamic = "force-dynamic";

const StudioClient = nextDynamic(
  async () => {
    const { NextStudio } = await import("next-sanity/studio");
    const { default: config } = await import("@/sanity.config");
    const SanityStudio = () => <NextStudio config={config} />;
    SanityStudio.displayName = "SanityStudio";
    return SanityStudio;
  },
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-[#101112] flex items-center justify-center text-[#666] font-mono text-sm">
        Cargando Sanity Studio…
      </div>
    ),
  }
);

export default function StudioPage() {
  return <StudioClient />;
}
