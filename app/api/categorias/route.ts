// app/api/categorias/route.ts
import { makeRoute } from "@/server/shared/infrastructure/makeRoute";
import { 
  createCategoriaUseCase, 
  deleteCategoriaUseCase, 
  getCategoriasUseCase 
} from "@/server/categoria/infrastructure/dependencies";
export const GET = makeRoute(getCategoriasUseCase);
export const POST = makeRoute(createCategoriaUseCase);
export const DELETE = makeRoute(deleteCategoriaUseCase);
