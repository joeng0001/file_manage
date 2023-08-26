import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes:[],
    ignoreRoute:[]
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};


