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
            if (selectedCertificate) {
                const certActualizado = await certificateService.actualizarCertificado(selectedCertificate.id, data);
                setCertificados(prev => prev.map(c => c.id === selectedCertificate.id ? certActualizado : c));
                alert("🏆 Certificación actualizada con éxito.");
            } else {
                const nuevoCert = await certificateService.crearCertificado(data);
                setCertificados(prev => [nuevoCert, ...prev]);
                alert("🏆 Certificación creada con éxito.");
            }
            setIsDetailedImageModalOpen(false);
            setSelectedCertificate(null);
        } catch (error: any) {
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