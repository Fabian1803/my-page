'use client'
import { useState } from 'react'

interface ProjectLink { 
    id: string; 
    type: 'github' | 'docker' | 'gitlab' | 'web'; 
    url: string; 
}

interface ContentBlock { 
    id: string; 
    content: string; 
}

export function useCreateProject() {
    // FALTA 1: Estado para identificar si estamos editando o creando
    const [editingId, setEditingId] = useState<string | number | null>(null)
    
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [dynamicLinks, setDynamicLinks] = useState<ProjectLink[]>([])
    const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([])
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
    const [tags, setTags] = useState<string[]>([])
    
    // Handlers para Enlaces Dinámicos
    const handleAddLink = (type: 'github' | 'docker' | 'gitlab' | 'web') => {
        setDynamicLinks(prev => [...prev, { id: crypto.randomUUID(), type, url: '' }])
    }
    
    const handleUrlChange = (id: string, value: string) => {
        setDynamicLinks(prev => prev.map(l => l.id === id ? { ...l, url: value } : l))
    }
    
    const handleRemoveLink = (id: string) => {
        setDynamicLinks(prev => prev.filter(l => l.id !== id))
    }

    // Handlers para Bloques de TipTap (Límite Máximo de 7)
    const handleAddBlock = () => {
        if (contentBlocks.length >= 7) return
        setContentBlocks(prev => [...prev, { id: crypto.randomUUID(), content: '' }])
    }
    
    const handleBlockChange = (id: string, content: string) => {
        setContentBlocks(prev => prev.map(b => b.id === id ? { ...b, content } : b))
    }
    
    const handleRemoveBlock = (id: string) => {
        setContentBlocks(prev => prev.filter(b => b.id !== id))
    }

    // Procesamiento del submit final
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log({ 
            editingId, // Lo mapeas en el log para controlar la mutación en backend
            nombre, 
            descripcion, 
            dynamicLinks, 
            contentBlocks, 
            thumbnailFile, 
            tags 
        })
    }

    return {
        nombre,
        setNombre,
        descripcion,
        setDescripcion,
        dynamicLinks,
        // FALTA 2: Exponer los setters directos para que la página principal los limpie o los inyecte al editar
        setDynamicLinks, 
        contentBlocks,
        setContentBlocks,
        setThumbnailFile,
        handleAddLink,
        handleUrlChange,
        handleRemoveLink,
        handleAddBlock,
        handleBlockChange,
        handleRemoveBlock,
        handleSubmit,
        tags,
        setTags,
        // FALTA 3: Controladores del ID en edición
        editingId,
        setEditingId
    }
}