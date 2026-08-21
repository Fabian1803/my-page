import React from 'react'
import { MdSave } from 'react-icons/md'
import { IoReload } from 'react-icons/io5'

interface SocialLinksActionBarProps {
    loading: boolean;
    onReset: () => void;
}

export default function SocialLinksActionBar({
    loading,
    onReset
}: SocialLinksActionBarProps) {
    return (
        <div className="bg-white border-t border-[#dadce0] px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div className="text-xs text-gray-500">
                Los cambios se guardan directamente en la base de datos de PostgreSQL.
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                    type="button"
                    onClick={onReset}
                    disabled={loading}
                    className="px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-sm transition-colors disabled:opacity-40 cursor-pointer"
                >
                    Descartar
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 bg-[#0c68e0] hover:bg-blue-900 text-white px-5 py-2 rounded-sm text-xs sm:text-sm font-semibold transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                >
                    {loading ? (
                        <>
                            <IoReload size={16} className="animate-spin" />
                            <span>Guardando...</span>
                        </>
                    ) : (
                        <>
                            <MdSave size={16} />
                            <span>Guardar cambios</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}
