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
    const handleSaveDetailedImage = async (data: DetailedImageData) => {
        try {
            setIsLoading(true);
            const formData = new FormData();

            // 1. Forzar el tipo correcto
            formData.append("tipo", "CERTIFICADO");
            formData.append("nombre", data.nombre.trim());

            // 2. IMPORTANTE: El dominio Resource corta a 150 caracteres máximo. Evitamos que rompa el backend.
            const descripcionSanitizada = data.descripcion.trim().slice(0, 150);
            formData.append("descripcion", descripcionSanitizada);

            if (data.entidadIcono?.nombre) formData.append("instituto", data.entidadIcono.nombre.trim());

            if (data.imagen) {
                formData.append("imagenPrincipal", data.imagen);
            } else if (!selectedCertificate) {
                throw new Error("La imagen del certificado es completamente obligatoria.");
            }

            if (data.entidadIcono?.archivo) formData.append("miniaturaIcono", data.entidadIcono.archivo);

            // 3. Mapear tags limpiamente extrayendo solo el nombre string que espera el backend
            // Cambia la línea de tagsFormateados por esta:
            const tagsFormateados = ((data.tags || []) as Array<string | { id: string; nombre: string }>).map(t =>
                typeof t === 'object' && t !== null ? t.nombre : t
            );
            formData.append("categorias", JSON.stringify(tagsFormateados));
            formData.append("vinetas", JSON.stringify(data.detalles || []));

            // Inicializar seccionesDoc vacías para cumplir los requerimientos del caso de uso
            formData.append("seccionesDoc", JSON.stringify([]));

            let response;

            if (selectedCertificate) {
                // Mandamos el ID completo y real (UUID) sin romperlo
                const cleanId = selectedCertificate.id;

                formData.append("id", cleanId);

                response = await fetch('/api/resources', {
                    method: 'PUT',
                    body: formData
                });
            } else {
                response = await fetch('/api/resources', {
                    method: 'POST',
                    body: formData
                });
            }

            const result = await response.json();
            if (!result.success) throw new Error(result.error || "Error en el servidor");

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
    const skeletons = [1, 2]

    return {
        certificados,
        isLoading,
        skeletons,
        isDetailedImageModalOpen,
        cargarCertificados,
        setIsDetailedImageModalOpen,
        handleSaveDetailedImage,
        handleDeleteCertificate,
        handleOpenEditModal,
        selectedCertificate,
        setSelectedCertificate
    }
}