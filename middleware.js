import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
export default authMiddleware({
  publicRoutes: ["/sign-in", "/sign-up"],
  ignoreRoute: [],
  afterAuth(auth, req, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
