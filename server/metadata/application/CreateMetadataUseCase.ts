import { MetadataRepository } from "../domain/ports/MetadataRepository";
import { Metadata } from "../domain/models/Metadata";
import { MediaStorage } from "@/server/media/domain/ports/MediaStorage";
const PORTFOLIO_SINGLE_ID = "mi-portafolio-unico-id";
export class CreateMetadataUseCase {
    constructor(
        private repository: MetadataRepository,
        private mediaStorage: MediaStorage 
    ) { }
    async execute(request: Request) {
        const formData = await request.formData();
        const imagenFile = formData.get("imagen") as File | null;
        const pdfFile = formData.get("documento") as File | null;
        const metadatosRaw = formData.get("metadatos") as string;
        const metadatosNuevos = metadatosRaw ? JSON.parse(metadatosRaw) : {};
        const registroExistente = await this.repository.findAll();
        const metadatosActuales = registroExistente?.[0]?.metadatos || {};
        const metadatosFinales = {
            ...metadatosActuales,
            ...metadatosNuevos
        };
        if (imagenFile && imagenFile.size > 0) {
            if (metadatosActuales.url_imagen) await this.mediaStorage.deleteFile(metadatosActuales.url_imagen);
            const urlImagen = await this.mediaStorage.uploadImage(imagenFile, imagenFile.name);
            metadatosFinales.url_imagen = urlImagen;
        } else {
            metadatosFinales.url_imagen = metadatosActuales.url_imagen || "";
        }
        if (pdfFile && pdfFile.size > 0) {
            if (metadatosActuales.url_cv_pdf) await this.mediaStorage.deleteFile(metadatosActuales.url_cv_pdf);
            const urlPdf = await this.mediaStorage.uploadDocument(pdfFile, pdfFile.name);
            metadatosFinales.url_cv_pdf = urlPdf;
        } else {
            metadatosFinales.url_cv_pdf = metadatosActuales.url_cv_pdf || "";
        }
        const metadataEntity = new Metadata({
            id: PORTFOLIO_SINGLE_ID,
            metadatos: metadatosFinales
        });

        return await this.repository.save(metadataEntity);
    }
}