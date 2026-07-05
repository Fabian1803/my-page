// server/resources/application/GetResourcesUseCase.ts
import { ResourceRepository } from "../domain/ports/ResourceRepository";
import { prisma } from "@/server/shared/infrastructure/prisma";
export class GetResourcesUseCase {
  constructor(private repository: ResourceRepository) {}
  async execute(request?: Request) {
    let tipo = "PROYECTO";
    if (request && request.url) {
      const { searchParams } = new URL(request.url);
      tipo = searchParams.get("tipo") || "PROYECTO";
    }
    if (tipo === "CERTIFICADO") {
      const certificados = await prisma.mediaResource.findMany({
        where: { tipo: "CERTIFICADO" },
        include: { categorias: true, vinetas: true },
        orderBy: { createdAt: 'desc' }
      });
      return certificados.map(c => ({
        id: c.id,
        nombre: c.nombre,
        institucion: c.instituto,
        descripcion: c.descripcion,
        imagenPrincipalUrl: c.imagenPrincipalUrl,
        miniaturaUrl: c.miniaturaUrl,
        vinetas: c.vinetas,
        categorias: c.categorias
      }));
    }
    return await this.repository.findAll();
  }
}