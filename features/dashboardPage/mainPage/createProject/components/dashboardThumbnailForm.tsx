'use client'
import React, { useState } from 'react'
import { MdCloudUpload, MdDelete } from 'react-icons/md'

interface DashboardThumbnailFormProps {
    onFileSelect?: (file: File | null) => void;
}

export default function DashboardThumbnailForm({ onFileSelect }: DashboardThumbnailFormProps) {
    const [preview, setPreview] = useState<string | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        
        if (file) {
            const objectUrl = URL.createObjectURL(file)
            setPreview(objectUrl)
            if (onFileSelect) onFileSelect(file)
        }
    }

    const handleRemoveFile = (e: React.MouseEvent) => {
        e.preventDefault()
        setPreview(null)
        if (onFileSelect) onFileSelect(null)
    }

    return (
        <div>
            <label className="block text-sm font-medium text-[#3c4043] mb-2">
                Miniatura del proyecto
            </label>
            
            {/* CORREGIDO: flex-col para móviles, sm:flex-row para pantallas superiores. Ajuste de alineación responsivo */}
            <div className="border border-[#747775] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#f8f9fa] hover:bg-gray-50 transition-colors w-full overflow-hidden">
                
                {/* Contenedor Izquierdo: Imagen + Textos */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    {preview ? (
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#dadce0] bg-white shrink-0 relative group">
                            <img 
                                src={preview} 
                                alt="Previsualización miniatura" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="p-2 bg-white border border-[#dadce0] rounded-xl shadow-sm text-[#5f6368] shrink-0">
                            <MdCloudUpload size={24} />
                        </div>
                    )}
                    
                    {/* min-w-0 es vital para que el truncado por CSS funcione dentro de flexboxes anidados */}
                    <div className="text-left min-w-0 flex-1">
                        <p className="text-sm font-medium text-[#202124] truncate">
                            {preview ? 'Imagen cargada correctamente' : 'Subir archivo de imagen'}
                        </p>
                        <p className="text-xs text-[#5f6368] truncate">
                            {preview ? 'Listo para guardar' : 'PNG, JPG o WEBP (Máx. 5MB)'}
                        </p>
                    </div>
                </div>

                {/* Contenedor Derecho / Acciones: Se alinea a la derecha en sm:, o se estira de forma prolija en móviles */}
                <div className="flex items-center justify-end gap-2 shrink-0 sm:ml-auto">
                    <input 
                        type="file" 
                        id="file-upload" 
                        className="sr-only" 
                        accept="image/*" 
                        onChange={handleFileChange}
                    />
                    
                    {preview ? (
                        <button
                            type="button"
                            onClick={handleRemoveFile}
                            className="w-full sm:w-auto justify-center flex items-center gap-1.5 px-4 py-2 text-red-600 hover:bg-red-50 border border-red-200 sm:border-0 rounded-xl sm:rounded-xl transition-colors"
                            title="Eliminar imagen"
                        >
                            <MdDelete size={20} className="shrink-0" />
                            <span className="sm:hidden text-xs font-semibold">Eliminar miniatura</span>
                        </button>
                    ) : (
                        <label 
                            htmlFor="file-upload" 
                            className="w-full sm:w-auto text-center px-4 py-2 border border-[#747775] rounded-full text-xs font-semibold text-[#0b57d0] bg-white hover:bg-blue-50/50 cursor-pointer transition-colors shadow-sm whitespace-nowrap"
                        >
                            Seleccionar
                        </label>
                    )}
                </div>
            </div>
        </div>
    )
}