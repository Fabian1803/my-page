// server/resources/infrastructure/adapters/PrismaResourceRepository.ts
import { ResourceRepository } from "../../domain/ports/ResourceRepository";
import { Resource } from "../../domain/models/Resource";
import { prisma } from "@/server/shared/infrastructure/prisma";
export class PrismaResourceRepository implements ResourceRepository {
  async save(resource: Resource): Promise<any> {
    const data = resource.toObject();
    const proyecto = await prisma.proyecto.create({
      data: {
        id: data.id,
        destacado: data.destacado,
        nombre: data.nombre,
        descripcion: data.descripcion,
        categorias: data.categorias,
        enlaces: data.enlaces,
        seccionesDoc: data.seccionesDoc
      },
      include: {
        portada: true,
        mediaResources: { orderBy: { createdAt: 'desc' } }
      }
    });

    return this.toProjectView(proyecto);
  }

  async findAll(): Promise<any[]> {
    const proyectos = await prisma.proyecto.findMany({
      include: {
        portada: true,
        mediaResources: { orderBy: { createdAt: 'desc' } }
      },
      orderBy: { createdAt: 'desc' }
    });

    return proyectos.map((proyecto) => this.toProjectView(proyecto));
  }

  async findById(id: string): Promise<any | null> {
    const proyecto = await prisma.proyecto.findUnique({
      where: { id },
      include: {
        portada: true,
        mediaResources: { orderBy: { createdAt: 'desc' } }
      }
    });

    return proyecto ? this.toProjectView(proyecto) : null;
  }

  async delete(id: string): Promise<void> {
    await prisma.proyecto.delete({ where: { id } });
  }

  async update(id: string, resource: Resource): Promise<any> {
    const data = resource.toObject();
    const proyectoActualizado = await prisma.proyecto.update({
      where: { id },
      data: {
        destacado: data.destacado,
        nombre: data.nombre,
        descripcion: data.descripcion,
        categorias: data.categorias,
        enlaces: data.enlaces,
        seccionesDoc: data.seccionesDoc
      },
      include: {
        portada: true,
        mediaResources: { orderBy: { createdAt: 'desc' } }
      }
    });

    return this.toProjectView(proyectoActualizado);
  }

  private toProjectView(proyecto: any) {
    return {
      id: proyecto.id,
      tipo: proyecto.tipo,
      destacado: proyecto.destacado,
      nombre: proyecto.nombre,
      descripcion: proyecto.descripcion,
      instituto: null,
      imagenPrincipalUrl: proyecto.portada?.imagenPrincipalUrl || "",
      miniaturaUrl: proyecto.portada?.miniaturaUrl || null,
      categorias: (proyecto.categorias || []).map((nombre: string, index: number) => ({
        id: `${proyecto.id}-${index}`,
        nombre
      })),
      enlaces: Array.isArray(proyecto.enlaces)
        ? proyecto.enlaces.map((enlace: any, index: number) => ({
            id: `${proyecto.id}-link-${index}`,
            tipo: enlace?.tipo || "WEB",
            url: enlace?.url || ""
          }))
        : [],
      seccionesDoc: Array.isArray(proyecto.seccionesDoc)
        ? proyecto.seccionesDoc.map((contenido: string, index: number) => ({
            id: `${proyecto.id}-section-${index}`,
            orden: index,
            contenidoJson: contenido
          }))
        : [],
      portada: proyecto.portada
        ? {
            id: proyecto.portada.id,
            imagenPrincipalUrl: proyecto.portada.imagenPrincipalUrl
          }
        : null,
      mediaResources: proyecto.mediaResources || []
    };
  }
}