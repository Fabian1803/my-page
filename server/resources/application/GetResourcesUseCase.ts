// server/resources/application/GetResourcesUseCase.ts
import { ResourceRepository } from "../domain/ports/ResourceRepository";
import { prisma } from "@/server/shared/infrastructure/prisma";

export class GetResourcesUseCase {
  constructor(private repository: ResourceRepository) {}

  async execute(request?: Request) {
    let tipo = "PROYECTO";
    let id: string | null = null;

    if (request && request.url) {
      const { searchParams } = new URL(request.url);
      tipo = searchParams.get("tipo") || "PROYECTO";
      id = searchParams.get("id");
    }

    if (id) {
      const cert = await prisma.mediaResource.findUnique({
        where: { id },
        include: { categorias: true, vinetas: true }
      });

      if (cert) {
        return {
          id: cert.id,
          tipo: cert.tipo,
          nombre: cert.nombre,
          institucion: cert.instituto,
          descripcion: cert.descripcion,
          destacado: cert.destacado,
          imagenPrincipalUrl: cert.imagenPrincipalUrl,
          miniaturaUrl: cert.miniaturaUrl,
          vinetas: cert.vinetas,
          categorias: cert.categorias
        };
      }

      return await this.repository.findById(id);
    }

    if (tipo === "CERTIFICADO") {
      const certificados = await prisma.mediaResource.findMany({
        where: { tipo: "CERTIFICADO" },
        include: { categorias: true, vinetas: true },
        orderBy: { createdAt: 'desc' }
      });

      return certificados.map(c => ({
        id: c.id,
        tipo: c.tipo,
        nombre: c.nombre,
        institucion: c.instituto,
        descripcion: c.descripcion,
        destacado: c.destacado,
        imagenPrincipalUrl: c.imagenPrincipalUrl,
        miniaturaUrl: c.miniaturaUrl,
        vinetas: c.vinetas,
        categorias: c.categorias
      }));
    }

    return await this.repository.findAll();
  }
}