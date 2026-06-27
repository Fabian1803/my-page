// app/api/auth/route.ts
import { loginWithPasswordUseCase } from "@/server/auth/infrastructure/dependencies";
import { makeRouteAuth } from "@/server/auth/infrastructure/makeRouteAuth";
export const POST = makeRouteAuth(loginWithPasswordUseCase);