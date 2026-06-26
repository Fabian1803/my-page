// server/resources/infrastructure/adapters/PrismaResourceRepository.ts
import { ResourceRepository } from "../../domain/ports/ResourceRepository";
import { Resource } from "../../domain/models/Resource";
import { PrismaClient } from "@prisma/client/scripts/default-index.js";
const prisma = new PrismaClient();
export class PrismaResourceRepository implements ResourceRepository {
  async save(resource: Resource): Promise<any> {
    const data = resource.toObject();
    return await prisma.mediaResource.create({
      data: {
        id: data.id,
        nombre: data.nombre,
        descripcion: data.descripcion,
        instituto: data.instituto,
        imagenPrincipalUrl: data.imagenPrincipalUrl,
        miniaturaUrl: data.miniaturaUrl,
        categorias: { create: data.categorias.map(c => ({ nombre: c.nombre }))},
        enlaces: { create: data.enlaces.map(e => ({ tipo: e.tipo, url: e.url }))},
        vinetas: { create: data.vinetas.map(v => ({ comentario: v.comentario }))}
      },
      include: {
        categorias: true,
        enlaces: true,
        vinetas: true
      }
    });
  }
}
