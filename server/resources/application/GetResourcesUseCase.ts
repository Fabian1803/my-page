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

    if (tipo === "IMAGENES" || tipo === "ALL") {
      const [certificados, proyectos, mediaInternas] = await Promise.all([
        prisma.mediaResource.findMany({
          where: { tipo: "CERTIFICADO" },
          include: { categorias: true, vinetas: true },
          orderBy: { createdAt: 'desc' }
        }),
        this.repository.findAll(),
        prisma.mediaResource.findMany({
          where: { tipo: { in: ["IMAGEN_INTERNA", "PORTADA"] } },
          include: { categorias: true, vinetas: true },
          orderBy: { createdAt: 'desc' }
        })
      ]);

      const listaCertificados = certificados.map(c => ({
        id: c.id,
        tipo: "CERTIFICADO",
        nombre: c.nombre,
        titulo: c.nombre,
        instituto: c.instituto,
        universidad: c.instituto || 'Certificación Profesional',
        descripcion: c.descripcion,
        destacado: c.destacado,
        imagenPrincipalUrl: c.imagenPrincipalUrl,
        imagenCertificado: c.imagenPrincipalUrl,
        miniaturaUrl: c.miniaturaUrl,
        imagenLogo: c.miniaturaUrl || '/log.webp',
        vinetas: c.vinetas,
        categorias: c.categorias
      }));

      const listaProyectos = proyectos.filter(p => p.imagenPrincipalUrl).map(p => ({
        id: p.id,
        tipo: "PROYECTO",
        nombre: p.nombre,
        titulo: p.nombre,
        instituto: p.categorias?.[0]?.nombre || 'Proyecto de Software',
        universidad: p.categorias?.[0]?.nombre || 'Proyecto de Software',
        descripcion: p.descripcion,
        destacado: p.destacado,
        imagenPrincipalUrl: p.imagenPrincipalUrl,
        imagenCertificado: p.imagenPrincipalUrl,
        miniaturaUrl: p.miniaturaUrl || '/FLogo.webp',
        imagenLogo: p.miniaturaUrl || '/FLogo.webp',
        vinetas: (p.vinetas || []).map((v: any, idx: number) => ({ id: `${p.id}-v-${idx}`, comentario: typeof v === 'string' ? v : v.comentario })),
        categorias: p.categorias,
        enlaces: p.enlaces
      }));

      const listaInternas = mediaInternas
        .filter(m => m.imagenPrincipalUrl && !certificados.some(c => c.id === m.id) && !proyectos.some(p => p.portada?.id === m.id))
        .map(m => ({
          id: m.id,
          tipo: m.tipo,
          nombre: m.nombre || 'Diagrama / Documentación',
          titulo: m.nombre || 'Diagrama / Documentación',
          instituto: 'Arquitectura y Documentación',
          universidad: 'Arquitectura y Documentación',
          descripcion: m.descripcion || 'Recurso visual y documentación técnica del proyecto',
          destacado: false,
          imagenPrincipalUrl: m.imagenPrincipalUrl,
          imagenCertificado: m.imagenPrincipalUrl,
          miniaturaUrl: '/FLogo.webp',
          imagenLogo: '/FLogo.webp',
          vinetas: m.vinetas,
          categorias: m.categorias
        }));

      return [...listaCertificados, ...listaProyectos, ...listaInternas];
    }

    return await this.repository.findAll();
  }
}