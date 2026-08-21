import { ResourceRepository } from "../domain/ports/ResourceRepository";
import { MediaStorage } from "@/server/media/domain/ports/MediaStorage";
import { prisma } from "@/server/shared/infrastructure/prisma";

function collectMediaUrls(value: unknown, urls: Set<string>) {
  if (typeof value === "string") {
    const matches = value.match(/https?:\/\/[^\s"')]+/g) || [];
    matches.forEach((match) => urls.add(match));
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectMediaUrls(item, urls));
    return;
  }

  if (value && typeof value === "object") {
    Object.values(value as Record<string, unknown>).forEach((item) => collectMediaUrls(item, urls));
  }
}

export class DeleteResourceUseCase {
  constructor(
    private mediaStorage: MediaStorage,
    private repository: ResourceRepository
  ) { }

  async execute(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) throw new Error("El ID del recurso es totalmente requerido.");
    const mediaResource = await prisma.mediaResource.findUnique({
      where: { id },
      include: { vinetas: true, categorias: true }
    });

    if (mediaResource) {
      if (mediaResource.imagenPrincipalUrl) {
        try {
          await this.mediaStorage.deleteFile(mediaResource.imagenPrincipalUrl);
        } catch { }
      }
      if (mediaResource.miniaturaUrl) {
        try {
          await this.mediaStorage.deleteFile(mediaResource.miniaturaUrl);
        } catch { }
      }

      await prisma.mediaResource.delete({ where: { id } });
      return { success: true, message: "Certificado y archivos eliminados exitosamente." };
    }

    const resource = await this.repository.findById(id);
    if (!resource) throw new Error("El recurso que intentas eliminar no existe.");

    if (resource.imagenPrincipalUrl) {
      try {
        await this.mediaStorage.deleteFile(resource.imagenPrincipalUrl);
      } catch { }
    }
    if (resource.miniaturaUrl) {
      try {
        await this.mediaStorage.deleteFile(resource.miniaturaUrl);
      } catch { }
    }

    const urlsToDelete = new Set<string>();
    for (const media of resource.mediaResources || []) {
      if (media?.imagenPrincipalUrl) urlsToDelete.add(media.imagenPrincipalUrl);
    }

    for (const section of resource.seccionesDoc || []) {
      const content = typeof section === "string" ? section : section?.contenidoJson;
      if (typeof content === "string") {
        try {
          const parsed = JSON.parse(content);
          collectMediaUrls(parsed, urlsToDelete);
        } catch {
          collectMediaUrls(content, urlsToDelete);
        }
      }
    }

    for (const url of urlsToDelete) {
      try {
        await this.mediaStorage.deleteFile(url);
      } catch { }
    }

    await this.repository.delete(id);
    return { success: true, message: "Proyecto y archivos multimedia eliminados correctamente." };
  }
}