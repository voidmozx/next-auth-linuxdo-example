import authConfig from "@/config/auth.config";
import NextAuth from "next-auth";
export { auth } from "@/config/auth";

const publicPages = ["/*", "/auth/signin"];
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  
  const isAuthenticated = !!req.auth;

  const publicPathnameRegex = RegExp(
    `^/?(${publicPages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i"
  );
  const isPublicRoute = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicRoute && isAuthenticated)
    return Response.redirect(new URL("/protected", nextUrl));

  if (!isAuthenticated && !isPublicRoute)
    return Response.redirect(new URL("/", nextUrl));
});

export const config = {
  // matcher: [
  //   "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  // ],
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
