import React from 'react'
import { MdFilterList } from 'react-icons/md'
import { BsQuestionCircle, BsLayoutThreeColumns } from 'react-icons/bs'
import { HiOutlineXMark } from 'react-icons/hi2'

interface TagsFilterBarProps {
    searchFilter: string;
    onSearchChange: (value: string) => void;
    onClearSearch: () => void;
}

export default function TagsFilterBar({
    searchFilter,
    onSearchChange,
    onClearSearch
}: TagsFilterBarProps) {
    return (
        <div className="flex items-center px-3 sm:px-4 py-2 sm:py-2.5 bg-white border-b border-[#dadce0] gap-2 sm:gap-3">
            <MdFilterList className="text-[#5f6368] shrink-0" size={18} />
            <span className="text-[12px] sm:text-[13px] font-medium text-[#202124] select-none shrink-0">Filtro</span>
            <input
                type="text"
                value={searchFilter}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Escribir el nombre o valor..."
                className="text-[12px] sm:text-[13px] text-[#202124] placeholder:text-[#5f6368] bg-transparent outline-none flex-1 min-w-0 py-0.5"
            />
            {searchFilter && (
                <button
                    type="button"
                    onClick={onClearSearch}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer shrink-0"
                    title="Borrar filtro"
                >
                    <HiOutlineXMark size={16} />
                </button>
            )}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
                <BsQuestionCircle 
                    className="text-[#5f6368] hover:text-[#202124] cursor-pointer" 
                    size={16} 
                    title="Ayuda sobre filtros" 
                />
                <div className="h-4 w-[1px] bg-[#dadce0]"></div>
                <BsLayoutThreeColumns 
                    className="text-[#3c4043] hover:text-[#202124] cursor-pointer" 
                    size={16} 
                    title="Opciones de visualización de columnas" 
                />
            </div>
        </div>
    )
}
