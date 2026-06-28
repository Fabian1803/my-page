// server/media/domain/ports/BlobStorage.ts
export interface MediaStorage {
  uploadImage(file: Blob, fileName: string): Promise<string>;
  uploadVideo(file: Blob, fileName: string): Promise<string>;
  uploadDocument(file: Blob, fileName: string): Promise<string>;
  deleteFile(url: string): Promise<void>;
}
