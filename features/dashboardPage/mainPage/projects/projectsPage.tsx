'use client'
import React, { useState, useEffect } from 'react'
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md'
import ProjectModal from '../../components/projectModal'

// 🔥 Interfaz del modelo real que viene de Prisma
export interface ProyectoReal {
    id: string;
    tipo: string;
    destacado: boolean;
    nombre: string;
    descripcion: string;
    instituto?: string | null;
    imagenPrincipalUrl: string;
    miniaturaUrl?: string | null;
    categorias: { id: string; nombre: string }[];
    enlaces: { id: string; tipo: string; url: string }[];
    seccionesDoc: { id: string; orden: number; contenidoJson: string }[];
}

export default function ProjectsPage() {
    const [proyectos, setProyectos] = useState<ProyectoReal[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
    
    // 🔄 Estado clave para el modo actualización
    const [selectedProject, setSelectedProject] = useState<ProyectoReal | null>(null)

    // 📥 1. Cargar proyectos reales de la base de datos
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

    // 🚀 Acciones de apertura del Modal
    const handleOpenCreate = () => {
        setSelectedProject(null) // Modo creación (limpio)
        setIsProjectModalOpen(true)
    }

    const handleOpenEdit = (proyecto: ProyectoReal) => {
        setSelectedProject(proyecto) // Modo edición (con datos cargados)
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

    const skeletons = [1, 2, 3, 4]

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-[24px] font-normal tracking-tight text-[#202124]">
                        Mis Proyectos
                    </h1>
                    <span className="text-xs font-semibold px-3 py-1 bg-[#70a4f1]/20 text-[#0b57d0] rounded-full mt-1 inline-block">
                        {isLoading ? 'Sincronizando...' : `${proyectos.length} en total`}
                    </span>
                </div>

                <button
                    type="button"
                    onClick={handleOpenCreate}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#0b57d0] hover:bg-[#155bd3] text-white text-sm font-semibold rounded-full shadow-sm transition-all"
                >
                    <MdAdd size={20} />
                    Crear proyecto
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* MOCK SKELETONS DURANTE LA CARGA */}
                {isLoading && proyectos.length === 0 && skeletons.map((id) => (
                    <div
                        key={id}
                        className="bg-white border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between animate-pulse rounded-2xl"
                    >
                        <div>
                            <div className="w-full h-40 bg-gray-200 border-b border-gray-100 flex items-center justify-center" />
                            <div className="px-3 py-4 space-y-3">
                                <div className="h-5 bg-gray-200 rounded-md w-1/3" />
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded-md w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
                                </div>
                            </div>
                        </div>
                        <div className="px-3 pb-3 pt-1">
                            <div className="w-full bg-gray-200 h-10 rounded-xl" />
                        </div>
                    </div>
                ))}

                {/* PROYECTOS REALES DE LA BASE DE DATOS */}
                {!isLoading && proyectos.map((proyecto) => (
                    <div
                        key={proyecto.id}
                        className="bg-white border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-200 rounded-2xl relative"
                    >
                        {/* Indicador visual de destacado */}
                        {proyecto.destacado && (
                            <span className="absolute top-2 left-2 z-10 text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full shadow-sm">
                                ⭐ Destacado
                            </span>
                        )}

                        <div>
                            <div className="w-full h-40 bg-gray-50 relative flex items-center justify-center border-b border-gray-100 p-4">
                                <img 
                                    src={proyecto.imagenPrincipalUrl} 
                                    alt={proyecto.nombre} 
                                    className="max-h-full max-w-full object-contain opacity-90" 
                                    style={{ width: 'auto', height: 'auto' }}
                                />
                            </div>
                            <div className="p-3">
                                <h2 className="text-sm font-bold text-gray-900 mb-1 truncate">{proyecto.nombre}</h2>
                                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{proyecto.descripcion}</p>
                                
                                {/* Tags del proyecto */}
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {proyecto.categorias?.map(cat => (
                                        <span key={cat.id} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">
                                            {cat.nombre}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="px-3 pb-3 pt-1 flex gap-2">
                            <button
                                type="button"
                                onClick={() => handleOpenEdit(proyecto)}
                                className="flex-1 bg-[#0b57d0] hover:bg-[#0a48b3] text-white text-xs font-semibold py-2.5 px-4 transition-colors shadow-sm inline-flex items-center justify-center gap-1.5 rounded-xl"
                            >
                                <MdEdit size={14} />
                                Actualizar
                            </button>
                            <button
                                type="button"
                                onClick={() => handleDeleteProject(proyecto)}
                                className="p-2.5 text-red-600 hover:bg-red-50 border border-red-200 rounded-xl transition-colors"
                                title="Eliminar proyecto"
                            >
                                <MdDelete size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* CONTROL DE CICLO DE VIDA DE LOS MODALES */}
            {isProjectModalOpen && (
                <ProjectModal
                    isOpen={isProjectModalOpen}
                    onClose={() => setIsProjectModalOpen(false)}
                    defaultData={selectedProject}     // 🔥 Prop que llevará los datos al modo edición
                    onProjectSaved={loadProjects}     // 🔥 Recarga el grid de inmediato al guardar
                />
            )}
        </>
    )
}