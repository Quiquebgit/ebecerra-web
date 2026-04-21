import { defineType, defineField } from "sanity";

export default defineType({
  name: "profile",
  title: "Perfil",
  type: "document",
  fields: [
    defineField({
      name: "aboutFeatures",
      title: "Características de About",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", type: "string", title: "Icono (emoji)" },
            { name: "label", type: "localeString", title: "Etiqueta" },
            { name: "desc", type: "localeString", title: "Descripción" },
          ],
          preview: {
            select: { title: "label.es", subtitle: "icon" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Perfil" };
    },
  },
});
