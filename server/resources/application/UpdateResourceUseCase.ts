// server/resources/application/UpdateResourceUseCase.ts
import { MediaStorage } from "@/server/media/domain/ports/MediaStorage";
import { ResourceRepository } from "../domain/ports/ResourceRepository";
import { Resource } from "../domain/models/Resource";
import { prisma } from "@/server/shared/infrastructure/prisma";

export class UpdateResourceUseCase {
  constructor(
    private mediaStorage: MediaStorage,
    private repository: ResourceRepository
  ) { }

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

    const destacado = formData.get("destacado") === "true";
    const nombre = (formData.get("nombre") as string) || recursoExistente.nombre;
    const descripcion = (formData.get("descripcion") as string) || recursoExistente.descripcion;
    const instituto = formData.get("instituto") as string | null;

    const categorias = JSON.parse((formData.get("categorias") as string) || "[]");
    const enlaces = JSON.parse((formData.get("enlaces") as string) || "[]");
    const vinetas = JSON.parse((formData.get("vinetas") as string) || "[]");
    const seccionesDocRaw = JSON.parse((formData.get("seccionesDoc") as string) || "[]");

    let imagenPrincipalUrl = recursoExistente.imagenPrincipalUrl;
    if (nuevaImagenFile && nuevaImagenFile.size > 0) {
      if (imagenPrincipalUrl) {
        try {
          await this.mediaStorage.deleteFile(imagenPrincipalUrl);
        } catch { }
      }
      const extensionPortada = (nuevaImagenFile.name?.split(".").pop() || "png").toLowerCase();
      imagenPrincipalUrl = await this.mediaStorage.uploadImage(nuevaImagenFile, `${nombre.trim()}-portada.${extensionPortada}`);
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

    const resourceEntity = new Resource({
      id,
      tipo,
      destacado,
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      instituto,
      imagenPrincipalUrl,
      miniaturaUrl,
      categorias,
      enlaces,
      vinetas,
      seccionesDoc: seccionesDocRaw
    });

    const proyectoActualizado = await this.repository.update(id, resourceEntity);

    // Sincronizar MediaResource de la portada
    const portadaExistente = await prisma.mediaResource.findFirst({
      where: { proyectoId: id, tipo: "PORTADA" }
    });

    if (portadaExistente) {
      await prisma.vineta.deleteMany({ where: { mediaResourceId: portadaExistente.id } });
      await prisma.mediaResource.update({
        where: { id: portadaExistente.id },
        data: {
          nombre: `${nombre.trim()}-portada`,
          descripcion: descripcion.trim(),
          imagenPrincipalUrl,
          categorias: {
            set: [],
            connectOrCreate: categorias.map((cat: any) => {
              const nombreCat = typeof cat === 'string' ? cat : cat.nombre;
              return {
                where: { nombre: nombreCat },
                create: { nombre: nombreCat, imagenUrl: "" }
              };
            })
          },
          vinetas: {
            create: vinetas.map((v: any) => {
              const comentario = typeof v === 'string' ? v : v.comentario;
              return { comentario };
            })
          }
        }
      });
    } else if (imagenPrincipalUrl) {
      const portadaMedia = await prisma.mediaResource.create({
        data: {
          tipo: "PORTADA",
          destacado: false,
          nombre: `${nombre.trim()}-portada`,
          descripcion: descripcion.trim(),
          imagenPrincipalUrl,
          categorias: {
            connectOrCreate: categorias.map((cat: any) => {
              const nombreCat = typeof cat === 'string' ? cat : cat.nombre;
              return {
                where: { nombre: nombreCat },
                create: { nombre: nombreCat, imagenUrl: "" }
              };
            })
          },
          vinetas: {
            create: vinetas.map((v: any) => {
              const comentario = typeof v === 'string' ? v : v.comentario;
              return { comentario };
            })
          },
          proyecto: {
            connect: { id }
          }
        }
      });

      await prisma.proyecto.update({
        where: { id },
        data: {
          portada: { connect: { id: portadaMedia.id } }
        }
      });
    }

    const replacements: Array<{ token: string; url: string }> = [];
    const conteoExistentes = await prisma.mediaResource.count({
      where: { proyectoId: id, tipo: "IMAGEN_INTERNA" }
    });
    let tiptapIndex = conteoExistentes + 1;

    for (const [fieldName, value] of Array.from(formData.entries())) {
      if (fieldName.startsWith("tiptap_media_") && value instanceof File) {
        const token = fieldName.replace(/^tiptap_media_/, "");
        const extension = (value.name?.split(".").pop() || "png").toLowerCase();
        const customFileName = `${nombre.trim()}-imagen${tiptapIndex}.${extension}`;
        const uploadedUrl = await this.mediaStorage.uploadImage(value, customFileName);

        await prisma.mediaResource.create({
          data: {
            tipo: "IMAGEN_INTERNA",
            destacado: false,
            nombre: `${nombre.trim()}-imagen${tiptapIndex}`,
            descripcion: descripcion.trim(),
            imagenPrincipalUrl: uploadedUrl,
            categorias: {
              connectOrCreate: categorias.map((cat: any) => {
                const nombreCat = typeof cat === 'string' ? cat : cat.nombre;
                return {
                  where: { nombre: nombreCat },
                  create: { nombre: nombreCat, imagenUrl: "" }
                };
              })
            },
            vinetas: {
              create: vinetas.map((v: any) => {
                const comentario = typeof v === 'string' ? v : v.comentario;
                return { comentario };
              })
            },
            proyecto: {
              connect: { id }
            }
          }
        });

        replacements.push({ token, url: uploadedUrl });
        tiptapIndex++;
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