import React from 'react'
interface HeaderProps {
    onOpenMenu: (open: boolean) => void
}

export default function DashboardHeaderPage({ onOpenMenu }: HeaderProps) {
    return (
        <header className="md:hidden w-full bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center fixed top-0 left-0 z-30">
            <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-[#0b57d0] rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    C
                </div>
                <span className="font-semibold text-lg tracking-tight">Corelia</span>
            </div>
            <button
                onClick={() => onOpenMenu(true)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg focus:outline-none"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </header>
    )
}
