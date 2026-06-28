// server/media/infrastructure/adapters/VercelBlobStorage.ts
import { del, put } from "@vercel/blob";
import { MediaStorage } from "../../domain/ports/MediaStorage";

export class VercelMediaStorage implements MediaStorage {
  async uploadImage(file: Blob, fileName: string): Promise<string> {
    if (!file.type.startsWith("image/")) throw new Error("El archivo proporcionado no es una imagen válida.");
    const uniqueName = `uploads/images/${Date.now()}-${fileName}`;
    const blob = await put(uniqueName, file, { access: "public" });
    return blob.url;
  }

  async uploadVideo(file: Blob, fileName: string): Promise<string> {
    if (!file.type.startsWith("video/")) throw new Error("El archivo proporcionado no es un video válido.");
    const uniqueName = `uploads/videos/${Date.now()}-${fileName}`;
    const blob = await put(uniqueName, file, { access: "public" });
    return blob.url;
  }

  async uploadDocument(file: Blob, fileName: string): Promise<string> {
    if (file.type !== "application/pdf") throw new Error("El archivo proporcionado debe ser estrictamente un documento PDF.");
    const uniqueName = `uploads/documents/${Date.now()}-${fileName}`;
    const blob = await put(uniqueName, file, { access: "public" });
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
