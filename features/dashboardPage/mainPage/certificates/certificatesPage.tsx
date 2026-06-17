'use client'
import React from 'react'
import { MdAdd, MdEdit } from 'react-icons/md'
import { useCertificates } from './hooks/useCertificates'
import CertificateModal from './components/certificateModal'

export default function CertificatesPage() {
    // CORREGIDO: Traemos "tags" y "setTags" directo de la lógica unificada de tu hook
    const {
        isLoading,
        isModalOpen,
        setIsModalOpen,
        editingId,
        nombre,
        setNombre,
        institucion,
        setInstitucion,
        descripcion,
        setDescripcion,
        imageBase64,
        bullets,
        currentBullet,
        setCurrentBullet,
        tags,
        setTags,
        certificados,
        fileInputRef,
        handleFileChange,
        handleAddBullet,
        handleRemoveBullet,
        handleCreateClick,
        handleEditClick,
        handleSaveCertificate
    } = useCertificates()

    const skeletons = [1, 2, 3, 4]

    return (
        <div className="max-w-6xl mx-auto">
            {/* Cabecera Principal */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-[24px] font-normal tracking-tight text-[#202124]">
                        Certificaciones
                    </h1>
                    <span className="text-xs font-semibold px-3 py-1 bg-[#70a4f1]/20 text-[#0b57d0] rounded-full mt-1 inline-block sm:mt-0">
                        {isLoading ? 'Cargando...' : `${certificados.length} en total`}
                    </span>
                </div>
                
                <button
                    type="button"
                    onClick={handleCreateClick}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#0b57d0] hover:bg-[#155bd3] text-white text-sm font-semibold rounded-full shadow-sm transition-all shrink-0"
                >
                    <MdAdd size={20} />
                    Crear certificación
                </button>
            </div>

            {/* GRILLA DE CARTAS RESPONSIVAS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* SKELETONS EN CARGA */}
                {isLoading && skeletons.map((id) => (
                    <div key={id} className="bg-white border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between animate-pulse">
                        <div>
                            <div className="w-full h-40 bg-gray-200 border-b border-gray-100 flex items-center justify-center">
                                <svg className="w-10 h-10 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z" />
                                </svg>
                            </div>
                            <div className="px-3 py-4 space-y-3">
                                <div className="h-5 bg-gray-200 rounded-md w-1/3" />
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded-md w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
                                </div>
                            </div>
                        </div>
                        <div className="px-3 pb-3 pt-1">
                            <div className="w-full bg-gray-200 h-10" />
                        </div>
                    </div>
                ))}

                {/* LISTADO DE CERTIFICADOS */}
                {!isLoading && certificados.map((cert) => (
                    <div
                        key={cert.id}
                        className="bg-white border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-200"
                    >
                        <div>
                            <div className="w-full h-40 bg-gray-100 relative flex items-center justify-center border-b border-gray-100">
                                <img
                                    src={cert.imageBase64}
                                    alt={cert.nombre}
                                    className="h-16 w-auto object-contain opacity-80"
                                />
                            </div>
                            <div className="p-3">
                                <h2 className="text-lg font-bold text-gray-900 mb-1 truncate">
                                    {cert.nombre}
                                </h2>
                                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                                    {cert.descripcion}
                                </p>
                            </div>
                        </div>
                        <div className="px-3 pb-3 pt-1">
                            <button 
                                type="button"
                                onClick={() => handleEditClick(cert)}
                                className="w-full bg-[#0b57d0] hover:bg-[#0a48b3] text-white text-sm font-semibold py-2.5 px-4 transition-colors shadow-sm inline-flex items-center justify-center gap-1.5"
                            >
                                <MdEdit size={16} />
                                Actualizar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal flotante completamente mapeado */}
            <CertificateModal 
                tags={tags}
                setTags={setTags}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                editingId={editingId}
                nombre={nombre}
                setNombre={setNombre}
                institucion={institucion}
                setInstitucion={setInstitucion}
                descripcion={descripcion}
                setDescripcion={setDescripcion}
                imageBase64={imageBase64}
                bullets={bullets}
                currentBullet={currentBullet}
                setCurrentBullet={setCurrentBullet}
                fileInputRef={fileInputRef}
                handleFileChange={handleFileChange}
                handleAddBullet={handleAddBullet}
                handleRemoveBullet={handleRemoveBullet}
                handleSaveCertificate={handleSaveCertificate}
            />
        </div>
    )
}