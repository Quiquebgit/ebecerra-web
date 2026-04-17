export type NavItem = { label: string; id: string };
export type TerminalLine = { delay: number; type: "cmd" | "out"; text: string };
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

export const navItems: NavItem[] = [
  { label: "sobre mí", id: "sobre-mí" },
  { label: "experiencia", id: "experiencia" },
  { label: "skills", id: "skills" },
  { label: "proyectos", id: "proyectos" },
  { label: "contacto", id: "contacto" },
];

export const terminalLines: TerminalLine[] = [
  { delay: 0, type: "cmd", text: "whoami" },
  { delay: 400, type: "out", text: "enrique becerra — tech architect" },
  { delay: 1200, type: "cmd", text: "cat role.txt" },
  { delay: 1600, type: "out", text: "arquitecto de software @ VASS" },
  { delay: 2400, type: "cmd", text: "./skills --top 3" },
  { delay: 2800, type: "out", text: "magnolia_cms, java, architecture" },
  { delay: 3200, type: "cmd", text: "echo $status" },
  { delay: 3600, type: "out", text: "> abierto a proyectos freelance" },
];

export const terminalCommands: Record<string, () => string> = {
  help: () =>
    "Comandos: whoami, cat role.txt, ./skills --top, echo $status, pwd, ls, exit, git blame",
  whoami: () => "enrique becerra — tech architect @ VASS",
  "cat role.txt": () => "arquitecto de software, formador, geek empedernido",
  "./skills --top": () => "magnolia_cms [98%], java [95%], architecture [90%]",
  "echo $status": () => "> abierto a proyectos freelance",
  pwd: () => "/home/enrique/universe/earth/spain/madrid",
  ls: () => "proyectos/  skills/  experiencia/  contacto/  easter_eggs/",
  exit: () => "nice try 😏",
  "git blame": () => "todo lo bueno → enrique, todo lo malo → el café",
};

export const aboutFeatures: Feature[] = [
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
];

export const experience: ExperienceItem[] = [
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
];

export const skills: Skill[] = [
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
];

export const tags: string[] = [
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
];

export const projects: Project[] = [
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
];

export const footerLinks: FooterLink[] = [
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/enrique-becerra-garcia/",
  },
  { label: "Email", url: "mailto:quique.ebecerra@gmail.com" },
];
