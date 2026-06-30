import { useState, useEffect } from "react"

interface CategoriaDB {
    id: string;
    nombre: string;
    imagenUrl: string;
    destacado: boolean;
}

interface UseTagsSelectorProps {
    selectedTags: string[];
    onTagsChange: (tags: string[]) => void;
}

export function useTagsSelector({ selectedTags, onTagsChange }: UseTagsSelectorProps) {
    // 🔥 Ahora el estado inicial empieza vacío porque vendrá de Postgres
    const [availableTags, setAvailableTags] = useState<string[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(false)

    // 🔍 1. Cargar las tecnologías reales de la base de datos al renderizar
    const cargarCategoriasGlobales = async () => {
        try {
            const response = await fetch('/api/categorias')
            const result = await response.json()
            if (result.success) {
                // Mapeamos para quedarnos solo con el nombre string que espera tu componente
                const nombresTags = result.data.map((cat: CategoriaDB) => cat.nombre)
                setAvailableTags(nombresTags)
            }
        } catch (error) {
            console.error("Error al sincronizar las categorías del selector:", error)
        }
    }

    useEffect(() => {
        cargarCategoriasGlobales()
    }, [])

    // Filtrar según la barra de búsqueda
    const filteredTags = availableTags.filter(tag =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const isExactMatch = availableTags.some(
        tag => tag.toLowerCase() === searchQuery.trim().toLowerCase()
    )

    // Seleccionar o deseleccionar una etiqueta
    const handleToggleTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            onTagsChange(selectedTags.filter(t => t !== tag))
        } else {
            onTagsChange([...selectedTags, tag])
        }
    }

    // 🚀 2. Crear una nueva etiqueta en caliente y persistirla en Postgres
    const handleCreateNewTag = async () => {
        const cleanTag = searchQuery.trim()
        if (!cleanTag || isExactMatch) return

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("nombre", cleanTag)
            formData.append("destacado", "false")
            const dummyBlob = new Blob([new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10])], { type: "image/png" })
            formData.append("imagen", dummyBlob, "tag-default.png")

            const response = await fetch('/api/categorias', {
                method: 'POST',
                body: formData
            })

            const result = await response.json()
            if (!result.success) throw new Error(result.error)
            setAvailableTags(prev => [...prev, result.data.nombre])
            onTagsChange([...selectedTags, result.data.nombre])
            setSearchQuery('')
        } catch (error) {
            console.error("No se pudo guardar la etiqueta al vuelo:", error)
            setAvailableTags(prev => [...prev, cleanTag])
            onTagsChange([...selectedTags, cleanTag])
            setSearchQuery('')
        } finally {
            setLoading(false)
        }
    }

    return {
        availableTags,
        searchQuery,
        setSearchQuery,
        filteredTags,
        isExactMatch,
        loading,
        handleToggleTag,
        handleCreateNewTag
    }
}