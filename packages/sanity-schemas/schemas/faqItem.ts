import { defineType, defineField } from "sanity";

export default defineType({
  name: "faqItem",
  title: "FAQ — Pregunta",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Pregunta",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Respuesta",
      type: "localeText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Orden",
      description:
        "Múltiplos de 10 recomendado (10, 20, 30…) para permitir reordenar sin renumerar.",
      type: "number",
      validation: (Rule) => Rule.required().integer(),
    }),
    defineField({
      name: "category",
      title: "Categoría (opcional)",
      type: "string",
    }),
  ],
  orderings: [
    {
      title: "Orden ascendente",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "question.es", order: "order", category: "category" },
    prepare: ({ title, order, category }) => ({
      title: `${order ?? "?"}. ${title ?? "(sin pregunta)"}`,
      subtitle: category,
    }),
  },
});
