import { ResourceRepository } from "../domain/ports/ResourceRepository";
import { Resource } from "../domain/models/Resource";
import { MediaStorage } from "@/server/media/domain/ports/MediaStorage";

export class UpdateResourceUseCase {
  constructor(
    private mediaStorage: MediaStorage,
    private repository: ResourceRepository
  ) {}

  async execute(request: Request) {
    const formData = await request.formData();
    const id = formData.get("id") as string;
    if (!id) throw new Error("El ID del recurso es requerido para actualizar.");
    const recursoExistente = await this.repository.findById(id);
    if (!recursoExistente) throw new Error("El recurso a actualizar no existe.");
    const nuevaImagenFile = formData.get("imagenPrincipal") as File | null;
    const nuevaMiniaturaFile = formData.get("miniaturaIcono") as File | null;

    let imagenPrincipalUrl = recursoExistente.imagenPrincipalUrl;
    if (nuevaImagenFile && nuevaImagenFile.size > 0) {
      if (imagenPrincipalUrl) await this.mediaStorage.deleteFile(imagenPrincipalUrl);
      imagenPrincipalUrl = await this.mediaStorage.uploadImage(nuevaImagenFile, nuevaImagenFile.name);
    }
    let miniaturaUrl = recursoExistente.miniaturaUrl;
    if (nuevaMiniaturaFile && nuevaMiniaturaFile.size > 0) {
      if (miniaturaUrl) await this.mediaStorage.deleteFile(miniaturaUrl);
      miniaturaUrl = await this.mediaStorage.uploadImage(nuevaMiniaturaFile, nuevaMiniaturaFile.name);
    }

    const tipo = (formData.get("tipo") as string) || "PROYECTO";
    const nombre = formData.get("nombre") as string;
    const descripcion = formData.get("descripcion") as string;
    const instituto = formData.get("instituto") as string | null;
    const categorias = JSON.parse((formData.get("categorias") as string) || "[]");
    const vinetas = JSON.parse((formData.get("vinetas") as string) || "[]");
    const resourceEntity = new Resource({
      id,
      tipo,
      nombre,
      descripcion,
      instituto,
      imagenPrincipalUrl,
      miniaturaUrl,
      categorias,
      enlaces: recursoExistente.enlaces,
      vinetas
    });

    return await this.repository.update(id, resourceEntity);
  }
}