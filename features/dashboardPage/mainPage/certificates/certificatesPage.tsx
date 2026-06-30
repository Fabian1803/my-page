'use client'
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md'
import DetailedImageModal from '../../components/detailedImageModal'
import { useCertificatePage } from './hooks/useCertificatePage'
export default function CertificatesPage() {
    const {
        certificados, isLoading, skeletons, isDetailedImageModalOpen, setSelectedCertificate, selectedCertificate,
        setIsDetailedImageModalOpen, handleSaveDetailedImage, handleDeleteCertificate, handleOpenEditModal,
    } = useCertificatePage()

    return (
        <div className="max-w-6xl mx-auto text-black">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-[24px] font-normal tracking-tight text-[#202124]">
                        Certificaciones
                    </h1>
                    <span className="text-xs font-semibold px-3 py-1 bg-[#70a4f1]/20 text-[#0b57d0] rounded-full mt-1 inline-block sm:mt-0">
                        {isLoading ? 'Sincronizando...' : `${certificados.length} en total`}
                    </span>
                </div>

                <button
                    type="button"
                    onClick={() => setIsDetailedImageModalOpen(true)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#0b57d0] hover:bg-[#155bd3] text-white text-sm font-semibold rounded-full shadow-sm transition-all shrink-0 animate-fade-in"
                >
                    <MdAdd size={20} />
                    Crear certificación
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {isLoading && certificados.length === 0 && skeletons.map((id) => (
                    <div key={id} className="bg-white border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between animate-pulse rounded-2xl">
                        <div className="w-full h-40 bg-gray-200" />
                        <div className="p-3 space-y-2">
                            <div className="h-5 bg-gray-200 rounded w-1/2" />
                            <div className="h-4 bg-gray-200 rounded w-full" />
                        </div>
                        <div className="p-3"><div className="bg-gray-200 h-9 rounded-xl" /></div>
                    </div>
                ))}

                {!isLoading && certificados.map((cert) => (
                    <div
                        key={cert.id}
                        className="bg-white border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-200 rounded-2xl group"
                    >
                        <div>
                            <div className="w-full h-40 bg-gray-50 relative flex items-center justify-center border-b border-gray-100 p-4 overflow-hidden">
                                <img
                                    src={cert.imagenPrincipalUrl}
                                    alt={cert.nombre}
                                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-4">
                                <h2 className="text-sm font-bold text-gray-900 mb-1 truncate" title={cert.nombre}>
                                    {cert.nombre}
                                </h2>
                                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                                    {cert.descripcion}
                                </p>
                            </div>
                        </div>
                        <div className="px-4 pb-4 pt-1 flex gap-2">
                            <button
                                type="button"
                                onClick={() => handleOpenEditModal(cert)}
                                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold py-2 px-3 transition-colors inline-flex items-center justify-center gap-1 rounded-full"
                            >
                                <MdEdit size={14} /> Update
                            </button>
                            <button
                                type="button"
                                onClick={() => handleDeleteCertificate(cert.id, cert.nombre)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors rounded-full"
                                title="Eliminar definitivamente"
                            >
                                <MdDelete size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <DetailedImageModal
                isOpen={isDetailedImageModalOpen}
                onClose={() => {
                    setIsDetailedImageModalOpen(false);
                    setSelectedCertificate(null);
                }}
                onSave={handleSaveDetailedImage}
                defaultData={selectedCertificate}
            />
        </div>
    )
}