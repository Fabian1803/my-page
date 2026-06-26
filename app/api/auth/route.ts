import { loginWithPasswordUseCase } from "@/server/auth/infrastructure/dependencies";
import { makeRoute } from "@/server/shared/infrastructure/makeRoute";

export const POST = makeRoute(loginWithPasswordUseCase);