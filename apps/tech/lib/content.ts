import type { Locale } from "@/i18n/routing";
import type {
  Feature,
  ExperienceItem,
  Skill,
  Project,
} from "@ebecerra/sanity-client";

export type {
  Feature,
  ExperienceItem,
  Skill,
  ProjectLink,
  Project,
} from "@ebecerra/sanity-client";

export type FooterLink = { label: string; url: string };

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
      desc: "Diseño de sistemas escalables, mantenibles y migrables entre versiones",
    },
    {
      icon: "👨‍🏫",
      label: "Formación y comunidad",
      desc: "Coordinador del gremio VassNolia, formador de clientes y equipos internos",
    },
    {
      icon: "🔍",
      label: "Magnolia CMS",
      desc: "Associate Developer desde 2018 · 8 años en producción",
    },
    {
      icon: "🏛️",
      label: "Sector público",
      desc: "6 proyectos para AAPP: MAPA, SEPE, INECO, PAG, MECD, Bibliotecas",
    },
  ],
  experience: [
    {
      company: "VASS",
      role: "Tech Architect Lead",
      period: "mar 2024 – presente",
      tag: "actual",
      desc: "Arquitectura y liderazgo técnico en proyectos enterprise. Clientes destacados: CBNK (web comercial del banco, desarrollo y mantenimiento evolutivo), MAPA (migraciones y evolutivos de webs e intranets ministeriales) y Atradius (Blogs & Knowledge cross-site). Formación Magnolia a cliente, RFPs internacionales y soporte técnico transversal.",
    },
    {
      company: "VASS University",
      role: "Coordinador de gremio",
      period: "ago 2024 – presente",
      tag: "actual",
      desc: "Coordinador del gremio Magnolia DXP (VassNolia): programa formativo, documentación técnica, sesiones en directo y cursos internos.",
    },
    {
      company: "VASS",
      role: "Arquitecto de Software",
      period: "jun 2023 – mar 2024",
      tag: null,
      desc: "Arquitectura en proyectos Magnolia para dos cuentas clave: Faculty portal del Instituto de Empresa (alta de profesorado con clientes REST a servicios internos) e intranet de Prosegur (migraciones de versión e integraciones con APIs externas). Mentoring y formación interna.",
    },
    {
      company: "VASS",
      role: "Consultor / Analista Programador",
      period: "jul 2021 – oct 2023",
      tag: null,
      desc: "Desarrollo full stack y tutoría sobre Magnolia CMS. Faculty portal del Instituto de Empresa (proceso de alta de profesorado con clientes REST) y soporte evolutivo de la intranet de Prosegur (integraciones con APIs externas).",
    },
    {
      company: "Bilbomatica",
      role: "Analista Programador",
      period: "oct 2019 – jul 2021",
      tag: null,
      desc: "Proyectos Magnolia CMS para administración pública. Punto de Acceso General del Ministerio de Función Pública (web + aplicativo Java/Spring), web e intranet del Ministerio de Ciencia e Innovación (INECO/MCIN) from scratch, y chatbot del SEPE con integración a motor de IA de terceros.",
    },
    {
      company: "Bilbomatica",
      role: "Programador Sénior",
      period: "jul 2018 – abr 2019",
      tag: null,
      desc: "Desarrollo Magnolia sobre Apache Tomcat. Migraciones de versión y evolutivos de los portales del MECD, y generador automático de portales para la red de Bibliotecas Públicas: plantillas parametrizadas para desplegar sites independientes por biblioteca.",
    },
    {
      company: "Grupo Onetec",
      role: "Programador",
      period: "abr 2019 – sep 2019",
      tag: null,
      desc: "Asignado a Línea Directa Aseguradora. Nuevos flujos de alta de partes en el área motor de la web corporativa y migración de servicios SOAP legacy a REST.",
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
        "Juego de puzzles con fotos personales. Engine en Canvas, 8 idiomas (react-i18next) y empaquetado nativo para Android. Publicado en Google Play.",
      tech: ["React", "Vite", "Canvas API", "Capacitor", "Android", "i18next"],
      status: "beta",
      statusText: "beta disponible",
      links: [{ text: "$ ver_landing", href: "/piezas-game/", external: true }],
    },
    {
      id: "rpg",
      label: "web · IA · fan project",
      title: "Grand Line RPG",
      description:
        "Juego de rol narrativo en el universo de One Piece. Un LLM actúa como narrador adaptativo que responde a las decisiones del jugador y construye la historia en tiempo real.",
      tech: ["React", "TypeScript", "LLM API", "Vercel"],
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
      desc: "Scalable, maintainable systems designed to survive version migrations",
    },
    {
      icon: "👨‍🏫",
      label: "Training & community",
      desc: "Coordinator of the VassNolia guild, trainer for clients and internal teams",
    },
    {
      icon: "🔍",
      label: "Magnolia CMS",
      desc: "Associate Developer since 2018 · 8 years in production",
    },
    {
      icon: "🏛️",
      label: "Government sector",
      desc: "6 projects for Spanish government: MAPA, SEPE, INECO, PAG, MECD, Libraries",
    },
  ],
  experience: [
    {
      company: "VASS",
      role: "Tech Architect Lead",
      period: "Mar 2024 – present",
      tag: "current",
      desc: "Architecture and technical leadership on enterprise projects. Featured clients: CBNK (commercial banking website, build and ongoing maintenance), MAPA (migrations and enhancements of the ministry's portals and intranets) and Atradius (cross-site Blogs & Knowledge). Magnolia training for clients, international RFP contributions and cross-project technical support.",
    },
    {
      company: "VASS University",
      role: "Guild Coordinator",
      period: "Aug 2024 – present",
      tag: "current",
      desc: "Coordinator of the Magnolia DXP guild (VassNolia): training program, technical documentation, live sessions and internal courses.",
    },
    {
      company: "VASS",
      role: "Software Architect",
      period: "Jun 2023 – Mar 2024",
      tag: null,
      desc: "Architecture on Magnolia projects for two key accounts: IE Business School's Faculty portal (faculty onboarding with REST clients to internal services) and Prosegur's corporate intranet (version migrations and external API integrations). Internal mentoring and training.",
    },
    {
      company: "VASS",
      role: "Consultant / Analyst Programmer",
      period: "Jul 2021 – Oct 2023",
      tag: null,
      desc: "Full-stack development and mentoring on Magnolia CMS. IE Business School's Faculty portal (faculty onboarding process with REST clients) and ongoing support of Prosegur's corporate intranet (external API integrations).",
    },
    {
      company: "Bilbomatica",
      role: "Analyst Programmer",
      period: "Oct 2019 – Jul 2021",
      tag: null,
      desc: "Magnolia CMS projects for Spanish government. General Access Point of the Ministry of Civil Service (website + Java/Spring application), from-scratch website and intranet for the Ministry of Science and Innovation (INECO/MCIN), and SEPE chatbot with integration to a third-party AI engine.",
    },
    {
      company: "Bilbomatica",
      role: "Senior Developer",
      period: "Jul 2018 – Apr 2019",
      tag: null,
      desc: "Magnolia development on Apache Tomcat. Version migrations and enhancements of the MECD portals, and an automated portal generator for the Public Libraries network: parameterized templates to spin up independent sites per library.",
    },
    {
      company: "Grupo Onetec",
      role: "Developer",
      period: "Apr 2019 – Sep 2019",
      tag: null,
      desc: "Assigned to Línea Directa Aseguradora. New claim-filing flows for the motor insurance area of the corporate website and migration of legacy SOAP services to REST.",
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
        "Puzzle game with personal photos. Canvas engine, 8 languages (react-i18next) and native Android packaging. Live on Google Play.",
      tech: ["React", "Vite", "Canvas API", "Capacitor", "Android", "i18next"],
      status: "beta",
      statusText: "beta available",
      links: [{ text: "$ view_landing", href: "/piezas-game/", external: true }],
    },
    {
      id: "rpg",
      label: "web · AI · fan project",
      title: "Grand Line RPG",
      description:
        "Narrative role-playing game set in the One Piece universe. An LLM acts as an adaptive narrator that responds to player choices and builds the story in real time.",
      tech: ["React", "TypeScript", "LLM API", "Vercel"],
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
