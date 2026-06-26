'use client'
import React, { useState, useRef } from 'react'
import { MdImage, MdInsertDriveFile, MdDelete } from 'react-icons/md'
import BaseModal from './baseModal'
import TagSelector from './tagSelector'
import VignetteInput from './vignetteInput'

interface DetailedImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: DetailedImageData) => void;
    id?: string;
}

export interface DetailedImageData {
    imagen: File | null;
    nombre: string;
    descripcion: string;
    tags: string[];
    detalles: string[];
    entidadIcono: {
        archivo: File | null;
        nombre: string;
    };
}

export default function DetailedImageModal({ isOpen, onClose, onSave, id = "modal-main-file" }: DetailedImageModalProps) {
    const [preview, setPreview] = useState<string | null>(null)
    const [iconPreview, setIconPreview] = useState<string | null>(null)

    // Estados del formulario
    const [compImgFile, setCompImgFile] = useState<File | null>(null)
    const [compNombre, setCompNombre] = useState('')
    const [compDescripcion, setCompDescripcion] = useState('')
    const [compTags, setCompTags] = useState<string[]>([])
    const [compBullets, setCompBullets] = useState<string[]>([])
    const [compIconFile, setCompIconFile] = useState<File | null>(null)
    const [compIconNombre, setCompIconNombre] = useState('')

    const internalFileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        if (file) {
            setPreview(URL.createObjectURL(file))
            setCompImgFile(file)
        }
    }

    const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        if (file) {
            setIconPreview(URL.createObjectURL(file))
            setCompIconFile(file)
        }
    }

    const handleRemoveIcon = (e: React.MouseEvent) => {
        e.preventDefault()
        setIconPreview(null)
        setCompIconFile(null)
    }

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave({
            imagen: compImgFile,
            nombre: compNombre,
            descripcion: compDescripcion,
            tags: compTags,
            detalles: compBullets,
            entidadIcono: {
                archivo: compIconFile,
                nombre: compIconNombre
            }
        })
        onClose()
    }

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title="Registrar nuevo certificado"
            onSave={handleFormSubmit}
        >
            <div className="space-y-4">
                {/* Cargar Imagen Principal */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#3c4043]">Archivo de la Imagen Principal *</label>
                    <input type="file" id={id} ref={internalFileInputRef} accept="image/*" className="sr-only" onChange={handleFileChange} />
                    <div
                        onClick={() => internalFileInputRef.current?.click()}
                        className="border-2 border-dashed border-[#747775]/60 hover:border-[#0b57d0] rounded-2xl p-5 flex flex-col items-center justify-center gap-2 bg-[#f8f9fa] hover:bg-blue-50/20 transition-all cursor-pointer text-center"
                    >
                        {preview ? (
                            <div className="flex items-center gap-3 w-full text-left bg-white p-3 border border-gray-200 rounded-xl shadow-sm">
                                <img src={preview} alt="Preview" className="w-14 h-14 object-cover rounded-lg border shrink-0 bg-gray-50" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-gray-800 truncate">Imagen principal lista</p>
                                    <p className="text-[11px] text-green-600 font-medium">Click para cambiar el archivo</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="p-2.5 bg-white border border-[#dadce0] rounded-xl shadow-sm text-gray-400">
                                    <MdImage size={28} />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-700">Presiona para cargar tu imagen</p>
                                    <p className="text-[10px] text-gray-400 mt-0.5">Formatos admitidos: PNG, JPG, WEBP</p>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Campos de texto */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-[#3c4043]">Nombre de la Imagen *</label>
                        <input type="text" required value={compNombre} onChange={(e) => setCompNombre(e.target.value)} placeholder="Ej. Estructura de Microservicios" className="w-full px-3 py-2 border border-[#747775] rounded-xl text-sm focus:outline-none focus:border-2 focus:border-[#0b57d0]" />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-[#3c4043]">Pequeña Descripción *</label>
                        <textarea rows={2} required value={compDescripcion} onChange={(e) => setCompDescripcion(e.target.value)} placeholder="Escribe un breve resumen..." className="w-full px-3 py-2 border border-[#747775] rounded-xl text-sm focus:outline-none focus:border-2 focus:border-[#0b57d0] resize-none" />
                    </div>

                    {/* Institución Opcional */}
                    <div className="p-4 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl space-y-3">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Institución / Icono Relacionado (Opcional)</span>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-[#3c4043]">Nombre de la Institución</label>
                            <input type="text" value={compIconNombre} onChange={(e) => setCompIconNombre(e.target.value)} placeholder="Ej. Universidad Tecnológica del Perú" className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:outline-none bg-white" />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-semibold text-gray-500">Logotipo o Icono institucional</label>
                            <input type="file" id="sub-icon-file" accept="image/*" className="sr-only" onChange={handleIconChange} />
                            <div className="flex items-center justify-between gap-3 bg-white p-3 border border-gray-300 rounded-xl shadow-sm">
                                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                    {iconPreview ? (
                                        <img src={iconPreview} alt="Icono preview" className="w-8 h-8 object-contain rounded border bg-gray-50 shrink-0" />
                                    ) : (
                                        <div className="p-1.5 bg-gray-50 border rounded-lg text-gray-400 shrink-0">
                                            <MdInsertDriveFile size={16} />
                                        </div>
                                    )}
                                    <p className="text-xs font-medium text-gray-700 truncate flex-1">
                                        {compIconFile ? compIconFile.name : 'Ningún icono seleccionado'}
                                    </p>
                                </div>
                                <div className="shrink-0">
                                    {compIconFile ? (
                                        <button type="button" onClick={handleRemoveIcon} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><MdDelete size={18} /></button>
                                    ) : (
                                        <label htmlFor="sub-icon-file" className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg cursor-pointer">Subir</label>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <TagSelector selectedTags={compTags} onTagsChange={setCompTags} />
                    <VignetteInput bullets={compBullets} onBulletsChange={setCompBullets} />
                </div>
            </div>
        </BaseModal>
    )
}