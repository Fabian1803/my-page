import { useEffect, useRef, useState } from "react"

interface TagItem {
    id: string;
    nombre: string;
    imagenUrl: string;
    destacado: boolean;
}

export function useTagsAdmin() {
    const [tags, setTags] = useState<TagItem[]>([])
    const [nombre, setNombre] = useState('')
    const [esDestacado, setEsDestacado] = useState(false)
    const [fotoFile, setFotoFile] = useState<File | null>(null)
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // 🔄 1. CARGAR CATEGORÍAS (GET)
    const cargarCategorias = async () => {
        try {
            const response = await fetch('/api/categorias')
            const result = await response.json()
            if (result.success) {
                setTags(result.data)
            }
        } catch (error) {
            console.error("Error al obtener categorías de Postgres:", error)
        }
    }

    useEffect(() => {
        cargarCategorias()
    }, [])

    const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNombre(e.target.value)
    }
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setFotoFile(file) // Guardamos el binario para el envío
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }
    const handleSaveTag = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!nombre.trim() || !fotoFile) {
            alert("Por favor, introduce un nombre y selecciona un logotipo.")
            return
        }
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("nombre", nombre.trim())
            formData.append("destacado", String(esDestacado))
            formData.append("imagen", fotoFile)

            const response = await fetch('/api/categorias', {
                method: 'POST',
                body: formData
            })
            const result = await response.json()
            if (!result.success) throw new Error(result.error)
            setTags(prev => [result.data, ...prev])
            setNombre('')
            setEsDestacado(false)
            setPreviewImage(null)
            setFotoFile(null)
            if (fileInputRef.current) fileInputRef.current.value = ''

            alert(`🚀 ¡Brutal! "${result.data.nombre}" guardada con éxito.`)
        } catch (error: any) {
            alert("Error al guardar la tecnología: " + error.message)
        } finally {
            setLoading(false)
        }
    }
    const handleDeleteTag = async (id: string, nombreTag: string) => {
        if (!confirm(`¿Estás seguro de que deseas eliminar "${nombreTag}"? Se borrará de Postgres y Vercel Blob.`)) return
        try {
            const response = await fetch(`/api/categorias?id=${id}`, { method: 'DELETE' })
            const result = await response.json()
            if (!result.success) throw new Error(result.error)
            setTags(prev => prev.filter(tag => tag.id !== id))
            alert("🗑️ Tecnología eliminada correctamente.")
        } catch (error: any) {
            alert("No se pudo eliminar: " + error.message)
        }
    }
    const handleToggleDestacado = (id: string) => {
        setTags(tags.map(tag => tag.id === id ? { ...tag, destacado: !tag.destacado } : tag))
    }

    return {
        tags,
        nombre,
        setEsDestacado,
        esDestacado,
        previewImage,
        fileInputRef,
        loading,
        handleNombreChange,
        handleImageChange,
        handleSaveTag,
        handleDeleteTag,
        handleToggleDestacado
    }
}