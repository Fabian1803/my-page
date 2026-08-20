import React from 'react'
import { MdCloudUpload, MdOpenInNew } from 'react-icons/md'
import { BiDislike, BiLike } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoReload } from 'react-icons/io5'

interface CvHeaderBarProps {
    pdfPreviewUrl: string | null;
    loading: boolean;
    onUploadClick: () => void;
    onRefresh: () => void;
}

export default function CvHeaderBar({
    pdfPreviewUrl,
    loading,
    onUploadClick,
    onRefresh
}: CvHeaderBarProps) {
    return (
        <div className="flex justify-between border-b border-[#dbdce0] px-4 sm:px-6 pt-3 pb-2 bg-white rounded-t-2xl">
            <div className="flex gap-2 sm:gap-3 justify-between w-full sm:w-auto items-center">
                <div className="min-w-0">
                    <h1 className="text-base sm:text-lg font-medium text-gray-800 truncate">
                        Currículum Vitae (CV)
                    </h1>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={onUploadClick}
                        className="flex items-center gap-1.5 sm:gap-2 bg-[#0c68e0] hover:bg-blue-900 transition px-2.5 py-1 text-white rounded-sm cursor-pointer shadow-xs text-xs sm:text-sm font-semibold"
                    >
                        <MdCloudUpload size={16} />
                        <span>Subir CV</span>
                    </button>

                    {pdfPreviewUrl && (
                        <a
                            href={pdfPreviewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:flex items-center gap-1.5 hover:bg-gray-100 transition px-2.5 py-1 text-[#0c68e0] hover:text-blue-700 rounded-sm cursor-pointer border border-[#dadce0] text-xs sm:text-sm font-medium"
                            title="Abrir en pestaña nueva"
                        >
                            <MdOpenInNew size={15} />
                            <span>Abrir enlace</span>
                        </a>
                    )}
                </div>
            </div>

            <div className="hidden sm:flex gap-4 items-center">
                <span className="hidden lg:block text-sm text-gray-500">¿Te resultó útil esta página?</span>
                <BiLike className="hidden lg:block text-[#0c68e0] cursor-pointer hover:opacity-80 transition" size={24} />
                <BiDislike className="hidden lg:block text-[#0c68e0] cursor-pointer hover:opacity-80 transition" size={24} />
                <BsThreeDotsVertical className="lg:hidden text-[#0c68e0] cursor-pointer" size={24} />
                <div 
                    onClick={onRefresh}
                    className="hover:bg-gray-200 transition text-[#0c68e0] hover:text-blue-700 px-2 py-1 flex gap-2 items-center rounded-sm cursor-pointer"
                    title="Recargar detalles de archivo"
                >
                    <IoReload size={20} className={loading ? "animate-spin" : ""} />
                    <p className="text-sm font-medium">Actualizar</p>
                </div>
            </div>
        </div>
    )
}
