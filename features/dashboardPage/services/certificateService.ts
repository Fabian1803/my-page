// features/dashboardPage/services/certificateService.ts
import { DetailedImageData } from "../components/detailedImageModal";
export const certificateService = {
    async crearCertificado(data: DetailedImageData): Promise<any> {
        const formData = new FormData();
        formData.append("tipo", "CERTIFICADO");
        formData.append("nombre", data.nombre.trim());
        formData.append("descripcion", data.descripcion.trim());
        if (data.imagen) {
            formData.append("imagenPrincipal", data.imagen);
        } else {
            throw new Error("El archivo de la imagen principal es estrictamente obligatorio.");
        }
        if (data.entidadIcono.nombre) formData.append("instituto", data.entidadIcono.nombre.trim());
        if (data.entidadIcono.archivo) formData.append("miniaturaIcono", data.entidadIcono.archivo);
        formData.append("categorias", JSON.stringify(data.tags));
        formData.append("vinetas", JSON.stringify(data.detalles));
        const response = await fetch("/api/resources", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();
        if (!result.success) {
            throw new Error(result.error || "Error desconocido al guardar el recurso.");
        }

        return result.data;
    },
    async actualizarCertificado(id: string, data: DetailedImageData): Promise<any> {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("tipo", "CERTIFICADO");
        formData.append("nombre", data.nombre.trim());
        formData.append("descripcion", data.descripcion.trim());
        if (data.imagen) formData.append("imagenPrincipal", data.imagen);
        if (data.entidadIcono.nombre) formData.append("instituto", data.entidadIcono.nombre.trim());
        if (data.entidadIcono.archivo) formData.append("miniaturaIcono", data.entidadIcono.archivo);
        formData.append("categorias", JSON.stringify(data.tags));
        formData.append("vinetas", JSON.stringify(data.detalles));
        const response = await fetch("/api/resources", {
            method: "PUT",
            body: formData,
        });
        const result = await response.json();
        if (!result.success) throw new Error(result.error);
        return result.data;
    }
};