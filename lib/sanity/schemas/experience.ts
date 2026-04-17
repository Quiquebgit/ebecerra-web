import { defineType, defineField } from "sanity";

export default defineType({
  name: "experience",
  title: "Experiencia",
  type: "document",
  fields: [
    defineField({ name: "company", title: "Empresa", type: "string" }),
    defineField({ name: "role", title: "Cargo", type: "string" }),
    defineField({ name: "period", title: "Periodo", type: "string" }),
    defineField({
      name: "tag",
      title: 'Etiqueta (ej: "actual")',
      type: "string",
    }),
    defineField({ name: "desc", title: "Descripción", type: "text" }),
    defineField({ name: "order", title: "Orden", type: "number" }),
  ],
  orderings: [
    { title: "Orden", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "role", subtitle: "company" },
  },
});
