import { useEffect, useState, useMemo } from "react"

export interface TagItem {
    id: string;
    nombre: string;
    imagenUrl: string;
    destacado: boolean;
}

export function useTagsAdmin() {
    const [tags, setTags] = useState<TagItem[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchFilter, setSearchFilter] = useState('')
    const [filterTab, setFilterTab] = useState<'all' | 'destacados' | 'estandar'>('all')
    const [copiedId, setCopiedId] = useState<string | null>(null)
    const [selectedIds, setSelectedIds] = useState<string[]>([])

    const skeletons = [1, 2, 3, 4, 5, 6]

    // 🔄 1. CARGAR CATEGORÍAS (GET)
    const cargarCategorias = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/categorias')
            const result = await response.json()
            if (result.success) {
                setTags(result.data)
            }
        } catch (error) {
            console.error("Error al obtener categorías de Postgres:", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        cargarCategorias()
    }, [])

    const handleDeleteTag = async (id: string, nombreTag: string) => {
        if (!confirm(`¿Estás seguro de que deseas eliminar "${nombreTag}"? Se borrará de Postgres y Vercel Blob Storage.`)) return
        try {
            const response = await fetch(`/api/categorias?id=${id}`, { method: 'DELETE' })
            const result = await response.json()
            if (!result.success) throw new Error(result.error)
            setTags(prev => prev.filter(tag => tag.id !== id))
            setSelectedIds(prev => prev.filter(item => item !== id))
        } catch (error: any) {
            alert("No se pudo eliminar: " + error.message)
        }
    }

    const handleToggleDestacado = (id: string) => {
        setTags(tags.map(tag => tag.id === id ? { ...tag, destacado: !tag.destacado } : tag))
    }

    const handleCopyId = (id: string) => {
        navigator.clipboard.writeText(id)
        setCopiedId(id)
        setTimeout(() => {
            setCopiedId(null)
        }, 2000)
    }

    const handleSelectRow = (id: string) => {
        setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        )
    }

    const handleSelectAll = () => {
        if (selectedIds.length === filteredTags.length) {
            setSelectedIds([])
        } else {
            setSelectedIds(filteredTags.map(tag => tag.id))
        }
    }

    // Filtrado de etiquetas por búsqueda y pestaña
    const filteredTags = useMemo(() => {
        return tags.filter(tag => {
            const matchesSearch = tag.nombre.toLowerCase().includes(searchFilter.toLowerCase()) ||
                tag.id.toLowerCase().includes(searchFilter.toLowerCase())
            if (!matchesSearch) return false

            if (filterTab === 'destacados') return tag.destacado
            if (filterTab === 'estandar') return !tag.destacado
            return true
        })
    }, [tags, searchFilter, filterTab])

    const destacadasCount = useMemo(() => {
        return tags.filter(t => t.destacado).length
    }, [tags])

    return {
        tags,
        filteredTags,
        destacadasCount,
        isLoading,
        skeletons,
        searchFilter,
        setSearchFilter,
        filterTab,
        setFilterTab,
        copiedId,
        handleCopyId,
        selectedIds,
        handleSelectRow,
        handleSelectAll,
        cargarCategorias,
        handleDeleteTag,
        handleToggleDestacado
    }
}