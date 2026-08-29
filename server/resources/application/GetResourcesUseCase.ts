import { ResourceRepository } from "../domain/ports/ResourceRepository";
import { prisma } from "@/server/shared/infrastructure/prisma";

export interface GetResourcesParams {
  tipo?: "PROYECTO" | "CERTIFICADO" | "IMAGENES" | "IMAGEN_INTERNA" | "ALL" | string;
  id?: string | null;
  limit?: number;
}

export class GetResourcesUseCase {
  constructor(private repository: ResourceRepository) { }

  async execute(input?: Request | GetResourcesParams) {
    let tipo = "PROYECTO";
    let id: string | null = null;
    let limit: number | undefined = undefined;

    if (input instanceof Request) {
      const { searchParams } = new URL(input.url);
      tipo = searchParams.get("tipo") || "PROYECTO";
      id = searchParams.get("id");
      const limitParam = searchParams.get("limit");
      if (limitParam) limit = parseInt(limitParam, 10);
    } else if (input) {
      tipo = input.tipo || "PROYECTO";
      id = input.id || null;
      if (input.limit) limit = input.limit;
    }

    if (id) {
      const resource = await prisma.mediaResource.findUnique({
        where: { id },
        include: { categorias: true, vinetas: true }
      });
      if (resource) return resource;
      return await this.repository.findById(id);
    }

    if (tipo === "CERTIFICADO") {
      return await prisma.mediaResource.findMany({
        where: { tipo: "CERTIFICADO" },
        include: { categorias: true, vinetas: true },
        orderBy: { createdAt: 'desc' },
        ...(limit ? { take: limit } : {})
      });
    }

    if (tipo === "IMAGEN_INTERNA") {
      return await prisma.mediaResource.findMany({
        where: { tipo: "IMAGEN_INTERNA", imagenPrincipalUrl: { not: "" } },
        include: { categorias: true, vinetas: true, proyecto: { include: { portada: true } } },
        ...(limit ? { take: limit } : {})
      });
    }

    if (tipo === "IMAGENES" || tipo === "ALL") {
      return await prisma.mediaResource.findMany({
        where: { imagenPrincipalUrl: { not: "" } },
        include: { categorias: true, vinetas: true, proyecto: { include: { portada: true } } },
        orderBy: { id: 'asc' },
        ...(limit ? { take: limit } : {})
      });
    }

    return await this.repository.findAll();
  }
}
