'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MdAdd, MdExitToApp, MdOutlineAlternateEmail, MdOutlineAssignmentInd, MdOutlineDashboard } from 'react-icons/md'

interface HeaderProps {
    isMenuOpen: boolean
}

export default function DashboardAsidePage({ isMenuOpen }: HeaderProps) {
    const pathname = usePathname()

    const links = [
        { href: '/dashboard', label: 'Proyectos', icon: <MdOutlineDashboard size={20} /> },
        { href: '/dashboard/crear-producto', label: 'Crear Proyecto', icon: <MdAdd size={20} /> },
        { href: '/dashboard/inventario', label: 'Redes Sociales', icon: <MdOutlineAlternateEmail size={20} /> },
        { href: '/dashboard/configuracion', label: 'CV', icon: <MdOutlineAssignmentInd size={20} /> }
    ]

    return (
        <aside className={`
                fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 z-50 py-6 flex flex-col justify-between
                transition-transform duration-300 ease-in-out
                md:translate-x-0 md:sticky
                ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
            <div>
                <div className="flex justify-center items-center mb-8">
                    <Image src="/log.webp" alt="Logo" width={100} height={50} priority />
                </div>

                <nav className="space-y-1 px-3">
                    {links.map((link, index) => {
                        const isActive = pathname === link.href
                        return (
                            <Link
                                key={index}
                                href={link.href}
                                className={`flex items-center gap-3 pl-4 py-3 text-[15px] font-medium  transition-all duration-200
                                    ${isActive 
                                        ? 'text-white bg-[#70a4f1] shadow-sm' 
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                {link.icon}
                                {link.label}
                            </Link>
                        )
                    })}
                </nav>
            </div>

            {/* Botón Salir */}
            <div className="pt-2 border-t border-gray-100 flex items-center px-3">
                <button className="w-full flex justify-center gap-3 items-center py-3 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 font-medium text-[15px]">
                    <MdExitToApp size={20} />
                    <p>Salir</p>
                </button>
            </div>
        </aside>
    )
}