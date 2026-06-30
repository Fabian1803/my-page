// server/categoria/domain/entities/Categoria.ts
import { prisma } from "@/server/shared/infrastructure/prisma";
import { PrismaCategoriaRepository } from "./adapters/PrismaCategoriaRepository";
import { VercelMediaStorage } from "@/server/media/infrastructure/adapters/VercelBlobStorage";
import { CreateCategoriaUseCase, DeleteCategoriaUseCase, GetCategoriasUseCase } from "../application";
const categoriaRepository = new PrismaCategoriaRepository(prisma);
const mediaStorage = new VercelMediaStorage();
export const createCategoriaUseCase = new CreateCategoriaUseCase(categoriaRepository, mediaStorage);
export const deleteCategoriaUseCase = new DeleteCategoriaUseCase(categoriaRepository, mediaStorage);
export const getCategoriasUseCase = new GetCategoriasUseCase(categoriaRepository);