'use client'
import React from 'react'
import Link from 'next/link'
import { MdFilterList, MdRocketLaunch } from 'react-icons/md'
import { BsFillBookmarkPlusFill } from 'react-icons/bs'

interface ProjectsEmptyStateProps {
    isFiltered: boolean;
    onResetFilter: () => void;
}

export default function ProjectsEmptyState({
    isFiltered,
    onResetFilter
}: ProjectsEmptyStateProps) {
    return (
        <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center min-h-[50vh] bg-white rounded-b-2xl">
            <div className="w-14 h-14 bg-blue-50 text-[#0c68e0] rounded-2xl flex items-center justify-center mb-3">
                {isFiltered ? <MdFilterList size={28} /> : <MdRocketLaunch size={28} />}
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">
                {isFiltered ? 'No hay proyectos destacados' : 'No hay proyectos registrados'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 max-w-sm mb-5 leading-relaxed">
                {isFiltered
                    ? 'No se encontraron proyectos marcados como destacados. Puedes marcar proyectos con la estrella para mostrarlos en la página principal.'
                    : 'Registra tus aplicaciones, microservicios y proyectos personales con portadas, documentación interactiva y enlaces a repositorios.'}
            </p>
            {isFiltered ? (
                <button
                    type="button"
                    onClick={onResetFilter}
                    className="text-xs font-semibold text-[#0c68e0] hover:underline cursor-pointer"
                >
                    Ver todos los proyectos
                </button>
            ) : (
                <Link
                    href="/dashboard/proyectos/crear"
                    className="inline-flex items-center gap-2 bg-[#0c68e0] hover:bg-blue-900 text-white font-semibold px-4 py-2 rounded-sm text-xs sm:text-sm transition-colors cursor-pointer shadow-xs"
                >
                    <BsFillBookmarkPlusFill size={14} />
                    <span>Crear primer proyecto</span>
                </Link>
            )}
        </div>
    )
}
