import { useEffect, useState } from "react"
import { ProyectoReal } from "./projectsPage"

export function useProjectsPage() {
     const [proyectos, setProyectos] = useState<ProyectoReal[]>([])
        const [isLoading, setIsLoading] = useState(true)
        const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
        const [selectedProject, setSelectedProject] = useState<ProyectoReal | null>(null)
        const loadProjects = async () => {
            try {
                setIsLoading(true)
                const response = await fetch('/api/resources?tipo=PROYECTO')
                const result = await response.json()
                if (result.success) {
                    setProyectos(result.data)
                }
            } catch (error) {
                console.error("Error cargando los proyectos:", error)
            } finally {
                setIsLoading(false)
            }
        }
    
        useEffect(() => {
            loadProjects()
        }, [])
    
        const handleOpenCreate = () => {
            setSelectedProject(null)
            setIsProjectModalOpen(true)
        }
    
        const handleOpenEdit = (proyecto: ProyectoReal) => {
            setSelectedProject(proyecto)
            setIsProjectModalOpen(true)
        }
    
        const handleDeleteProject = async (proyecto: ProyectoReal) => {
            const confirmed = window.confirm(`¿Seguro que quieres eliminar el proyecto "${proyecto.nombre}" y sus archivos asociados?`)
            if (!confirmed) return
    
            try {
                const response = await fetch(`/api/resources?id=${proyecto.id}`, {
                    method: 'DELETE'
                })
                const result = await response.json()
                if (!result.success) throw new Error(result.error || 'No se pudo eliminar el proyecto')
                await loadProjects()
            } catch (error: any) {
                console.error('Error eliminando proyecto:', error)
                alert('Error: ' + error.message)
            }
        }
        const skeletons = [1, 2]
    return {
        proyectos,
        isLoading,
        skeletons,
        isProjectModalOpen,
        selectedProject,
        loadProjects,
        handleOpenCreate,
        handleOpenEdit,
        handleDeleteProject,
        setIsProjectModalOpen
    }
}