import { defineType, defineField } from "sanity";

export default defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nombre", type: "localeString" }),
    defineField({
      name: "level",
      title: "Nivel (0–100)",
      type: "number",
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({ name: "order", title: "Orden", type: "number" }),
  ],
  orderings: [
    { title: "Orden", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name.es", subtitle: "level" },
    prepare({ title, subtitle }) {
      return { title, subtitle: `${subtitle}%` };
    },
  },
});
