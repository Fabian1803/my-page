import React from 'react'
import { MdCloudUpload, MdCheck } from 'react-icons/md'
import { IoReload } from 'react-icons/io5'

interface CvActionBarProps {
    cvFile: File | null;
    pdfPreviewUrl: string | null;
    loading: boolean;
    onDiscard: () => void;
}

export default function CvActionBar({
    cvFile,
    pdfPreviewUrl,
    loading,
    onDiscard
}: CvActionBarProps) {
    return (
        <div className="bg-white border-t border-[#dadce0] px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div className="text-xs text-gray-500 flex items-center gap-2">
                {cvFile ? (
                    <span className="text-amber-600 font-medium flex items-center gap-1">
                        ● Tienes cambios sin publicar en Cloud Storage. Haz clic en "Actualizar CV".
                    </span>
                ) : pdfPreviewUrl ? (
                    <span className="text-green-700 flex items-center gap-1 font-medium">
                        <MdCheck size={16} /> El currículum actual está sincronizado y visible en el portafolio público.
                    </span>
                ) : (
                    <span>Selecciona un archivo PDF para habilitar la sincronización.</span>
                )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                    type="button"
                    onClick={onDiscard}
                    disabled={(!cvFile && !pdfPreviewUrl) || loading}
                    className="px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                    Descartar
                </button>
                <button
                    type="submit"
                    disabled={!cvFile || loading}
                    className="inline-flex items-center justify-center gap-2 bg-[#0c68e0] hover:bg-blue-900 text-white px-5 py-2 rounded-sm text-xs sm:text-sm font-semibold transition-all shadow-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                    {loading ? (
                        <>
                            <IoReload size={16} className="animate-spin" />
                            <span>Actualizando...</span>
                        </>
                    ) : (
                        <>
                            <MdCloudUpload size={16} />
                            <span>Actualizar</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}
