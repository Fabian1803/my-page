import Image from 'next/image'
import { useState } from 'react';
import { IoMdMenu, IoMdMore, IoMdNotificationsOutline, IoMdSearch } from 'react-icons/io'
import { TbTerminal2 } from 'react-icons/tb'
import { FaUser } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';

interface HeaderProps {
    onOpenMenu: (open: boolean) => void
}

export default function DashboardHeaderPage({ onOpenMenu }: HeaderProps) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    return (
        <header className="w-full bg-[#f0f5fe]  px-4 flex justify-between items-center fixed top-0 left-0 z-30 h-12">
            <div className="flex gap-2 sm:gap-3 items-center min-w-0">
                <button
                    onClick={() => onOpenMenu(true)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg focus:outline-none shrink-0 cursor-pointer"
                >
                    <IoMdMenu size={24} />
                </button>

                <div className="shrink-0 block">
                    <Image src="/iconDash.webp" alt="Logo" width={110} height={80} priority className="w-auto h-4" />
                </div>
                <div className="hidden sm:block px-2 shrink-0">
                    <div className="border border-[#8894af] flex px-3 h-9 gap-2 rounded-full items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-5 h-5 shrink-0">
                            <polygon points="32,15 47,23.5 47,40.5 32,49 17,40.5 17,23.5" fill="#475569" />
                            <polygon points="32,54 47,62.5 47,79.5 32,88 17,79.5 17,62.5" fill="#475569" />
                            <polygon points="66,34.5 81,43 81,60 66,68.5 51,60 51,43" fill="#475569" />
                        </svg>
                        <p className="text-[14px] font-medium text-gray-700 whitespace-nowrap">Mi Portafolio</p>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block flex-1 max-w-2xl mx-4">
                <div className="border grid grid-cols-[1fr_auto] px-3 rounded-xl h-9 bg-[#dde3ea] border-[#8894af] items-center">
                    <input
                        type="text"
                        placeholder="Buscar (/) recursos, documentos, productos y más."
                        className="focus:outline-none bg-transparent text-sm w-full pr-4"
                    />
                    <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900">
                        <IoMdSearch size={23} /> <span className="hidden md:inline">Buscar</span>
                    </button>
                </div>
            </div>

            <div className="flex gap-1 items-center shrink-0">
                <div className="lg:hidden hover:bg-gray-200 p-2 cursor-pointer rounded-full transition-all">
                    <IoMdSearch size={24} />
                </div>

                <div className="hidden md:block hover:bg-gray-200 p-2 cursor-pointer rounded-full transition-all">
                    <TbTerminal2 size={24} />
                </div>
                <div className="hover:bg-gray-200 p-2 cursor-pointer rounded-full transition-all">
                    <IoMdNotificationsOutline size={24} />
                </div>
                <div className="hidden sm:block hover:bg-gray-200 p-2 cursor-pointer rounded-full transition-all">
                    <IoMdMore size={24} />
                </div>
                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="rounded-full w-8 h-8 flex justify-center items-center ml-1 sm:ml-2 shrink-0 overflow-hidden border border-gray-300 cursor-pointer focus:outline-none"
                    >
                        <Image src="/perfil.jpeg" alt="User" width={32} height={32} className="object-cover w-full h-full" />
                    </button>
                    {isProfileOpen && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                            
                            {/* MODAL OPTIMIZADO RESPONSIVO */}
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
                                    <div className="flex flex-col min-w-0"> {/* min-w-0 evita que el flex rompa el truncate */}
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
                                    <button className="border px-4 py-[7px] rounded-md border-[#828993] hover:bg-[#e3e8f0] text-sm cursor-pointer">
                                        Salir
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}