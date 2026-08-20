import React from 'react'
import { MdPictureAsPdf, MdFullscreen, MdOpenInNew, MdDelete, MdCloudUpload } from 'react-icons/md'

interface CvViewerCardProps {
    pdfPreviewUrl: string | null;
    fileName: string;
    onUploadClick: () => void;
    onRemoveClick: () => void;
}

export default function CvViewerCard({
    pdfPreviewUrl,
    fileName,
    onUploadClick,
    onRemoveClick
}: CvViewerCardProps) {
    if (!pdfPreviewUrl) {
        return (
            <div className="p-6 sm:p-12 flex-1 flex flex-col items-center justify-center">
                <div 
                    onClick={onUploadClick}
                    className="w-full max-w-2xl border-2 border-dashed border-[#dadce0] hover:border-[#0c68e0] rounded-xl p-8 sm:p-12 text-center bg-white hover:bg-blue-50/20 transition-all cursor-pointer flex flex-col items-center justify-center group"
                >
                    <div className="w-16 h-16 bg-blue-50 group-hover:bg-blue-100/70 text-[#0c68e0] rounded-2xl flex items-center justify-center mb-4 transition-colors shadow-2xs">
                        <MdCloudUpload size={32} />
                    </div>
                    <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-1">
                        Cargar archivo PDF de Currículum Vitae
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 max-w-md mb-5 leading-relaxed">
                        Arrastra y suelta tu archivo PDF aquí o haz clic para explorar en tu equipo. Se almacenará en Google Cloud Storage para acceso público en tu portafolio.
                    </p>
                    <div className="inline-flex items-center gap-2 bg-[#0c68e0] hover:bg-blue-900 text-white px-4 py-2 rounded-sm text-xs sm:text-sm font-semibold transition-colors shadow-xs">
                        <MdCloudUpload size={16} />
                        <span>Seleccionar archivo PDF</span>
                    </div>
                    <span className="text-[11px] text-gray-400 mt-4">
                        Formato admitido: .PDF • Tamaño máximo recomendado: 10 MB
                    </span>
                </div>
            </div>
        )
    }

    return (
        <div className="p-4 sm:p-6 flex-1 flex flex-col">
            <div className="bg-white border border-[#dadce0] rounded-lg overflow-hidden shadow-2xs flex-1 flex flex-col min-h-[650px] lg:min-h-[750px]">
                
                {/* Header del visor de documentos estilo GCP */}
                <div className="bg-[#f8f9fa] border-b border-[#dadce0] px-4 py-2.5 flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-6 h-6 rounded bg-red-50 border border-red-200 text-red-600 flex items-center justify-center shrink-0">
                            <MdPictureAsPdf size={14} />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-gray-800 truncate">
                            {fileName}
                        </span>
                        <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider bg-red-100 text-red-700 px-1.5 py-0.5 rounded">
                            PDF
                        </span>
                    </div>

                    {/* Acciones del visor */}
                    <div className="flex items-center gap-2 shrink-0">
                        <a
                            href={pdfPreviewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-gray-500 hover:text-[#0c68e0] hover:bg-gray-200 rounded transition-colors"
                            title="Abrir en pantalla completa / pestaña nueva"
                        >
                            <MdOpenInNew size={16} />
                        </a>
                        <button
                            type="button"
                            onClick={onUploadClick}
                            className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#0c68e0] hover:bg-blue-50 border border-blue-200 rounded transition-colors cursor-pointer"
                        >
                            <MdCloudUpload size={14} />
                            <span>Reemplazar</span>
                        </button>
                        <button
                            type="button"
                            onClick={onRemoveClick}
                            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                            title="Quitar / descartar archivo actual"
                        >
                            <MdDelete size={17} />
                        </button>
                    </div>
                </div>

                {/* Contenedor Iframe PDF */}
                <div className="flex-1 bg-gray-200 min-h-[600px] relative">
                    <iframe 
                        src={`${pdfPreviewUrl}#toolbar=1&navpanes=0`} 
                        title="Visor de Currículum Vitae PDF"
                        className="w-full h-full min-h-[600px] border-0"
                    />
                </div>
            </div>
        </div>
    )
}
