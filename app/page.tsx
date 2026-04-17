import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import {
  aboutFeatures,
  experience,
  skills,
  tags,
  projects,
  footerLinks,
} from "@/lib/content";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About features={aboutFeatures} />
      <Experience items={experience} />
      <Skills skills={skills} tags={tags} />
      <Projects items={projects} />
      <Contact />
      <Footer links={footerLinks} />
    </main>
  );
}
