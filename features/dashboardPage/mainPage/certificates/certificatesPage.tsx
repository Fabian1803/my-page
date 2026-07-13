'use client'
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md'
import DetailedImageModal from '../../components/detailedImageModal'
import { useCertificatePage } from './hooks/useCertificatePage'
import { BsFillBookmarkPlusFill, BsThreeDotsVertical } from 'react-icons/bs'
import { CiBookmarkRemove } from 'react-icons/ci'
import { BiDislike, BiLike } from 'react-icons/bi'
import { IoReload } from 'react-icons/io5'
import { FaArrowRight } from 'react-icons/fa'

export default function CertificatesPage() {
    const {
        certificados,
        isLoading,
        skeletons,
        cargarCertificados,
        isDetailedImageModalOpen,
        setSelectedCertificate,
        selectedCertificate,
        setIsDetailedImageModalOpen,
        handleSaveDetailedImage,
        handleDeleteCertificate,
        handleOpenEditModal,
    } = useCertificatePage()

    return (
        <>
            <div className="max-w-[1600px] mx-auto flex flex-col h-full gap-1 bg-[#f9fafb] rounded-t-2xl">
                <div className="flex justify-between border-b border-[#dbdce0] px-6 pt-3 pb-2 bg-white rounded-t-2xl">
                    <div className="flex gap-2 justify-between w-full sm:w-auto">
                        <h1 className='text-lg font-medium text-gray-800'>Mis Certificados</h1>
                        <button
                            type="button"
                            onClick={() => {
                                setSelectedCertificate(null);
                                setIsDetailedImageModalOpen(true);
                            }}
                            className="flex items-center gap-2 bg-[#0c68e0] hover:bg-blue-900 transition px-2 py-1 text-white rounded-sm cursor-pointer">
                            <BsFillBookmarkPlusFill size={14} />
                            <span className="text-[14px] font-semibold">Crear Certificado</span>
                        </button>
                        <div className="hidden sm:flex items-center gap-2 hover:bg-gray-200 transition px-2 py-1 text-[#0c68e0] hover:text-blue-700 rounded-sm cursor-pointer">
                            <CiBookmarkRemove size={16} />
                            <span className='text-[14px]'>Ver certificados</span>
                        </div>
                    </div>

                    <div className="hidden sm:flex gap-4 items-center">
                        <span className='hidden lg:block text-sm text-gray-500'>¿Te resultó útil esta página?</span>
                        <BiLike className="hidden lg:block text-[#0c68e0] cursor-pointer" size={24} />
                        <BiDislike className="hidden lg:block text-[#0c68e0] cursor-pointer" size={24} />
                        <BsThreeDotsVertical className="lg:hidden text-[#0c68e0] cursor-pointer" size={24} />
                        <div
                            onClick={cargarCertificados}
                            className="hover:bg-gray-200 transition text-[#0c68e0] hover:text-blue-700 px-2 py-1 flex gap-2 items-center rounded-sm cursor-pointer"
                        >
                            <IoReload size={20} />
                            <p className="text-sm font-medium">Actualizar</p>
                        </div>
                    </div>
                </div>

                {/* CUADRÍCULA DE CONTENIDO REUTILIZABLE (Estilo Nuevo y Limpio) */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 p-4">

                    {/* ESTADO DE CARGA (SKELETONS) */}
                    {isLoading && certificados.length === 0 && skeletons.map((id) => (
                        <div key={id} className="bg-white border border-[#dbdce0] rounded-xl animate-pulse">
                            <div className="w-full p-4 border-b border-[#dbdce0]">
                                <div className="flex justify-between items-center">
                                    <div className="h-6 bg-gray-200 rounded-md w-1/2" />
                                    <div className="w-8 h-8 bg-gray-200 rounded-full" />
                                </div>
                                <div className="space-y-2 mt-2">
                                    <div className="h-4 bg-gray-200 rounded-md w-full" />
                                    <div className="h-4 bg-gray-200 rounded-md w-5/6" />
                                </div>
                                <div className="flex gap-2 mt-3">
                                    <div className="h-5 bg-gray-200 rounded w-12" />
                                    <div className="h-5 bg-gray-200 rounded w-16" />
                                </div>
                                <div className="w-full h-60 bg-gray-200 rounded-lg mt-3" />
                            </div>
                            <div className="p-4 flex gap-3 items-center">
                                <div className="w-5 h-5 bg-gray-200 rounded-full" />
                                <div className="h-5 bg-gray-200 rounded-md w-2/3" />
                            </div>
                        </div>
                    ))}

                    {!isLoading && certificados.map((certificado, index) => (
                        <div key={certificado.id || `cert-${index}`} className="bg-white border border-[#dbdce0] rounded-xl flex flex-col justify-between hover:shadow-md transition-all">
                            <div className="w-full p-4 border-b border-[#dbdce0] flex-1">
                                <div className="flex justify-between items-start gap-2">
                                    <div className="flex gap-2 items-center min-w-0">
                                        <p className="truncate text-lg font-medium text-gray-900" title={certificado.nombre}>
                                            {certificado.nombre}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteCertificate(certificado.id, certificado.nombre)}
                                        className="p-2 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors shrink-0 cursor-pointer"
                                        title="Eliminar certificado"
                                    >
                                        <MdDelete size={20} />
                                    </button>
                                </div>

                                <div className="mt-1">
                                    <p className="text-sm text-gray-600 line-clamp-4 leading-relaxed">
                                        {certificado.descripcion}
                                    </p>
                                </div>

                                {/* Tags del certificado */}
                                {certificado.categorias?.map((cat, idx) => (
                                    <span key={cat.id || `cat-${idx}`} className="text-[12px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">
                                        {cat.nombre}
                                    </span>
                                ))}

                                {/* Contenedor de la Imagen */}
                                <div className="w-full h-60 bg-gray-50 relative flex items-center justify-center border border-gray-100 rounded-lg mt-3 overflow-hidden p-2">
                                    <img
                                        src={certificado.imagenPrincipalUrl}
                                        alt={certificado.nombre}
                                        className="max-h-full max-w-full object-contain opacity-90"
                                        style={{ width: 'auto', height: 'auto' }}
                                    />
                                </div>
                            </div>

                            {/* Botón de edición */}
                            <button
                                type="button"
                                onClick={() => handleOpenEditModal(certificado)}
                                className="w-full px-4 py-3 flex gap-3 items-center hover:bg-gray-50 text-gray-700 hover:text-[#0c68e0] font-medium border-t border-transparent rounded-b-xl transition-all cursor-pointer text-left"
                            >
                                <FaArrowRight className="shrink-0" />
                                <span className="text-sm sm:text-base truncate">
                                    Ir a personalizar certificado {certificado.nombre}
                                </span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* MODAL DE DETALLE COMPARTIDO */}
            <DetailedImageModal
                isOpen={isDetailedImageModalOpen}
                onClose={() => {
                    setIsDetailedImageModalOpen(false);
                    setSelectedCertificate(null);
                }}
                onSave={handleSaveDetailedImage}
                defaultData={selectedCertificate}
            />
        </>
    )
}