import React, { useState } from 'react'
import { MdContentCopy, MdCheck, MdOutlineStorage, MdPictureAsPdf, MdOutlineCloudDone } from 'react-icons/md'
import { BsQuestionCircle } from 'react-icons/bs'

interface CvMetadataCardProps {
    cvFile: File | null;
    pdfPreviewUrl: string | null;
    fileName: string;
}

export default function CvMetadataCard({
    cvFile,
    pdfPreviewUrl,
    fileName
}: CvMetadataCardProps) {
    const [copied, setCopied] = useState(false)
    const storageUri = pdfPreviewUrl 
        ? `gs://portfolio-storage-bucket/documents/${fileName || 'curriculum-vitae.pdf'}`
        : 'gs://portfolio-storage-bucket/documents/curriculum-vitae.pdf'

    const handleCopyUri = () => {
        navigator.clipboard.writeText(storageUri)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const fileSizeLabel = cvFile 
        ? `${(cvFile.size / 1024 / 1024).toFixed(2)} MB (Local listo para sincronizar)`
        : pdfPreviewUrl 
            ? 'Aprox. 1.8 MB (En Cloud Storage)'
            : 'Sin archivo cargado'

    return (
        <div className="bg-white border-b border-[#dadce0] p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 text-[#0c68e0] flex items-center justify-center shrink-0">
                        <MdOutlineStorage size={22} />
                    </div>
                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <h2 className="text-sm sm:text-base font-medium text-gray-900 truncate">
                                {fileName}
                            </h2>
                            {cvFile ? (
                                <span className="text-[11px] bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-medium shrink-0">
                                    ● Cambios pendientes
                                </span>
                            ) : pdfPreviewUrl ? (
                                <span className="text-[11px] bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-medium shrink-0">
                                    ● Activo en Cloud
                                </span>
                            ) : (
                                <span className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium shrink-0">
                                    ● No configurado
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                            Google Cloud Storage • Objeto binario de distribución pública
                        </p>
                    </div>
                </div>

                {/* URI de Cloud Storage con botón para copiar */}
                <div className="flex items-center gap-2 bg-[#f8f9fa] border border-[#dadce0] rounded-md px-3 py-1.5 max-w-md">
                    <span className="text-xs text-gray-500 font-mono truncate select-all">
                        {storageUri}
                    </span>
                    <button
                        type="button"
                        onClick={handleCopyUri}
                        className="text-gray-400 hover:text-[#0c68e0] transition-colors p-0.5 cursor-pointer shrink-0"
                        title="Copiar URI de Cloud Storage"
                    >
                        {copied ? <MdCheck className="text-green-600" size={15} /> : <MdContentCopy size={14} />}
                    </button>
                </div>
            </div>

            {/* Grid de Metadatos estilo GCP */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 text-xs">
                <div>
                    <span className="text-gray-400 block mb-1">Tipo de contenido</span>
                    <span className="font-medium text-gray-800 flex items-center gap-1.5">
                        <MdPictureAsPdf className="text-red-500" size={14} />
                        application/pdf
                    </span>
                </div>

                <div>
                    <span className="text-gray-400 block mb-1">Clase de almacenamiento</span>
                    <span className="font-medium text-gray-800">
                        Standard (Multi-region)
                    </span>
                </div>

                <div>
                    <span className="text-gray-400 block mb-1">Tamaño del archivo</span>
                    <span className="font-medium text-gray-800">
                        {fileSizeLabel}
                    </span>
                </div>

                <div>
                    <span className="text-gray-400 block mb-1">Control de acceso</span>
                    <span className="font-medium text-green-700 flex items-center gap-1">
                        <MdOutlineCloudDone size={14} />
                        Público (Lectura)
                    </span>
                </div>
            </div>
        </div>
    )
}
