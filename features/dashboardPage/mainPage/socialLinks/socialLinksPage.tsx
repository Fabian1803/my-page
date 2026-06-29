'use client'
import { FaPhoneAlt, FaDiscord, FaWhatsapp, FaGithub, FaLinkedin, FaGitlab } from 'react-icons/fa'
import { BiLogoGmail } from 'react-icons/bi'
import { useInputTemplateProps } from './hooks/useSocialLinks'
export default function SocialLinksPage() {
    const { socialLinks, loading, handleInputChange, handleSubmit, handleReset } = useInputTemplateProps()
    const inputConfig = [
        { id: 'telefono', label: 'Teléfono de Contacto', type: 'tel', placeholder: 'Ej. +51987654321', icon: <FaPhoneAlt size={20} />, color: 'text-gray-700 bg-gray-50' },
        { id: 'whatsapp', label: 'WhatsApp Link o Número', type: 'url', placeholder: 'Ej. https://wa.me/51987654321', icon: <FaWhatsapp size={22} />, color: 'text-green-500 bg-green-50/50' },
        { id: 'gmail', label: 'Correo Electrónico (Gmail)', type: 'email', placeholder: 'Ej. tu.correo@gmail.com', icon: <BiLogoGmail size={24} />, color: 'text-red-500 bg-red-50/50' },
        { id: 'linkedin', label: 'Perfil de LinkedIn', type: 'url', placeholder: 'Ej. https://linkedin.com/in/usuario', icon: <FaLinkedin size={22} />, color: 'text-blue-700 bg-blue-50/50' },
        { id: 'github', label: 'Perfil de GitHub', type: 'url', placeholder: 'Ej. https://github.com/usuario', icon: <FaGithub size={22} />, color: 'text-gray-900 bg-gray-100' },
        { id: 'gitlab', label: 'Perfil de GitLab', type: 'url', placeholder: 'Ej. https://gitlab.com/usuario', icon: <FaGitlab size={22} />, color: 'text-orange-600 bg-orange-50/50' },
        { id: 'discord', label: 'Usuario o Servidor de Discord', type: 'text', placeholder: 'Ej. usuario#0000 o enlace de invitación', icon: <FaDiscord size={22} />, color: 'text-indigo-600 bg-indigo-50/50' }
    ]
    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-6">
                <h1 className="text-[24px] font-normal tracking-tight text-[#202124]">
                    Enlaces y Redes Sociales
                </h1>
                <p className="text-sm text-[#5f6368] mt-1">
                    Gestiona los canales de comunicación y perfiles que se mostrarán en tu portafolio público.
                </p>
            </div>
            <div className="bg-white border border-[#dadce0] p-4 md:p-8 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        {inputConfig.map((input) => (
                            <div key={input.id} className="flex flex-col gap-2 min-w-0">
                                <label htmlFor={input.id} className="text-sm font-medium text-[#3c4043]">
                                    {input.label}
                                </label>
                                <div className="flex items-center gap-3 w-full">
                                    <div className={`${input.color} p-2.5 border border-[#dadce0] rounded-xl shadow-sm shrink-0 flex items-center justify-center w-11 h-11`}>
                                        {input.icon}
                                    </div>
                                    <input
                                        type={input.type}
                                        id={input.id}
                                        value={(socialLinks as any)[input.id]}
                                        onChange={(e) => handleInputChange(input.id, e.target.value)}
                                        placeholder={input.placeholder}
                                        className="flex-1 min-w-0 px-4 py-2.5 border border-[#747775] rounded-xl text-sm focus:outline-none focus:border-2 focus:border-[#0b57d0] text-[#202124] transition-all"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end gap-2 pt-4 border-t border-[#dadce0]">
                        <button
                            type="button"
                            onClick={handleReset}
                            disabled={loading}
                            className="px-5 py-2 text-sm font-medium text-[#0b57d0] hover:bg-blue-50/50 rounded-full transition-colors disabled:opacity-40"
                        >
                            Descartar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center gap-1.5 px-6 py-2 bg-[#0b57d0] hover:bg-[#155bd3] text-white text-sm font-semibold rounded-full transition-all shadow-sm disabled:opacity-50"
                        >
                            {loading ? "Guardando..." : "Guardar cambios"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}