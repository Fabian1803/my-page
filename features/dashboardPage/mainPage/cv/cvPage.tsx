'use client'
import React, { useState, useRef, useEffect } from 'react'
import { MdCloudUpload, MdDelete, MdSave, MdPictureAsPdf, MdFullscreen } from 'react-icons/md'

export default function CvPage() {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [cvFile, setCvFile] = useState<File | null>(null)
    const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null)

    // Crear la URL de previsualización cuando cambie el archivo binario
    useEffect(() => {
        if (!cvFile) {
            setPdfPreviewUrl(null)
            return
        }

        const objectUrl = URL.createObjectURL(cvFile)
        setPdfPreviewUrl(objectUrl)

        // Limpieza de memoria al desmontar o cambiar de archivo
        return () => URL.revokeObjectURL(objectUrl)
    }, [cvFile])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.type === 'application/pdf') {
                setCvFile(file)
            } else {
                alert('Por favor, selecciona un archivo únicamente en formato PDF.')
                if (fileInputRef.current) fileInputRef.current.value = ''
            }
        }
    }

    const handleRemoveCV = () => {
        setCvFile(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!cvFile) return
        // Aquí mandas el 'cvFile' directo a tu API mediante un FormData (Multipart)
        console.log('Archivo listo para el backend:', cvFile)
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-6">
                <h1 className="text-[24px] font-normal tracking-tight text-[#202124]">
                    Currículum Vitae (CV)
                </h1>
                <p className="text-sm text-[#5f6368] mt-1">
                    Sube y previsualiza la versión oficial de tu CV para postulaciones laborales.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white border border-[#dadce0] p-4 md:p-6 shadow-sm">
                    <div className="border border-[#747775] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#f8f9fa] hover:bg-gray-50 transition-colors w-full overflow-hidden">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className={`p-2.5 border border-[#dadce0] rounded-xl shadow-sm shrink-0 flex items-center justify-center w-11 h-11 bg-white ${cvFile ? 'text-red-600' : 'text-gray-500'}`}>
                                <MdPictureAsPdf size={24} />
                            </div>
                            
                            <div className="text-left min-w-0 flex-1">
                                <p className="text-sm font-medium text-[#202124] truncate">
                                    {cvFile ? cvFile.name : 'Subir tu Currículum Vitae'}
                                </p>
                                <p className="text-xs text-[#5f6368] truncate">
                                    {cvFile ? `${(cvFile.size / 1024 / 1024).toFixed(2)} MB • Listo para verificar` : 'Solo formato PDF (Máx. 10MB)'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 shrink-0 sm:ml-auto w-full sm:w-auto">
                            <input 
                                type="file" 
                                ref={fileInputRef}
                                className="sr-only" 
                                accept=".pdf" 
                                onChange={handleFileChange}
                            />
                            
                            {cvFile ? (
                                <button
                                    type="button"
                                    onClick={handleRemoveCV}
                                    className="w-full sm:w-auto justify-center flex items-center gap-1.5 px-4 py-2 text-red-600 hover:bg-red-50 border border-red-200 sm:border-0 rounded-xl transition-colors font-semibold text-xs"
                                >
                                    <MdDelete size={20} />
                                    Remover archivo
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2.5 border border-[#747775] rounded-full text-xs font-semibold text-[#0b57d0] bg-white hover:bg-blue-50/50 shadow-sm transition-colors whitespace-nowrap"
                                >
                                    <MdCloudUpload size={18} />
                                    Adjuntar archivo
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* VISOR DE PDF INTEGRADO EN CALIENTE */}
                {pdfPreviewUrl ? (
                    <div className="bg-white border border-[#dadce0] rounded-2xl overflow-hidden shadow-sm flex flex-col h-[650px] animate-fadeIn">
                        {/* Barra de control superior del visor */}
                        <div className="bg-[#f8f9fa] border-b border-[#dadce0] px-4 py-3 flex justify-between items-center shrink-0">
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 min-w-0">
                                <MdFullscreen size={20} className="text-[#0b57d0]" />
                                <span className="truncate">Previsualización del Documento</span>
                            </div>
                            <span className="text-xs bg-[#e8f0fe] text-[#0b57d0] px-2.5 py-0.5 rounded-full font-bold">
                                PDF
                            </span>
                        </div>
                        
                        {/* El iframe embebe el motor de PDF nativo del navegador (Chrome/Safari/Edge) */}
                        <div className="flex-1 bg-gray-100">
                            <iframe 
                                src={`${pdfPreviewUrl}#toolbar=1&navpanes=0`} 
                                title="Visor de CV PDF"
                                className="w-full h-full border-0"
                            />
                        </div>
                    </div>
                ) : (
                    /* Estado vacío decorativo cuando no hay documento cargado */
                    <div className="text-center py-20 border-2 border-dashed border-gray-300 rounded-2xl text-sm text-gray-400 bg-gray-50/30 flex flex-col items-center justify-center gap-2 px-4">
                        <MdPictureAsPdf size={44} className="text-gray-300" />
                        <p className="font-medium text-gray-500">Ningún documento seleccionado</p>
                        <p className="text-xs max-w-xs leading-relaxed">Adjunta tu archivo arriba para desplegar el visor interactivo de control de lectura.</p>
                    </div>
                )}

                {/* Botonera de Envío */}
                <div className="flex justify-end gap-2 pt-4 border-t border-[#dadce0]">
                    <button 
                        type="button" 
                        onClick={handleRemoveCV}
                        disabled={!cvFile}
                        className="px-5 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Descartar
                    </button>
                    <button 
                        type="submit" 
                        disabled={!cvFile}
                        className="inline-flex items-center gap-1.5 px-6 py-2 bg-[#0b57d0] hover:bg-[#155bd3] text-white text-sm font-semibold rounded-full transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Actualizar
                    </button>
                </div>
            </form>
        </div>
    )
}