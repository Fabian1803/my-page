'use client'
import UserActionsHeader from '@/components/userActionsHeader'
import Image from 'next/image'
import InputSearch from '@/components/InputSearch'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ReactNode } from 'react'

interface FabianPageHeaderProps {
    userActionsSlot: ReactNode
}
interface TabItem {
    href: string;
    label: string;
}

interface TabsProps {
    tabs: TabItem[];
    currentPath: string;
}

function Tabs({ tabs, currentPath }: { tabs: any[], currentPath: string }) {
        return (
        <ul className="flex h-full items-center flex-nowrap list-none m-0 p-0 text-sm whitespace-nowrap">
            {tabs.map((tab) => {
                const isActive = currentPath === tab.href
                return (
                    <li key={tab.href} className="h-full">
                        <Link
                            href={tab.href}
                            className={`flex items-center h-full px-4 text-[14px] font-semibold transition-all duration-200 border-b-2 
                                ${isActive
                                    ? 'border-black text-black'
                                    : 'border-transparent text-gray-500 hover:text-black hover:border-gray-300'
                                }`}
                        >
                            {tab.label}
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default function FabianPageHeader({ userActionsSlot }: FabianPageHeaderProps) {
    const pathname = usePathname()
    const linksTaps = [
        { href: '/fabianrivera', label: 'Todo' },
        { href: '/fabianrivera/proyectos', label: 'Proyectos' },
        { href: '/fabianrivera/imagenes', label: 'Imagenes' },
        { href: '/fabianrivera/certificados', label: 'Certificados' },
        { href: '/fabianrivera/cv', label: 'CV' },
        { href: '/fabianrivera/skills', label: 'Skills' },
        { href: '/fabianrivera/sobre-mi', label: 'Sobre mí' }
    ]

    return (
        <header className="border-gray-300 h-40 min-[500px]:h-35 flex justify-center border-b-[1px]">
            <div className="w-full h-full grid grid-cols-[150px_auto_130px] grid-rows-[35%_40%_25%] min-[500px]:grid-rows-[75%_25%]  
                max-[1461px]:max-w-[1110px]
                max-[1164px]:max-w-[860px]
                max-[940px]:max-w-[760px]"
            >
                <div className="items-center flex col-span-3 min-[500px]:hidden">
                    {userActionsSlot}               
                </div>
                <div className="flex justify-center items-center max-[940px]:hidden">
                    <Image src="/log.webp" alt="GoogleIcon" width={90} height={30} priority />
                </div>
                <div className="flex items-center px-3 min-[1461px]:col-span-2 max-[940px]:col-span-2 max-[500px]:col-span-3">
                    <InputSearch type="FabianPageInputType" placeholder="" />
                </div>
                <div className="flex justify-end max-[500px]:hidden">
                    {userActionsSlot}
                </div>
                <div className="h-full max-[500px]:pt-2 min-[1461px]:col-start-2 col-span-3 min-w-0 overflow-x-auto overflow-y-hidden scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    <Tabs tabs={linksTaps} currentPath={pathname} />
                </div>
            </div>
        </header>
    )
}