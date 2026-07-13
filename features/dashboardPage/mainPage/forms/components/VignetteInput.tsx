'use client'
import { useState } from 'react'
import { MdDelete } from 'react-icons/md'

interface VignetteInputProps {
    bullets: string[];
    onBulletsChange: (bullets: string[]) => void;
    onClick?: () => void;
}

export default function VignetteInput({ bullets, onBulletsChange, onClick }: VignetteInputProps) {
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
        <div className="w-full mt-4 space-y-4" onClick={onClick}>
            <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                    Viñetas de logros y objetivos de desempeño
                </h3>
                <p className="text-xs text-gray-500 font-normal">
                    Add bullet points defining performance objectives, certifications, or milestones reached during deployment.
                </p>
            </div>
            <div className="w-full border border-gray-300 rounded-sm bg-white overflow-hidden">
                <div className="p-3 bg-[#f8f9fa] border-b border-gray-200 flex gap-2 items-center">
                    <div className="relative flex-1">
                        <input 
                            type="text" 
                            value={currentBullet} 
                            onChange={(e) => setCurrentBullet(e.target.value)} 
                            placeholder="Ej. Certificación oficial nivel avanzado" 
                            className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-sm text-xs font-normal text-gray-800 focus:outline-none focus:border-[#3367d6]" 
                        />
                    </div>
                    <button 
                        type="button" 
                        onClick={handleAddBullet} 
                        className="px-3 py-1.5 bg-[#3367d6] text-white hover:bg-[#2a56b9] font-medium text-xs rounded-sm transition-colors whitespace-nowrap cursor-pointer"
                    >
                        Añadir
                    </button>
                </div>
                {bullets.length > 0 ? (
                    <div className="w-full block">
                        <div className="grid grid-cols-12 px-4 py-2 bg-[#f8f9fa] border-b border-gray-200 text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                            <div className="col-span-2 text-left">Record ID</div>
                            <div className="col-span-9 text-left">Achievement Description</div>
                            <div className="col-span-1 text-right">Action</div>
                        </div>
                        <div className="divide-y divide-gray-200 max-h-48 overflow-y-auto block w-full">
                            {bullets.map((bullet, idx) => (
                                <div 
                                    key={idx} 
                                    className="grid grid-cols-12 px-4 py-2.5 items-center text-xs text-gray-800 hover:bg-gray-50 transition-colors w-full"
                                >
                                    <div className="col-span-2 font-mono text-[11px] text-gray-400 select-none">
                                        #00{idx + 1}
                                    </div>
                                    <div className="col-span-9 font-normal text-gray-700 truncate pr-4">
                                        {bullet}
                                    </div>
                                    <div className="col-span-1 flex justify-end">
                                        <button 
                                            type="button" 
                                            onClick={() => handleRemoveBullet(idx)} 
                                            className="text-gray-400 hover:text-red-500 p-0.5 transition-colors cursor-pointer"
                                        >
                                            <MdDelete size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="p-4 text-center text-xs text-gray-400 italic">
                        No targets recorded yet. Use the input field above to append a milestone row.
                    </div>
                )}
            </div>
        </div>
    )
}