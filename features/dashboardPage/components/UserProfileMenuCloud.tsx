'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { FaUser } from 'react-icons/fa'
import { MdLockOutline } from 'react-icons/md'
import { useLogout } from '../hooks/useLogout'

export default function UserProfileMenuCloud() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { logout, isLoading } = useLogout();

    return (
        <div className="relative">
            {/* Botón del Avatar */}
            <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="rounded-full w-8 h-8 flex justify-center items-center ml-1 sm:ml-2 shrink-0 overflow-hidden border border-gray-300 cursor-pointer focus:outline-none"
            >
                <Image src="/perfil.jpeg" alt="User" width={32} height={32} className="object-cover w-full h-full" />
            </button>

            {isProfileOpen && (
                <>
                    {/* Backdrop transparente para cerrar al hacer clic afuera */}
                    <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                    
                    {/* Tarjeta del Menú de Perfil desplegable */}
                    <div className="absolute right-[-8px] sm:right-0 mt-2 w-[calc(100vw-32px)] max-w-[360px] sm:w-90 bg-[#f0f5fe] border border-gray-200 rounded-xl shadow-xl pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                        <div className="px-4 py-3 border-b border-[#b7c3e1] flex items-center gap-3">
                            <div className="rounded-full w-23 h-23 shrink-0 overflow-hidden border border-gray-200">
                                <Image
                                    src="/perfil.jpeg"
                                    alt="User"
                                    width={60}
                                    height={60}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <p className="text-[15px] font-semibold text-gray-800 truncate">Fabian Rivera</p>
                                <p className="text-[15px] text-gray-600 truncate">fabianriveraabian3@gmail.com</p>
                                <div className="pt-2">
                                    <button className='bg-[#0c68e0] hover:bg-[#1856b3] text-white font-semibold text-sm py-[7px] px-3 rounded-sm whitespace-nowrap'>
                                        Administrar cuenta
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-1">
                            <div className="flex gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-[#e3e8f0] transition-colors cursor-pointer">
                                <MdLockOutline size={18} className="shrink-0" /> <span className="truncate">Privacidad de Fabian Cloud</span>
                            </div>
                            <div className="flex gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-[#e3e8f0] transition-colors cursor-pointer">
                                <FaUser size={16} className="shrink-0" /> <span className="truncate">Condiciones de servicio de Fabian Cloud</span>
                            </div>
                        </div>

                        <hr className="border-[#b7c3e1] mt-1" />
                        <div className="w-full h-full bg-[#e9eef6] py-3 px-5 rounded-b-xl">
                            <button
                                onClick={logout}
                                disabled={isLoading}
                                className="border px-4 py-[7px] rounded-md border-[#828993] hover:bg-[#e3e8f0] text-sm cursor-pointer">
                                Salir
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}