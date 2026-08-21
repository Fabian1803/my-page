'use client'
import { useState, useEffect, useCallback } from 'react'
import { socialLinksServices, SocialLinksData } from '../services/socialLinksServices'
import { useNotifications } from '@/features/dashboardPage/context/NotificationContext'

export type { SocialLinksData } from '../services/socialLinksServices'

const INITIAL_STATE: SocialLinksData = {
    telefono: '',
    discord: '',
    gmail: '',
    whatsapp: '',
    github: '',
    linkedin: '',
    gitlab: ''
}

export function useSocialLinks() {
    const [socialLinks, setSocialLinks] = useState<SocialLinksData>(INITIAL_STATE)
    const [loading, setLoading] = useState(false)
    const [loadingInitial, setLoadingInitial] = useState(true)
    const { addNotification } = useNotifications()
    const cargarRedesExistentes = useCallback(async () => {
        setLoadingInitial(true)
        try {
            const result = await socialLinksServices.getSocialLinks()
            if (result.success && result.data) {
                setSocialLinks(result.data)
            }
        } catch (error) {
            console.error("Error al cargar redes sociales:", error)
        } finally {
            setLoadingInitial(false)
        }
    }, [])

    useEffect(() => {
        cargarRedesExistentes()
    }, [cargarRedesExistentes])

    const handleInputChange = (field: string, value: string) => {
        setSocialLinks(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await socialLinksServices.saveSocialLinks(socialLinks)
            if (!result.success) throw new Error(result.error)

            addNotification({
                type: 'success',
                title: 'Canales y Redes sincronizados',
                desc: 'Los enlaces de contacto y perfiles profesionales se han guardado exitosamente en Postgres.'
            })
        } catch (error: any) {
            console.error("Error al guardar enlaces:", error)
            addNotification({
                type: 'error',
                title: 'Fallo al sincronizar redes',
                desc: `Error al guardar enlaces: ${error.message}`
            })
        } finally {
            setLoading(false)
        }
    }

    const handleReset = () => {
        if (confirm("¿Estás seguro de que deseas descartar los cambios no guardados?")) {
            cargarRedesExistentes()
        }
    }

    return {
        socialLinks,
        loading,
        loadingInitial,
        handleInputChange,
        handleSubmit,
        handleReset,
        cargarRedesExistentes
    }
}