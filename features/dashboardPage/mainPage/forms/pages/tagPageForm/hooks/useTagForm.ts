'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { tagServices } from '@/features/dashboardPage/mainPage/tagsAdmin/services/tagServices'
import { useNotifications } from '@/features/dashboardPage/context/NotificationContext'

export const TAG_COSTS: Record<string, { item: string; itemCost: string; total: string }> = {
    'Nombre de la tecnología': { item: "Global Target Tag Router", itemCost: "$1.20", total: "$36,715.40" },
    'Logotipo Oficial': { item: "Cloud Storage SVG/PNG Asset Bucket", itemCost: "$0.80", total: "$36,716.20" },
    'Visibilidad y Estado': { item: "Featured Resource Index Sync", itemCost: "$2.50", total: "$36,718.70" },
    'default': { item: "Resource Manager Metadata Store", itemCost: "$36,714.20", total: "$36,714.20" }
};

export function useTagForm() {
    const router = useRouter()
    const params = useParams()
    const { addNotification } = useNotifications()

    const tagId = params?.url as string | undefined
    const isEditing = Boolean(tagId && tagId !== 'crear' && tagId !== 'create')

    const [nombre, setNombre] = useState('')
    const [fotoFile, setFotoFile] = useState<File | null>(null)
    const [initialImageUrl, setInitialImageUrl] = useState<string | null>(null)
    const [esDestacado, setEsDestacado] = useState(false)
    const [loading, setLoading] = useState(false)
    const [activeField, setActiveField] = useState<string>('Nombre de la tecnología')

    useEffect(() => {
        if (!isEditing || !tagId) return

        const fetchTag = async () => {
            try {
                const result = await tagServices.getById(tagId)
                if (result.success && result.data) {
                    setNombre(result.data.nombre)
                    setEsDestacado(result.data.destacado)
                    setInitialImageUrl(result.data.imagenUrl)
                } else {
                    alert("No se encontró la etiqueta especificada.")
                    router.push('/dashboard/etiquetas')
                }
            } catch (error) {
                console.error("Error al cargar etiqueta:", error)
            }
        }

        fetchTag()
    }, [isEditing, tagId, router])

    const costosActuales = TAG_COSTS[activeField] || TAG_COSTS['default']

    const handleSubmit = async () => {
        if (!nombre.trim()) {
            alert("Por favor, introduce el nombre de la tecnología.")
            return
        }

        if (!isEditing && !fotoFile) {
            alert("Por favor selecciona un logotipo oficial para la tecnología.")
            return
        }

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("nombre", nombre.trim())
            formData.append("destacado", String(esDestacado))
            if (fotoFile) {
                formData.append("imagen", fotoFile)
            }

            let result
            if (isEditing && tagId) {
                formData.append("id", tagId)
                result = await tagServices.update(tagId, formData)
            } else {
                result = await tagServices.create(formData)
            }

            if (!result.success) throw new Error(result.error)

            addNotification({
                type: 'success',
                title: isEditing ? 'Etiqueta actualizada' : 'Etiqueta provisionada',
                desc: `El recurso "${nombre.trim()}" ha sido guardado exitosamente en Postgres y Google Cloud Storage.`
            })

            router.push('/dashboard/etiquetas')
        } catch (error: any) {
            alert("Error al guardar la tecnología: " + error.message)
            addNotification({
                type: 'error',
                title: 'Error al procesar etiqueta',
                desc: `Fallo al guardar "${nombre}": ${error.message}`
            })
        } finally {
            setLoading(false)
        }
    }

    return {
        isEditing,
        nombre,
        setNombre,
        fotoFile,
        setFotoFile,
        initialImageUrl,
        setInitialImageUrl,
        esDestacado,
        setEsDestacado,
        loading,
        activeField,
        setActiveField,
        costosActuales,
        handleSubmit
    }
}
