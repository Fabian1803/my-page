import React from 'react'

interface TagsTabsNavProps {
    filterTab: 'all' | 'destacados' | 'estandar';
    totalCount: number;
    destacadasCount: number;
    onSelectTab: (tab: 'all' | 'destacados' | 'estandar') => void;
}

export default function TagsTabsNav({
    filterTab,
    totalCount,
    destacadasCount,
    onSelectTab
}: TagsTabsNavProps) {
    const estandarCount = totalCount - destacadasCount

    return (
        <div className="flex gap-4 sm:gap-8 px-4 sm:px-6 border-b border-[#dadce0] bg-white pt-2 overflow-x-auto no-scrollbar">
            <button
                type="button"
                onClick={() => onSelectTab('all')}
                className={`pb-2.5 text-[13px] sm:text-[14px] font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    filterTab === 'all'
                        ? 'text-[#1a73e8] border-b-2 border-[#1a73e8] font-semibold'
                        : 'text-[#5f6368] hover:text-[#202124] border-b-2 border-transparent'
                }`}
            >
                Todas ({totalCount})
            </button>
            <button
                type="button"
                onClick={() => onSelectTab('destacados')}
                className={`pb-2.5 text-[13px] sm:text-[14px] font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    filterTab === 'destacados'
                        ? 'text-[#1a73e8] border-b-2 border-[#1a73e8] font-semibold'
                        : 'text-[#5f6368] hover:text-[#202124] border-b-2 border-transparent'
                }`}
            >
                Destacadas ({destacadasCount})
            </button>
            <button
                type="button"
                onClick={() => onSelectTab('estandar')}
                className={`pb-2.5 text-[13px] sm:text-[14px] font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    filterTab === 'estandar'
                        ? 'text-[#1a73e8] border-b-2 border-[#1a73e8] font-semibold'
                        : 'text-[#5f6368] hover:text-[#202124] border-b-2 border-transparent'
                }`}
            >
                Estándar ({estandarCount})
            </button>
        </div>
    )
}
