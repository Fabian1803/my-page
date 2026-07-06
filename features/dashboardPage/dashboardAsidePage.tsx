'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MdExitToApp, MdLoyalty, MdOutlineAlternateEmail, MdOutlineAssignmentInd, MdOutlineDashboard, MdOutlinePermIdentity } from 'react-icons/md'
import { useLogout } from './hooks/useLogout'
import { HiOutlineXMark } from "react-icons/hi2";
import { FaChevronRight } from 'react-icons/fa'
interface HeaderProps {
    isMenuOpen: boolean,
    onOpenMenu: (open: boolean) => void
}

export default function DashboardAsidePage({ isMenuOpen, onOpenMenu }: HeaderProps) {
    const pathname = usePathname()
    const { logout, isLoading } = useLogout()

    const links = { top:[
        { href: '/dashboard', label: 'Proyectos', icon: <MdOutlineDashboard size={20} /> },
        { href: '/dashboard/certificados', label: 'Certificados', icon: <MdOutlineAssignmentInd size={20} /> },
        { href: '/dashboard/etiquetas', label: 'Etiquetas', icon: <MdLoyalty size={20} /> },
        { href: '/dashboard/cv', label: 'CV', icon: <MdOutlineAssignmentInd size={20} /> },
    ], bottom: [
        { href: '/dashboard/about-me', label: 'Sobre mí', icon: <MdOutlinePermIdentity size={20} /> },
        { href: '/dashboard/redes-sociales', label: 'Redes Sociales', icon: <MdOutlineAlternateEmail size={20} /> },
    ]}
    

    return (
        <aside className={`
                fixed top-0 left-0 h-screen w-73 bg-[#f0f5fe] border-r border-gray-200 z-50 py-1 flex flex-col justify-between
                transition-transform duration-300 ease-in-out rounded-r-3xl
                ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
            <div>
                <div className="flex px-3 gap-4 items-center border-b border-[#c0cbe5] pb-1">
                    <button className="hover:bg-gray-200 p-2 cursor-pointer rounded-full transition-all" onClick={() => onOpenMenu(false)}>
                        <HiOutlineXMark size={24} />
                    </button>
                    <Image src="/iconDash.webp" alt="Logo" width={110} height={50} priority />
                </div>

                <nav className="space-y-1">
                    {links.top.map((link, index) => {
                        const isActive = pathname === link.href
                        return (
                            <Link
                                key={index}
                                href={link.href}
                                className="flex justify-between items-center pl-6 pr-10 py-[10px] text-[15px] font-medium  transition-all duration-200 text-gray-600 hover:bg-[#e9eef7] hover:text-gray-900"
                            >
                                <span className='flex gap-3'>
                                    {link.icon}
                                    {link.label}
                                </span>
                                <FaChevronRight size={12} />
                            </Link>
                        )
                    })}
                </nav>

                <div className="text-sm px-6 flex flex-col gap-2 border-t border-[#c0cbe5] py-3">
                    <p className='text-[15px]'>Productos favoritos</p>
                    <p className='text-gray-500 gap-5'>Aqui aparecen los productos favoritos</p>
                    <p>Productos</p>
                </div>
                <nav className="space-y-1">
                    {links.bottom.map((link, index) => {
                        const isActive = pathname === link.href
                        return (
                            <Link
                                key={index}
                                href={link.href}
                                className="flex justify-between items-center pl-6 pr-10 py-[10px] text-[15px] font-medium  transition-all duration-200 text-gray-600 hover:bg-[#e9eef7] hover:text-gray-900"
                            >
                                <span className='flex gap-3'>
                                    {link.icon}
                                    {link.label}
                                </span>
                                <FaChevronRight size={12} />
                            </Link>
                        )
                    })}
                </nav>
            </div>

            <div className="pt-2 border-t border-gray-100 flex items-center px-3">
                <button
                    onClick={logout}
                    disabled={isLoading}
                    className="w-full flex justify-center gap-3 items-center py-3 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 font-medium text-[15px] disabled:opacity-50"
                >
                    <MdExitToApp size={20} />
                    <p>{isLoading ? 'Saliendo...' : 'Salir'}</p>
                </button>
            </div>
        </aside>
    )
}