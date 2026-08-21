'use client'
import React from 'react'
import { MdCloudUpload, MdImage, MdDeleteOutline } from 'react-icons/md'

interface InputProfileImageProps {
    fotoPerfil: File | null
    previewUrl: string | null
    handleFotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onRemoveImage?: () => void
}

export default function InputProfileImage({
    fotoPerfil,
    previewUrl,
    handleFotoChange,
    onRemoveImage
}: InputProfileImageProps) {
    const obtenerNombreArchivo = () => {
        if (fotoPerfil) return fotoPerfil.name;
        if (previewUrl) {
            const partes = previewUrl.split('/');
            const nombreConTimestamp = partes[partes.length - 1];
            const indiceGuion = nombreConTimestamp.indexOf('-');
            return indiceGuion !== -1 ? decodeURIComponent(nombreConTimestamp.substring(indiceGuion + 1)) : decodeURIComponent(nombreConTimestamp);
        }
        return "Ninguna imagen seleccionada";
    };

    return (
        <div className="flex flex-col gap-1.5 min-w-0 w-full">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0c68e0]"></span>
                Fotografía de Perfil (Cloud Asset)
            </label>

            <div className="flex items-center gap-2 sm:gap-3 w-full min-w-0">
                <div className="flex-1 flex items-center justify-between px-3.5 py-1.5 bg-[#f8f9fa] border border-[#dadce0] rounded text-xs sm:text-sm text-gray-700 h-[40px] min-w-0">
                    <span className="truncate w-full pr-2 select-none font-mono text-xs">
                        {obtenerNombreArchivo()}
                    </span>
                    {previewUrl ? (
                        <div className="flex items-center gap-2 shrink-0">
                            <img
                                src={previewUrl}
                                alt="Avatar Preview"
                                className="h-6 w-6 object-cover rounded-full border border-[#dadce0]"
                            />
                            {onRemoveImage && (
                                <button
                                    type="button"
                                    onClick={onRemoveImage}
                                    className="text-gray-400 hover:text-red-600 transition-colors p-0.5 cursor-pointer"
                                    title="Quitar foto"
                                >
                                    <MdDeleteOutline size={16} />
                                </button>
                            )}
                        </div>
                    ) : (
                        <MdImage size={18} className="text-gray-400 shrink-0" />
                    )}
                </div>

                <label className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#f8f9fa] hover:bg-gray-200 border border-[#dadce0] text-[#0c68e0] hover:text-blue-700 text-xs sm:text-sm font-medium rounded transition-colors whitespace-nowrap shrink-0 shadow-2xs">
                    <MdCloudUpload size={16} />
                    <span>Examinar</span>
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFotoChange}
                    />
                </label>
            </div>

            <span className="text-[11px] text-gray-400">
                Formato recomendado: PNG, WEBP o JPG cuadrado (Mín. 400x400 px).
            </span>
        </div>
    )
}