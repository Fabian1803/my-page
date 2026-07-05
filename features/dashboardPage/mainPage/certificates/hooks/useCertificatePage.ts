import { useEffect, useState } from "react";
import { DetailedImageData } from "@/features/dashboardPage/components/detailedImageModal";
import { certificateService } from "@/features/dashboardPage/services/certificateService";

export interface Certificate {
    id: string;
    nombre: string;
    institucion: string;
    descripcion: string;
    imagenPrincipalUrl: string;
    miniaturaUrl?: string;
    vinetas: { id: string; comentario: string }[];
    categorias: { id: string; nombre: string }[];
}
export function useCertificatePage() {
    const [isDetailedImageModalOpen, setIsDetailedImageModalOpen] = useState(false)
    const [certificados, setCertificados] = useState<Certificate[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
    const cargarCertificados = async () => {
        try {
            setIsLoading(true)
            const response = await fetch('/api/resources?tipo=CERTIFICADO')
            const result = await response.json()
            if (result.success) {
                setCertificados(result.data)
            }
        } catch (error) {
            console.error("Error al traer certificados del servidor:", error)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        cargarCertificados()
    }, [])
    const handleDeleteCertificate = async (id: string, nombre: string) => {
        if (!confirm(`¿Estás seguro de eliminar "${nombre}"? Se borrará de Postgres y Vercel Blob.`)) return

        try {
            setIsLoading(true)
            const response = await fetch(`/api/resources?id=${id}`, {
                method: 'DELETE'
            })
            const result = await response.json()
            if (!result.success) throw new Error(result.error)
            setCertificados(prev => prev.filter(c => c.id !== id))
            alert("🗑️ Certificado eliminado correctamente.")
        } catch (error: any) {
            alert("No se pudo eliminar: " + error.message)
        } finally {
            setIsLoading(false)
        }
    }
    const handleOpenEditModal = (cert: Certificate) => {
        setSelectedCertificate(cert);
        setIsDetailedImageModalOpen(true);
    };
    // En tu archivo de hook: useCertificatePage.ts

    const handleSaveDetailedImage = async (data: DetailedImageData) => {
        try {
            setIsLoading(true);

            // 📦 Creamos el contenedor FormData nativo
            const formData = new FormData();

            // 🛡️ Banderas críticas para indicarle al backend que es un certificado aislado
            formData.append("tipo", "CERTIFICADO");
            formData.append("nombre", data.nombre.trim());
            formData.append("descripcion", data.descripcion.trim());

            // Mapeamos 'entidadIcono.nombre' directamente hacia el campo 'instituto' en el backend
            if (data.entidadIcono?.nombre) {
                formData.append("instituto", data.entidadIcono.nombre.trim());
            }

            // 🖼️ Adjuntamos los binarios físicos (Imágenes) si existen
            if (data.imagen) {
                formData.append("imagenPrincipal", data.imagen);
            } else if (!selectedCertificate) {
                throw new Error("La imagen del certificado es completamente obligatoria.");
            }

            if (data.entidadIcono?.archivo) {
                formData.append("miniaturaIcono", data.entidadIcono.archivo);
            }

            // 🏷️ Serializamos colecciones dinámicas como JSON stringificados
            formData.append("categorias", JSON.stringify(data.tags || []));
            formData.append("vinetas", JSON.stringify(data.detalles || []));

            let response;

            if (selectedCertificate) {
                // 💡 MODO ACTUALIZACIÓN (PUT)
                formData.append("id", selectedCertificate.id);
                response = await fetch('/api/resources', {
                    method: 'PUT',
                    body: formData
                });
            } else {
                // 💡 MODO CREACIÓN (POST)
                response = await fetch('/api/resources', {
                    method: 'POST',
                    body: formData
                });
            }

            const result = await response.json();
            if (!result.success) throw new Error(result.error || "Error en el servidor");

            // 🔄 Sincronización limpia del estado en memoria
            if (selectedCertificate) {
                setCertificados(prev => prev.map(c => c.id === selectedCertificate.id ? result.data : c));
                alert("🏆 Certificación actualizada con éxito.");
            } else {
                setCertificados(prev => [result.data, ...prev]);
                alert("🏆 Certificación creada con éxito.");
            }

            setIsDetailedImageModalOpen(false);
            setSelectedCertificate(null);

        } catch (error: any) {
            console.error("Error procesando el certificado:", error);
            alert("Error al procesar: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };
    const skeletons = [1, 2, 3, 4]

    return {
        certificados,
        isLoading,
        skeletons,
        isDetailedImageModalOpen,
        setIsDetailedImageModalOpen,
        handleSaveDetailedImage,
        handleDeleteCertificate,
        handleOpenEditModal,
        selectedCertificate,
        setSelectedCertificate
    }
}