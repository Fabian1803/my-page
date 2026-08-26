import { ResourceRepository } from "../../domain/ports/ResourceRepository";
import { Resource } from "../../domain/models/Resource";
import { prisma } from "@/server/shared/infrastructure/prisma";

export class PrismaResourceRepository implements ResourceRepository {
  async save(resource: Resource): Promise<any> {
    const data = resource.toObject();
    const categoriasNombres = (data.categorias || []).map((c: any) => typeof c === 'string' ? c : c.nombre);

    const proyecto = await prisma.proyecto.create({
      data: {
        id: data.id,
        destacado: data.destacado,
        nombre: data.nombre,
        descripcion: data.descripcion,
        categorias: categoriasNombres,
        enlaces: data.enlaces,
        seccionesDoc: data.seccionesDoc
      },
      include: {
        portada: { include: { vinetas: true } },
        mediaResources: { include: { vinetas: true }, orderBy: { createdAt: 'desc' } }
      }
    });

    return this.toProjectView(proyecto);
  }

  async findAll(): Promise<any[]> {
    const proyectos = await prisma.proyecto.findMany({
      include: {
        portada: { include: { vinetas: true } },
        mediaResources: { include: { vinetas: true }, orderBy: { createdAt: 'desc' } }
      },
      orderBy: { createdAt: 'desc' }
    });

    return proyectos.map((proyecto) => this.toProjectView(proyecto));
  }

  async findById(id: string): Promise<any | null> {
    const proyecto = await prisma.proyecto.findUnique({
      where: { id },
      include: {
        portada: { include: { vinetas: true } },
        mediaResources: { include: { vinetas: true }, orderBy: { createdAt: 'desc' } }
      }
    });

    return proyecto ? this.toProjectView(proyecto) : null;
  }

  async delete(id: string): Promise<void> {
    await prisma.proyecto.delete({ where: { id } });
  }

  async update(id: string, resource: Resource): Promise<any> {
    const data = resource.toObject();
    const categoriasNombres = (data.categorias || []).map((c: any) => typeof c === 'string' ? c : c.nombre);

    const proyectoActualizado = await prisma.proyecto.update({
      where: { id },
      data: {
        destacado: data.destacado,
        nombre: data.nombre,
        descripcion: data.descripcion,
        categorias: categoriasNombres,
        enlaces: data.enlaces,
        seccionesDoc: data.seccionesDoc
      },
      include: {
        portada: { include: { vinetas: true } },
        mediaResources: { include: { vinetas: true }, orderBy: { createdAt: 'desc' } }
      }
    });

    return this.toProjectView(proyectoActualizado);
  }

  private toProjectView(proyecto: any) {
    return {
      id: proyecto.id,
      tipo: "PROYECTO",
      destacado: Boolean(proyecto.destacado),
      nombre: proyecto.nombre,
      descripcion: proyecto.descripcion,
      instituto: null,
      imagenPrincipalUrl: proyecto.portada?.imagenPrincipalUrl || "",
      miniaturaUrl: proyecto.portada?.miniaturaUrl || null,
      categorias: (proyecto.categorias || []).map((nombre: string, index: number) => ({
        id: `${proyecto.id}-${index}`,
        nombre: typeof nombre === 'string' ? nombre : (nombre as any)?.nombre || ''
      })),
      vinetas: (proyecto.portada?.vinetas || []).map((v: any) => typeof v === 'string' ? v : v.comentario),
      enlaces: Array.isArray(proyecto.enlaces)
        ? proyecto.enlaces.map((enlace: any, index: number) => ({
          id: enlace?.id || `${proyecto.id}-link-${index}`,
          type: enlace?.type || enlace?.tipo || "web",
          url: enlace?.url || ""
        }))
        : [],
      seccionesDoc: Array.isArray(proyecto.seccionesDoc)
        ? proyecto.seccionesDoc.map((contenido: any, index: number) => ({
          id: `${proyecto.id}-section-${index}`,
          orden: index,
          contenidoJson: typeof contenido === "string" ? contenido : JSON.stringify(contenido)
        }))
        : [],
      portada: proyecto.portada
        ? {
          id: proyecto.portada.id,
          imagenPrincipalUrl: proyecto.portada.imagenPrincipalUrl,
          vinetas: proyecto.portada.vinetas || []
        }
        : null,
      mediaResources: proyecto.mediaResources || []
    };
  }
}