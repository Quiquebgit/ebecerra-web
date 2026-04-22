import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Excluye: api, studio, playground, next internals, vercel, assets estáticos
  // (piezas-game/, brand/, .well-known/, favicons), y cualquier archivo con extensión.
  matcher: [
    "/((?!api|studio|playground|_next|_vercel|piezas-game|brand|\\.well-known|.*\\..*).*)",
  ],
};
