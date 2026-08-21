'use client'
import SearchMapComponent from "../components/searchMapComponent"
import { FiDownload, FiExternalLink } from 'react-icons/fi'

interface CvFabianProps {
    metadata: {
        url_cv_pdf?: string;
    };
}

export default function CvFabian({ metadata }: CvFabianProps) {
    const pdfUrl = metadata?.url_cv_pdf || '/prueba.pdf'

    return (
        <SearchMapComponent>
            <div className="max-w-6xl py-8 px-3 sm:px-0 flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                    <div className="space-y-1">
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                            Currículum Vitae
                        </h1>
                        <p className="text-sm text-gray-500">
                            Visualiza o descarga la versión más reciente de mi perfil profesional.
                        </p>
                    </div>
                    {pdfUrl && (
                        <a
                            href={pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-2xs transition-colors"
                        >
                            <FiExternalLink size={14} />
                            <span>Abrir en pestaña</span>
                        </a>
                    )}
                </div>
                <div className="w-full h-[70vh] lg:h-[85vh] rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm">
                    <iframe
                        src={`${pdfUrl}#toolbar=1&navpanes=0`}
                        title="CV Fabián Mauro Rivera Morales"
                        className="w-full h-full border-none"
                    />
                </div>
            </div>
        </SearchMapComponent>
    )
}