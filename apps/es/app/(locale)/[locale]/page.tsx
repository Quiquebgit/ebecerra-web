import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getFallback } from "@/lib/content";
import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Case from "@/components/sections/Case";
import About from "@/components/sections/About";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export const revalidate = 3600;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fallback = getFallback(locale);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services services={fallback.services} />
        <About features={fallback.aboutFeatures} />
        <Case caseStudy={fallback.featuredCase} />
        <Process steps={fallback.processSteps} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
