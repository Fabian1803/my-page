"use client";

import { FiMoreVertical } from 'react-icons/fi';
import { useWaffleMenu } from "./useWaffleMenu";
import { FaDiscord, FaGithub, FaLinkedin, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { FaGitlab } from 'react-icons/fa6';
import { BiLogoGmail } from 'react-icons/bi';
import { PiReadCvLogoBold } from 'react-icons/pi';

interface WaffleMenuProps {
    left?: boolean
}

const APPS_DATA = [
    { href: "tel:+1234567890", label: "Llamar", icon: <FaPhoneAlt className="text-3xl" /> },
    { href: "https://discord.com", label: "Discord", icon: <FaDiscord className="text-3xl text-blue-900" />, target: "_blank" },
    { href: "https://mail.google.com", label: "Gmail", icon: <BiLogoGmail className="text-4xl text-red-600" />, target: "_blank" },
    { href: "https://wa.me/1234567890", label: "WhatsApp", icon: <FaWhatsapp className="text-3xl text-green-500" />, target: "_blank" },
    { href: "/cv.pdf", label: "CV", icon: <PiReadCvLogoBold className="text-3xl" />, target: "_blank" },
    { href: "https://github.com", label: "GitHub", icon: <FaGithub className="text-3xl" />, target: "_blank" },
    { href: "https://linkedin.com", label: "LinkedIn", icon: <FaLinkedin className="text-3xl text-blue-800" />, target: "_blank" },
    { href: "https://gitlab.com", label: "GitLab", icon: <FaGitlab className="text-3xl text-orange-600" />, target: "_blank" },
];

export default function WaffleMenu({ left }: WaffleMenuProps) {
    const { isOpen, menuRef, toggleMenu } = useWaffleMenu();
    return (
        <div ref={menuRef} className="relative inline-block select-none">
            <button
                onClick={toggleMenu}
                title="Aplicaciones de Codepedia"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 6px)',
                    width: '35px',
                    height: '35px',
                    gap: '-10px',
                    fontSize: '22px',
                    alignItems: 'center',
                    borderRadius: '50%',
                }}
                className="hover:bg-gray-300 cursor-pointer"
            >
                {Array.from({ length: 3 }).map((_, i) => (
                    <FiMoreVertical key={i} />
                ))}
            </button>
            {isOpen && (
                <div className={`absolute ${left ? 'left-0' : 'right-0'} top-11 w-80 max-h-[450px] overflow-y-auto bg-white border border-gray-300 shadow-xl rounded-2xl p-4 z-50 animate-fade-in flex flex-col gap-4`}>

                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 px-2">
                        Mis Aplicaciones
                    </div>

                    <div className="grid grid-cols-3 gap-x-2 gap-y-4 justify-items-center">
                        {APPS_DATA.map((app, index) => (
                            <a
                                key={index}
                                href={app.href}
                                target={app.target}
                                rel={app.target ? "noopener noreferrer" : undefined}
                                className="flex flex-col items-center justify-center gap-1 p-2 rounded-xl hover:bg-gray-100 cursor-pointer w-full transition-colors text-center"
                            >
                                {app.icon}
                                <span className="text-xs text-gray-700 font-medium truncate w-full">
                                    {app.label}
                                </span>
                            </a>
                        ))}
                    </div>

                </div>
            )}
        </div>
    );
}