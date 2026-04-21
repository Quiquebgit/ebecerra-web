import { defineType, defineField } from "sanity";

export default defineType({
  name: "project",
  title: "Proyecto",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "ID (slug)",
      type: "slug",
      options: { source: (doc) => (doc.title as { es?: string })?.es ?? "" },
    }),
    defineField({ name: "label", title: "Label (ej: mobile · puzzle)", type: "string" }),
    defineField({ name: "title", title: "Título", type: "localeString" }),
    defineField({ name: "description", title: "Descripción", type: "localeText" }),
    defineField({
      name: "tech",
      title: "Tecnologías",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "status",
      title: "Estado (beta/fan/live)",
      type: "string",
    }),
    defineField({ name: "statusText", title: "Texto de estado", type: "localeString" }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "text", type: "localeString", title: "Texto del link" },
            { name: "href", type: "string", title: "URL o ruta" },
            { name: "external", type: "boolean", title: "¿Externo (target=_blank)?" },
          ],
        },
      ],
    }),
    defineField({ name: "order", title: "Orden", type: "number" }),
  ],
  orderings: [
    { title: "Orden", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title.es", subtitle: "label" },
  },
});
