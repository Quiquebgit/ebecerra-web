import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Case from "@/components/sections/Case";
import About from "@/components/sections/About";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import {
  getSiteData,
  getFeaturedServices,
  getProcessSteps,
  getFeaturedCaseStudies,
} from "@/lib/sanity/queries";
import { getFallback } from "@/lib/content";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

export const revalidate = 3600;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [sanity, sanityServices, sanitySteps, sanityCases] = await Promise.all([
    getSiteData(locale).catch(() => null),
    getFeaturedServices(locale).catch(() => []),
    getProcessSteps(locale).catch(() => []),
    getFeaturedCaseStudies(locale).catch(() => []),
  ]);
  const fallback = getFallback(locale);

  const featureItems = sanity?.aboutFeatures ?? fallback.aboutFeatures;
  const services = sanityServices.length > 0 ? sanityServices : fallback.services;
  const processSteps =
    sanitySteps.length > 0 ? sanitySteps : fallback.processSteps;
  const featuredCase = sanityCases[0]
    ? { ...sanityCases[0], metrics: [] }
    : fallback.featuredCase;

  return (
    <main>
      <Nav />
      <Hero />
      <Services services={services} />
      <Case caseStudy={featuredCase} />
      <About features={featureItems} />
      <Process steps={processSteps} />
      <Contact />
      <Footer links={fallback.footerLinks} />
    </main>
  );
}
