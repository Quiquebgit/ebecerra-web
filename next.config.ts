import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // trailingSlash: true hace que Next.js redirija /foo → /foo/ en lugar de
  // /foo/ → /foo (comportamiento por defecto). Necesario para que /piezas-game/
  // sea la URL canónica y los assets relativos (styles.css, assets/) resuelvan bien.
  trailingSlash: true,

  async rewrites() {
    return [
      // Next.js no sirve index.html como índice de directorio automáticamente.
      { source: "/piezas-game/", destination: "/piezas-game/index.html" },
    ];
  },
};

export default nextConfig;
