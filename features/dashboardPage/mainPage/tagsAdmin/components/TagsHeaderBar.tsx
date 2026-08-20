import React from 'react'
import Link from 'next/link'
import { BsFillBookmarkPlusFill, BsThreeDotsVertical } from 'react-icons/bs'
import { CiBookmarkRemove } from 'react-icons/ci'
import { BiDislike, BiLike } from 'react-icons/bi'
import { IoReload } from 'react-icons/io5'

interface TagsHeaderBarProps {
    isLoading: boolean;
    filterTab: 'all' | 'destacados' | 'estandar';
    onToggleFilterTab: () => void;
    onRefresh: () => void;
}

export default function TagsHeaderBar({
    isLoading,
    filterTab,
    onToggleFilterTab,
    onRefresh
}: TagsHeaderBarProps) {
    return (
        <div className="flex justify-between border-b border-[#dbdce0] px-4 sm:px-6 pt-3 pb-2 bg-white rounded-t-2xl">
            <div className="flex gap-2 sm:gap-3 justify-between w-full sm:w-auto items-center">
                <h1 className="text-base sm:text-lg font-medium text-gray-800 truncate">Mis Etiquetas</h1>
                <div className="flex items-center gap-2">
                    <Link
                        href="/dashboard/etiquetas/crear"
                        className="flex items-center gap-1.5 sm:gap-2 bg-[#0c68e0] hover:bg-blue-900 transition px-2 sm:px-2.5 py-1 text-white rounded-sm cursor-pointer shadow-xs text-xs sm:text-sm font-semibold"
                    >
                        <BsFillBookmarkPlusFill size={13} />
                        <span>Crear Etiqueta</span>
                    </Link>

                    <button
                        type="button"
                        onClick={onToggleFilterTab}
                        className={`hidden sm:flex items-center gap-2 hover:bg-gray-200 transition px-2 py-1 text-[#0c68e0] hover:text-blue-700 rounded-sm cursor-pointer ${
                            filterTab === 'destacados' ? 'bg-blue-50 font-medium' : ''
                        }`}
                    >
                        <CiBookmarkRemove size={16} />
                        <span className="text-[14px]">
                            {filterTab === 'destacados' ? 'Ver todas' : 'Ver destacadas'}
                        </span>
                    </button>
                </div>
            </div>

            <div className="hidden sm:flex gap-4 items-center">
                <span className="hidden lg:block text-sm text-gray-500">¿Te resultó útil esta página?</span>
                <BiLike className="hidden lg:block text-[#0c68e0] cursor-pointer hover:opacity-80 transition" size={24} />
                <BiDislike className="hidden lg:block text-[#0c68e0] cursor-pointer hover:opacity-80 transition" size={24} />
                <BsThreeDotsVertical className="lg:hidden text-[#0c68e0] cursor-pointer" size={24} />
                <div 
                    onClick={onRefresh}
                    className="hover:bg-gray-200 transition text-[#0c68e0] hover:text-blue-700 px-2 py-1 flex gap-2 items-center rounded-sm cursor-pointer"
                    title="Actualizar lista de etiquetas"
                >
                    <IoReload size={20} className={isLoading ? "animate-spin" : ""} />
                    <p className="text-sm font-medium">Actualizar</p>
                </div>
            </div>
        </div>
    )
}
