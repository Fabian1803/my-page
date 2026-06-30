// server/resources/infrastructure/dependencies.ts
import { CreateResourceUseCase, DeleteResourceUseCase, GetResourcesUseCase, UpdateResourceUseCase } from "../application";
import { PrismaResourceRepository } from "./adapters/PrismaResourceRepository";
import { VercelMediaStorage } from "@/server/media/infrastructure/adapters/VercelBlobStorage";
const mediaStorage = new VercelMediaStorage();
const resourceRepository = new PrismaResourceRepository();
export const createResourceUseCase = new CreateResourceUseCase(mediaStorage, resourceRepository);
export const getResourcesUseCase = new GetResourcesUseCase(resourceRepository);
export const deleteResourceUseCase = new DeleteResourceUseCase(mediaStorage, resourceRepository);
export const updateResourceUseCase = new UpdateResourceUseCase(mediaStorage, resourceRepository);