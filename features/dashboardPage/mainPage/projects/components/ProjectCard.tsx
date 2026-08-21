'use client'
import React from 'react'
import Link from 'next/link'
import { MdDelete, MdLanguage, MdArticle } from 'react-icons/md'
import { FaStar, FaRegStar, FaArrowRight, FaGithub, FaDocker, FaGitlab } from 'react-icons/fa'
import { ProjectItem } from '../services/projectServices'

interface ProjectCardProps {
    proyecto: ProjectItem;
    onToggleDestacado: (id: string, current: boolean) => void;
    onDelete: (id: string, nombre: string) => void;
}

export default function ProjectCard({
    proyecto,
    onToggleDestacado,
    onDelete
}: ProjectCardProps) {
    const isDestacado = Boolean(proyecto.destacado)

    const renderLinkIcon = (type: string) => {
        switch (type) {
            case 'github': return <FaGithub size={14} className="text-gray-700 hover:text-black" title="GitHub" />
            case 'docker': return <FaDocker size={14} className="text-[#2496ed] hover:opacity-80" title="Docker Hub" />
            case 'gitlab': return <FaGitlab size={14} className="text-[#e24329] hover:opacity-80" title="GitLab" />
            default: return <MdLanguage size={14} className="text-[#0c68e0] hover:opacity-80" title="Sitio Web" />
        }
    }

    const sectionsCount = proyecto.seccionesDoc?.length || 0

    return (
        <div className="bg-white border border-[#dadce0] rounded-xl flex flex-col justify-between hover:shadow-md transition-all group overflow-hidden">
            <div className="w-full p-4 sm:p-5 flex-1 flex flex-col">
                {/* Cabecera de la tarjeta: Título, Estrella y Borrado */}
                <div className="flex justify-between items-start gap-2 mb-2">
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            {isDestacado && (
                                <span className="text-[10px] bg-yellow-50 text-yellow-700 border border-yellow-200 px-1.5 py-0.5 rounded font-medium shrink-0">
                                    Destacado
                                </span>
                            )}
                            {sectionsCount > 0 && (
                                <span className="inline-flex items-center gap-1 text-[10px] bg-blue-50 text-[#0c68e0] border border-blue-100 px-1.5 py-0.5 rounded font-medium shrink-0">
                                    <MdArticle size={11} />
                                    {sectionsCount} {sectionsCount === 1 ? 'sección doc' : 'secciones doc'}
                                </span>
                            )}
                        </div>
                        <Link 
                            href={`/dashboard/proyectos/${proyecto.id}`}
                            className="text-base sm:text-lg font-semibold text-gray-900 hover:text-[#0c68e0] transition-colors truncate block"
                            title={proyecto.nombre}
                        >
                            {proyecto.nombre}
                        </Link>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                        <button
                            type="button"
                            onClick={() => onToggleDestacado(proyecto.id, isDestacado)}
                            className={`p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer ${
                                isDestacado ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                            }`}
                            title={isDestacado ? "Quitar de destacados" : "Marcar como destacado"}
                        >
                            {isDestacado ? <FaStar size={16} /> : <FaRegStar size={16} />}
                        </button>
                        <button
                            type="button"
                            onClick={() => onDelete(proyecto.id, proyecto.nombre)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors shrink-0 cursor-pointer"
                            title="Eliminar proyecto"
                        >
                            <MdDelete size={18} />
                        </button>
                    </div>
                </div>

                {/* Descripción */}
                {proyecto.descripcion && (
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed mb-3">
                        {proyecto.descripcion}
                    </p>
                )}

                {/* Categorías y Enlaces */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    {proyecto.categorias && proyecto.categorias.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                            {proyecto.categorias.map((cat, idx) => (
                                <span 
                                    key={cat.id || `cat-${idx}`} 
                                    className="text-[11px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-medium"
                                >
                                    {cat.nombre}
                                </span>
                            ))}
                        </div>
                    ) : <div />}

                    {proyecto.enlaces && proyecto.enlaces.length > 0 && (
                        <div className="flex items-center gap-2">
                            {proyecto.enlaces.map((link, idx) => (
                                <a
                                    key={link.id || `link-${idx}`}
                                    href={link.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-1 bg-gray-50 hover:bg-gray-100 rounded border border-gray-200 transition-colors"
                                >
                                    {renderLinkIcon(link.type)}
                                </a>
                            ))}
                        </div>
                    )}
                </div>

                {/* Contenedor de la Imagen de Portada */}
                <div className="w-full h-52 sm:h-60 bg-gray-50 relative flex items-center justify-center border border-gray-200 rounded-lg overflow-hidden p-2 mt-auto">
                    {proyecto.imagenPrincipalUrl ? (
                        <img
                            src={proyecto.imagenPrincipalUrl}
                            alt={proyecto.nombre}
                            className="max-h-full max-w-full object-contain"
                        />
                    ) : (
                        <span className="text-xs text-gray-400">Sin portada asignada</span>
                    )}
                </div>
            </div>

            {/* Pie de la tarjeta: Botón de edición */}
            <Link
                href={`/dashboard/proyectos/${proyecto.id}`}
                className="w-full px-4 sm:px-5 py-3 flex gap-2 items-center justify-between bg-[#f8f9fa] hover:bg-blue-50/50 text-gray-700 hover:text-[#0c68e0] font-medium border-t border-[#dadce0] transition-all cursor-pointer text-xs sm:text-sm"
            >
                <span className="truncate">
                    Personalizar proyecto y documentación
                </span>
                <FaArrowRight size={12} className="shrink-0" />
            </Link>
        </div>
    )
}
