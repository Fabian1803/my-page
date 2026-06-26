import { createResourceUseCase } from "@/server/resources/infrastructure/dependencies";
import { makeRoute } from "@/server/shared/infrastructure/makeRoute";
export const POST = makeRoute(createResourceUseCase);