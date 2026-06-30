// server/categoria/application/DeleteCategoriaUseCase.ts
import { CategoriaRepository } from "../domain/ports/CategoriaRepository";
import { MediaStorage } from "@/server/media/domain/ports/MediaStorage";
export class DeleteCategoriaUseCase {
  constructor(
    private repository: CategoriaRepository,
    private mediaStorage: MediaStorage
  ) {}

  async execute(request: Request): Promise<{ message: string }> {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) throw new Error("El ID de la categoría es requerido.");
    const categoria = await this.repository.findById(id);
    if (!categoria) throw new Error("La categoría que intentas eliminar no existe.");
    if (categoria.imagenUrl) await this.mediaStorage.deleteFile(categoria.imagenUrl);
    await this.repository.delete(id);
    return { message: "Categoría eliminada de Postgres y Vercel Blob con éxito." };
  }
}
