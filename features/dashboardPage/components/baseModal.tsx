'use client'
import React from 'react'
import { MdClose, MdSave } from 'react-icons/md'

interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    onSave: (e: React.FormEvent) => void;
    children: React.ReactNode;
    maxWidth?: string;
}

export default function BaseModal({
    isOpen,
    onClose,
    title,
    onSave,
    children,
    maxWidth = 'sm:max-w-xl'
}: BaseModalProps) {
    if (!isOpen) return null
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm sm:p-4">
            <div className={`bg-white border border-[#dadce0] w-full h-full rounded-none max-h-screen ${maxWidth} sm:max-h-[90vh] overflow-y-auto p-5 md:p-6 shadow-2xl flex flex-col justify-between`}>
                <div>
                    <div className="flex justify-between items-center pb-3 border-b border-[#dadce0] mb-4">
                        <h2 className="text-lg font-medium text-[#202124]">
                            {title}
                        </h2>
                        <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 shrink-0">
                            <MdClose size={22} />
                        </button>
                    </div>
                    <form id="modal-form" onSubmit={onSave} className="space-y-4">
                        {children}
                    </form>
                </div>
                <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 mt-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                        Cancelar
                    </button>
                    <button type="submit" form="modal-form" className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#0b57d0] hover:bg-[#155bd3] text-white text-sm font-semibold rounded-full shadow-sm transition-all">
                        <MdSave size={16} /> Registrar
                    </button>
                </div>

            </div>
        </div>
    )
}