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
    isSubModal?: boolean;
    footerActions?: React.ReactNode;
    submitDisabled?: boolean;
    submitLabel?: string;
}

export default function BaseModal({
    isOpen,
    onClose,
    title,
    onSave,
    children,
    maxWidth = 'sm:max-w-xl',
    isSubModal = false,
    footerActions,
    submitDisabled = false,
    submitLabel = 'Confirmar'
}: BaseModalProps) {
    if (!isOpen) return null
    const ContainerTag = isSubModal ? "div" : "form";
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className={`bg-white rounded-3xl shadow-xl w-full ${maxWidth} flex flex-col max-h-[90vh] overflow-hidden`}>
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>
                <ContainerTag onSubmit={isSubModal ? undefined : onSave} className="flex-1 overflow-y-auto p-6 space-y-4">
                    {children}
                    
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        {footerActions}
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-50 rounded-xl">
                            Cancelar
                        </button>
                        <button 
                            type={isSubModal ? "button" : "submit"} 
                            onClick={isSubModal ? onSave : undefined}
                            disabled={submitDisabled}
                            className="px-5 py-2 text-sm font-semibold text-white bg-[#0b57d0] hover:bg-[#1352b3] rounded-xl shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {submitLabel}
                        </button>
                    </div>
                </ContainerTag>
            </div>
        </div>
    )
}