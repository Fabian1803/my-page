import React from 'react'

interface SocialLinksTabsNavProps {
    activeTab: 'channels' | 'endpoints' | 'settings';
    onSelectTab: (tab: 'channels' | 'endpoints' | 'settings') => void;
}

export default function SocialLinksTabsNav({
    activeTab,
    onSelectTab
}: SocialLinksTabsNavProps) {
    return (
        <div className="flex gap-4 sm:gap-8 px-4 sm:px-6 border-b border-[#dadce0] bg-white pt-2 overflow-x-auto no-scrollbar">
            <button
                type="button"
                onClick={() => onSelectTab('channels')}
                className={`pb-2.5 text-[13px] sm:text-[14px] font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    activeTab === 'channels'
                        ? 'text-[#1a73e8] border-b-2 border-[#1a73e8] font-semibold'
                        : 'text-[#5f6368] hover:text-[#202124] border-b-2 border-transparent'
                }`}
            >
                Canales de Contacto
            </button>
            <button
                type="button"
                onClick={() => onSelectTab('endpoints')}
                className={`pb-2.5 text-[13px] sm:text-[14px] font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    activeTab === 'endpoints'
                        ? 'text-[#1a73e8] border-b-2 border-[#1a73e8] font-semibold'
                        : 'text-[#5f6368] hover:text-[#202124] border-b-2 border-transparent'
                }`}
            >
                Endpoints Públicos
            </button>
            <button
                type="button"
                onClick={() => onSelectTab('settings')}
                className={`pb-2.5 text-[13px] sm:text-[14px] font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    activeTab === 'settings'
                        ? 'text-[#1a73e8] border-b-2 border-[#1a73e8] font-semibold'
                        : 'text-[#5f6368] hover:text-[#202124] border-b-2 border-transparent'
                }`}
            >
                Configuración de Red
            </button>
        </div>
    )
}
