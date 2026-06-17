'use client'
import React, { useState } from 'react'
import { MdAdd, MdDelete, MdLanguage } from 'react-icons/md'
import { FaGithub, FaDocker, FaGitlab } from 'react-icons/fa'

interface ProjectLink {
    id: string;
    type: 'github' | 'docker' | 'gitlab' | 'web';
    url: string;
}

interface DashboardLinksFormProps {
    dynamicLinks: ProjectLink[];
    onAddLink: (type: 'github' | 'docker' | 'gitlab' | 'web') => void;
    onUrlChange: (id: string, value: string) => void;
    onRemoveLink: (id: string) => void;
}

export default function DashboardLinksForm({
    dynamicLinks,
    onAddLink,
    onUrlChange,
    onRemoveLink
}: DashboardLinksFormProps) {
    const [selectedType, setSelectedType] = useState<'github' | 'docker' | 'gitlab' | 'web'>('github')

    const getPlatformIcon = (type: string) => {
        switch (type) {
            case 'github': return { icon: <FaGithub size={20} />, color: 'text-[#24292e]' };
            case 'docker': return { icon: <FaDocker size={20} />, color: 'text-[#2496ed]' };
            case 'gitlab': return { icon: <FaGitlab size={20} />, color: 'text-[#e24329]' };
            default: return { icon: <MdLanguage size={20} />, color: 'text-[#0b57d0]' };
        }
    }

    return (
        <div className="pt-2">
            <label className="block text-sm font-medium text-[#3c4043] mb-3">
                Enlaces y Despliegues
            </label>
            
            {/* CORREGIDO: Controles responsive. En móvil se apilan, en md se alinean */}
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value as any)}
                    className="w-full sm:w-auto px-4 py-2.5 bg-gray-50 border border-[#747775] rounded-xl text-sm text-[#202124] focus:outline-none focus:border-2 focus:border-[#0b57d0] bg-white cursor-pointer"
                >
                    <option value="github">GitHub Repositorio</option>
                    <option value="docker">Docker Hub Image</option>
                    <option value="gitlab">GitLab Repositorio</option>
                    <option value="web">Sitio Web / Producción</option>
                </select>
                
                <button
                    type="button"
                    onClick={() => onAddLink(selectedType)}
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 border border-[#747775] text-[#0b57d0] text-sm font-semibold rounded-xl bg-white hover:bg-blue-50/50 transition-colors shadow-sm"
                >
                    <MdAdd size={18} />
                    Añadir enlace
                </button>
            </div>

            {dynamicLinks.length > 0 ? (
                <div className="space-y-3 bg-[#f8f9fa] border border-[#dadce0] p-3 sm:p-4 rounded-2xl transition-all">
                    {dynamicLinks.map((link) => {
                        const config = getPlatformIcon(link.type);
                        return (
                            /* CORREGIDO: En móviles el input y el icono se adaptan. El botón de borrar se alinea bien en ambos layouts */
                            <div key={link.id} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 p-2 sm:p-0 bg-white sm:bg-transparent border sm:border-0 border-gray-200 rounded-xl animate-fadeIn">
                                
                                {/* Contenedor para Icono + Input en móvil, expandido a flex horizontal en escritorio */}
                                <div className="flex items-center gap-2 flex-1">
                                    {/* Icono de la plataforma */}
                                    <div className={`${config.color} p-2 bg-white sm:bg-white border border-[#dadce0] rounded-xl shadow-sm shrink-0`}>
                                        {config.icon}
                                    </div>
                                    
                                    {/* Input de la URL */}
                                    <input
                                        type="url"
                                        value={link.url}
                                        required
                                        onChange={(e) => onUrlChange(link.id, e.target.value)}
                                        placeholder={`Introduce la URL de ${link.type}...`}
                                        className="flex-1 min-w-0 px-4 py-2 bg-white border border-[#747775] rounded-xl text-sm focus:outline-none focus:border-2 focus:border-[#0b57d0] text-[#202124]"
                                    />
                                </div>
                                
                                {/* Botón para remover fila: En móvil se ensancha abajo de manera cómoda, en escritorio se queda al lado */}
                                <button
                                    type="button"
                                    onClick={() => onRemoveLink(link.id)}
                                    className="flex items-center justify-center p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 sm:hover:bg-red-50 rounded-xl border sm:border-0 border-gray-100 transition-colors shrink-0"
                                    title="Eliminar enlace"
                                >
                                    <MdDelete size={20} />
                                    <span className="sm:hidden text-xs font-medium ml-1 text-gray-500 hover:text-red-600">Eliminar este enlace</span>
                                </button>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="text-center py-6 border border-dashed border-gray-300 rounded-2xl text-sm text-gray-400 bg-gray-50/50">
                    No has añadido ningún enlace para este proyecto todavía.
                </div>
            )}
        </div>
    )
}