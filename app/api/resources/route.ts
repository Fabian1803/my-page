import { createResourceUseCase, deleteResourceUseCase, getResourcesUseCase, updateResourceUseCase } from "@/server/resources/infrastructure/dependencies";
import { makeRoute } from "@/server/shared/infrastructure/makeRoute";
export const POST = makeRoute(createResourceUseCase);
export const GET = makeRoute(getResourcesUseCase);
export const DELETE = makeRoute(deleteResourceUseCase);
export const PUT = makeRoute(updateResourceUseCase);