import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("errors.notFound");

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <p className="font-mono text-sm text-[#00ff88]">404</p>
      <h1 className="text-3xl font-semibold">{t("title")}</h1>
      <p className="max-w-lg text-base opacity-80">{t("description")}</p>
      <Link
        href="/"
        className="rounded border border-[#00ff88] bg-[#00ff88] px-5 py-2 font-semibold text-[#080808] transition hover:opacity-90"
      >
        {t("home")}
      </Link>
    </main>
  );
}
