'use client'
import React, { useState } from 'react'
import { MdSearch, MdAdd, MdClose, MdLocalOffer } from 'react-icons/md'

interface TagSelectorProps {
    selectedTags: string[];
    onTagsChange: (tags: string[]) => void;
}

export default function TagSelector({ selectedTags, onTagsChange }: TagSelectorProps) {
    // Base de datos local de etiquetas sugeridas/existentes
    const [availableTags, setAvailableTags] = useState<string[]>([
        'Java', 'Spring Boot', 'NestJS', 'React', 'Next.js', 
        'Cloud', 'Docker', 'Kubernetes', 'JavaScript', 'TypeScript', 'English'
    ])
    
    const [searchQuery, setSearchQuery] = useState('')

    // Filtrar etiquetas según lo que escribe el usuario
    const filteredTags = availableTags.filter(tag =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Verificar si la etiqueta buscada ya existe exactamente en la lista global
    const isExactMatch = availableTags.some(
        tag => tag.toLowerCase() === searchQuery.trim().toLowerCase()
    )

    // Agregar o quitar etiquetas de la selección activa
    const handleToggleTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            onTagsChange(selectedTags.filter(t => t !== tag))
        } else {
            onTagsChange([...selectedTags, tag])
        }
    }

    // Crear una nueva etiqueta personalizada en caliente
    const handleCreateNewTag = () => {
        const cleanTag = searchQuery.trim()
        if (!cleanTag || isExactMatch) return

        // Añadir a la lista de disponibles y seleccionarla automáticamente
        setAvailableTags(prev => [...prev, cleanTag])
        onTagsChange([...selectedTags, cleanTag])
        setSearchQuery('') // Limpiar buscador
    }

    return (
        <div className="flex flex-col gap-2 bg-[#f8f9fa] p-3 rounded-xl border border-[#dadce0]">
            <label className="text-xs font-semibold text-[#3c4043] flex items-center gap-1">
                <MdLocalOffer size={16} className="text-[#0b57d0]" />
                Categorías / Etiquetas del proyecto
            </label>

            {/* Barra de búsqueda y botón de creación rápida */}
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <MdSearch size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Buscar o filtrar etiquetas..."
                        className="w-full pl-9 pr-3 py-2 bg-white border border-[#747775] rounded-xl text-sm focus:outline-none focus:border-2 focus:border-[#0b57d0]"
                    />
                </div>

                {/* Botón dinámico: Solo aparece si hay texto escrito y no existe una etiqueta idéntica */}
                {searchQuery.trim() !== '' && !isExactMatch && (
                    <button
                        type="button"
                        onClick={handleCreateNewTag}
                        className="inline-flex items-center gap-1 px-3 py-2 bg-[#e8f0fe] text-[#0b57d0] hover:bg-blue-100 font-semibold text-xs rounded-xl shadow-sm transition-all whitespace-nowrap"
                    >
                        <MdAdd size={16} />
                        Crear "{searchQuery.trim()}"
                    </button>
                )}
            </div>

            {/* Visualización de las etiquetas disponibles filtradas */}
            <div className="flex flex-wrap gap-1.5 pt-1 max-h-24 overflow-y-auto">
                {filteredTags.map((tag) => {
                    const isSelected = selectedTags.includes(tag)
                    return (
                        <button
                            key={tag}
                            type="button"
                            onClick={() => handleToggleTag(tag)}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all select-none border ${
                                isSelected
                                    ? 'bg-[#e8f0fe] text-[#0b57d0] border-[#0b57d0]'
                                    : 'bg-white text-[#5f6368] border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            {tag}
                            {isSelected && <MdClose size={12} className="ml-0.5 text-[#0b57d0]" />}
                        </button>
                    )
                })}
                
                {filteredTags.length === 0 && (
                    <p className="text-[11px] text-gray-400 italic pt-1">
                        No se encontraron etiquetas. Presiona el botón lateral para crearla.
                    </p>
                )}
            </div>
        </div>
    )
}