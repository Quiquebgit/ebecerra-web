import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/piezas-game",
        destination: "/piezas-game/",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      // Next.js no sirve index.html como índice de directorio automáticamente.
      // Estos rewrites hacen que /piezas-game/* sirva los archivos estáticos correctos.
      { source: "/piezas-game/", destination: "/piezas-game/index.html" },
      { source: "/piezas-game/privacidad.html", destination: "/piezas-game/privacidad.html" },
      { source: "/piezas-game/terminos.html", destination: "/piezas-game/terminos.html" },
      { source: "/piezas-game/delete-account.html", destination: "/piezas-game/delete-account.html" },
    ];
  },
};

export default nextConfig;
