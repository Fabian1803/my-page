'use client'
import { useEffect, useState, useCallback } from "react"
import { aboutMeServices, ExperienceItem, AboutMeData } from "../services/aboutMeServices"
import { useNotifications } from "@/features/dashboardPage/context/NotificationContext"
export type { ExperienceItem, AboutMeData } from "../services/aboutMeServices"
export function useAboutMe() {
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fotoPerfil, setFotoPerfil] = useState<File | null>(null)
    const [serverImageUrl, setServerImageUrl] = useState<string | null>(null)
    const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null)
    const [experiencias, setExperiencias] = useState<ExperienceItem[]>([])
    const [educacion, setEducacion] = useState<ExperienceItem[]>([])
    const [loading, setLoading] = useState(false)
    const [loadingInitial, setLoadingInitial] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { addNotification } = useNotifications()

    const cargarMetadatos = useCallback(async () => {
        setLoadingInitial(true)
        try {
            const result = await aboutMeServices.getAboutMe()
            if (result.success && result.data) {
                setNombre(result.data.nombre || '')
                setDescripcion(result.data.descripcion || '')
                setExperiencias(result.data.experiencias || [])
                setEducacion(result.data.educacion || [])
                setServerImageUrl(result.data.url_imagen || null)
            }
        } catch (err: any) {
            console.error("Error al cargar perfil sobre mí:", err)
        } finally {
            setLoadingInitial(false)
        }
    }, [])

    useEffect(() => {
        cargarMetadatos()
    }, [cargarMetadatos])
    useEffect(() => {
        if (!fotoPerfil) {
            setLocalPreviewUrl(null)
            return
        }
        const objectUrl = URL.createObjectURL(fotoPerfil)
        setLocalPreviewUrl(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [fotoPerfil])
    const previewUrl = localPreviewUrl || serverImageUrl || null
    const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setFotoPerfil(file)
        }
    }

    const handleRemovePhoto = () => {
        if (fotoPerfil) {
            setFotoPerfil(null)
            setLocalPreviewUrl(null)
        } else if (serverImageUrl) {
            setServerImageUrl(null)
        }
    }

    const agregarExperiencia = () => {
        setExperiencias(prev => [
            ...prev,
            { id: crypto.randomUUID(), empresa: '', cargo: '', fechaInicio: '', fechaFin: '', vinetas: [''], urlWeb: '', urlMasInfo: '' }
        ])
    }

    const actualizarExperiencia = (id: string, campo: keyof ExperienceItem, valor: any) => {
        setExperiencias(prev => prev.map(exp => exp.id === id ? { ...exp, [campo]: valor } : exp))
    }

    const eliminarExperiencia = (id: string) => {
        setExperiencias(prev => prev.filter(exp => exp.id !== id))
    }

    const agregarVineta = (id: string) => {
        setExperiencias(prev => prev.map(exp => exp.id === id ? { ...exp, vinetas: [...exp.vinetas, ''] } : exp))
    }

    const actualizarVineta = (id: string, idx: number, val: string) => {
        setExperiencias(prev => prev.map(exp => exp.id === id ? {
            ...exp,
            vinetas: exp.vinetas.map((v, i) => i === idx ? val : v)
        } : exp))
    }

    const eliminarVineta = (id: string, idx: number) => {
        setExperiencias(prev => prev.map(exp => exp.id === id ? {
            ...exp,
            vinetas: exp.vinetas.filter((_, i) => i !== idx)
        } : exp))
    }

    const agregarEducacion = () => {
        setEducacion(prev => [
            ...prev,
            { id: crypto.randomUUID(), empresa: '', cargo: '', fechaInicio: '', fechaFin: '', vinetas: [''], urlWeb: '', urlMasInfo: '' }
        ])
    }

    const actualizarEducacion = (id: string, campo: keyof ExperienceItem, valor: any) => {
        setEducacion(prev => prev.map(edu => edu.id === id ? { ...edu, [campo]: valor } : edu))
    }

    const eliminarEducacion = (id: string) => {
        setEducacion(prev => prev.filter(edu => edu.id !== id))
    }

    const agregarVinetaEdu = (id: string) => {
        setEducacion(prev => prev.map(edu => edu.id === id ? { ...edu, vinetas: [...edu.vinetas, ''] } : edu))
    }

    const actualizarVinetaEdu = (id: string, idx: number, val: string) => {
        setEducacion(prev => prev.map(edu => edu.id === id ? {
            ...edu,
            vinetas: edu.vinetas.map((v, i) => i === idx ? val : v)
        } : edu))
    }

    const eliminarVinetaEdu = (id: string, idx: number) => {
        setEducacion(prev => prev.map(edu => edu.id === id ? {
            ...edu,
            vinetas: edu.vinetas.filter((_, i) => i !== idx)
        } : edu))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const dataToSave: AboutMeData = {
                nombre: nombre.trim(),
                descripcion: descripcion.trim(),
                experiencias,
                educacion,
                url_imagen: serverImageUrl || ''
            }

            const result = await aboutMeServices.saveAboutMe(dataToSave, fotoPerfil)
            if (!result.success) throw new Error(result.error)

            addNotification({
                type: 'success',
                title: 'Perfil "Sobre mí" sincronizado',
                desc: 'La información personal, experiencias y educación se actualizaron exitosamente en Postgres y Cloud Storage.'
            })

            setFotoPerfil(null)
            await cargarMetadatos()
        } catch (err: any) {
            setError(err.message)
            addNotification({
                type: 'error',
                title: 'Error al actualizar perfil',
                desc: err.message || 'No se pudieron guardar los cambios.'
            })
        } finally {
            setLoading(false)
        }
    }

    const handleReset = () => {
        if (confirm("¿Estás seguro de descartar los cambios no guardados?")) {
            setFotoPerfil(null)
            cargarMetadatos()
        }
    }

    return {
        nombre,
        setNombre,
        descripcion,
        setDescripcion,
        fotoPerfil,
        setFotoPerfil,
        previewUrl,
        handleFotoChange,
        handleRemovePhoto,
        experiencias,
        agregarExperiencia,
        eliminarExperiencia,
        actualizarExperiencia,
        agregarVineta,
        eliminarVineta,
        actualizarVineta,
        educacion,
        agregarEducacion,
        eliminarEducacion,
        actualizarEducacion,
        agregarVinetaEdu,
        eliminarVinetaEdu,
        actualizarVinetaEdu,
        loading,
        loadingInitial,
        error,
        handleSubmit,
        handleReset,
        cargarMetadatos
    }
}