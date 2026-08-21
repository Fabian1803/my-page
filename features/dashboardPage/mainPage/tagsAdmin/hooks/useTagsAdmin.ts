import { useEffect, useState, useMemo, useCallback } from "react"
import { tagServices, TagItem } from "../services/tagServices"
import { useNotifications } from "@/features/dashboardPage/context/NotificationContext"
export type { TagItem } from "../services/tagServices"

export function useTagsAdmin() {
    const [tags, setTags] = useState<TagItem[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchFilter, setSearchFilter] = useState('')
    const [filterTab, setFilterTab] = useState<'all' | 'destacados' | 'estandar'>('all')
    const [copiedId, setCopiedId] = useState<string | null>(null)
    const [selectedIds, setSelectedIds] = useState<string[]>([])
    const { addNotification } = useNotifications()
    const skeletons = [1, 2, 3, 4, 5, 6]
    const cargarCategorias = useCallback(async () => {
        setIsLoading(true)
        try {
            const result = await tagServices.getAll()
            if (result.success && result.data) {
                setTags(result.data)
            } else {
                console.error("Error al obtener categorías:", result.error)
            }
        } catch (error) {
            console.error("Error de red:", error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        cargarCategorias()
    }, [cargarCategorias])

    const handleDeleteTag = async (id: string, nombreTag: string) => {
        if (!confirm(`¿Estás seguro de que deseas eliminar "${nombreTag}"? Se borrará de Postgres y Cloud Storage.`)) return
        try {
            const result = await tagServices.delete(id)
            if (!result.success) throw new Error(result.error)

            setTags(prev => prev.filter(tag => tag.id !== id))
            setSelectedIds(prev => prev.filter(item => item !== id))

            addNotification({
                type: 'info',
                title: 'Recurso eliminado',
                desc: `La etiqueta "${nombreTag}" fue eliminada de Postgres y Cloud Storage con éxito.`
            })
        } catch (error: any) {
            alert("No se pudo eliminar: " + error.message)
            addNotification({
                type: 'error',
                title: 'Fallo al eliminar etiqueta',
                desc: `Error al intentar eliminar "${nombreTag}": ${error.message}`
            })
        }
    }

    const handleToggleDestacado = async (id: string) => {
        const targetTag = tags.find(t => t.id === id)
        if (!targetTag) return
        const newDestacado = !targetTag.destacado
        setTags(prev => prev.map(tag => tag.id === id ? { ...tag, destacado: newDestacado } : tag))
        try {
            const result = await tagServices.toggleDestacado(id, newDestacado)
            if (!result.success) throw new Error(result.error)
            addNotification({
                type: 'success',
                title: 'Estado de etiqueta actualizado',
                desc: `"${targetTag.nombre}" ahora está marcada como ${newDestacado ? 'Destacada (Principal)' : 'Estándar'}.`
            })
        } catch (error: any) {
            console.error("Error al alternar destacado:", error)
            setTags(prev => prev.map(tag => tag.id === id ? { ...tag, destacado: !newDestacado } : tag))
            addNotification({
                type: 'error',
                title: 'Error al actualizar estado',
                desc: `No se pudo actualizar el estado de "${targetTag.nombre}".`
            })
        }
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