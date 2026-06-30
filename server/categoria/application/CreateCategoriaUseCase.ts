// server/categoria/application/CreateCategoriaUseCase.ts
import { CategoriaRepository } from "../domain/ports/CategoriaRepository";
import { MediaStorage } from "@/server/media/domain/ports/MediaStorage";
import { Categoria } from "../domain/entities/Categoria";
export class CreateCategoriaUseCase {
  constructor(
    private repository: CategoriaRepository,
    private mediaStorage: MediaStorage
  ) {}

  async execute(request: Request): Promise<Categoria> {
    const formData = await request.formData();
    const nombre = formData.get("nombre") as string;
    const destacadoStr = formData.get("destacado") as string;
    const file = formData.get("imagen") as Blob | null;
    if (!file) throw new Error("Falta cargar el archivo del logotipo.");
    if (!nombre || !nombre.trim()) throw new Error("El nombre de la categoría es requerido.");
    const destacado = destacadoStr === "true";
    const fileName = (file as any).name || "logo-tecnologia.png";
    const existe = await this.repository.findByNombre(nombre.trim());
    if (existe) throw new Error(`La categoría "${nombre}" ya se encuentra registrada.`);
    const imagenUrl = await this.mediaStorage.uploadImage(file, fileName);
    return await this.repository.create({
      nombre: nombre.trim(),
      imagenUrl,
      destacado
    });
  }
}
