'use client'
import React from 'react'
import { MdSecurity, MdRefresh } from 'react-icons/md'

interface SettingsHeaderBarProps {
    onRefresh: () => void;
    isLoading: boolean;
}

export default function SettingsHeaderBar({ onRefresh, isLoading }: SettingsHeaderBarProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-6 py-4 bg-white border-b border-[#dadce0] rounded-t-2xl">
            <div className="flex items-center gap-3">
                <h1 className="text-lg sm:text-lg text-gray-800 tracking-tight">
                    Configuración y Seguridad de Acceso
                </h1>
            </div>

            <button
                type="button"
                onClick={onRefresh}
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white hover:bg-gray-50 border border-[#dadce0] text-gray-700 text-xs font-semibold rounded shadow-2xs transition-colors cursor-pointer disabled:opacity-50"
            >
                <MdRefresh size={16} className={isLoading ? "animate-spin text-[#0c68e0]" : "text-gray-500"} />
                <span>Actualizar datos</span>
            </button>
        </div>
    )
}
