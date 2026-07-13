'use client'
import { useState } from 'react'
import { MdAdd, MdDelete, MdLanguage } from 'react-icons/md'
import { FaGithub, FaDocker, FaGitlab } from 'react-icons/fa'

interface ProjectLink {
    id: string;
    type: 'github' | 'docker' | 'gitlab' | 'web';
    url: string;
}

interface LinksProyectProps {
    dynamicLinks: ProjectLink[];
    onAddLink: (type: 'github' | 'docker' | 'gitlab' | 'web') => void;
    onUrlChange: (id: string, value: string) => void;
    onRemoveLink: (id: string) => void;
    onClick?: () => void;
}

export default function LinksProyect({
    dynamicLinks,
    onAddLink,
    onUrlChange,
    onRemoveLink,
    onClick
}: LinksProyectProps) {
    const [selectedType, setSelectedType] = useState<'github' | 'docker' | 'gitlab' | 'web'>('github')

    const getPlatformIcon = (type: string) => {
        switch (type) {
            case 'github': return { icon: <FaGithub size={16} />, color: 'text-gray-700', label: 'GitHub Repositorio' };
            case 'docker': return { icon: <FaDocker size={16} />, color: 'text-[#2496ed]', label: 'Docker Hub' };
            case 'gitlab': return { icon: <FaGitlab size={16} />, color: 'text-[#e24329]', label: 'GitLab Repositorio' };
            default: return { icon: <MdLanguage size={16} />, color: 'text-[#3367d6]', label: 'Sitio Web / Prod' };
        }
    }

    return (
        <div className="w-full mt-4 space-y-4" onClick={onClick}>
            {/* Cabecera de la sección estilo GCP */}
            <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-900">Enlaces y despliegues</h3>
                <p className="text-xs text-gray-500 font-normal">
                    Asocie repositorios de código, contenedores de imágenes virtuales o URLs de producción externa.
                </p>
            </div>
            
            {/* Controles de adición con estética GCP */}
            <div className="flex flex-col sm:flex-row gap-2 items-center">
                <div className="relative w-full sm:w-64">
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value as any)}
                        className="w-full pl-3 pr-8 py-1.5 border border-gray-400 rounded-sm text-xs text-gray-800 bg-white focus:outline-none focus:border-[#3367d6] cursor-pointer appearance-none"
                    >
                        <option value="github">GitHub Repositorio</option>
                        <option value="docker">Docker Hub Image</option>
                        <option value="gitlab">GitLab Repositorio</option>
                        <option value="web">Sitio Web / Producción</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-600 w-0 h-0" />
                </div>
                
                <button
                    type="button"
                    onClick={() => onAddLink(selectedType)}
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-1.5 border border-gray-300 text-[#3367d6] hover:bg-blue-50/50 text-xs font-medium rounded-sm bg-white transition-colors cursor-pointer"
                >
                    <MdAdd size={16} />
                    <span>Añadir enlace</span>
                </button>
            </div>

            {dynamicLinks.length > 0 && (
                <div className="w-full border border-gray-300 rounded-sm bg-white overflow-hidden">
                    <div className="hidden sm:grid grid-cols-12 px-4 py-2 bg-[#f8f9fa] border-b border-gray-200 text-[11px] font-medium text-gray-500 uppercase tracking-wider blueprint-header">
                        <div className="col-span-3 text-left">Plataforma / Tipo</div>
                        <div className="col-span-8 text-left">Destino URL del recurso</div>
                        <div className="col-span-1 text-right">Acción</div>
                    </div>

                    <div className="divide-y divide-gray-200 block w-full">
                        {dynamicLinks.map((link) => {
                            const config = getPlatformIcon(link.type);
                            return (
                                <div 
                                    key={link.id} 
                                    className="flex flex-col sm:grid sm:grid-cols-12 px-4 py-3 sm:py-2.5 items-stretch sm:items-center gap-3 sm:gap-0 hover:bg-gray-50/50 transition-colors"
                                >
                                    <div className="col-span-3 flex items-center gap-2 text-xs font-medium text-gray-800">
                                        <div className={`${config.color} shrink-0`}>
                                            {config.icon}
                                        </div>
                                        <span className="truncate">{config.label}</span>
                                    </div>
                                    <div className="col-span-8 pr-2">
                                        <input
                                            type="url"
                                            value={link.url}
                                            required
                                            onChange={(e) => onUrlChange(link.id, e.target.value)}
                                            placeholder={`https://example.com/recurso/${link.type}`}
                                            className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-sm text-xs font-mono text-gray-800 focus:outline-none focus:border-[#3367d6]"
                                        />
                                    </div>
                                    
                                    {/* Celda Botón Eliminar */}
                                    <div className="col-span-1 flex justify-end sm:items-center">
                                        <button
                                            type="button"
                                            onClick={() => onRemoveLink(link.id)}
                                            className="flex items-center justify-center p-1.5 text-gray-500 hover:text-red-600 rounded-sm hover:bg-gray-100 transition-colors shrink-0 w-full sm:w-auto cursor-pointer border border-gray-200 sm:border-0"
                                            title="Eliminar enlace"
                                        >
                                            <MdDelete size={16} />
                                            <span className="sm:hidden text-xs font-medium ml-1 text-gray-600">Eliminar enlace</span>
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}