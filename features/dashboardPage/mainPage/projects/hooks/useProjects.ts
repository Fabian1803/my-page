'use client'
import { useEffect, useState, useCallback, useMemo } from "react"
import { projectServices, ProjectItem } from "../services/projectServices"
import { useNotifications } from "@/features/dashboardPage/context/NotificationContext"

export type { ProjectItem } from "../services/projectServices"

export function useProjects() {
    const [proyectos, setProyectos] = useState<ProjectItem[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [filterTab, setFilterTab] = useState<'all' | 'destacados'>('all')
    const { addNotification } = useNotifications()

    const cargarProyectos = useCallback(async () => {
        setIsLoading(true)
        try {
            const result = await projectServices.getAll()
            if (result.success && result.data) {
                setProyectos(result.data)
            }
        } catch (error: any) {
            console.error("Error al cargar proyectos:", error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        cargarProyectos()
    }, [cargarProyectos])

    const handleToggleDestacado = async (id: string, currentDestacado: boolean) => {
        setProyectos(prev => prev.map(p => p.id === id ? { ...p, destacado: !currentDestacado } : p))
        try {
            const result = await projectServices.toggleDestacado(id, currentDestacado)
            if (!result.success) throw new Error(result.error)

            addNotification({
                type: 'info',
                title: !currentDestacado ? 'Proyecto marcado como destacado' : 'Proyecto desmarcado',
                desc: !currentDestacado
                    ? 'El proyecto se mostrará en la portada y sección principal del portafolio.'
                    : 'El proyecto ya no aparecerá en la sección destacada principal.'
            })
        } catch (error: any) {
            setProyectos(prev => prev.map(p => p.id === id ? { ...p, destacado: currentDestacado } : p))
            addNotification({
                type: 'error',
                title: 'Error al cambiar estado',
                desc: error.message || 'No se pudo actualizar el estado de destacado.'
            })
        }
    }

    const handleDeleteProject = async (id: string, nombre: string) => {
        if (!confirm(`¿Estás seguro de eliminar el proyecto "${nombre}" y todos sus archivos multimedia de Cloud Storage?`)) return
        const prevList = [...proyectos]
        setProyectos(prev => prev.filter(p => p.id !== id))

        try {
            const result = await projectServices.delete(id)
            if (!result.success) throw new Error(result.error)

            addNotification({
                type: 'info',
                title: 'Proyecto eliminado',
                desc: `El proyecto "${nombre}" y sus recursos han sido eliminados permanentemente.`
            })
        } catch (error: any) {
            setProyectos(prevList)
            addNotification({
                type: 'error',
                title: 'Error al eliminar',
                desc: error.message || 'No se pudo eliminar el proyecto.'
            })
        }
    }

    const toggleFilterTab = () => {
        setFilterTab(prev => prev === 'all' ? 'destacados' : 'all')
    }

    const filteredProyectos = useMemo(() => {
        if (filterTab === 'destacados') {
            return proyectos.filter(p => Boolean(p.destacado))
        }
        return proyectos
    }, [proyectos, filterTab])

    const skeletons = [1, 2, 3, 4]

    return {
        proyectos: filteredProyectos,
        totalCount: proyectos.length,
        isLoading,
        skeletons,
        filterTab,
        toggleFilterTab,
        cargarProyectos,
        handleToggleDestacado,
        handleDeleteProject
    }
}
