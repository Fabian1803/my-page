'use client'
import React from 'react'
import Link from 'next/link'
import { MdDelete, MdSchool, MdOpenInNew } from 'react-icons/md'
import { FaStar, FaRegStar, FaArrowRight } from 'react-icons/fa'
import { CertificateItem } from '../services/certificateServices'

interface CertificateCardProps {
    certificate: CertificateItem;
    onToggleDestacado: (id: string, current: boolean) => void;
    onDelete: (id: string, nombre: string) => void;
}

export default function CertificateCard({
    certificate,
    onToggleDestacado,
    onDelete
}: CertificateCardProps) {
    const isDestacado = Boolean(certificate.destacado)

    return (
        <div className="bg-white border border-[#dadce0] rounded-xl flex flex-col justify-between hover:shadow-md transition-all group overflow-hidden">
            <div className="w-full p-4 sm:p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start gap-2 mb-2">
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            {certificate.institucion && (
                                <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-blue-50 text-[#0c68e0] px-2 py-0.5 rounded border border-blue-100 truncate">
                                    <MdSchool size={13} className="shrink-0" />
                                    {certificate.institucion}
                                </span>
                            )}
                            {isDestacado && (
                                <span className="text-[10px] bg-yellow-50 text-yellow-700 border border-yellow-200 px-1.5 py-0.5 rounded font-medium shrink-0">
                                    Destacado
                                </span>
                            )}
                        </div>
                        <Link
                            href={`/dashboard/certificados/${certificate.id}`}
                            className="text-base sm:text-lg font-semibold text-gray-900 hover:text-[#0c68e0] transition-colors truncate block"
                            title={certificate.nombre}
                        >
                            {certificate.nombre}
                        </Link>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                        <button
                            type="button"
                            onClick={() => onToggleDestacado(certificate.id, isDestacado)}
                            className={`p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer ${isDestacado ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                                }`}
                            title={isDestacado ? "Quitar de destacados" : "Marcar como destacado"}
                        >
                            {isDestacado ? <FaStar size={16} /> : <FaRegStar size={16} />}
                        </button>
                        <button
                            type="button"
                            onClick={() => onDelete(certificate.id, certificate.nombre)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors shrink-0 cursor-pointer"
                            title="Eliminar certificado"
                        >
                            <MdDelete size={18} />
                        </button>
                    </div>
                </div>

                {/* Descripción */}
                {certificate.descripcion && (
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed mb-3">
                        {certificate.descripcion}
                    </p>
                )}

                {/* Categorías / Tecnologías */}
                {certificate.categorias && certificate.categorias.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        {certificate.categorias.map((cat, idx) => (
                            <span
                                key={cat.id || `cat-${idx}`}
                                className="text-[11px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-medium"
                            >
                                {cat.nombre}
                            </span>
                        ))}
                    </div>
                )}

                {/* Contenedor de la Imagen */}
                <div className="w-full h-52 sm:h-60 bg-gray-50 relative flex items-center justify-center border border-gray-200 rounded-lg overflow-hidden p-2 mt-auto">
                    {certificate.imagenPrincipalUrl ? (
                        <img
                            src={certificate.imagenPrincipalUrl}
                            alt={certificate.nombre}
                            className="max-h-full max-w-full object-contain"
                        />
                    ) : (
                        <span className="text-xs text-gray-400">Sin imagen de certificado</span>
                    )}
                </div>
            </div>

            {/* Pie de la tarjeta: Botón de edición */}
            <Link
                href={`/dashboard/certificados/${certificate.id}`}
                className="w-full px-4 sm:px-5 py-3 flex gap-2 items-center justify-between bg-[#f8f9fa] hover:bg-blue-50/50 text-gray-700 hover:text-[#0c68e0] font-medium border-t border-[#dadce0] transition-all cursor-pointer text-xs sm:text-sm"
            >
                <span className="truncate">
                    Personalizar certificado y viñetas
                </span>
                <FaArrowRight size={12} className="shrink-0" />
            </Link>
        </div>
    )
}
