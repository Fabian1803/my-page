// server/resources/application/CreateResourceUseCase.ts
import { ResourceRepository } from "../domain/ports/ResourceRepository";
import { Resource } from "../domain/models/Resource";
import { MediaStorage } from "@/server/media/domain/ports/MediaStorage";
import { prisma } from "@/server/shared/infrastructure/prisma";

export class CreateResourceUseCase {
  constructor(
    private mediaStorage: MediaStorage,
    private repository: ResourceRepository
  ) { }

  private replaceBlobUrlsInSections(seccionesDoc: string[], replacements: Array<{ token: string; url: string }>): string[] {
    if (replacements.length === 0) return seccionesDoc;
    let fallbackIndex = 0;
    return seccionesDoc.map((section) => {
      try {
        const parsed = typeof section === "string" ? JSON.parse(section) : section;
        const visit = (value: any): any => {
          if (Array.isArray(value)) return value.map(visit);
          if (!value || typeof value !== "object") return value;

          if (value.attrs && typeof value.attrs.src === "string" && (value.attrs.src.startsWith("blob:") || value.attrs.src.startsWith("http://localhost") || value.attrs.src.includes("localhost"))) {
            const altToken = typeof value.attrs.alt === "string" ? value.attrs.alt : "";
            const tokenAttr = typeof value.attrs.token === "string" ? value.attrs.token : "";
            const titleAttr = typeof value.attrs.title === "string" ? value.attrs.title : "";

            const replacement = replacements.find((item) =>
              (altToken && (altToken.includes(item.token) || item.token.includes(altToken))) ||
              (tokenAttr && (tokenAttr.includes(item.token) || item.token.includes(tokenAttr))) ||
              (titleAttr && (titleAttr.includes(item.token) || item.token.includes(titleAttr)))
            ) || (fallbackIndex < replacements.length ? replacements[fallbackIndex++] : null);

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

        const transformed = visit(parsed);
        return typeof section === "string" ? JSON.stringify(transformed) : transformed;
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

    const tipo = (formData.get("tipo") as string) || "PROYECTO";
    const nombre = (formData.get("nombre") as string) || "";
    const descripcion = (formData.get("descripcion") as string) || "";
    const instituto = formData.get("instituto") as string | null;
    const categoriasRaw = JSON.parse((formData.get("categorias") as string) || "[]");
    const vinetasRaw = JSON.parse((formData.get("vinetas") as string) || "[]");

    const extensionPortada = (imagenPrincipalFile.name?.split(".").pop() || "png").toLowerCase();
    const nombreArchivoPortada = tipo === "PROYECTO"
      ? `${nombre.trim()}-portada.${extensionPortada}`
      : imagenPrincipalFile.name;

    const imagenPrincipalUrl = await this.mediaStorage.uploadImage(imagenPrincipalFile, nombreArchivoPortada);
    let miniaturaUrl: string | null = null;
    if (miniaturaFile && miniaturaFile.size > 0) {
      miniaturaUrl = await this.mediaStorage.uploadImage(miniaturaFile, miniaturaFile.name);
    }

    if (tipo === "CERTIFICADO") {
      const nuevoCertificado = await prisma.mediaResource.create({
        data: {
          tipo: "CERTIFICADO",
          destacado: formData.get("destacado") === "true",
          nombre: nombre.trim(),
          descripcion: descripcion.trim(),
          instituto: instituto?.trim() || null,
          imagenPrincipalUrl,
          miniaturaUrl,
          categorias: {
            connectOrCreate: categoriasRaw.map((cat: any) => {
              const nombreCat = typeof cat === 'string' ? cat : cat.nombre;
              return {
                where: { nombre: nombreCat },
                create: { nombre: nombreCat, imagenUrl: "" }
              };
            })
          },
          vinetas: {
            create: vinetasRaw.map((v: any) => {
              const comentario = typeof v === 'string' ? v : v.comentario;
              return { comentario };
            })
          }
        },
        include: {
          categorias: true,
          vinetas: true
        }
      });
      return {
        success: true,
        data: {
          id: nuevoCertificado.id,
          nombre: nuevoCertificado.nombre,
          institucion: nuevoCertificado.instituto,
          descripcion: nuevoCertificado.descripcion,
          imagenPrincipalUrl: nuevoCertificado.imagenPrincipalUrl,
          miniaturaUrl: nuevoCertificado.miniaturaUrl,
          vinetas: nuevoCertificado.vinetas,
          categorias: nuevoCertificado.categorias
        }
      };
    }

    const destacado = formData.get("destacado") === "true";
    const enlaces = JSON.parse((formData.get("enlaces") as string) || "[]");
    const seccionesDocRaw = JSON.parse((formData.get("seccionesDoc") as string) || "[]");

    // Subir archivos multimedia de Tiptap y generar reemplazos
    const replacements: Array<{ token: string; url: string }> = [];
    const uploadedMediaList: Array<{ isVideo: boolean; url: string; index: number }> = [];
    let tiptapIndex = 1;

    for (const [fieldName, value] of Array.from(formData.entries())) {
      if (fieldName.startsWith("tiptap_media_") && value instanceof File) {
        const token = fieldName.replace(/^tiptap_media_/, "");
        const isVideo = (value.type && value.type.startsWith("video/")) || /\.(mp4|webm|ogg|mov|mkv|avi)$/i.test(value.name) || token.includes("video");
        const extension = (value.name?.split(".").pop() || (isVideo ? "mp4" : "png")).toLowerCase();

        let uploadedUrl = "";
        if (isVideo) {
          const customFileName = `${nombre.trim()}-video${tiptapIndex}.${extension}`;
          uploadedUrl = await this.mediaStorage.uploadVideo(value, customFileName);
          uploadedMediaList.push({ isVideo: true, url: uploadedUrl, index: tiptapIndex });
        } else {
          const customFileName = `${nombre.trim()}-imagen${tiptapIndex}.${extension}`;
          uploadedUrl = await this.mediaStorage.uploadImage(value, customFileName);
          uploadedMediaList.push({ isVideo: false, url: uploadedUrl, index: tiptapIndex });
        }

        replacements.push({ token, url: uploadedUrl });
        tiptapIndex++;
      }
    }

    const seccionesDoc = this.replaceBlobUrlsInSections(seccionesDocRaw, replacements);

    const resourceEntity = new Resource({
      id: crypto.randomUUID(),
      tipo,
      destacado,
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      instituto,
      imagenPrincipalUrl,
      miniaturaUrl,
      categorias: categoriasRaw,
      enlaces,
      vinetas: vinetasRaw,
      seccionesDoc
    });

    const proyectoCreado = await this.repository.save(resourceEntity);
    const proyectoId = proyectoCreado?.id || resourceEntity.id;

    // Guardar portada en MediaResource
    const portadaMedia = await prisma.mediaResource.create({
      data: {
        tipo: "PORTADA",
        destacado: false,
        nombre: `${nombre.trim()}-portada`,
        descripcion: descripcion.trim(),
        imagenPrincipalUrl,
        categorias: {
          connectOrCreate: categoriasRaw.map((cat: any) => {
            const nombreCat = typeof cat === 'string' ? cat : cat.nombre;
            return {
              where: { nombre: nombreCat },
              create: { nombre: nombreCat, imagenUrl: "" }
            };
          })
        },
        vinetas: {
          create: vinetasRaw.map((v: any) => {
            const comentario = typeof v === 'string' ? v : v.comentario;
            return { comentario };
          })
        },
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
        },
        seccionesDoc
      }
    });

    // Guardar imágenes internas en MediaResource
    for (const media of uploadedMediaList) {
      if (!media.isVideo) {
        await prisma.mediaResource.create({
          data: {
            tipo: "IMAGEN_INTERNA",
            destacado: false,
            nombre: `${nombre.trim()}-imagen${media.index}`,
            descripcion: descripcion.trim(),
            imagenPrincipalUrl: media.url,
            categorias: {
              connectOrCreate: categoriasRaw.map((cat: any) => {
                const nombreCat = typeof cat === 'string' ? cat : cat.nombre;
                return {
                  where: { nombre: nombreCat },
                  create: { nombre: nombreCat, imagenUrl: "" }
                };
              })
            },
            vinetas: {
              create: vinetasRaw.map((v: any) => {
                const comentario = typeof v === 'string' ? v : v.comentario;
                return { comentario };
              })
            },
            proyecto: {
              connect: { id: proyectoId }
            }
          }
        });
      }
    }

    return {
      success: true,
      data: proyectoCreado
    };
  }
}