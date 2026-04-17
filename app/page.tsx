import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { getSiteData } from "@/lib/sanity/queries";
import * as content from "@/lib/content";

export const revalidate = 3600;

export default async function Home() {
  const sanity = await getSiteData().catch(() => null);

  const experienceItems = sanity?.experience ?? content.experience;
  const skillItems = sanity?.skills ?? content.skills;
  const tagItems = sanity?.tags ?? content.tags;
  const projectItems = sanity?.projects ?? content.projects;
  const featureItems = sanity?.aboutFeatures ?? content.aboutFeatures;

  return (
    <main>
      <Nav />
      <Hero />
      <About features={featureItems} />
      <Experience items={experienceItems} />
      <Skills skills={skillItems} tags={tagItems} />
      <Projects items={projectItems} />
      <Contact />
      <Footer links={content.footerLinks} />
    </main>
  );
}
