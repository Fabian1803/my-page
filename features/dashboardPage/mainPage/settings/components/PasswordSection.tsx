'use client'
import React, { useState } from 'react'
import { MdOutlineLock, MdVisibility, MdVisibilityOff, MdCheck, MdEdit } from 'react-icons/md'

interface PasswordSectionProps {
    currentPassword: string;
    setCurrentPassword: (val: string) => void;
    newPassword: string;
    setNewPassword: (val: string) => void;
    confirmPassword: string;
    setConfirmPassword: (val: string) => void;
    passwordLoading: boolean;
    onUpdatePassword: (e: React.FormEvent) => void;
}

export default function PasswordSection({
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    passwordLoading,
    onUpdatePassword,
}: PasswordSectionProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [showCurrentPw, setShowCurrentPw] = useState(false)
    const [showNewPw, setShowNewPw] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        await onUpdatePassword(e)
    }

    const handleCancel = () => {
        setIsEditing(false)
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
    }

    return (
        <div className="flex flex-col gap-4 min-w-0 pt-5 border-t border-[#dadce0]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded bg-blue-50 text-[#0c68e0] flex items-center justify-center shrink-0">
                        <MdOutlineLock size={18} />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-sm font-semibold text-gray-800">
                            Contraseña de Acceso
                        </h3>
                        <span className="text-xs text-gray-500 font-mono">
                            •••••••••••• (Cifrada con bcrypt)
                        </span>
                    </div>
                </div>

                {!isEditing && (
                    <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 sm:py-1.5 bg-white hover:bg-gray-100 border border-[#dadce0] text-[#0c68e0] text-xs font-semibold rounded shadow-2xs transition-colors cursor-pointer"
                    >
                        <MdEdit size={15} />
                        <span>Cambiar contraseña</span>
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
                            Actualizar contraseña de acceso
                        </span>
                    </div>

                    <div className="p-4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="text-[11px] font-semibold text-gray-600 block mb-1">
                                    Contraseña Actual
                                </label>
                                <div className="relative">
                                    <input
                                        type={showCurrentPw ? "text" : "password"}
                                        required
                                        placeholder="••••••••"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        className="w-full pl-3 pr-9 py-2 bg-[#f8f9fa] hover:bg-white focus:bg-white border border-[#dadce0] focus:border-[#0c68e0] rounded text-xs sm:text-sm text-gray-800 focus:outline-none transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrentPw(!showCurrentPw)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                                    >
                                        {showCurrentPw ? <MdVisibilityOff size={16} /> : <MdVisibility size={16} />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="text-[11px] font-semibold text-gray-600 block mb-1">
                                    Nueva Contraseña
                                </label>
                                <div className="relative">
                                    <input
                                        type={showNewPw ? "text" : "password"}
                                        required
                                        placeholder="••••••••"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full pl-3 pr-9 py-2 bg-[#f8f9fa] hover:bg-white focus:bg-white border border-[#dadce0] focus:border-[#0c68e0] rounded text-xs sm:text-sm text-gray-800 focus:outline-none transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPw(!showNewPw)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                                    >
                                        {showNewPw ? <MdVisibilityOff size={16} /> : <MdVisibility size={16} />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="text-[11px] font-semibold text-gray-600 block mb-1">
                                    Confirmar Nueva Contraseña
                                </label>
                                <input
                                    type={showNewPw ? "text" : "password"}
                                    required
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-3 py-2 bg-[#f8f9fa] hover:bg-white focus:bg-white border border-[#dadce0] focus:border-[#0c68e0] rounded text-xs sm:text-sm text-gray-800 focus:outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={passwordLoading}
                                className="px-3.5 py-1.5 text-gray-700 hover:bg-gray-100 rounded text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={passwordLoading}
                                className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#0c68e0] hover:bg-blue-700 text-white text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                            >
                                <MdCheck size={16} />
                                <span>{passwordLoading ? "Actualizando..." : "Actualizar Contraseña"}</span>
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    )
}
