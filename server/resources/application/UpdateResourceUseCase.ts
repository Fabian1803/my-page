// server/resources/application/UpdateResourceUseCase.ts
import { MediaStorage } from "@/server/media/domain/ports/MediaStorage";
import { ResourceRepository } from "../domain/ports/ResourceRepository";
import { Resource } from "../domain/models/Resource";
import { prisma } from "@/server/shared/infrastructure/prisma";

interface ImagenInternaMetadata {
  nombre?: string;
  descripcion?: string;
  tags?: string[];
  detalles?: string[];
}

export class UpdateResourceUseCase {
  constructor(
    private mediaStorage: MediaStorage,
    private repository: ResourceRepository
  ) {}

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
    const id = formData.get("id") as string;
    if (!id) throw new Error("El ID del recurso es requerido para actualizar.");

    const recursoExistente = await this.repository.findById(id);
    if (!recursoExistente) throw new Error("El recurso a actualizar no existe.");

    const nuevaImagenFile = formData.get("imagenPrincipal") as File | null;
    const nuevaMiniaturaFile = formData.get("miniaturaIcono") as File | null;
    let imagenPrincipalUrl = recursoExistente.imagenPrincipalUrl;
    if (nuevaImagenFile && nuevaImagenFile.size > 0) {
      if (imagenPrincipalUrl) await this.mediaStorage.deleteFile(imagenPrincipalUrl);
      imagenPrincipalUrl = await this.mediaStorage.uploadImage(nuevaImagenFile, nuevaImagenFile.name);
    }

    let miniaturaUrl = recursoExistente.miniaturaUrl;
    if (nuevaMiniaturaFile && nuevaMiniaturaFile.size > 0) {
      if (miniaturaUrl) await this.mediaStorage.deleteFile(miniaturaUrl);
      miniaturaUrl = await this.mediaStorage.uploadImage(nuevaMiniaturaFile, nuevaMiniaturaFile.name);
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
      id,
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

    const proyectoActualizado = await this.repository.update(id, resourceEntity);

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
            proyectoPadre: {
              connect: { id }
            }
          }
        });

        replacements.push({ token, url: uploadedUrl });
      }
    }

    const seccionesDoc = this.replaceBlobUrlsInSections(seccionesDocRaw, replacements);

    if (replacements.length > 0) {
      await prisma.mediaResource.update({
        where: { id },
        data: {
          seccionesDoc: {
            deleteMany: {},
            create: seccionesDoc.map((jsonStr, index) => ({
              orden: index,
              contenidoJson: jsonStr
            }))
          }
        }
      });
    }

    return proyectoActualizado;
  }
}