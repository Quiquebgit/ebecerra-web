import type { Locale } from "@/i18n/routing";

export type Feature = { icon: string; label: string; desc: string };
export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  tag: string | null;
  desc: string;
};
export type Skill = { name: string; level: number };
export type ProjectLink = { text: string; href: string; external: boolean };
export type Project = {
  id: string;
  label: string;
  title: string;
  description: string;
  tech: string[];
  status: string;
  statusText: string;
  links: ProjectLink[];
};
export type FooterLink = { label: string; url: string };

// --- Fase 6+: tipos Sanity sin fallback ---

export type Service = {
  _id: string;
  title: string;
  slug: string;
  icon: string | null;
  summary: string;
  description: string | null;
  deliverables: string[];
  priceRange: string | null;
  priceNote: string | null;
  featured: boolean;
};

export type ProcessStep = {
  _id: string;
  title: string;
  description: string;
  icon: string | null;
  order: number;
};

export type CaseStudyMetric = { label: string; value: string };

export type SanityImage = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
  alt?: string;
  caption?: string;
};

// Portable Text block — tipado mínimo, se consume con @portabletext/react
export type PortableTextBlock = {
  _type: string;
  _key: string;
  [key: string]: unknown;
};

export type CaseStudySummary = {
  _id: string;
  title: string;
  slug: string;
  client: string | null;
  clientAnonymized: boolean;
  year: number | null;
  summary: string;
  cover: SanityImage | null;
  featured: boolean;
};

export type CaseStudy = CaseStudySummary & {
  problem: string | null;
  solution: string | null;
  outcome: string | null;
  metrics: CaseStudyMetric[];
  stack: { name: string }[];
  images: SanityImage[];
  body: PortableTextBlock[];
};

type Fallback = {
  aboutFeatures: Feature[];
  experience: ExperienceItem[];
  skills: Skill[];
  tags: string[];
  projects: Project[];
  footerLinks: FooterLink[];
};

const es: Fallback = {
  aboutFeatures: [
    {
      icon: "🏗️",
      label: "Arquitectura de Software",
      desc: "Diseño de sistemas escalables y mantenibles",
    },
    {
      icon: "👨‍🏫",
      label: "Formación técnica",
      desc: "Tutor, formador y coordinador de comunidades",
    },
    { icon: "🔍", label: "Magnolia CMS", desc: "Especialista certificado" },
    {
      icon: "⚙️",
      label: "Java & Spring",
      desc: "Backend sólido como base de todo lo demás",
    },
  ],
  experience: [
    {
      company: "VASS",
      role: "Tech Architect Lead",
      period: "mar 2024 – presente",
      tag: "actual",
      desc: "Definición de arquitectura, liderazgo técnico en análisis y nuevos proyectos. Tutor y formador en equipos.",
    },
    {
      company: "VASS University",
      role: "Coordinador de gremio",
      period: "ago 2024 – presente",
      tag: "actual",
      desc: "Coordinador del gremio Magnolia DXP (VassNolia). Gestión de formación, documentación, sesiones en directo, cursos y actividades del gremio.",
    },
    {
      company: "VASS",
      role: "Arquitecto de Software",
      period: "jun 2023 – mar 2024",
      tag: null,
      desc: "Soluciones técnicas, arquitectura y liderazgo en proyectos Magnolia CMS. Tutor y formador.",
    },
    {
      company: "VASS",
      role: "Consultor / Analista Programador",
      period: "jul 2021 – oct 2023",
      tag: null,
      desc: "Análisis funcional y técnico, desarrollo full stack, formación y tutoría en proyectos Magnolia.",
    },
    {
      company: "Bilbomatica",
      role: "Analista Programador",
      period: "oct 2019 – jul 2021",
      tag: null,
      desc: "Proyectos Magnolia CMS. Análisis técnico y funcional, desarrollo back y front, estimaciones y desarrollo en diferentes proyectos.",
    },
    {
      company: "Bilbomatica",
      role: "Programador Sénior",
      period: "jul 2018 – abr 2019",
      tag: null,
      desc: "Desarrollo en CMS Magnolia sobre Apache Tomcat. Análisis, desarrollo y mantenimiento de proyectos web.",
    },
  ],
  skills: [
    { name: "Magnolia CMS", level: 98 },
    { name: "Java", level: 95 },
    { name: "Architecture", level: 90 },
    { name: "Leadership", level: 92 },
    { name: "Spring", level: 85 },
    { name: "Agile", level: 90 },
    { name: "Mentoring", level: 88 },
    { name: "JavaScript", level: 75 },
    { name: "SQL", level: 80 },
    { name: "Groovy", level: 78 },
    { name: "FreeMarker", level: 82 },
    { name: "Artificial Intelligence", level: 65 },
  ],
  tags: [
    "Maven",
    "Docker",
    "Git",
    "SVN",
    "Jenkins",
    "REST",
    "WebServices",
    "SQL",
    "FreeMarker",
    "Groovy",
    "Accessibility",
    "Responsive",
  ],
  projects: [
    {
      id: "piezas",
      label: "mobile · puzzle",
      title: "Piezas",
      description:
        "Juego de puzzles con tus propias fotos. Sin anuncios, sin trucos. Una experiencia personal y relajante pensada para disfrutar en cualquier momento.",
      tech: ["React", "Capacitor", "Android Nativo"],
      status: "beta",
      statusText: "beta disponible",
      links: [{ text: "$ ver_landing", href: "/piezas-game/", external: true }],
    },
    {
      id: "rpg",
      label: "web · IA · fan project",
      title: "Grand Line RPG",
      description:
        "Juego de rol narrativo ambientado en el universo de One Piece. Los LLMs actúan como narradores adaptativos que responden a tus decisiones y construyen la historia en tiempo real.",
      tech: ["React", "LLM API", "Narrative AI"],
      status: "fan",
      statusText: "fan project · no comercial",
      links: [
        {
          text: "$ jugar →",
          href: "https://rpg-chat-game.vercel.app",
          external: true,
        },
      ],
    },
  ],
  footerLinks: [
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/enrique-becerra-garcia/",
    },
    { label: "Email", url: "mailto:quique.ebecerra@gmail.com" },
  ],
};

const en: Fallback = {
  aboutFeatures: [
    {
      icon: "🏗️",
      label: "Software Architecture",
      desc: "Design of scalable and maintainable systems",
    },
    {
      icon: "👨‍🏫",
      label: "Technical training",
      desc: "Mentor, trainer and community coordinator",
    },
    { icon: "🔍", label: "Magnolia CMS", desc: "Certified specialist" },
    {
      icon: "⚙️",
      label: "Java & Spring",
      desc: "Solid backend as the foundation for everything else",
    },
  ],
  experience: [
    {
      company: "VASS",
      role: "Tech Architect Lead",
      period: "Mar 2024 – present",
      tag: "current",
      desc: "Architecture definition, technical leadership in analysis and new projects. Team mentor and trainer.",
    },
    {
      company: "VASS University",
      role: "Guild Coordinator",
      period: "Aug 2024 – present",
      tag: "current",
      desc: "Coordinator of the Magnolia DXP guild (VassNolia). Training management, documentation, live sessions, courses and guild activities.",
    },
    {
      company: "VASS",
      role: "Software Architect",
      period: "Jun 2023 – Mar 2024",
      tag: null,
      desc: "Technical solutions, architecture and leadership on Magnolia CMS projects. Mentor and trainer.",
    },
    {
      company: "VASS",
      role: "Consultant / Analyst Programmer",
      period: "Jul 2021 – Oct 2023",
      tag: null,
      desc: "Functional and technical analysis, full-stack development, training and mentoring on Magnolia projects.",
    },
    {
      company: "Bilbomatica",
      role: "Analyst Programmer",
      period: "Oct 2019 – Jul 2021",
      tag: null,
      desc: "Magnolia CMS projects. Technical and functional analysis, back and front-end development, estimations and delivery across multiple projects.",
    },
    {
      company: "Bilbomatica",
      role: "Senior Developer",
      period: "Jul 2018 – Apr 2019",
      tag: null,
      desc: "Development on Magnolia CMS over Apache Tomcat. Analysis, development and maintenance of web projects.",
    },
  ],
  skills: [
    { name: "Magnolia CMS", level: 98 },
    { name: "Java", level: 95 },
    { name: "Architecture", level: 90 },
    { name: "Leadership", level: 92 },
    { name: "Spring", level: 85 },
    { name: "Agile", level: 90 },
    { name: "Mentoring", level: 88 },
    { name: "JavaScript", level: 75 },
    { name: "SQL", level: 80 },
    { name: "Groovy", level: 78 },
    { name: "FreeMarker", level: 82 },
    { name: "Artificial Intelligence", level: 65 },
  ],
  tags: [
    "Maven",
    "Docker",
    "Git",
    "SVN",
    "Jenkins",
    "REST",
    "WebServices",
    "SQL",
    "FreeMarker",
    "Groovy",
    "Accessibility",
    "Responsive",
  ],
  projects: [
    {
      id: "piezas",
      label: "mobile · puzzle",
      title: "Piezas",
      description:
        "A puzzle game with your own photos. No ads, no tricks. A personal, relaxing experience designed to enjoy anytime.",
      tech: ["React", "Capacitor", "Native Android"],
      status: "beta",
      statusText: "beta available",
      links: [{ text: "$ view_landing", href: "/piezas-game/", external: true }],
    },
    {
      id: "rpg",
      label: "web · AI · fan project",
      title: "Grand Line RPG",
      description:
        "Narrative role-playing game set in the One Piece universe. LLMs act as adaptive narrators that respond to your choices and build the story in real time.",
      tech: ["React", "LLM API", "Narrative AI"],
      status: "fan",
      statusText: "fan project · non-commercial",
      links: [
        {
          text: "$ play →",
          href: "https://rpg-chat-game.vercel.app",
          external: true,
        },
      ],
    },
  ],
  footerLinks: [
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/enrique-becerra-garcia/",
    },
    { label: "Email", url: "mailto:quique.ebecerra@gmail.com" },
  ],
};

export function getFallback(locale: Locale): Fallback {
  return locale === "en" ? en : es;
}
