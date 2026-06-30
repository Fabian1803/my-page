// server/resources/application/DeleteResourceUseCase.ts
import { ResourceRepository } from "../domain/ports/ResourceRepository";
import { MediaStorage } from "@/server/media/domain/ports/MediaStorage";
export class DeleteResourceUseCase {
  constructor(
    private mediaStorage: MediaStorage,
    private repository: ResourceRepository
  ) {}
  async execute(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) throw new Error("El ID del recurso es totalmente requerido.");
    const resource = await this.repository.findById(id);
    if (!resource) throw new Error("El recurso que intentas eliminar no existe.");
    if (resource.imagenPrincipalUrl) await this.mediaStorage.deleteFile(resource.imagenPrincipalUrl);
    if (resource.miniaturaUrl) await this.mediaStorage.deleteFile(resource.miniaturaUrl);
    await this.repository.delete(id);
    return { success: true, message: "Recurso y archivos eliminados de forma fulminante." };
  }
}