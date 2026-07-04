import { useState, useEffect } from "react"
import { DetailedImageData } from "../detailedImageModal"
import { ProyectoReal } from "../../mainPage/projects/projectsPage";

interface ProjectLink {
    id: string;
    type: 'github' | 'docker' | 'gitlab' | 'web';
    url: string;
}

interface ContentBlock {
    id: string;
    content: string;
}

export function useProjectModal(onClose: () => void, onProjectSaved?: () => void, defaultData?: ProyectoReal | null) {
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [datosImagenEstructurada, setDatosImagenEstructurada] = useState<DetailedImageData | null>(null)
    const [tags, setTags] = useState<string[]>([])
    const [dynamicLinks, setDynamicLinks] = useState<ProjectLink[]>([])
    const [destacado, setDestacado] = useState(false)
    const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([])
    
    // Almacén transaccional en memoria para nuevas imágenes añadidas a Tiptap
    const [tiptapFiles, setTiptapFiles] = useState<Map<string, File>>(new Map())
    const [isSubmitting, setIsSubmitting] = useState(false)

    // 🔄 REACCIÓN AL MODO ACTUALIZACIÓN: Inyecta los datos de Prisma en los estados vivos
    useEffect(() => {
        if (defaultData) {
            setNombre(defaultData.nombre || '')
            setDescripcion(defaultData.descripcion || '')
            setDestacado(defaultData.destacado || false)
            setTags(defaultData.categorias?.map((c) => c.nombre) || [])
            
            // Adaptar los links que vienen de la BD al contrato dinámico del front
            setDynamicLinks(defaultData.enlaces?.map((e) => ({
                id: e.id,
                type: e.tipo.toLowerCase() as any,
                url: e.url
            })) || [])

            // Adaptar los bloques estructurados de Tiptap de la BD
            setContentBlocks(defaultData.seccionesDoc?.map((s) => ({
                id: s.id,
                content: s.contenidoJson
            })) || [])

            setDatosImagenEstructurada(null) // Reseteamos el buffer de portada binaria
            setTiptapFiles(new Map())        // Limpiamos la recámara de archivos nuevos
        } else {
            // Limpieza absoluta si entra en modo Creación limpio
            setNombre('')
            setDescripcion('')
            setDatosImagenEstructurada(null)
            setTags([])
            setDynamicLinks([])
            setDestacado(false)
            setContentBlocks([])
            setTiptapFiles(new Map())
        }
    }, [defaultData])

    const handleRegisterTiptapFile = (fileId: string, file: File) => {
        setTiptapFiles(prev => {
            const nuevoMapa = new Map(prev)
            nuevoMapa.set(fileId, file)
            return nuevoMapa
        })
    }

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

    const handleAddLink = (type: 'github' | 'docker' | 'gitlab' | 'web') => {
        setDynamicLinks(prev => [...prev, { id: crypto.randomUUID(), type, url: '' }])
    }

    const handleUrlChange = (id: string, value: string) => {
        setDynamicLinks(prev => prev.map(l => l.id === id ? { ...l, url: value } : l))
    }

    const handleRemoveLink = (id: string) => {
        setDynamicLinks(prev => prev.filter(l => l.id !== id))
    }

    // 🚀 PERSISTENCIA EVOLUCIONADA: POST (Guardar) o PUT (Actualizar) de un solo golpe
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!nombre.trim() || !descripcion.trim()) {
            alert("Por favor rellena los campos requeridos obligatorios (*).")
            return
        }

        setIsSubmitting(true)
        try {
            const formData = new FormData()
            
            formData.append("tipo", "PROYECTO")
            formData.append("nombre", nombre.trim())
            formData.append("descripcion", descripcion.trim())
            formData.append("destacado", String(destacado))

            // Portada binaria (Obligatoria en creación, opcional en actualización si no se cambia)
            if (datosImagenEstructurada?.imagen) {
                const ext = datosImagenEstructurada.imagen.name.split('.').pop()
                const archivoRenombrado = new File(
                    [datosImagenEstructurada.imagen], 
                    `${nombre.trim()} - Portada.${ext}`, 
                    { type: datosImagenEstructurada.imagen.type }
                )
                formData.append("imagenPrincipal", archivoRenombrado)
            } else if (!defaultData) {
                throw new Error("La imagen de portada es obligatoria para registrar un proyecto nuevo.")
            }

            formData.append("categorias", JSON.stringify(tags))
            formData.append("enlaces", JSON.stringify(dynamicLinks.map(l => ({ tipo: l.type.toUpperCase(), url: l.url }))))
            formData.append("seccionesDoc", JSON.stringify(contentBlocks.map(b => b.content)))
            
            // Adjuntar buffers en memoria de Tiptap
            tiptapFiles.forEach((file, fileId) => {
                formData.append(`tiptap_media_${fileId}`, file)
            })

            let response;
            // 💡 CONDICIONAL CRÍTICO: Si viene un ID previo, ejecutamos la mutación PUT en lugar de crear
            if (defaultData?.id) {
                formData.append("id", defaultData.id) // Inyectamos el ID para que el backend sepa a quién actualizar
                response = await fetch('/api/resources', {
                    method: 'PUT',
                    body: formData
                })
            } else {
                response = await fetch('/api/resources', {
                    method: 'POST',
                    body: formData
                })
            }

            const result = await response.json()
            if (!result.success) throw new Error(result.error)

            alert(defaultData ? "🚀 ¡Proyecto y documentación actualizados con éxito!" : "🏆 ¡Proyecto creado de golpe con éxito!")
            
            if (onProjectSaved) onProjectSaved() // Refresca instantáneamente el listado público de la grilla
            onClose()

        } catch (error: any) {
            console.error("Error procesando persistencia:", error)
            alert("Error: " + error.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        nombre, setNombre, descripcion, setDescripcion, datosImagenEstructurada,
        handleSaveDetailedImage, tags, setTags, dynamicLinks, handleAddLink,
        handleUrlChange, handleRemoveLink, destacado, setDestacado, contentBlocks,
        handleAddBlockInternal, handleBlockChangeInternal, handleRemoveBlockInternal,
        handleSave, handleRegisterTiptapFile, isSubmitting
    }
}