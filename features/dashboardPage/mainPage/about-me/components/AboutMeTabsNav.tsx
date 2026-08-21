import React from 'react'

interface AboutMeTabsNavProps {
    activeTab: 'general' | 'experience' | 'education';
    onSelectTab: (tab: 'general' | 'experience' | 'education') => void;
}

export default function AboutMeTabsNav({
    activeTab,
    onSelectTab
}: AboutMeTabsNavProps) {
    return (
        <div className="flex gap-4 sm:gap-8 px-4 sm:px-6 border-b border-[#dadce0] bg-white pt-2 overflow-x-auto no-scrollbar">
            <button
                type="button"
                onClick={() => onSelectTab('general')}
                className={`pb-2.5 text-[13px] sm:text-[14px] font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    activeTab === 'general'
                        ? 'text-[#1a73e8] border-b-2 border-[#1a73e8] font-semibold'
                        : 'text-[#5f6368] hover:text-[#202124] border-b-2 border-transparent'
                }`}
            >
                Información General
            </button>
            <button
                type="button"
                onClick={() => onSelectTab('experience')}
                className={`pb-2.5 text-[13px] sm:text-[14px] font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    activeTab === 'experience'
                        ? 'text-[#1a73e8] border-b-2 border-[#1a73e8] font-semibold'
                        : 'text-[#5f6368] hover:text-[#202124] border-b-2 border-transparent'
                }`}
            >
                Experiencia Laboral
            </button>
            <button
                type="button"
                onClick={() => onSelectTab('education')}
                className={`pb-2.5 text-[13px] sm:text-[14px] font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    activeTab === 'education'
                        ? 'text-[#1a73e8] border-b-2 border-[#1a73e8] font-semibold'
                        : 'text-[#5f6368] hover:text-[#202124] border-b-2 border-transparent'
                }`}
            >
                Formación Académica
            </button>
        </div>
    )
}
