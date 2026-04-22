import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

export const revalidate = 3600;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("scaffold");

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--s-8) var(--gutter)",
      }}
    >
      <div style={{ maxWidth: "52ch", textAlign: "center" }}>
        <p className="kicker" style={{ marginBottom: "var(--s-5)" }}>
          // Modo pro · scaffold
        </p>
        <h1 style={{ marginBottom: "var(--s-5)" }}>{t("title")}</h1>
        <p className="lead" style={{ marginBottom: "var(--s-4)" }}>
          {t("subtitle")}
        </p>
        <p style={{ color: "var(--text-muted)" }}>{t("note")}</p>
      </div>
    </main>
  );
}
