import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.STORAGE_SUPABASE_URL!,
  process.env.STORAGE_SUPABASE_SERVICE_ROLE_KEY!
);

export default authMiddleware({
  publicRoutes: ["/", "/sign-in(.*)", "/sign-up(.*)", "/api/profiles(.*)", "/cadastro"],
  ignoredRoutes: ["/api/webhooks(.*)", "/api/public(.*)", "/api/profiles(.*)"],
  async afterAuth(auth, req) {
    if (auth.userId && auth.isPublicRoute) {
      try {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", auth.userId)
          .single();

        if (!profile) {
          await supabase.from("profiles").insert({
            id: auth.userId,
            credits: 3,
            tier: "free",
          });
        }
      } catch (error) {
        console.error("Error syncing user profile:", error);
      }
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};