'use client'
import React from 'react'
import { FaPhoneAlt, FaDiscord, FaWhatsapp, FaGithub, FaLinkedin, FaGitlab } from 'react-icons/fa'
import { BiLogoGmail } from 'react-icons/bi'
import { MdInfoOutline } from 'react-icons/md'
import { SocialLinksData } from '../services/socialLinksServices'
import SocialLinkItem, { SocialLinkItemConfig } from './SocialLinkItem'

interface SocialLinksGridProps {
    socialLinks: SocialLinksData;
    onInputChange: (field: string, value: string) => void;
}

export const SOCIAL_LINKS_CONFIG: SocialLinkItemConfig[] = [
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
];

export default function SocialLinksGrid({
    socialLinks,
    onInputChange
}: SocialLinksGridProps) {
    return (
        <div className="p-4 sm:p-6 space-y-5 bg-white flex-1">
            <div className="bg-[#f8f9fa] border border-[#dadce0] rounded-lg p-3.5 flex items-start gap-3 text-xs text-gray-600">
                <MdInfoOutline size={18} className="text-[#0c68e0] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                    Los canales configurados se propagarán de inmediato en los botones de contacto de la barra de navegación, pie de página y modales del portafolio.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {SOCIAL_LINKS_CONFIG.map((config) => (
                    <SocialLinkItem
                        key={config.id}
                        config={config}
                        value={(socialLinks as any)[config.id]}
                        onChange={onInputChange}
                    />
                ))}
            </div>
        </div>
    )
}
