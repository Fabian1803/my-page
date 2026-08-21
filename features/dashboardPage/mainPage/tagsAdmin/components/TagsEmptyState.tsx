'use client'
import React from 'react'
import Link from 'next/link'
import { MdFilterList } from 'react-icons/md'
import { BsFillBookmarkPlusFill } from 'react-icons/bs'

interface TagsEmptyStateProps {
    searchFilter: string;
    onResetFilters: () => void;
}

export default function TagsEmptyState({ searchFilter, onResetFilters }: TagsEmptyStateProps) {
    return (
        <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center">
            <div className="w-12 sm:w-14 h-12 sm:h-14 bg-blue-50 text-[#0c68e0] rounded-2xl flex items-center justify-center mb-3">
                <MdFilterList size={26} />
            </div>
            <p className="text-sm sm:text-base font-medium text-gray-800 mb-1">
                {searchFilter ? 'No se encontraron tecnologías coincidentes' : 'No hay etiquetas registradas'}
            </p>
            <p className="text-xs text-gray-500 max-w-sm mb-4">
                {searchFilter
                    ? `No hay recursos que coincidan con "${searchFilter}". Prueba con otro término.`
                    : 'Crea tu primera tecnología para asignarla a tus proyectos y certificaciones.'}
            </p>
            {searchFilter ? (
                <button
                    type="button"
                    onClick={onResetFilters}
                    className="text-xs font-semibold text-[#0c68e0] hover:underline cursor-pointer"
                >
                    Limpiar filtros
                </button>
            ) : (
                <Link
                    href="/dashboard/etiquetas/crear"
                    className="inline-flex items-center gap-2 bg-[#0c68e0] hover:bg-blue-900 text-white font-medium px-4 py-2 rounded-sm text-xs transition-colors cursor-pointer"
                >
                    <BsFillBookmarkPlusFill size={13} />
                    <span>Crear primera etiqueta</span>
                </Link>
            )}
        </div>
    )
}
