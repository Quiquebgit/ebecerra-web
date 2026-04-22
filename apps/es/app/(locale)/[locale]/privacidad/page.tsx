import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import PrivacyEs from "./PrivacyEs";
import PrivacyEn from "./PrivacyEn";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";
  return {
    title: isEs ? "Política de privacidad" : "Privacy policy",
    description: isEs
      ? "Cómo trato los datos personales que recoge ebecerra.es y los derechos que tienes sobre ellos."
      : "How ebecerra.es handles personal data and the rights you have over it.",
    robots: { index: true, follow: true },
    alternates: {
      canonical: isEs ? "/privacidad" : "/en/privacidad",
      languages: {
        es: "/privacidad",
        en: "/en/privacidad",
      },
    },
  };
}

export default async function PrivacidadPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Nav />
      <main id="main" className="px-[clamp(20px,5vw,80px)] py-[64px]">
        <article className="max-w-[760px] mx-auto prose-legal">
          {locale === "en" ? <PrivacyEn /> : <PrivacyEs />}
        </article>
      </main>
      <Footer />

      <style>{`
        .prose-legal h1 {
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.01em;
          margin-bottom: 8px;
        }
        .prose-legal .updated {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-muted);
          letter-spacing: 0.04em;
          margin-bottom: 32px;
          display: block;
        }
        .prose-legal h2 {
          font-size: 20px;
          font-weight: 600;
          color: var(--text);
          margin-top: 40px;
          margin-bottom: 12px;
        }
        .prose-legal p,
        .prose-legal li {
          font-size: 15px;
          line-height: 1.7;
          color: var(--text-secondary);
        }
        .prose-legal p {
          margin-bottom: 14px;
        }
        .prose-legal ul {
          padding-left: 20px;
          margin-bottom: 14px;
        }
        .prose-legal li {
          margin-bottom: 6px;
        }
        .prose-legal a {
          color: var(--cta);
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .prose-legal strong { color: var(--text); }
      `}</style>
    </>
  );
}
