'use client'
import React, { useState } from 'react'
import { MdCloudUpload, MdDelete } from 'react-icons/md'
import DetailedImageModal, { DetailedImageData } from './detailedImageModal'

interface ImageInputProps {
    name?: string; 
    onSaveBlock?: (data: DetailedImageData) => void;
}

export default function ImageInput({ name = "Bloque de Imagen Detallado", onSaveBlock }: ImageInputProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [preview, setPreview] = useState<string | null>(null)

    const handleSaveData = (data: DetailedImageData) => {
        if (data.imagen) {
            setPreview(URL.createObjectURL(data.imagen))
        }
        if (onSaveBlock) {
            onSaveBlock(data) // Enviamos el JSON estructurado al handler externo del dashboard
        }
    }

    const handleClearBlock = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setPreview(null)
    }

    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-[#3c4043] mb-2">
                {name}
            </label>
            
            <div 
                onClick={() => setIsModalOpen(true)}
                className="border border-[#747775] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#f8f9fa] hover:bg-gray-50 transition-colors w-full overflow-hidden cursor-pointer"
            >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    {preview ? (
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#dadce0] bg-white shrink-0 relative">
                            <img src={preview} alt="Previsualización" className="w-full h-full object-cover" />
                        </div>
                    ) : (
                        <div className="p-2 bg-white border border-[#dadce0] rounded-xl shadow-sm text-[#5f6368] shrink-0">
                            <MdCloudUpload size={24} />
                        </div>
                    )}
                    
                    <div className="text-left min-w-0 flex-1">
                        <p className="text-sm font-medium text-[#202124] truncate">
                            {preview ? 'Imagen cargada correctamente' : 'Configurar bloque de imagen'}
                        </p>
                        <p className="text-xs text-[#5f6368] truncate">
                            {preview ? 'Configuración de bloque lista' : 'Haz click para rellenar los datos e imagen'}
                        </p>
                    </div>
                </div>
                
                <div className="flex items-center justify-end gap-2 shrink-0 sm:ml-auto">
                    {preview ? (
                        <div className="flex gap-2 w-full sm:w-auto">
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}
                                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-xl transition-colors"
                            >
                                Editar datos
                            </button>
                            <button
                                type="button"
                                onClick={handleClearBlock}
                                className="p-2 text-red-600 hover:bg-red-50 border border-red-200 rounded-xl transition-colors"
                            >
                                <MdDelete size={20} />
                            </button>
                        </div>
                    ) : (
                        <button type="button" className="w-full sm:w-auto text-center px-4 py-2 border border-[#747775] rounded-full text-xs font-semibold text-[#0b57d0] bg-white hover:bg-blue-50/50 transition-colors shadow-sm">
                            Seleccionar
                        </button>
                    )}
                </div>
            </div>

            <DetailedImageModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveData}
            />
        </div>
    )
}