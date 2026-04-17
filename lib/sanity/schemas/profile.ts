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
            { name: "label", type: "string", title: "Etiqueta" },
            { name: "desc", type: "string", title: "Descripción" },
          ],
          preview: {
            select: { title: "label", subtitle: "icon" },
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
