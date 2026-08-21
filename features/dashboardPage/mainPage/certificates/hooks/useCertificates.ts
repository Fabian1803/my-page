'use client'
import { useEffect, useState, useCallback, useMemo } from "react"
import { certificateServices, CertificateItem } from "../services/certificateServices"
import { useNotifications } from "@/features/dashboardPage/context/NotificationContext"

export type { CertificateItem } from "../services/certificateServices"

export function useCertificates() {
    const [certificados, setCertificados] = useState<CertificateItem[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [filterTab, setFilterTab] = useState<'all' | 'destacados'>('all')
    const { addNotification } = useNotifications()

    const cargarCertificados = useCallback(async () => {
        setIsLoading(true)
        try {
            const result = await certificateServices.getAll()
            if (result.success && result.data) {
                setCertificados(result.data)
            }
        } catch (error: any) {
            console.error("Error al cargar certificados:", error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        cargarCertificados()
    }, [cargarCertificados])

    const handleToggleDestacado = async (id: string, currentDestacado: boolean) => {
        // Optimistic update
        setCertificados(prev => prev.map(c => c.id === id ? { ...c, destacado: !currentDestacado } : c))

        try {
            const result = await certificateServices.toggleDestacado(id, currentDestacado)
            if (!result.success) throw new Error(result.error)

            addNotification({
                type: 'info',
                title: !currentDestacado ? 'Certificado marcado como destacado' : 'Certificado desmarcado',
                desc: !currentDestacado 
                    ? 'La credencial se destacará en la portada y habilidades del portafolio.'
                    : 'La credencial ya no aparecerá en la sección destacada principal.'
            })
        } catch (error: any) {
            // Revert on failure
            setCertificados(prev => prev.map(c => c.id === id ? { ...c, destacado: currentDestacado } : c))
            addNotification({
                type: 'error',
                title: 'Error al cambiar estado',
                desc: error.message || 'No se pudo actualizar el estado de destacado.'
            })
        }
    }

    const handleDeleteCertificate = async (id: string, nombre: string) => {
        if (!confirm(`¿Estás seguro de eliminar el certificado "${nombre}"? Se borrará de Postgres y Cloud Storage.`)) return

        // Optimistic removal
        const prevList = [...certificados]
        setCertificados(prev => prev.filter(c => c.id !== id))

        try {
            const result = await certificateServices.delete(id)
            if (!result.success) throw new Error(result.error)

            addNotification({
                type: 'info',
                title: 'Certificado eliminado',
                desc: `La credencial "${nombre}" ha sido eliminada permanentemente.`
            })
        } catch (error: any) {
            // Revert
            setCertificados(prevList)
            addNotification({
                type: 'error',
                title: 'Error al eliminar',
                desc: error.message || 'No se pudo eliminar el certificado.'
            })
        }
    }

    const toggleFilterTab = () => {
        setFilterTab(prev => prev === 'all' ? 'destacados' : 'all')
    }

    const filteredCertificados = useMemo(() => {
        if (filterTab === 'destacados') {
            return certificados.filter(c => Boolean(c.destacado))
        }
        return certificados
    }, [certificados, filterTab])

    const skeletons = [1, 2, 3, 4]

    return {
        certificados: filteredCertificados,
        totalCount: certificados.length,
        isLoading,
        skeletons,
        filterTab,
        toggleFilterTab,
        cargarCertificados,
        handleToggleDestacado,
        handleDeleteCertificate
    }
}
