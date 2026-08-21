'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaUser } from 'react-icons/fa'
import { MdLockOutline } from 'react-icons/md'
import { useLogout } from '../hooks/useLogout'
import { useUserProfile } from '../services/useUserServices'

export default function UserProfileMenuCloud() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { logout, isLoading: isLoggingOut } = useLogout();
    const { nombre, email, avatarUrl } = useUserProfile();
    const initials = nombre
        ? nombre
            .split(' ')
            .filter(Boolean)
            .slice(0, 2)
            .map(w => w[0].toUpperCase())
            .join('')
        : 'FR';

    return (
        <div className="relative">
            <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="rounded-full w-8 h-8 flex justify-center items-center ml-1 sm:ml-2 shrink-0 overflow-hidden border border-gray-300 cursor-pointer focus:outline-none bg-blue-100"
                title={`Cuenta: ${nombre}`}
            >
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt={nombre}
                        className="object-cover w-full h-full"
                    />
                ) : (
                    <span className="text-xs font-bold text-[#0c68e0]">{initials}</span>
                )}
            </button>

            {isProfileOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                    <div className="absolute right-[-8px] sm:right-0 mt-2 w-[calc(100vw-32px)] max-w-[360px] sm:w-90 bg-[#f0f5fe] border border-gray-200 rounded-xl shadow-xl pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                        <div className="px-4 py-3 border-b border-[#b7c3e1] flex items-center gap-3">
                            <div className="rounded-full w-16 h-16 shrink-0 overflow-hidden border border-gray-300 bg-blue-100 flex items-center justify-center">
                                {avatarUrl ? (
                                    <img
                                        src={avatarUrl}
                                        alt={nombre}
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <span className="text-xl font-bold text-[#0c68e0]">{initials}</span>
                                )}
                            </div>
                            <div className="flex flex-col min-w-0">
                                <p className="text-[15px] font-semibold text-gray-800 truncate" title={nombre}>
                                    {nombre}
                                </p>
                                <p className="text-[13px] text-gray-600 truncate" title={email}>
                                    {email}
                                </p>
                                <div className="pt-2">
                                    <Link
                                        href="/dashboard/about-me"
                                        onClick={() => setIsProfileOpen(false)}
                                        className="inline-block bg-[#0c68e0] hover:bg-[#1856b3] text-white font-semibold text-xs py-[6px] px-3 rounded-sm whitespace-nowrap transition-colors cursor-pointer"
                                    >
                                        Administrar cuenta
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="mt-1">
                            <Link
                                href="/dashboard/about-me"
                                onClick={() => setIsProfileOpen(false)}
                                className="flex gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-[#e3e8f0] transition-colors cursor-pointer"
                            >
                                <MdLockOutline size={18} className="shrink-0 text-gray-500" />
                                <span className="truncate">Información y Privacidad de Fabian Cloud</span>
                            </Link>
                            <Link
                                href="/fabianrivera"
                                target="_blank"
                                onClick={() => setIsProfileOpen(false)}
                                className="flex gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-[#e3e8f0] transition-colors cursor-pointer"
                            >
                                <FaUser size={16} className="shrink-0 text-gray-500" />
                                <span className="truncate">Ver portafolio público</span>
                            </Link>
                        </div>

                        <hr className="border-[#b7c3e1] mt-1" />
                        <div className="w-full h-full bg-[#e9eef6] py-3 px-5 rounded-b-xl flex justify-between items-center">
                            <button
                                onClick={logout}
                                disabled={isLoggingOut}
                                className="border px-4 py-[7px] rounded-md border-[#828993] hover:bg-[#e3e8f0] text-sm cursor-pointer transition-colors"
                            >
                                {isLoggingOut ? 'Cerrando sesión...' : 'Salir'}
                            </button>
                            <span className="text-[11px] text-gray-500">Google Cloud Console Style</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}