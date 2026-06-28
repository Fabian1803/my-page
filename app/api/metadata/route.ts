import { makeRoute } from "@/server/shared/infrastructure/makeRoute";
import { createMetadataUseCase, getMetadataUseCase } from "@/server/metadata/infrastructure/dependencies";
export const POST = makeRoute(createMetadataUseCase);
export const GET = makeRoute(getMetadataUseCase);
