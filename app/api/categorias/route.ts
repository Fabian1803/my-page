import { makeRoute } from "@/server/shared/infrastructure/makeRoute";
import {
  createCategoriaUseCase,
  deleteCategoriaUseCase,
  getCategoriasUseCase,
  updateCategoriaUseCase
} from "@/server/categoria/infrastructure/dependencies";
export const GET = makeRoute(getCategoriasUseCase);
export const POST = makeRoute(createCategoriaUseCase);
export const PATCH = makeRoute(updateCategoriaUseCase);
export const DELETE = makeRoute(deleteCategoriaUseCase);
