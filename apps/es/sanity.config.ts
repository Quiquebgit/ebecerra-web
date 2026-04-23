import { defineConfig } from "sanity";
import { structureTool, type StructureResolver } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { languageFilter } from "@sanity/language-filter";
import { schemaTypes, SINGLETON_TYPES } from "@ebecerra/sanity-schemas";

const singletonSet = new Set<string>(SINGLETON_TYPES);

const LOCALIZED_DOCUMENT_TYPES = [
  "experience",
  "skill",
  "techTag",
  "project",
  "profile",
  "service",
  "processStep",
  "caseStudy",
  "heroSection",
  "siteSettings",
  "serviceSectionMeta",
  "processSectionMeta",
  "casesSectionMeta",
  "contactSectionMeta",
  "faqPage",
  "faqItem",
  "legalPage",
];

const SINGLETON_DISABLED_ACTIONS = new Set([
  "create",
  "delete",
  "duplicate",
  "unpublish",
]);

// Estructura personalizada: singletons con documentId fijo agrupados,
// colecciones por tipo.
const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenido")
    .items([
      S.listItem()
        .title("Home")
        .child(
          S.list()
            .title("Home")
            .items([
              S.listItem()
                .title("Hero")
                .id("heroSection")
                .child(
                  S.document().schemaType("heroSection").documentId("heroSection")
                ),
              S.listItem()
                .title("Sección · Servicios")
                .id("serviceSectionMeta")
                .child(
                  S.document()
                    .schemaType("serviceSectionMeta")
                    .documentId("serviceSectionMeta")
                ),
              S.listItem()
                .title("Sección · Proceso")
                .id("processSectionMeta")
                .child(
                  S.document()
                    .schemaType("processSectionMeta")
                    .documentId("processSectionMeta")
                ),
              S.listItem()
                .title("Sección · Casos")
                .id("casesSectionMeta")
                .child(
                  S.document()
                    .schemaType("casesSectionMeta")
                    .documentId("casesSectionMeta")
                ),
              S.listItem()
                .title("Sección · Contacto")
                .id("contactSectionMeta")
                .child(
                  S.document()
                    .schemaType("contactSectionMeta")
                    .documentId("contactSectionMeta")
                ),
            ])
        ),
      S.listItem()
        .title("Ajustes")
        .child(
          S.list()
            .title("Ajustes")
            .items([
              S.listItem()
                .title("Ajustes del sitio")
                .id("siteSettings")
                .child(
                  S.document().schemaType("siteSettings").documentId("siteSettings")
                ),
              S.listItem()
                .title("Perfil")
                .id("profile")
                .child(S.document().schemaType("profile").documentId("profile")),
              S.listItem()
                .title("Página FAQ (meta)")
                .id("faqPage")
                .child(
                  S.document().schemaType("faqPage").documentId("faqPage")
                ),
            ])
        ),
      S.divider(),
      S.listItem()
        .title("Servicios")
        .schemaType("service")
        .child(S.documentTypeList("service").title("Servicios")),
      S.listItem()
        .title("Pasos del proceso")
        .schemaType("processStep")
        .child(S.documentTypeList("processStep").title("Pasos del proceso")),
      S.listItem()
        .title("Casos")
        .schemaType("caseStudy")
        .child(S.documentTypeList("caseStudy").title("Casos")),
      S.listItem()
        .title("FAQ — Preguntas")
        .schemaType("faqItem")
        .child(
          S.documentTypeList("faqItem")
            .title("FAQ — Preguntas")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),
      S.listItem()
        .title("Páginas legales")
        .schemaType("legalPage")
        .child(S.documentTypeList("legalPage").title("Páginas legales")),
      S.divider(),
      S.listItem()
        .title("Experiencia")
        .schemaType("experience")
        .child(S.documentTypeList("experience").title("Experiencia")),
      S.listItem()
        .title("Skills")
        .schemaType("skill")
        .child(S.documentTypeList("skill").title("Skills")),
      S.listItem()
        .title("Tech tags")
        .schemaType("techTag")
        .child(S.documentTypeList("techTag").title("Tech tags")),
      S.listItem()
        .title("Proyectos")
        .schemaType("project")
        .child(S.documentTypeList("project").title("Proyectos")),
    ]);

export default defineConfig({
  name: "ebecerra-web",
  title: "ebecerra.es",
  projectId: "gdtxcn4l",
  dataset: "production",
  basePath: "/studio",
  plugins: [
    structureTool({ structure }),
    visionTool(),
    languageFilter({
      supportedLanguages: [
        { id: "es", title: "Español" },
        { id: "en", title: "English" },
      ],
      defaultLanguages: ["es"],
      documentTypes: LOCALIZED_DOCUMENT_TYPES,
      filterField: (enclosingType, member, selectedLanguageIds) =>
        !enclosingType.name.startsWith("locale") ||
        ("name" in member && selectedLanguageIds.includes(member.name)),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  // Enforcement singleton: bloquear create/delete/duplicate/unpublish en los
  // tipos declarados como singleton. Una sola lista en un punto.
  document: {
    actions: (input, context) => {
      if (singletonSet.has(context.schemaType)) {
        return input.filter(
          ({ action }) => !!action && !SINGLETON_DISABLED_ACTIONS.has(action)
        );
      }
      return input;
    },
    // Prevenir crear nuevos docs de tipos singleton desde el "New document"
    // global (fuera del structure).
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter((template) => !singletonSet.has(template.templateId));
      }
      return prev;
    },
  },
});
