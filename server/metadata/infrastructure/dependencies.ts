//server/metadata/infrastructure/dependencies.ts
import { PrismaMetadataRepository } from "./adapters/PrismaMetadataRepository";
import { CreateMetadataUseCase } from "../application/CreateMetadataUseCase";
import { VercelMediaStorage } from "@/server/media/infrastructure/adapters/VercelBlobStorage";
import { GetMetadataUseCase } from "../application/GetMetadataUseCase";
const metadataRepository = new PrismaMetadataRepository();
const mediaStorage = new VercelMediaStorage();
export const createMetadataUseCase = new CreateMetadataUseCase(metadataRepository, mediaStorage);
export const getMetadataUseCase = new GetMetadataUseCase(metadataRepository);
    
