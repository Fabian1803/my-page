// server/media/infrastructure/adapters/VercelBlobStorage.ts
import { put } from "@vercel/blob";
import { MediaStorage } from "../../domain/ports/MediaStorage";
export class VercelMediaStorage implements MediaStorage {
  async uploadImage(file: File): Promise<string> {
    if (!file.type.startsWith("image/")) throw new Error("El archivo proporcionado no es una imagen válida.");
    const uniqueName = `uploads/images/${Date.now()}-${file.name}`;
    const blob = await put(uniqueName, file, { access: "public" });
    return blob.url;
  }
  async uploadVideo(file: File): Promise<string> {
    if (!file.type.startsWith("video/")) throw new Error("El archivo proporcionado no es un video válido.");
    const uniqueName = `uploads/videos/${Date.now()}-${file.name}`;
    const blob = await put(uniqueName, file, { access: "public" });
    return blob.url;
  }
}
