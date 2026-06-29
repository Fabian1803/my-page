"use client";

import { FiMoreVertical } from 'react-icons/fi';
import { useWaffleMenu } from "./useWaffleMenu";
import { FaDiscord, FaGithub, FaLinkedin, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { FaGitlab } from 'react-icons/fa6';
import { BiLogoGmail } from 'react-icons/bi';
import { PiReadCvLogoBold } from 'react-icons/pi';


interface WaffleMenuProps {
    left?: boolean;
    links?: {
        telefono?: string;
        discord?: string;
        gmail?: string;
        whatsapp?: string;
        url_cv_pdf?: string;
        github?: string;
        linkedin?: string;
        gitlab?: string;
    };
}

export default function WaffleMenu({ left, links }: WaffleMenuProps) {
    const { isOpen, menuRef, toggleMenu } = useWaffleMenu();
    const appsData = [
        { href: links?.telefono ? `tel:${links.telefono}` : '#', label: "Llamar", icon: <FaPhoneAlt className="text-2xl text-gray-700" /> },
        { href: links?.discord || '#', label: "Discord", icon: <FaDiscord className="text-3xl text-[#5865F2]" />, target: "_blank" },
        { href: links?.gmail ? `mailto:${links.gmail}` : '#', label: "Gmail", icon: <BiLogoGmail className="text-3xl text-red-600" />, target: "_blank" },
        { href: links?.whatsapp || '#', label: "WhatsApp", icon: <FaWhatsapp className="text-3xl text-green-500" />, target: "_blank" },
        { href: links?.url_cv_pdf || '#', label: "CV", icon: <PiReadCvLogoBold className="text-2xl text-gray-800" />, target: "_blank" },
        { href: links?.github || '#', label: "GitHub", icon: <FaGithub className="text-3xl text-black" />, target: "_blank" },
        { href: links?.linkedin || '#', label: "LinkedIn", icon: <FaLinkedin className="text-3xl text-[#0A66C2]" />, target: "_blank" },
        { href: links?.gitlab || '#', label: "GitLab", icon: <FaGitlab className="text-3xl text-orange-600" />, target: "_blank" },
    ];
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
                <div className={`absolute ${left ? 'left-0' : 'md:-right-5 -right-10'} top-11 w-80 max-h-[450px] overflow-y-auto bg-white border border-gray-300 shadow-xl rounded-2xl p-4 z-50 animate-fade-in flex flex-col gap-4`}>

                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 px-2">
                        Mis Aplicaciones
                    </div>

                    <div className="grid grid-cols-3 gap-x-2 gap-y-4 justify-items-center">
                        {appsData.map((app, index) => (
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