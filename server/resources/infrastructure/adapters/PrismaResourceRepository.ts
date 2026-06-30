// server/resources/infrastructure/adapters/PrismaResourceRepository.ts
import { ResourceRepository } from "../../domain/ports/ResourceRepository";
import { Resource } from "../../domain/models/Resource";
import { prisma } from "@/server/shared/infrastructure/prisma"; 
export class PrismaResourceRepository implements ResourceRepository {
  async save(resource: Resource): Promise<any> {
    const data = resource.toObject();
    return await prisma.mediaResource.create({
      data: {
        id: data.id,
        tipo: data.tipo,
        nombre: data.nombre,
        descripcion: data.descripcion,
        instituto: data.instituto,
        imagenPrincipalUrl: data.imagenPrincipalUrl,
        miniaturaUrl: data.miniaturaUrl,
        categorias: { connect: data.categorias.map(nombreTag => ({ nombre: nombreTag }))},
        enlaces: { create: data.enlaces.map(e => ({ tipo: e.tipo, url: e.url }))},
        vinetas: { create: data.vinetas.map(bullet => ({ comentario: bullet }))}
      },
      include: {
        categorias: true,
        enlaces: true,
        vinetas: true
      }
    });
  }

  async findAll(tipo?: string): Promise<any[]> {
    return await prisma.mediaResource.findMany({
      where: tipo ? { tipo } : {},
      include: {
        categorias: true,
        enlaces: true,
        vinetas: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findById(id: string): Promise<any | null> {
    return await prisma.mediaResource.findUnique({
      where: { id },
      include: {
        categorias: true,
        enlaces: true,
        vinetas: true
      }
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.mediaResource.delete({ where: { id } });
  }

  async update(id: string, resource: Resource): Promise<any> {
  const data = resource.toObject();
  
  return await prisma.mediaResource.update({
    where: { id },
    data: {
      tipo: data.tipo,
      nombre: data.nombre,
      descripcion: data.descripcion,
      instituto: data.instituto,
      imagenPrincipalUrl: data.imagenPrincipalUrl,
      miniaturaUrl: data.miniaturaUrl,
      categorias: {
        set: [],
        connect: data.categorias.map(nombreTag => ({ nombre: nombreTag }))
      },
      vinetas: {
        deleteMany: {}, 
        create: data.vinetas.map(bullet => ({ comentario: bullet }))
      }
    },
    include: {
      categorias: true,
      enlaces: true,
      vinetas: true
    }
  });
}
}