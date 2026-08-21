'use client'
import React from 'react'
import Link from 'next/link'
import { MdCardMembership, MdFilterList } from 'react-icons/md'
import { BsFillBookmarkPlusFill } from 'react-icons/bs'

interface CertificatesEmptyStateProps {
    isFiltered: boolean;
    onResetFilter: () => void;
}

export default function CertificatesEmptyState({
    isFiltered,
    onResetFilter
}: CertificatesEmptyStateProps) {
    return (
        <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center min-h-[50vh] bg-white rounded-b-2xl">
            <div className="w-14 h-14 bg-blue-50 text-[#0c68e0] rounded-2xl flex items-center justify-center mb-3">
                {isFiltered ? <MdFilterList size={28} /> : <MdCardMembership size={28} />}
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">
                {isFiltered ? 'No hay certificados destacados' : 'No hay certificados registrados'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 max-w-sm mb-5 leading-relaxed">
                {isFiltered
                    ? 'No se encontraron certificaciones marcadas como destacadas. Puedes marcar certificados con la estrella para mostrarlos en el inicio.'
                    : 'Registra tus títulos, cursos y certificaciones oficiales para asignarlos a tus tecnologías y mostrarlos en el portafolio.'}
            </p>
            {isFiltered ? (
                <button
                    type="button"
                    onClick={onResetFilter}
                    className="text-xs font-semibold text-[#0c68e0] hover:underline cursor-pointer"
                >
                    Ver todos los certificados
                </button>
            ) : (
                <Link
                    href="/dashboard/certificados/crear"
                    className="inline-flex items-center gap-2 bg-[#0c68e0] hover:bg-blue-900 text-white font-semibold px-4 py-2 rounded-sm text-xs sm:text-sm transition-colors cursor-pointer shadow-xs"
                >
                    <BsFillBookmarkPlusFill size={14} />
                    <span>Crear primer certificado</span>
                </Link>
            )}
        </div>
    )
}
