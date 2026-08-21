'use client'
import React from 'react'

export interface SocialLinkItemConfig {
    id: string;
    label: string;
    type: string;
    placeholder: string;
    icon: React.ReactNode;
    color: string;
    description: string;
}

interface SocialLinkItemProps {
    config: SocialLinkItemConfig;
    value: string;
    onChange: (field: string, value: string) => void;
}

export default function SocialLinkItem({ config, value, onChange }: SocialLinkItemProps) {
    return (
        <div className="border border-[#dadce0] rounded-lg p-3.5 hover:border-gray-400 focus-within:border-[#0c68e0] transition-colors bg-white shadow-2xs">
            <div className="flex items-center justify-between mb-2">
                <label 
                    htmlFor={config.id} 
                    className="text-xs font-semibold text-gray-700 flex items-center gap-1.5 cursor-pointer"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0c68e0]"></span>
                    {config.label}
                </label>
                <span className="text-[11px] text-gray-400 font-mono">
                    id: {config.id}
                </span>
            </div>

            <div className="flex items-center gap-2.5">
                <div className={`p-2 border rounded-md shrink-0 flex items-center justify-center w-9 h-9 ${config.color}`}>
                    {config.icon}
                </div>
                <input
                    type={config.type}
                    id={config.id}
                    value={value || ''}
                    onChange={(e) => onChange(config.id, e.target.value)}
                    placeholder={config.placeholder}
                    className="flex-1 min-w-0 px-3 py-1.5 bg-[#f8f9fa] hover:bg-white focus:bg-white border border-[#dadce0] focus:border-[#0c68e0] rounded text-xs sm:text-sm text-gray-800 focus:outline-none transition-all font-mono placeholder:font-sans placeholder:text-gray-400"
                />
            </div>
            <p className="text-[11px] text-gray-400 mt-1.5 pl-0.5">
                {config.description}
            </p>
        </div>
    )
}
