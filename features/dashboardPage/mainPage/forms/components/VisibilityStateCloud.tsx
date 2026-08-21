'use client'
import React from 'react'
import { MdStar, MdCheck } from 'react-icons/md'

interface VisibilityStateCloudProps {
    isActive: boolean;
    isDestacado: boolean;
    onToggle: () => void;
    onClick?: () => void;
    title?: string;
    description?: string;
}

export default function VisibilityStateCloud({
    isActive,
    isDestacado,
    onToggle,
    onClick,
    title = "Destacar en la página principal",
    description = "Mostrar este recurso en la portada y sección destacada del portafolio público."
}: VisibilityStateCloudProps) {
    return (
        <div 
            onClick={() => {
                if (onClick) onClick();
                onToggle();
            }}
            className={`relative mt-4 w-full p-4 rounded border transition-all cursor-pointer select-none ${
                isActive 
                    ? 'border-blue-500 bg-blue-50/20' 
                    : 'border-gray-300 hover:border-gray-400 bg-white'
            }`}
        >
            <label className="absolute -top-2 left-3 bg-white z-10 px-1 text-xs font-medium text-gray-500">
                Visibilidad y Estado
            </label>

            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg transition-colors ${
                        isDestacado ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                        <MdStar size={22} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-800">{title}</p>
                        <p className="text-xs text-gray-500">{description}</p>
                    </div>
                </div>

                <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                    isDestacado ? 'bg-[#0c68e0] border-[#0c68e0] text-white' : 'border-gray-400 bg-white'
                }`}>
                    {isDestacado && <MdCheck size={14} />}
                </div>
            </div>
        </div>
    )
}
