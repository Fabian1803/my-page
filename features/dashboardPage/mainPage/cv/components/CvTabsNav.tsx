import React from 'react'

interface CvTabsNavProps {
    activeTab: 'details' | 'permissions' | 'versions';
    onSelectTab: (tab: 'details' | 'permissions' | 'versions') => void;
}

export default function CvTabsNav({
    activeTab,
    onSelectTab
}: CvTabsNavProps) {
    return (
        <div className="flex gap-4 sm:gap-8 px-4 sm:px-6 border-b border-[#dadce0] bg-white pt-2 overflow-x-auto no-scrollbar">
            <button
                type="button"
                onClick={() => onSelectTab('details')}
                className={`pb-2.5 text-[13px] sm:text-[14px] font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    activeTab === 'details'
                        ? 'text-[#1a73e8] border-b-2 border-[#1a73e8] font-semibold'
                        : 'text-[#5f6368] hover:text-[#202124] border-b-2 border-transparent'
                }`}
            >
                Detalles del Objeto
            </button>
            <button
                type="button"
                onClick={() => onSelectTab('permissions')}
                className={`pb-2.5 text-[13px] sm:text-[14px] font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    activeTab === 'permissions'
                        ? 'text-[#1a73e8] border-b-2 border-[#1a73e8] font-semibold'
                        : 'text-[#5f6368] hover:text-[#202124] border-b-2 border-transparent'
                }`}
            >
                Configuración y Permisos
            </button>
            <button
                type="button"
                onClick={() => onSelectTab('versions')}
                className={`pb-2.5 text-[13px] sm:text-[14px] font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    activeTab === 'versions'
                        ? 'text-[#1a73e8] border-b-2 border-[#1a73e8] font-semibold'
                        : 'text-[#5f6368] hover:text-[#202124] border-b-2 border-transparent'
                }`}
            >
                Historial de Versiones
            </button>
        </div>
    )
}
