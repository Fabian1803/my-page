// server/media/infrastructure/adapters/VercelBlobStorage.ts
import { del, put } from "@vercel/blob";
import { MediaStorage } from "../../domain/ports/MediaStorage";

export class VercelMediaStorage implements MediaStorage {
  async uploadImage(file: Blob, fileName: string): Promise<string> {
    const isImage = (file.type && file.type.startsWith("image/")) || /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico|avif)$/i.test(fileName);
    if (!isImage) throw new Error("El archivo proporcionado no es una imagen válida.");
    const uniqueName = `uploads/images/${Date.now()}-${fileName}`;
    const blob = await put(uniqueName, file, { access: "public", contentType: file.type || "image/png" });
    return blob.url;
  }

  async uploadVideo(file: Blob, fileName: string): Promise<string> {
    const isVideo = (file.type && file.type.startsWith("video/")) || /\.(mp4|webm|ogg|mov|mkv|avi)$/i.test(fileName);
    if (!isVideo) throw new Error("El archivo proporcionado no es un video válido.");
    const uniqueName = `uploads/videos/${Date.now()}-${fileName}`;
    const blob = await put(uniqueName, file, { access: "public", contentType: file.type || "video/mp4" });
    return blob.url;
  }

  async uploadDocument(file: Blob, fileName: string): Promise<string> {
    const isPdf = file.type === "application/pdf" || /\.pdf$/i.test(fileName);
    if (!isPdf) throw new Error("El archivo proporcionado debe ser estrictamente un documento PDF.");
    const uniqueName = `uploads/documents/${Date.now()}-${fileName}`;
    const blob = await put(uniqueName, file, { access: "public", contentType: "application/pdf" });
    return blob.url;
  }

  async deleteFile(url: string): Promise<void> {
    if (!url) return;
    try {
      await del(url);
    } catch (error) {
      console.error("No se pudo borrar el archivo viejo de Vercel Blob:", error);
    }
  }
}
