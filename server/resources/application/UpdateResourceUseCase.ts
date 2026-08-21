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
    const id = formData.get("id") as string;
    if (!id) throw new Error("El ID del recurso es requerido para actualizar.");
    const tipo = (formData.get("tipo") as string) || "PROYECTO";
    const nuevaImagenFile = formData.get("imagenPrincipal") as File | null;
    const nuevaMiniaturaFile = formData.get("miniaturaIcono") as File | null;
    const mediaExistente = await prisma.mediaResource.findUnique({
      where: { id },
      include: { categorias: true, vinetas: true }
    });

    if (tipo === "CERTIFICADO" || mediaExistente) {
      if (!mediaExistente) throw new Error("El certificado a actualizar no existe.");

      let imagenPrincipalUrl = mediaExistente.imagenPrincipalUrl;
      if (nuevaImagenFile && nuevaImagenFile.size > 0) {
        if (imagenPrincipalUrl) {
          try {
            await this.mediaStorage.deleteFile(imagenPrincipalUrl);
          } catch { }
        }
        imagenPrincipalUrl = await this.mediaStorage.uploadImage(nuevaImagenFile, nuevaImagenFile.name);
      }

      let miniaturaUrl = mediaExistente.miniaturaUrl;
      if (nuevaMiniaturaFile && nuevaMiniaturaFile.size > 0) {
        if (miniaturaUrl) {
          try {
            await this.mediaStorage.deleteFile(miniaturaUrl);
          } catch { }
        }
        miniaturaUrl = await this.mediaStorage.uploadImage(nuevaMiniaturaFile, nuevaMiniaturaFile.name);
      }

      const nombre = (formData.get("nombre") as string) || mediaExistente.nombre;
      const descripcion = (formData.get("descripcion") as string) || mediaExistente.descripcion;
      const instituto = formData.has("instituto") ? (formData.get("instituto") as string | null) : mediaExistente.instituto;
      const destacado = formData.has("destacado") ? formData.get("destacado") === "true" : mediaExistente.destacado;

      const categoriasRaw = formData.has("categorias")
        ? JSON.parse((formData.get("categorias") as string) || "[]")
        : null;

      const vinetasRaw = formData.has("vinetas")
        ? JSON.parse((formData.get("vinetas") as string) || "[]")
        : null;

      if (vinetasRaw !== null) await prisma.vineta.deleteMany({ where: { mediaResourceId: id } });
      const certActualizado = await prisma.mediaResource.update({
        where: { id },
        data: {
          nombre: nombre.trim(),
          descripcion: descripcion.trim(),
          instituto: instituto?.trim() || null,
          destacado,
          imagenPrincipalUrl,
          miniaturaUrl,
          ...(categoriasRaw !== null && {
            categorias: {
              set: [],
              connectOrCreate: categoriasRaw.map((cat: any) => {
                const nombreCat = typeof cat === "string" ? cat : cat.nombre;
                return {
                  where: { nombre: nombreCat },
                  create: { nombre: nombreCat, imagenUrl: "" }
                };
              })
            }
          }),
          ...(vinetasRaw !== null && {
            vinetas: {
              create: vinetasRaw.map((v: any) => {
                const comentario = typeof v === "string" ? v : v.comentario;
                return { comentario };
              })
            }
          })
        },
        include: {
          categorias: true,
          vinetas: true
        }
      });

      return {
        id: certActualizado.id,
        tipo: certActualizado.tipo,
        nombre: certActualizado.nombre,
        institucion: certActualizado.instituto,
        descripcion: certActualizado.descripcion,
        destacado: certActualizado.destacado,
        imagenPrincipalUrl: certActualizado.imagenPrincipalUrl,
        miniaturaUrl: certActualizado.miniaturaUrl,
        vinetas: certActualizado.vinetas,
        categorias: certActualizado.categorias
      };
    }

    const recursoExistente = await this.repository.findById(id);
    if (!recursoExistente) throw new Error("El recurso a actualizar no existe.");

    let imagenPrincipalUrl = recursoExistente.imagenPrincipalUrl;
    if (nuevaImagenFile && nuevaImagenFile.size > 0) {
      if (imagenPrincipalUrl) {
        try {
          await this.mediaStorage.deleteFile(imagenPrincipalUrl);
        } catch { }
      }
      imagenPrincipalUrl = await this.mediaStorage.uploadImage(nuevaImagenFile, nuevaImagenFile.name);
    }

    let miniaturaUrl = recursoExistente.miniaturaUrl;
    if (nuevaMiniaturaFile && nuevaMiniaturaFile.size > 0) {
      if (miniaturaUrl) {
        try {
          await this.mediaStorage.deleteFile(miniaturaUrl);
        } catch { }
      }
      miniaturaUrl = await this.mediaStorage.uploadImage(nuevaMiniaturaFile, nuevaMiniaturaFile.name);
    }

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

    if (nuevaImagenFile && nuevaImagenFile.size > 0) {
      const portadaMedia = await prisma.mediaResource.create({
        data: {
          tipo: "PORTADA",
          destacado: false,
          nombre: `${nombre.trim()} - portada`,
          descripcion: `Portada de ${nombre.trim()}`,
          imagenPrincipalUrl,
          proyecto: {
            connect: { id }
          }
        }
      });

      await prisma.proyecto.update({
        where: { id },
        data: {
          portada: {
            connect: { id: portadaMedia.id }
          }
        }
      });
    }

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
              connect: { id }
            }
          }
        });

        replacements.push({ token, url: uploadedUrl });
      }
    }
    const seccionesDoc = this.replaceBlobUrlsInSections(seccionesDocRaw, replacements);
    if (replacements.length > 0) {
      await prisma.proyecto.update({
        where: { id },
        data: {
          seccionesDoc
        }
      });
    }

    return proyectoActualizado;
  }
}