'use client'
import React, { useState } from 'react'
import BaseModal from '@/features/dashboardPage/components/baseModal'
import InfoSection from './infoSection'
import ImageInput from './imageInput';
import { DetailedImageData } from './detailedImageModal';
import TagSelector from './tagSelector';
import DashboardLinksForm from './dashboardLinksForm';
import { MdAdd, MdDelete } from 'react-icons/md';

interface ProjectLink {
    id: string;
    type: 'github' | 'docker' | 'gitlab' | 'web';
    url: string;
}

interface ContentBlock {
    id: string;
    content: string;
}

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ProjectModal({ isOpen, onClose }: ProjectModalProps) {
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [datosImagenEstructurada, setDatosImagenEstructurada] = useState<DetailedImageData | null>(null)
    const [tags, setTags] = useState<string[]>([])
    const [dynamicLinks, setDynamicLinks] = useState<ProjectLink[]>([])
    
    // 💡 NUEVO ESTADO: Controla si el proyecto es destacado o no
    const [destacado, setDestacado] = useState(false)
    
    const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([])

    const handleSaveDetailedImage = (data: DetailedImageData) => {
        setDatosImagenEstructurada(data)
    }

    const handleAddBlockInternal = () => {
        if (contentBlocks.length < 5) {
            const jsonVacio = JSON.stringify({ type: 'doc', content: [] })
            setContentBlocks(prev => [
                ...prev, 
                { id: crypto.randomUUID(), content: jsonVacio }
            ])
        }
    }

    const handleBlockChangeInternal = (id: string, newContent: string) => {
        setContentBlocks(prev => prev.map(b => b.id === id ? { ...b, content: newContent } : b))
    }

    const handleRemoveBlockInternal = (id: string) => {
        setContentBlocks(prev => prev.filter(b => b.id !== id))
    }

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Guardando Certificación Completa:', {
            nombre,
            descripcion,
            datosImagenEstructurada,
            tags,
            dynamicLinks,
            destacado, // 💡 AQUÍ VIAJA TU NUEVO CHECKBOOX (true/false)
            documentacionSecciones: contentBlocks 
        })

        setNombre('')
        setDescripcion('')
        setDestacado(false) // Reseteamos el check al guardar
        setContentBlocks([]) 
        onClose()
    }

    const handleAddLink = (type: 'github' | 'docker' | 'gitlab' | 'web') => {
        setDynamicLinks(prev => [...prev, { id: crypto.randomUUID(), type, url: '' }])
    }

    const handleUrlChange = (id: string, value: string) => {
        setDynamicLinks(prev => prev.map(l => l.id === id ? { ...l, url: value } : l))
    }

    const handleRemoveLink = (id: string) => {
        setDynamicLinks(prev => prev.filter(l => l.id !== id))
    }

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title="Crear un nuevo "
            onSave={handleSave}
            maxWidth="sm:max-w-3xl"
        >
            <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#3c4043]">Nombre de Certificación *</label>
                    <input type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej. Java Developer" className="w-full px-3 py-2 border border-[#747775] rounded-xl text-sm focus:outline-none" />
                </div>

                <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center mb-0.5">
                        <label className="text-xs font-semibold text-[#3c4043]">Descripción *</label>
                        <span className="text-xs text-[#5f6368]">{descripcion.length}/150</span>
                    </div>
                    <textarea required maxLength={150} rows={2} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Resume los detalles..." className="w-full px-3 py-2 border border-[#747775] rounded-xl text-sm focus:outline-none resize-none" />
                </div>
                
                <ImageInput
                    name="Cargar imagen de portada"
                    onSaveBlock={handleSaveDetailedImage}
                />
                
                <TagSelector selectedTags={tags} onTagsChange={setTags} />


                <DashboardLinksForm
                    dynamicLinks={dynamicLinks}
                    onAddLink={handleAddLink}
                    onUrlChange={handleUrlChange}
                    onRemoveLink={handleRemoveLink}
                />

                <div className="pt-2 border-t border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-[#3c4043]">
                                Secciones de Documentación
                            </label>
                            <p className="text-xs text-[#5f6368] mt-0.5">
                                Cada bloque representa un capítulo o sección de tu proyecto.
                            </p>
                        </div>
                        <span className={`w-fit text-xs font-bold px-2.5 py-0.5 rounded-full ${contentBlocks.length >= 5 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                            {contentBlocks.length}/5 bloques
                        </span>
                    </div>

                    <div className="mb-4">
                        <button
                            type="button"
                            onClick={handleAddBlockInternal}
                            disabled={contentBlocks.length >= 5}
                            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 border border-[#747775] text-[#0b57d0] text-sm font-semibold rounded-xl bg-white hover:bg-blue-50/50 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <MdAdd size={18} />
                            Añadir Sección de Texto
                        </button>
                    </div>

                    {contentBlocks.length > 0 ? (
                        <div className="space-y-4">
                            {contentBlocks.map((block, index) => (
                                <div key={block.id} className="relative bg-[#f8f9fa] border border-[#dadce0] p-3 sm:p-4 rounded-2xl flex flex-col w-full overflow-hidden">
                                    <div className="flex justify-between items-center text-xs text-[#5f6368] font-medium">
                                        <span className="bg-white px-2.5 py-1 border border-[#dadce0] rounded-lg shadow-sm font-semibold">
                                            Sección #{index + 1}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveBlockInternal(block.id)}
                                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-white border border-transparent hover:border-red-200 rounded-lg transition-colors shrink-0"
                                            title="Eliminar bloque"
                                        >
                                            <MdDelete size={18} />
                                        </button>
                                    </div>

                                    <InfoSection 
                                        htmlContent={block.content} 
                                        setHtmlContent={(value) => handleBlockChangeInternal(block.id, value)} 
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 border border-dashed border-gray-300 rounded-2xl text-sm text-gray-400 bg-gray-50/50 px-4">
                            No has añadido ninguna sección para la documentación de tu proyecto todavía.
                        </div>
                    )}
                </div>

                {/* 💡 CONTENEDOR DEL CHECKBOX: Estilo sutil y limpio alineado a la izquierda */}
                <div className="flex items-center gap-2.5 py-1 px-1 select-none">
                    <input 
                        type="checkbox" 
                        id="proyecto-destacado"
                        checked={destacado}
                        onChange={(e) => setDestacado(e.target.checked)}
                        className="w-4 h-4 rounded text-[#0b57d0] border-[#747775] focus:ring-0 cursor-pointer" 
                    />
                    <label 
                        htmlFor="proyecto-destacado" 
                        className="text-xs font-semibold text-[#3c4043] cursor-pointer"
                    >
                        Hacer este proyecto como destacado
                    </label>
                </div>
            </div>
        </BaseModal>
    )
}