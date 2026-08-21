// server/categoria/application/UpdateCategoriaUseCase.ts
import { CategoriaRepository } from "../domain/ports/CategoriaRepository";
import { MediaStorage } from "@/server/media/domain/ports/MediaStorage";
import { Categoria } from "../domain/entities/Categoria";

export class UpdateCategoriaUseCase {
  constructor(
    private repository: CategoriaRepository,
    private mediaStorage: MediaStorage
  ) { }

  async execute(request: Request): Promise<Categoria> {
    const contentType = request.headers.get("content-type") || "";
    let id: string | null = null;
    let nombre: string | undefined = undefined;
    let destacado: boolean | undefined = undefined;
    let file: Blob | null = null;
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      id = (formData.get("id") as string) || new URL(request.url).searchParams.get("id");
      const nombreField = formData.get("nombre") as string;
      const destacadoField = formData.get("destacado") as string;
      file = formData.get("imagen") as Blob | null;

      if (nombreField !== null && nombreField !== undefined) nombre = nombreField.trim();
      if (destacadoField !== null && destacadoField !== undefined) destacado = destacadoField === "true";
    } else {
      const body = await request.json().catch(() => ({}));
      id = body.id || new URL(request.url).searchParams.get("id");
      if (body.nombre !== undefined) nombre = body.nombre.trim();
      if (body.destacado !== undefined) destacado = Boolean(body.destacado);
    }
    if (!id) throw new Error("El ID de la categoría es requerido para actualizar.");
    const existing = await this.repository.findById(id);
    if (!existing) throw new Error("La categoría a actualizar no existe.");
    let imagenUrl: string | undefined = undefined;
    if (file && (file as any).size > 0) {
      const fileName = (file as any).name || "logo-tecnologia.png";
      imagenUrl = await this.mediaStorage.uploadImage(file, fileName);
      if (existing.imagenUrl) {
        await this.mediaStorage.deleteFile(existing.imagenUrl).catch(() => { });
      }
    }

    const updateData: Partial<Omit<Categoria, 'id'>> = {};
    if (nombre !== undefined && nombre !== "") updateData.nombre = nombre;
    if (destacado !== undefined) updateData.destacado = destacado;
    if (imagenUrl !== undefined) updateData.imagenUrl = imagenUrl;

    return await this.repository.update(id, updateData);
  }
}
