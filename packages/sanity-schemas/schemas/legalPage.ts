import { defineType, defineField } from "sanity";

export default defineType({
  name: "legalPage",
  title: "Página legal",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "URL: /{slug} (+ /en/{slug}). Ej: privacidad, aviso-legal, cookies.",
      type: "slug",
      options: {
        source: (doc) => (doc.title as { es?: string })?.es ?? "",
        maxLength: 64,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "localeString",
    }),
    defineField({
      name: "content",
      title: "Contenido",
      type: "localePortableText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "updatedAt",
      title: "Última actualización",
      type: "date",
    }),
  ],
  preview: {
    select: { title: "title.es", subtitle: "slug.current" },
  },
});
