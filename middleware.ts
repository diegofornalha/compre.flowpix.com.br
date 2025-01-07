import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/cadastro(.*)",
    "/obrigado",
    "/comprar",
    "/eth",
    "/polygon",
    "/btc",
    "/api/user",
    "/api/create-profile",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};