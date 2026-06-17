'use client'
import React from 'react'
import { MdClose, MdCloudUpload } from 'react-icons/md'

interface ImageInsertionModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    setTitle: (val: string) => void;
    description: string;
    setDescription: (val: string) => void;
    imageBase64: string;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onInsert: () => void;
}

export default function ImageInsertionModal({
    isOpen, onClose, title, setTitle, description, setDescription,
    imageBase64, fileInputRef, onFileChange, onInsert
}: ImageInsertionModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white border border-[#dadce0] rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-[#dadce0]">
                    <h3 className="text-lg font-medium text-[#202124]">Añadir Imagen con Contenido</h3>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                        <MdClose size={22} />
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Selector de Imagen local */}
                    <div>
                        <label className="block text-xs font-semibold text-[#3c4043] mb-1.5">Galería Local *</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50 hover:bg-blue-50/30 cursor-pointer transition-colors relative">
                            <input type="file" ref={fileInputRef} accept="image/*" onChange={onFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                            {imageBase64 ? (
                                <img src={imageBase64} alt="Preview" className="h-20 w-auto object-contain rounded-md" />
                            ) : (
                                <>
                                    <MdCloudUpload size={28} className="text-gray-400 mb-1" />
                                    <span className="text-xs text-gray-600 font-medium">Selecciona una captura</span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Título */}
                    <div>
                        <label className="block text-xs font-semibold text-[#3c4043] mb-1">Título del artículo destacado *</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ej. Arquitectura de Microservicios" className="w-full px-3 py-2 border border-[#747775] rounded-lg text-sm focus:outline-none focus:border-2 focus:border-[#0b57d0]" />
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="block text-xs font-semibold text-[#3c4043] mb-1">Descripción del artículo destacado *</label>
                        <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Ej. Vista panorámica del flujo..." className="w-full px-3 py-2 border border-[#747775] rounded-lg text-sm focus:outline-none focus:border-2 focus:border-[#0b57d0] resize-none leading-relaxed" />
                    </div>

                    {/* Acciones */}
                    <div className="flex justify-end gap-2 pt-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-[#0b57d0] hover:bg-blue-50 rounded-full transition-colors">Cancelar</button>
                        <button type="button" onClick={onInsert} className="px-5 py-2 bg-[#0b57d0] hover:bg-[#155bd3] text-white text-sm font-semibold rounded-full shadow-sm transition-all">Insertar en texto</button>
                    </div>
                </div>
            </div>
        </div>
    )
}