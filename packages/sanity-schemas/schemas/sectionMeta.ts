import { defineType, defineField, type FieldDefinition } from "sanity";

const baseSectionMetaFields = (): FieldDefinition[] => [
  defineField({
    name: "kicker",
    title: "Kicker (línea superior)",
    type: "localeString",
  }),
  defineField({
    name: "title",
    title: "Título",
    type: "localeString",
  }),
  defineField({
    name: "lead",
    title: "Subtítulo / intro",
    type: "localeText",
  }),
];

export const serviceSectionMeta = defineType({
  name: "serviceSectionMeta",
  title: "Sección Servicios (meta)",
  type: "document",
  fields: [
    ...baseSectionMetaFields(),
    defineField({
      name: "auditStrip",
      title: "Audit strip (banner bajo grid)",
      type: "object",
      fields: [
        defineField({
          name: "kicker",
          title: "Kicker",
          type: "localeString",
        }),
        defineField({
          name: "body",
          title: "Cuerpo",
          type: "localeText",
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Sección Servicios (meta)" }) },
});

export const processSectionMeta = defineType({
  name: "processSectionMeta",
  title: "Sección Proceso (meta)",
  type: "document",
  fields: baseSectionMetaFields(),
  preview: { prepare: () => ({ title: "Sección Proceso (meta)" }) },
});

export const casesSectionMeta = defineType({
  name: "casesSectionMeta",
  title: "Sección Casos (meta)",
  type: "document",
  fields: baseSectionMetaFields(),
  preview: { prepare: () => ({ title: "Sección Casos (meta)" }) },
});

export const contactSectionMeta = defineType({
  name: "contactSectionMeta",
  title: "Sección Contacto (meta)",
  type: "document",
  fields: baseSectionMetaFields(),
  preview: { prepare: () => ({ title: "Sección Contacto (meta)" }) },
});
