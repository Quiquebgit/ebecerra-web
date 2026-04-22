"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("errors.generic");

  useEffect(() => {
    console.error("Locale error boundary:", error);
  }, [error]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <h1 className="text-3xl font-semibold">{t("title")}</h1>
      <p className="max-w-lg text-base opacity-80">{t("description")}</p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded border border-[#00ff88] bg-[#00ff88] px-5 py-2 font-semibold text-[#080808] transition hover:opacity-90"
        >
          {t("retry")}
        </button>
        <Link
          href="/"
          className="rounded border border-[#e0e0e0]/30 px-5 py-2 text-[#e0e0e0] transition hover:border-[#00ff88] hover:text-[#00ff88]"
        >
          {t("home")}
        </Link>
      </div>
    </main>
  );
}
