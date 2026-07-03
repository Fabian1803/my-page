import { useState } from "react"
import { DetailedImageData } from "../detailedImageModal"
interface ProjectLink {
    id: string;
    type: 'github' | 'docker' | 'gitlab' | 'web';
    url: string;
}
interface ContentBlock {
    id: string;
    content: string;
}
export function useProjectModal(onClose: () => void) {
     const [nombre, setNombre] = useState('')
        const [descripcion, setDescripcion] = useState('')
        const [datosImagenEstructurada, setDatosImagenEstructurada] = useState<DetailedImageData | null>(null)
        const [tags, setTags] = useState<string[]>([])
        const [dynamicLinks, setDynamicLinks] = useState<ProjectLink[]>([])
    
        const [destacado, setDestacado] = useState(false)
        
        const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([])
    
        const handleSaveDetailedImage = (data: DetailedImageData) => {
            setDatosImagenEstructurada(data)
        }
    
        const handleAddBlockInternal = () => {
            if (contentBlocks.length < 5) {
                const jsonVacio = JSON.stringify({ type: 'doc', content: [] })
                setContentBlocks(prev => [
                    ...prev, 
                    { id: crypto.randomUUID(), content: jsonVacio }
                ])
            }
        }
    
        const handleBlockChangeInternal = (id: string, newContent: string) => {
            setContentBlocks(prev => prev.map(b => b.id === id ? { ...b, content: newContent } : b))
        }
    
        const handleRemoveBlockInternal = (id: string) => {
            setContentBlocks(prev => prev.filter(b => b.id !== id))
        }
    
        const handleSave = (e: React.FormEvent) => {
            e.preventDefault()
            console.log('Guardando Certificación Completa:', {
                nombre,
                descripcion,
                datosImagenEstructurada,
                tags,
                dynamicLinks,
                destacado,
                documentacionSecciones: contentBlocks 
            })
    
            setNombre('')
            setDescripcion('')
            setDestacado(false) 
            setContentBlocks([]) 
            onClose()
        }
    
        const handleAddLink = (type: 'github' | 'docker' | 'gitlab' | 'web') => {
            setDynamicLinks(prev => [...prev, { id: crypto.randomUUID(), type, url: '' }])
        }
    
        const handleUrlChange = (id: string, value: string) => {
            setDynamicLinks(prev => prev.map(l => l.id === id ? { ...l, url: value } : l))
        }
    
        const handleRemoveLink = (id: string) => {
            setDynamicLinks(prev => prev.filter(l => l.id !== id))
        }
    return {
        nombre,
        setNombre,
        descripcion,
        setDescripcion,
        datosImagenEstructurada,
        handleSaveDetailedImage,
        tags,
        setTags,
        dynamicLinks,
        handleAddLink,
        handleUrlChange,
        handleRemoveLink,
        destacado,
        setDestacado,
        contentBlocks,
        handleAddBlockInternal,
        handleBlockChangeInternal,
        handleRemoveBlockInternal,
        handleSave
    }
}