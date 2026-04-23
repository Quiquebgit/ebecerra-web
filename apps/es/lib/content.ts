import type { Locale } from "@/i18n/routing";
import type {
  Feature,
  Service,
  ProcessStep,
  CaseStudySummary,
  CaseStudyMetric,
} from "@ebecerra/sanity-client";

export type { Feature, Service, ProcessStep, CaseStudySummary, CaseStudyMetric };

export type FooterLink = { label: string; url: string; external?: boolean };

export type FeaturedCase = CaseStudySummary & {
  metrics: CaseStudyMetric[];
};

export type CaseCard = {
  _id: string;
  slug: string;
  sector: string;
  title: string;
  context: string;
  solution: string;
  result: string;
  translatesTo: string;
  metrics: CaseStudyMetric[];
};

type Fallback = {
  services: Service[];
  processSteps: ProcessStep[];
  featuredCase: FeaturedCase | null;
  cases: CaseCard[];
  aboutFeatures: Feature[];
  footerLinks: FooterLink[];
};

const es: Fallback = {
  services: [
    {
      _id: "fallback-service-web-presencia",
      title: "Web profesional para tu negocio",
      slug: "web-presencia",
      icon: "🌐",
      summary:
        "Tu negocio online con una web propia, rápida y clara. Para que quien te busque en Google te encuentre y te pueda contactar sin complicaciones.",
      description: null,
      deliverables: [
        "diseño a medida, sin plantillas copiadas",
        "se ve bien en móvil y en ordenador",
        "formulario de contacto que llega a tu email",
        "dominio, alojamiento y puesta en marcha",
        "3 meses de soporte tras la entrega",
      ],
      priceRange: "900 €",
      priceNote: "Rango orientativo. Presupuesto cerrado tras una primera conversación.",
      featured: true,
    },
    {
      _id: "fallback-service-web-cms",
      title: "Web que actualizas tú solo",
      slug: "web-editable",
      icon: "✏️",
      summary:
        "Cambias textos, fotos y noticias sin llamarme a mí ni a nadie. Aprendes en una tarde y tu web sigue viva aunque yo no esté.",
      description: null,
      deliverables: [
        "panel sencillo para editar páginas",
        "subes fotos y textos sin saber diseño",
        "creas páginas nuevas tú mismo",
        "una sesión de 1h de formación práctica",
      ],
      priceRange: "1.500 €",
      priceNote: "Rango orientativo. Presupuesto cerrado tras una primera conversación.",
      featured: true,
    },
    {
      _id: "fallback-service-migracion",
      title: "Rescate de tu web actual",
      slug: "rescate-web",
      icon: "🛟",
      summary:
        "¿Tu web va lenta, se rompe cada mes o nadie sabe actualizarla? La rehago desde cero sin que pierdas posición en Google ni contenido.",
      description: null,
      deliverables: [
        "revisión de lo que ya tienes",
        "traslado sin perder visitas ni posicionamiento",
        "web nueva más rápida y fácil de mantener",
        "aviso a Google para que no te penalice el cambio",
      ],
      priceRange: "2.500 €",
      priceNote: "Rango orientativo. Presupuesto cerrado tras revisar tu web actual.",
      featured: true,
    },
    {
      _id: "fallback-service-mantenimiento",
      title: "Mantenimiento mensual",
      slug: "mantenimiento",
      icon: "🔧",
      summary:
        "Tu web siempre al día. Alojamiento, copias de seguridad, pequeños cambios y alguien a quien llamar cuando algo no funciona.",
      description: null,
      deliverables: [
        "alojamiento y dominio incluidos",
        "copias de seguridad diarias",
        "actualizaciones de seguridad al día",
        "cambios pequeños incluidos cada mes",
        "respuesta rápida si algo falla",
      ],
      priceRange: "60 €/mes",
      priceNote: "Sin permanencia. Bajas cuando quieras.",
      featured: true,
    },
  ],
  processSteps: [
    {
      _id: "fallback-step-1",
      title: "Conversación",
      description:
        "Me escribes, hablamos 30 minutos y entiendo qué necesitas, qué restricciones tienes y en qué plazo. Sin compromiso.",
      icon: "💬",
      order: 1,
    },
    {
      _id: "fallback-step-2",
      title: "Propuesta cerrada",
      description:
        "Te mando alcance, hitos semanales y presupuesto cerrado. Si hay riesgo lo marco; si algo no merece la pena, te lo digo.",
      icon: "📋",
      order: 2,
    },
    {
      _id: "fallback-step-3",
      title: "Construcción con avances",
      description:
        "Diseño y desarrollo con entorno de preview desde la semana 1. Tú ves cada avance, yo ejecuto, decides sobre algo tangible.",
      icon: "🔨",
      order: 3,
    },
    {
      _id: "fallback-step-4",
      title: "Entrega y autonomía",
      description:
        "Te entrego la web en producción, formación de uso para tu equipo y 3 meses de soporte incluidos. Después sigues teniéndome a un email.",
      icon: "🚀",
      order: 4,
    },
  ],
  featuredCase: null,
  cases: [
    {
      _id: "case-cms-financiero",
      slug: "plataforma-cms-financiero",
      sector: "Sector financiero · web corporativa",
      title: "Plataforma web corporativa con CMS profesional",
      context:
        "Organización de tamaño medio-grande en el sector financiero. Equipo de marketing interno que necesitaba mantener y evolucionar la web sin dependencia constante del equipo de desarrollo.",
      solution:
        "Web construida sobre CMS profesional con plantillas a medida, componentes reutilizables, permisos por rol y previsualización antes de publicar. Formación al equipo de contenidos para autonomía completa.",
      result:
        "El equipo de marketing publica páginas nuevas el mismo día. Los desarrollos se concentran en mejoras reales, no en mantenimiento de contenido.",
      translatesTo:
        "Cualquier negocio con catálogo, blog o secciones que cambian cada mes puede operar así. La diferencia es el volumen, no la filosofía.",
      metrics: [
        { label: "rol", value: "Líder técnico" },
        { label: "stack", value: "Magnolia · Java" },
      ],
    },
    {
      _id: "case-migracion-seo",
      slug: "migracion-portal-sin-perder-seo",
      sector: "Sector público · migración de portal",
      title: "Migración de portal institucional sin perder posicionamiento",
      context:
        "Portal con años de historia, miles de páginas indexadas, tráfico orgánico crítico y una plataforma antigua que ya no se podía mantener.",
      solution:
        "Migración planificada por fases. Análisis previo de URLs, contenido y funcionalidad. Redirecciones 301 sistemáticas. Coexistencia controlada durante el cambio y auditoría post-migración.",
      result:
        "Cero pérdida de posiciones SEO medibles. Contenido migrado con estructura limpia. Plataforma nueva que el equipo puede mantener.",
      translatesTo:
        "El mismo proceso funciona a escala pequeña. Una web con 100 entradas sobre un CMS tradicional migrada a una plataforma moderna sigue el mismo playbook que una con 10.000.",
      metrics: [
        { label: "pérdida SEO", value: "0%" },
        { label: "URLs migradas", value: "miles" },
      ],
    },
    {
      _id: "case-generador-multisede",
      slug: "generador-portales-multi-sede",
      sector: "Red institucional · multi-sede",
      title: "Generador automático de portales multi-sede",
      context:
        "Red institucional con cientos de sedes independientes que necesitaban cada una su propia web, con identidad visual común pero contenido local.",
      solution:
        "Generador de portales desplegado sobre una plataforma central. Plantillas parametrizadas; cada sede con URL propia, contenido editable por su responsable local y diseño coherente con la marca común.",
      result:
        "Cientos de portales desplegados. Mantenimiento centralizado — un cambio de plantilla aplica a todos. Autonomía editorial por sede.",
      translatesTo:
        "Cadenas de franquicias, academias con varias sedes, agencias inmobiliarias multi-oficina, SaaS con producto white-label. Cuando tienes «muchos iguales con pequeñas diferencias», una plataforma multi-tenant se paga en meses.",
      metrics: [
        { label: "sedes", value: "cientos" },
        { label: "mantenimiento", value: "centralizado" },
      ],
    },
  ],
  aboutFeatures: [
    {
      icon: "🏛️",
      label: "Rigor enterprise a tu escala",
      desc: "8 años construyendo webs para organizaciones que no pueden permitirse que su web falle. Mismo oficio adaptado a tu negocio.",
    },
    {
      icon: "🔌",
      label: "Integraciones que sobreviven",
      desc: "Conecto tu web con CRM, ERP, pasarelas o mailing con el mismo patrón que he usado en intranets corporativas con sistemas heterogéneos.",
    },
    {
      icon: "🧭",
      label: "Criterio antes que código",
      desc: "Decisiones arquitectónicas claras antes de empezar. Menos revertir después, menos sorpresas en la factura.",
    },
  ],
  footerLinks: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/enrique-becerra-garcia/", external: true },
    { label: "Email", url: "mailto:contacto@ebecerra.es" },
  ],
};

const en: Fallback = {
  services: [
    {
      _id: "fallback-service-web-presencia",
      title: "Professional website for your business",
      slug: "web-presencia",
      icon: "🌐",
      summary:
        "Your business online with a fast, clear site of your own. So anyone who searches for you on Google finds you and can get in touch without friction.",
      description: null,
      deliverables: [
        "custom design, no copy-paste templates",
        "looks good on mobile and desktop",
        "contact form that lands in your inbox",
        "domain, hosting and go-live included",
        "3 months of support after delivery",
      ],
      priceRange: "€900",
      priceNote: "Starting estimate. Fixed quote after a first conversation.",
      featured: true,
    },
    {
      _id: "fallback-service-web-cms",
      title: "A website you can update yourself",
      slug: "web-editable",
      icon: "✏️",
      summary:
        "Change text, photos and news without calling me or anyone else. You learn it in one afternoon and your site keeps living even when I'm not around.",
      description: null,
      deliverables: [
        "simple panel to edit pages",
        "upload photos and text without design skills",
        "create new pages yourself",
        "one 1-hour hands-on training session",
      ],
      priceRange: "€1,500",
      priceNote: "Starting estimate. Fixed quote after a first conversation.",
      featured: true,
    },
    {
      _id: "fallback-service-migracion",
      title: "Rescue of your current website",
      slug: "rescate-web",
      icon: "🛟",
      summary:
        "Is your site slow, breaking every month or impossible to update? I rebuild it from scratch without you losing your Google ranking or your content.",
      description: null,
      deliverables: [
        "review of what you already have",
        "move over without losing traffic or ranking",
        "new site that's faster and easier to maintain",
        "Google notified so the change doesn't hurt you",
      ],
      priceRange: "€2,500",
      priceNote: "Starting estimate. Fixed quote after reviewing your current site.",
      featured: true,
    },
    {
      _id: "fallback-service-mantenimiento",
      title: "Monthly maintenance",
      slug: "mantenimiento",
      icon: "🔧",
      summary:
        "Your site always up to date. Hosting, backups, small changes and someone you can call when something goes wrong.",
      description: null,
      deliverables: [
        "hosting and domain included",
        "daily backups",
        "security updates handled",
        "small changes included every month",
        "quick response if anything breaks",
      ],
      priceRange: "€60/mo",
      priceNote: "No lock-in. Cancel whenever you want.",
      featured: true,
    },
  ],
  processSteps: [
    {
      _id: "fallback-step-1",
      title: "Conversation",
      description:
        "You reach out, we talk for 30 minutes and I understand what you need, what constraints you have and the timeline. No strings attached.",
      icon: "💬",
      order: 1,
    },
    {
      _id: "fallback-step-2",
      title: "Closed proposal",
      description:
        "You get scope, weekly milestones and a closed budget. If there's risk I flag it; if something isn't worth doing, I say so.",
      icon: "📋",
      order: 2,
    },
    {
      _id: "fallback-step-3",
      title: "Build with weekly progress",
      description:
        "Design and development with a preview environment from week 1. You see every step, I execute, you decide on something tangible.",
      icon: "🔨",
      order: 3,
    },
    {
      _id: "fallback-step-4",
      title: "Delivery and autonomy",
      description:
        "Live website, hands-on training for your team and 3 months of support included. After that I'm still one email away.",
      icon: "🚀",
      order: 4,
    },
  ],
  featuredCase: null,
  cases: [
    {
      _id: "case-cms-financiero",
      slug: "plataforma-cms-financiero",
      sector: "Financial sector · corporate site",
      title: "Corporate web platform with a professional CMS",
      context:
        "Mid-to-large organization in the financial sector. Internal marketing team that needed to maintain and grow the site without constant dependency on the development team.",
      solution:
        "Website built on a professional CMS with tailored templates, reusable components, role-based permissions and preview before publish. Content team training for full autonomy.",
      result:
        "The marketing team ships new pages the same day. Development focuses on real improvements, not on content maintenance.",
      translatesTo:
        "Any business with a catalog, blog or sections that change monthly can operate this way. The difference is volume, not philosophy.",
      metrics: [
        { label: "role", value: "Tech lead" },
        { label: "stack", value: "Magnolia · Java" },
      ],
    },
    {
      _id: "case-migracion-seo",
      slug: "migracion-portal-sin-perder-seo",
      sector: "Public sector · portal migration",
      title: "Institutional portal migration with zero SEO loss",
      context:
        "Portal with years of history, thousands of indexed pages, critical organic traffic and a legacy platform that could no longer be maintained.",
      solution:
        "Phased migration. Upfront audit of URLs, content and functionality. Systematic 301 redirects. Controlled coexistence during the switch and a post-migration audit.",
      result:
        "Zero measurable SEO position loss. Content migrated with clean structure. New platform the team can maintain.",
      translatesTo:
        "The same process works at small scale. A legacy-CMS site with 100 posts migrated to a modern platform follows the same playbook as one with 10,000.",
      metrics: [
        { label: "SEO loss", value: "0%" },
        { label: "URLs migrated", value: "thousands" },
      ],
    },
    {
      _id: "case-generador-multisede",
      slug: "generador-portales-multi-sede",
      sector: "Institutional network · multi-site",
      title: "Automatic multi-site portal generator",
      context:
        "Institutional network with hundreds of independent branches, each needing its own website with a shared visual identity and local content.",
      solution:
        "Portal generator deployed on a central platform. Parameterized templates; each branch gets its own URL, content editable by its local owner and design consistent with the shared brand.",
      result:
        "Hundreds of portals deployed. Centralized maintenance — one template change applies to all. Editorial autonomy per branch.",
      translatesTo:
        "Franchise chains, academies with several branches, multi-office real-estate agencies, white-label SaaS. When you have 'many alike with small differences', a multi-tenant platform pays for itself in months.",
      metrics: [
        { label: "branches", value: "hundreds" },
        { label: "maintenance", value: "centralized" },
      ],
    },
  ],
  aboutFeatures: [
    {
      icon: "🏛️",
      label: "Enterprise rigor at your scale",
      desc: "8 years building websites for organizations that can't afford their site to fail. Same craft, scaled to your business.",
    },
    {
      icon: "🔌",
      label: "Integrations that survive",
      desc: "I connect your site with CRM, ERP, payment gateways or mailing using the same pattern proven on corporate intranets with heterogeneous systems.",
    },
    {
      icon: "🧭",
      label: "Judgment before code",
      desc: "Clear architectural decisions before we start. Less to revert later, fewer surprises on the invoice.",
    },
  ],
  footerLinks: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/enrique-becerra-garcia/", external: true },
    { label: "Email", url: "mailto:contacto@ebecerra.es" },
  ],
};

export function getFallback(locale: Locale): Fallback {
  return locale === "en" ? en : es;
}
