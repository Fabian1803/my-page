'use client'
import React, { useState } from 'react'
import { MdOutlineEmail, MdEdit, MdClose, MdCheck } from 'react-icons/md'

interface EmailSectionProps {
    email: string;
    newEmail: string;
    setNewEmail: (val: string) => void;
    emailPassword: string;
    setEmailPassword: (val: string) => void;
    emailLoading: boolean;
    onUpdateEmail: (e: React.FormEvent) => void;
}

export default function EmailSection({
    email,
    newEmail,
    setNewEmail,
    emailPassword,
    setEmailPassword,
    emailLoading,
    onUpdateEmail,
}: EmailSectionProps) {
    const [isEditing, setIsEditing] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        await onUpdateEmail(e)
    }

    const handleCancel = () => {
        setIsEditing(false)
        setNewEmail(email)
        setEmailPassword('')
    }

    return (
        <div className="flex flex-col gap-4 min-w-0 pt-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded bg-blue-50 text-[#0c68e0] flex items-center justify-center shrink-0">
                        <MdOutlineEmail size={18} />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-sm font-semibold text-gray-800">
                            Correo Electrónico de Acceso
                        </h3>
                        <span className="text-xs text-gray-500 font-mono">
                            {email || 'Cargando correo...'}
                        </span>
                    </div>
                </div>

                {!isEditing && (
                    <button
                        type="button"
                        onClick={() => {
                            setIsEditing(true)
                            setNewEmail(email)
                        }}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 sm:py-1.5 bg-white hover:bg-gray-100 border border-[#dadce0] text-[#0c68e0] text-xs font-semibold rounded shadow-2xs transition-colors cursor-pointer"
                    >
                        <MdEdit size={15} />
                        <span>Cambiar correo</span>
                    </button>
                )}
            </div>

            {isEditing && (
                <form 
                    onSubmit={handleSubmit} 
                    className="border border-[#dadce0] rounded-lg bg-white overflow-hidden shadow-2xs transition-all"
                >
                    <div className="bg-[#f8f9fa] border-b border-[#dadce0] px-4 py-2 flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-700">
                            Actualizar dirección de correo electrónico
                        </span>
                    </div>

                    <div className="p-4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-[11px] font-semibold text-gray-600 block mb-1">
                                    Nuevo Correo Electrónico
                                </label>
                                <input
                                    type="email"
                                    required
                                    placeholder="nuevo-correo@gmail.com"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    className="w-full px-3 py-2 bg-[#f8f9fa] hover:bg-white focus:bg-white border border-[#dadce0] focus:border-[#0c68e0] rounded text-xs sm:text-sm text-gray-800 focus:outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="text-[11px] font-semibold text-gray-600 block mb-1">
                                    Contraseña Actual (para confirmar)
                                </label>
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    value={emailPassword}
                                    onChange={(e) => setEmailPassword(e.target.value)}
                                    className="w-full px-3 py-2 bg-[#f8f9fa] hover:bg-white focus:bg-white border border-[#dadce0] focus:border-[#0c68e0] rounded text-xs sm:text-sm text-gray-800 focus:outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={emailLoading}
                                className="px-3.5 py-1.5 text-gray-700 hover:bg-gray-100 rounded text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={emailLoading}
                                className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#0c68e0] hover:bg-blue-700 text-white text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                            >
                                <MdCheck size={16} />
                                <span>{emailLoading ? "Guardando..." : "Guardar cambios"}</span>
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    )
}
