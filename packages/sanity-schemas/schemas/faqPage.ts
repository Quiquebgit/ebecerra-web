import { defineType, defineField } from "sanity";

export default defineType({
  name: "faqPage",
  title: "Página FAQ (meta)",
  type: "document",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "localeString",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "localeString",
    }),
    defineField({
      name: "kicker",
      title: "Kicker",
      type: "localeString",
    }),
    defineField({
      name: "title",
      title: "Título",
      type: "localeString",
    }),
    defineField({
      name: "lead",
      title: "Intro / subtítulo",
      type: "localeText",
    }),
    defineField({
      name: "contactSectionTitle",
      title: "Título bloque contacto",
      type: "localeString",
    }),
    defineField({
      name: "contactSectionLead",
      title: "Texto bloque contacto",
      type: "localeText",
    }),
    defineField({
      name: "contactCta",
      title: "Texto botón contacto",
      type: "localeString",
    }),
  ],
  preview: { prepare: () => ({ title: "Página FAQ (meta)" }) },
});
