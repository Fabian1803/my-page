import Image from 'next/image'
import { IoMdMenu, IoMdMore, IoMdSearch } from 'react-icons/io'
import { TbTerminal2 } from 'react-icons/tb'
import UserProfileMenuCloud from './components/UserProfileMenuCloud';
import Link from 'next/link';
import NotificationsMenuCloud from './components/NotificationsMenuCloud';

interface HeaderProps {
    onOpenMenu: (open: boolean) => void
}

export default function DashboardHeaderPage({ onOpenMenu }: HeaderProps) {
    return (
        <header className="w-full bg-[#f0f5fe]  px-4 flex justify-between items-center fixed top-0 left-0 z-30 h-12">
            <div className="flex gap-2 sm:gap-3 items-center min-w-0">
                <button
                    onClick={() => onOpenMenu(true)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg focus:outline-none shrink-0 cursor-pointer"
                >
                    <IoMdMenu size={24} />
                </button>

                <Link href="/dashboard" className="shrink-0 block">
                    <Image src="/iconDash.webp" alt="Logo" width={110} height={80} priority className="w-auto h-4" />
                </Link>
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
                <NotificationsMenuCloud />
                <div className="hidden sm:block hover:bg-gray-200 p-2 cursor-pointer rounded-full transition-all">
                    <IoMdMore size={24} />
                </div>
                <UserProfileMenuCloud />
            </div>
        </header>
    )
}