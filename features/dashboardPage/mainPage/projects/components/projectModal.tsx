'use client'
import React from 'react'
import { MdClose } from 'react-icons/md'
import DashboardLinksForm from './dashboardLinksForm'
import DashboardThumbnailForm from './dashboardThumbnailForm'
import DashboardBlocksForm from './DashboardBlocksForm/dashboardBlocksForm'
import TagSelector from '@/components/tagSelector'

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingId: string | number | null;
    nombre: string;
    setNombre: (val: string) => void;
    descripcion: string;
    setDescripcion: (val: string) => void;
    dynamicLinks: any[];
    contentBlocks: any[];
    tags: string[];
    setTags: (tags: string[]) => void;
    setThumbnailFile: (file: File | null) => void;
    handleAddLink: (type: 'github' | 'docker' | 'gitlab' | 'web') => void;
    handleUrlChange: (id: string, value: string) => void;
    handleRemoveLink: (id: string) => void;
    handleAddBlock: () => void;
    handleBlockChange: (id: string, content: string) => void;
    handleRemoveBlock: (id: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

export default function ProjectModal({
    isOpen,
    onClose,
    editingId,
    nombre,
    setNombre,
    descripcion,
    setDescripcion,
    dynamicLinks,
    contentBlocks,
    tags,
    setTags,
    setThumbnailFile,
    handleAddLink,
    handleUrlChange,
    handleRemoveLink,
    handleAddBlock,
    handleBlockChange,
    handleRemoveBlock,
    handleSubmit
}: ProjectModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm sm:p-4 animate-fadeIn">
            <div 
                className="bg-white border border-[#dadce0] w-full h-full rounded-none max-h-screen sm:max-w-4xl sm:max-h-[90vh] overflow-y-auto p-5 md:p-6 shadow-2xl space-y-6"
                style={{
                    scrollbarWidth: 'none',          /* Oculta scroll en Firefox */
                    msOverflowStyle: 'none',          /* Oculta scroll en IE y Edge */
                }}
            >
                {/* Estilo inyectado localmente solo para navegadores basados en Webkit (Chrome, Safari, Brave) */}
                <style dangerouslySetInnerHTML={{__html: `
                    div::-webkit-scrollbar { display: none; }
                `}} />
                
                {/* Cabecera del Modal */}
                <div className="flex justify-between items-center pb-3 border-b border-[#dadce0]">
                    <div>
                        <h2 className="text-[20px] font-normal tracking-tight text-[#202124]">
                            {editingId ? 'Actualizar Proyecto' : 'Registrar nuevo proyecto'}
                        </h2>
                        <p className="text-xs text-[#5f6368] mt-0.5">Configura los despliegues, repositorios y documentación de forma dinámica.</p>
                    </div>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 shrink-0">
                        <MdClose size={24} />
                    </button>
                </div>

                {/* Formulario Original */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-[#3c4043] mb-2">Nombre del proyecto *</label>
                        <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required placeholder="Ej. Corelia IA" className="w-full px-4 py-2.5 border border-[#747775] rounded-xl text-sm focus:outline-none focus:border-2 focus:border-[#0b57d0] transition-all text-[#202124]" />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label htmlFor="descripcion" className="block text-sm font-medium text-[#3c4043]">Descripción corta *</label>
                            <span className="text-xs text-[#5f6368]">{descripcion.length}/150</span>
                        </div>
                        <textarea id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value.slice(0, 150))} required rows={3} placeholder="Resume el propósito del proyecto..." className="w-full px-4 py-2.5 border border-[#747775] rounded-xl text-sm focus:outline-none focus:border-2 focus:border-[#0b57d0] transition-all text-[#202124] resize-none" />
                    </div>

                    <DashboardThumbnailForm onFileSelect={setThumbnailFile} />

                    <TagSelector selectedTags={tags} onTagsChange={setTags} />

                    <DashboardLinksForm 
                        dynamicLinks={dynamicLinks}
                        onAddLink={handleAddLink}
                        onUrlChange={handleUrlChange}
                        onRemoveLink={handleRemoveLink}
                    />

                    <DashboardBlocksForm 
                        contentBlocks={contentBlocks}
                        onAddBlock={handleAddBlock}
                        onBlockChange={handleBlockChange}
                        onRemoveBlock={handleRemoveBlock}
                    />

                    {/* Botonera de Envío */}
                    <div className="flex justify-end gap-2 pt-4 border-t border-[#dadce0]">
                        <button type="button" onClick={onClose} className="px-5 py-2 text-sm font-medium text-[#0b57d0] hover:bg-blue-50/50 rounded-full transition-colors">Cancelar</button>
                        <button type="submit" className="px-6 py-2 bg-[#0b57d0] hover:bg-[#155bd3] text-white text-sm font-semibold rounded-full transition-all shadow-sm">
                            {editingId ? 'Guardar cambios' : 'Registrar proyecto'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}