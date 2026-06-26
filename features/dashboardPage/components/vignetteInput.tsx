'use client'
import React, { useState } from 'react'
import { MdDelete, MdFormatListBulleted } from 'react-icons/md'

interface VignetteInputProps {
    bullets: string[];
    onBulletsChange: (bullets: string[]) => void;
}

export default function VignetteInput({ bullets, onBulletsChange }: VignetteInputProps) {
    const [currentBullet, setCurrentBullet] = useState<string>('')

    const handleAddBullet = () => {
        if (!currentBullet.trim()) return
        onBulletsChange([...bullets, currentBullet.trim()])
        setCurrentBullet('')
    }

    const handleRemoveBullet = (indexToRemove: number) => {
        onBulletsChange(bullets.filter((_, idx) => idx !== indexToRemove))
    }

    return (
        <div className="flex flex-col gap-1.5 bg-[#f8f9fa] p-3 rounded-xl border border-[#dadce0]">
            <label className="text-xs font-semibold text-[#3c4043] flex items-center gap-1">
                <MdFormatListBulleted size={16} className="text-[#0b57d0]" />
                Viñetas de Logros (Varias o ninguna)
            </label>
            <div className="flex gap-2">
                <input 
                    type="text" 
                    value={currentBullet} 
                    onChange={(e) => setCurrentBullet(e.target.value)} 
                    placeholder="Ej. Certificación oficial nivel avanzado" 
                    className="flex-1 px-3 py-2 bg-white border border-[#747775] rounded-xl text-sm focus:outline-none focus:border-2 focus:border-[#0b57d0]" 
                />
                <button 
                    type="button" 
                    onClick={handleAddBullet} 
                    className="px-3 py-2 border border-[#747775] text-[#0b57d0] bg-white font-semibold text-xs rounded-xl hover:bg-blue-50/50 shadow-sm transition-all"
                >
                    Añadir
                </button>
            </div>

            {bullets.length > 0 && (
                <ul className="mt-2 space-y-1.5 bg-white p-2.5 rounded-lg border border-gray-200 max-h-32 overflow-y-auto">
                    {bullets.map((bullet, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs text-gray-700 font-medium pl-2 border-l-2 border-[#0b57d0]">
                            <span className="truncate mr-2">• {bullet}</span>
                            <button type="button" onClick={() => handleRemoveBullet(idx)} className="text-gray-400 hover:text-red-500 p-0.5">
                                <MdDelete size={16} />
                            </button>
                        </div>
                    ))}
                </ul>
            )}
        </div>
    )
}