"use client";

import Image from "next/image";
import { useProfileMenu } from "./useProfileMenu";
import { FaLayerGroup, FaServer, FaCode, FaBriefcase, FaFolderOpen } from "react-icons/fa";
import { BiX } from "react-icons/bi";
import Link from "next/link";
import { AiOutlineChrome } from "react-icons/ai";

interface ProfileMenuProps {
    left?: boolean;
    imageSrc?: string;
}

const QUICK_SECTIONS = [
    {
        title: "Ecosistema Técnico",
        items: [
            { href: "#tech-stack", label: "Tech Stack", icon: <FaLayerGroup />, rounded: "rounded-t-3xl" },
            { href: "#backend", label: "BackEnd (Java/Spring)", icon: <FaServer />, rounded: "rounded-md" },
            { href: "#frontend", label: "FrontEnd (React/Next)", icon: <FaCode />, rounded: "rounded-b-3xl" },
        ]
    },
    {
        title: "Trayectoria",
        items: [
            { href: "#experiencia", label: "Experiencia laboral", icon: <FaBriefcase />, rounded: "rounded-t-3xl" },
            { href: "#codigo-destacado", label: "Código destacado", icon: <FaCode />, rounded: "rounded-md" },
            { href: "#proyectos-personales", label: "Proyectos Personales", icon: <FaFolderOpen />, rounded: "rounded-b-3xl" },
        ]
    }
];

export default function ProfileMenu({ left, imageSrc }: ProfileMenuProps) {
    const { isOpen, menuRef, toggleMenu } = useProfileMenu();
    const user = {
        name: "Fabián Rivera Morales",
        email: "fabianriveraabian3@gmail.com",
        initial: "F"
    };

    const GoogleRing = () => (
        <svg
            className="absolute inset-0 w-full h-full -rotate-135 pointer-events-none"
            viewBox="0 0 100 100"
        >
            <circle cx="50" cy="50" r="46" fill="none" stroke="#ea4335" strokeWidth="5" strokeDasharray="72.25 216.75" strokeDashoffset="0" />
            <circle cx="50" cy="50" r="46" fill="none" stroke="#4285f4" strokeWidth="5" strokeDasharray="72.25 216.75" strokeDashoffset="-72.25" />
            <circle cx="50" cy="50" r="46" fill="none" stroke="#34a853" strokeWidth="5" strokeDasharray="72.25 216.75" strokeDashoffset="-144.5" />
            <circle cx="50" cy="50" r="46" fill="none" stroke="#fbbc05" strokeWidth="5" strokeDasharray="72.25 216.75" strokeDashoffset="-216.75" />
        </svg>
    );

    return (
        <div ref={menuRef} className="relative inline-block select-none">
            {/* CÍRCULO DISPARADOR */}
            <button
                onClick={toggleMenu}
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-white font-medium text-base cursor-pointer focus:outline-none"
                title={`Cuenta de Google: ${user.name}`}
            >
                <div className="w-[82%] h-[82%] rounded-full overflow-hidden flex items-center justify-center relative">
                    {imageSrc ? (
                        <Image src={imageSrc} alt="Profile" width={36} height={36} className="object-cover w-full h-full" />
                    ) : (
                        <span>{user.initial}</span>
                    )}
                </div>
                <GoogleRing />
            </button>

            {isOpen && (
                <div className={`
                    bg-gray-100 border border-gray-300 shadow-xl z-50 animate-fade-in
                    fixed inset-0 w-full h-full rounded-none
                    sm:absolute sm:inset-auto ${left ? 'sm:left-0' : 'sm:right-0'} sm:top-12 
                    sm:w-110 sm:h-[80vh] sm:rounded-3xl
                `}>
                    <div className={`
                        w-full h-full overflow-y-auto p-6 sm:p-5 flex flex-col items-center text-center gap-4
                        [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
                    `}>
                        <button
                            onClick={toggleMenu}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 sm:hidden p-1 rounded-full hover:bg-gray-300 z-10"
                            title="Cerrar panel"
                        >
                            <BiX size={32} />
                        </button>
                        <div className="text-[14px] font-medium text-gray-600 w-full truncate mt-8 sm:mt-0">
                            {user.email}
                        </div>
                        <div className="relative flex h-24 w-24 items-center justify-center rounded-full text-white font-normal text-3xl flex-shrink-0">
                            <div className="w-[84%] h-[84%] rounded-full overflow-hidden flex items-center justify-center relative">
                                {imageSrc ? (
                                    <Image src={imageSrc} alt="Profile" fill className="object-cover" />
                                ) : (
                                    <span>{user.initial}</span>
                                )}
                            </div>
                            <GoogleRing />
                        </div>
                        <div>
                            <h3 className="text-xl font-normal text-gray-900">¡Hola, Bienvenido!</h3>
                            <p className="text-sm text-gray-500 mt-0.5">Soy {user.name}</p>
                        </div>

                        <div className="w-full max-w-sm flex flex-col gap-3 pr-0 sm:pr-0.5 pb-2">
                            <Link
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-5 py-4 bg-white rounded-full hover:bg-gray-200 text-sm text-gray-700 font-medium transition-colors shadow-sm border border-gray-200/50"
                            >
                                <AiOutlineChrome className="text-lg" />
                                <span>Gestionar perfil profesional</span>
                            </Link>
                            {QUICK_SECTIONS.map((section, sIdx) => (
                                <div key={sIdx} className="flex flex-col shadow-sm gap-1 rounded-3xl overflow-hidden">
                                    {section.items.map((item, iIdx) => (
                                        <Link
                                            key={iIdx}
                                            href={item.href}
                                            className={`
                                                flex items-center gap-3 px-5 py-4 bg-white hover:bg-gray-200 
                                                text-sm text-gray-700 font-medium transition-colors rounded-md
                                                ${item.rounded} 
                                                ${iIdx !== 0 ? 'border-t border-gray-100' : ''}
                                            `}
                                        >
                                            <div className="flex-shrink-0 w-5 flex justify-center">
                                                {item.icon}
                                            </div>
                                            <span>{item.label}</span>
                                        </Link>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}