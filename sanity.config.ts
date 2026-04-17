import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./lib/sanity/schemas";

export default defineConfig({
  name: "ebecerra-web",
  title: "ebecerra.es",
  projectId: "gdtxcn4l",
  dataset: "production",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
