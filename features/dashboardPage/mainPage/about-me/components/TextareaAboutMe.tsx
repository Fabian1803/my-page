'use client'
import React from 'react'

interface TextareaAboutMeProps {
    title: string
    nombre: string
    setNombre: (nombre: string) => void
}

export default function TextareaAboutMe({ title, nombre, setNombre }: TextareaAboutMeProps) {
    return (
        <div className="flex flex-col gap-1.5 min-w-0 col-span-1 lg:col-span-2">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0c68e0]"></span>
                {title} (Biografía Profesional)
            </label>
            <textarea
                rows={4}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Escribe una breve introducción sobre tu experiencia, especialidades y valor técnico..."
                className="w-full px-3.5 py-2.5 bg-[#f8f9fa] hover:bg-white focus:bg-white border border-[#dadce0] focus:border-[#0c68e0] rounded text-xs sm:text-sm text-gray-900 focus:outline-none transition-all leading-relaxed"
            />
            <span className="text-[11px] text-gray-400">
                Se desplegará en la sección "Sobre mí" del portafolio.
            </span>
        </div>
    )
}
