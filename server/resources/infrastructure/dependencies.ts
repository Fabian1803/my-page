// server/resources/infrastructure/dependencies.ts
import { PrismaResourceRepository } from "./adapters/PrismaResourceRepository";
import { CreateResourceUseCase } from "../application/CreateResourceUseCase";
import { VercelMediaStorage } from "@/server/media/infrastructure/adapters/VercelBlobStorage";
const mediaStorage = new VercelMediaStorage();
const resourceRepository = new PrismaResourceRepository();
export const createResourceUseCase = new CreateResourceUseCase(mediaStorage, resourceRepository);
