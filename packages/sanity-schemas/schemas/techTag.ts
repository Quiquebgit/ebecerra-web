import { defineType, defineField } from "sanity";

export default defineType({
  name: "techTag",
  title: "Tech Tag",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nombre", type: "localeString" }),
    defineField({ name: "order", title: "Orden", type: "number" }),
  ],
  orderings: [
    { title: "Orden", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name.es" },
  },
});
