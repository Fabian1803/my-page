// server/resources/application/CreateResourceUseCase.ts
import { ResourceRepository } from "../domain/ports/ResourceRepository";
import { Resource } from "../domain/models/Resource";
import { MediaStorage } from "@/server/media/domain/ports/MediaStorage";
export class CreateResourceUseCase {
  constructor(
    private mediaStorage: MediaStorage,
    private repository: ResourceRepository
  ) { }
  async execute(request: Request) {
    const formData = await request.formData();
    const imagenPrincipalFile = formData.get("imagenPrincipal") as File;
    const miniaturaFile = formData.get("miniaturaIcono") as File | null;
    if (!imagenPrincipalFile || imagenPrincipalFile.size === 0) throw new Error("Falta la imagen principal.");
    const imagenPrincipalUrl = await this.mediaStorage.uploadImage(imagenPrincipalFile, imagenPrincipalFile.name);
    let miniaturaUrl: string | null = null;
    if (miniaturaFile && miniaturaFile.size > 0) miniaturaUrl = await this.mediaStorage.uploadImage(miniaturaFile, miniaturaFile.name); 
    const tipo = (formData.get("tipo") as string) || "PROYECTO";
    const nombre = formData.get("nombre") as string;
    const descripcion = formData.get("descripcion") as string;
    const instituto = formData.get("instituto") as string | null;
    const categorias = JSON.parse((formData.get("categorias") as string) || "[]");
    const enlaces = JSON.parse((formData.get("enlaces") as string) || "[]");
    const vinetas = JSON.parse((formData.get("vinetas") as string) || "[]");

    const resourceEntity = new Resource({
      tipo,
      nombre,
      descripcion,
      instituto,
      imagenPrincipalUrl,
      miniaturaUrl,
      categorias,
      enlaces,
      vinetas
    });

    return await this.repository.save(resourceEntity);
  }
}