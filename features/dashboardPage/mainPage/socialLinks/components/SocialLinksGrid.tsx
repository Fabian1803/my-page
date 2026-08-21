import React from 'react'
import { FaPhoneAlt, FaDiscord, FaWhatsapp, FaGithub, FaLinkedin, FaGitlab } from 'react-icons/fa'
import { BiLogoGmail } from 'react-icons/bi'
import { MdOutlineLink, MdInfoOutline } from 'react-icons/md'

interface SocialLinksGridProps {
    socialLinks: {
        telefono: string;
        discord: string;
        gmail: string;
        whatsapp: string;
        github: string;
        linkedin: string;
        gitlab: string;
    };
    onInputChange: (field: string, value: string) => void;
}

export default function SocialLinksGrid({
    socialLinks,
    onInputChange
}: SocialLinksGridProps) {
    const inputConfig = [
        {
            id: 'telefono',
            label: 'Teléfono de Contacto Directo',
            type: 'tel',
            placeholder: '+51 987 654 321',
            icon: <FaPhoneAlt size={16} />,
            color: 'text-gray-700 bg-gray-100 border-gray-200',
            description: 'Canal de llamadas y comunicación directa.'
        },
        {
            id: 'whatsapp',
            label: 'WhatsApp Link o Teléfono',
            type: 'url',
            placeholder: 'https://wa.me/51987654321',
            icon: <FaWhatsapp size={18} />,
            color: 'text-green-600 bg-green-50 border-green-200',
            description: 'Acceso directo a chat de mensajería instantánea.'
        },
        {
            id: 'gmail',
            label: 'Correo Electrónico Oficial (Gmail)',
            type: 'email',
            placeholder: 'tu.correo@gmail.com',
            icon: <BiLogoGmail size={18} />,
            color: 'text-red-600 bg-red-50 border-red-200',
            description: 'Email de contacto para propuestas y reclutamiento.'
        },
        {
            id: 'linkedin',
            label: 'Perfil Profesional de LinkedIn',
            type: 'url',
            placeholder: 'https://linkedin.com/in/usuario',
            icon: <FaLinkedin size={18} />,
            color: 'text-blue-700 bg-blue-50 border-blue-200',
            description: 'Red social profesional principal.'
        },
        {
            id: 'github',
            label: 'Perfil de Desarrollador GitHub',
            type: 'url',
            placeholder: 'https://github.com/usuario',
            icon: <FaGithub size={18} />,
            color: 'text-gray-900 bg-gray-100 border-gray-200',
            description: 'Repositorio y código fuente de proyectos.'
        },
        {
            id: 'gitlab',
            label: 'Perfil de GitLab',
            type: 'url',
            placeholder: 'https://gitlab.com/usuario',
            icon: <FaGitlab size={18} />,
            color: 'text-orange-600 bg-orange-50 border-orange-200',
            description: 'Proyectos y pipelines CI/CD adicionales.'
        },
        {
            id: 'discord',
            label: 'ID de Discord o Servidor Comunitario',
            type: 'text',
            placeholder: 'usuario#0000 o https://discord.gg/...',
            icon: <FaDiscord size={18} />,
            color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
            description: 'Contacto en comunidades y chats de desarrollo.'
        }
    ]

    return (
        <div className="p-4 sm:p-6 space-y-5 bg-white flex-1">
            
            {/* Banner Informativo GCP */}
            <div className="bg-[#f8f9fa] border border-[#dadce0] rounded-lg p-3.5 flex items-start gap-3 text-xs text-gray-600">
                <MdInfoOutline size={18} className="text-[#0c68e0] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                    Los canales configurados se propagarán de inmediato en los botones de contacto de la barra de navegación, pie de página y modales del portafolio.
                </p>
            </div>

            {/* Grid de Inputs GCP */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {inputConfig.map((input) => (
                    <div 
                        key={input.id} 
                        className="border border-[#dadce0] rounded-lg p-3.5 hover:border-gray-400 focus-within:border-[#0c68e0] transition-colors bg-white shadow-2xs"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <label 
                                htmlFor={input.id} 
                                className="text-xs font-semibold text-gray-700 flex items-center gap-1.5"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0c68e0]"></span>
                                {input.label}
                            </label>
                            <span className="text-[11px] text-gray-400 font-mono">
                                id: {input.id}
                            </span>
                        </div>

                        <div className="flex items-center gap-2.5">
                            <div className={`p-2 border rounded-md shrink-0 flex items-center justify-center w-9 h-9 ${input.color}`}>
                                {input.icon}
                            </div>
                            <input
                                type={input.type}
                                id={input.id}
                                value={(socialLinks as any)[input.id]}
                                onChange={(e) => onInputChange(input.id, e.target.value)}
                                placeholder={input.placeholder}
                                className="flex-1 min-w-0 px-3 py-1.5 bg-[#f8f9fa] hover:bg-white focus:bg-white border border-[#dadce0] focus:border-[#0c68e0] rounded text-xs sm:text-sm text-gray-800 focus:outline-none transition-all font-mono placeholder:font-sans placeholder:text-gray-400"
                            />
                        </div>
                        <p className="text-[11px] text-gray-400 mt-1.5 pl-0.5">
                            {input.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
