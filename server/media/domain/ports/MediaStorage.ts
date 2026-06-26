// server/media/domain/ports/BlobStorage.ts
export interface MediaStorage {
  uploadImage(file: File): Promise<string>;
  uploadVideo(file: File): Promise<string>;
}
