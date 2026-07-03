// server/resources/application/UpdateResourceUseCase.ts
import { MediaStorage } from "@/server/media/domain/ports/MediaStorage";
import { ResourceRepository } from "../domain/ports/ResourceRepository";
import { Resource } from "../domain/models/Resource";
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
    const destacado = formData.get("destacado") === "true"; // 🔥 NUEVO
    const nombre = formData.get("nombre") as string;
    const descripcion = formData.get("descripcion") as string;
    const instituto = formData.get("instituto") as string | null;
    
    const categorias = JSON.parse((formData.get("categorias") as string) || "[]");
    const enlaces = JSON.parse((formData.get("enlaces") as string) || "[]"); // 🔥 CORREGIDO: Ahora sí lee los nuevos links del form
    const vinetas = JSON.parse((formData.get("vinetas") as string) || "[]");
    const seccionesDoc = JSON.parse((formData.get("seccionesDoc") as string) || "[]"); // 🔥 NUEVO

    const resourceEntity = new Resource({
      id,
      tipo,
      destacado,
      nombre,
      descripcion,
      instituto,
      imagenPrincipalUrl,
      miniaturaUrl,
      categorias,
      enlaces,
      vinetas,
      seccionesDoc
    });
    return await this.repository.update(id, resourceEntity);
  }
}