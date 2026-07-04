// server/resources/application/CreateResourceUseCase.ts
import { ResourceRepository } from "../domain/ports/ResourceRepository";
import { Resource } from "../domain/models/Resource";
import { MediaStorage } from "@/server/media/domain/ports/MediaStorage";
import { prisma } from "@/server/shared/infrastructure/prisma";

interface ImagenInternaMetadata {
  nombre?: string;
  descripcion?: string;
  tags?: string[];
  detalles?: string[];
}

export class CreateResourceUseCase {
  constructor(
    private mediaStorage: MediaStorage,
    private repository: ResourceRepository
  ) { }

  private parseMetadata(formData: FormData, token: string): ImagenInternaMetadata {
    const raw = formData.get(`tiptap_media_meta_${token}`) as string | null;
    if (!raw) return {};

    try {
      const parsed = JSON.parse(raw);
      return {
        nombre: parsed?.nombre || "",
        descripcion: parsed?.descripcion || "",
        tags: Array.isArray(parsed?.tags) ? parsed.tags : [],
        detalles: Array.isArray(parsed?.detalles) ? parsed.detalles : []
      };
    } catch {
      return {};
    }
  }

  private replaceBlobUrlsInSections(seccionesDoc: string[], replacements: Array<{ token: string; url: string }>): string[] {
    if (replacements.length === 0) return seccionesDoc;

    return seccionesDoc.map((section) => {
      try {
        const parsed = JSON.parse(section);
        const visit = (value: any): any => {
          if (Array.isArray(value)) return value.map(visit);
          if (!value || typeof value !== "object") return value;

          if (value.attrs && typeof value.attrs.src === "string" && value.attrs.src.startsWith("blob:")) {
            const altToken = typeof value.attrs.alt === "string" ? value.attrs.alt : "";
            const replacement = replacements.find((item) => altToken.includes(item.token));
            if (replacement) {
              value = { ...value, attrs: { ...value.attrs, src: replacement.url } };
            }
          }

          const result: Record<string, any> = {};
          for (const [key, child] of Object.entries(value)) {
            result[key] = visit(child);
          }
          return result;
        };

        return JSON.stringify(visit(parsed));
      } catch {
        return section;
      }
    });
  }

  async execute(request: Request) {
    const formData = await request.formData();
    const imagenPrincipalFile = formData.get("imagenPrincipal") as File;
    const miniaturaFile = formData.get("miniaturaIcono") as File | null;

    if (!imagenPrincipalFile || imagenPrincipalFile.size === 0) throw new Error("Falta la imagen principal.");

    const imagenPrincipalUrl = await this.mediaStorage.uploadImage(imagenPrincipalFile, imagenPrincipalFile.name);
    let miniaturaUrl: string | null = null;
    if (miniaturaFile && miniaturaFile.size > 0) {
      miniaturaUrl = await this.mediaStorage.uploadImage(miniaturaFile, miniaturaFile.name);
    }

    const tipo = (formData.get("tipo") as string) || "PROYECTO";
    const destacado = formData.get("destacado") === "true";
    const nombre = formData.get("nombre") as string;
    const descripcion = formData.get("descripcion") as string;
    const instituto = formData.get("instituto") as string | null;
    const categorias = JSON.parse((formData.get("categorias") as string) || "[]");
    const enlaces = JSON.parse((formData.get("enlaces") as string) || "[]");
    const vinetas = JSON.parse((formData.get("vinetas") as string) || "[]");
    const seccionesDocRaw = JSON.parse((formData.get("seccionesDoc") as string) || "[]");

    const resourceEntity = new Resource({
      tipo,
      destacado,
      nombre,
      descripcion,
      instituto,
      imagenPrincipalUrl,
      miniaturaUrl,
      categorias,
      enlaces,
      vinetas,
      seccionesDoc: seccionesDocRaw
    });

    const proyectoCreado = await this.repository.save(resourceEntity);
    const proyectoId = proyectoCreado?.id || resourceEntity.id;

    const portadaMedia = await prisma.mediaResource.create({
      data: {
        tipo: "PORTADA",
        destacado: false,
        nombre: `${nombre.trim()} - portada`,
        descripcion: `Portada de ${nombre.trim()}`,
        imagenPrincipalUrl,
        proyecto: {
          connect: { id: proyectoId }
        }
      }
    });

    await prisma.proyecto.update({
      where: { id: proyectoId },
      data: {
        portada: {
          connect: { id: portadaMedia.id }
        }
      }
    });

    const replacements: Array<{ token: string; url: string }> = [];
    for (const [fieldName, value] of Array.from(formData.entries())) {
      if (fieldName.startsWith("tiptap_media_") && value instanceof File) {
        const token = fieldName.replace(/^tiptap_media_/, "");
        const metadata = this.parseMetadata(formData, token);
        const extension = (value.name?.split(".").pop() || "bin").toLowerCase();
        const fileName = value.name?.trim() ? value.name : `tiptap-${token}.${extension}`;
        const uploadedUrl = await this.mediaStorage.uploadImage(value, fileName);

        await prisma.mediaResource.create({
          data: {
            tipo: "IMAGEN_INTERNA",
            destacado: false,
            nombre: metadata.nombre?.trim() || `Imagen interna ${token}`,
            descripcion: metadata.descripcion?.trim() || "Imagen interna del proyecto",
            imagenPrincipalUrl: uploadedUrl,
            categorias: {
              connect: (metadata.tags || []).map((tagName) => ({ nombre: tagName }))
            },
            vinetas: {
              create: (metadata.detalles || []).map((detalle) => ({ comentario: detalle }))
            },
            proyecto: {
              connect: { id: proyectoId }
            }
          }
        });

        replacements.push({ token, url: uploadedUrl });
      }
    }

    const seccionesDoc = this.replaceBlobUrlsInSections(seccionesDocRaw, replacements);

    if (replacements.length > 0) {
      await prisma.proyecto.update({
        where: { id: proyectoId },
        data: {
          seccionesDoc
        }
      });
    }

    return proyectoCreado;
  }
}