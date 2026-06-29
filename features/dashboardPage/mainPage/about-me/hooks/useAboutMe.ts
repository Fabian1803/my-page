import { getMetadata, saveMetadata } from "@/components/shared/apiClient";
import { useEffect, useState } from "react"
interface Experiencia {
    id: string;
    empresa: string;
    cargo: string;
    fechaInicio: string;
    fechaFin: string;
    vinetas: string[];
    urlWeb?: string;
    urlMasInfo?: string;
}

export function useAboutMe() {
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fotoPerfil, setFotoPerfil] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [experiencias, setExperiencias] = useState<Experiencia[]>([])
    const [educacion, setEducacion] = useState<Experiencia[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setFotoPerfil(file)
            setPreviewUrl(URL.createObjectURL(file))
        }
    }
    useEffect(() => {
        const cargarMetadatos = async () => {
            const data = await getMetadata()
            if (data) {
                if (data.nombre) setNombre(data.nombre)
                if (data.descripcion) setDescripcion(data.descripcion)
                if (data.experiencias) setExperiencias(data.experiencias)
                if (data.educacion) setEducacion(data.educacion)
                if (data.url_imagen) setPreviewUrl(data.url_imagen)
            }
        }
        cargarMetadatos()
    }, [])

    // --- Métodos de gestión de Experiencia Laboral ---
    const agregarExperiencia = () => {
        setExperiencias([...experiencias, { id: crypto.randomUUID(), empresa: '', cargo: '', fechaInicio: '', fechaFin: '', vinetas: [''], urlWeb: '', urlMasInfo: '' }])
    }
    const actualizarExperiencia = (id: string, campo: keyof Experiencia, valor: string) => {
        setExperiencias(experiencias.map(exp => exp.id === id ? { ...exp, [campo]: valor } : exp))
    }
    const eliminarExperiencia = (id: string) => {
        setExperiencias(experiencias.filter(exp => exp.id !== id))
    }
    const agregarVineta = (id: string) => {
        setExperiencias(experiencias.map(exp => exp.id === id ? { ...exp, vinetas: [...exp.vinetas, ''] } : exp))
    }
    const actualizarVineta = (id: string, idx: number, val: string) => {
        setExperiencias(experiencias.map(exp => exp.id === id ? { ...exp, vinetas: exp.vinetas.map((v, i) => i === idx ? val : v) } : exp))
    }
    const eliminarVineta = (id: string, idx: number) => {
        setExperiencias(experiencias.map(exp => exp.id === id ? { ...exp, vinetas: exp.vinetas.filter((_, i) => i !== idx) } : exp))
    }

    const agregarEducacion = () => {
        setEducacion([...educacion, { id: crypto.randomUUID(), empresa: '', cargo: '', fechaInicio: '', fechaFin: '', vinetas: [''], urlWeb: '', urlMasInfo: '' }])
    }
    const actualizarEducacion = (id: string, campo: keyof Experiencia, valor: string) => {
        setEducacion(educacion.map(edu => edu.id === id ? { ...edu, [campo]: valor } : edu))
    }
    const eliminarEducacion = (id: string) => {
        setEducacion(educacion.filter(edu => edu.id !== id))
    }
    const agregarVinetaEdu = (id: string) => {
        setEducacion(educacion.map(edu => edu.id === id ? { ...edu, vinetas: [...edu.vinetas, ''] } : edu))
    }
    const actualizarVinetaEdu = (id: string, idx: number, val: string) => {
        setEducacion(educacion.map(edu => edu.id === id ? { ...edu, vinetas: edu.vinetas.map((v, i) => i === idx ? val : v) } : edu))
    }
    const eliminarVinetaEdu = (id: string, idx: number) => {
        setEducacion(educacion.map(edu => edu.id === id ? { ...edu, vinetas: edu.vinetas.filter((_, i) => i !== idx) } : edu))
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const metadatosEstructurados = {
                nombre,
                descripcion,
                experiencias,
                educacion
            }
            const binarioConfig = fotoPerfil ? { key: 'imagen' as const, file: fotoPerfil } : undefined
            await saveMetadata(metadatosEstructurados, binarioConfig)
            alert("🚀 ¡BRUTAL! Cambios guardados con éxito en Vercel Blob y Postgres.")
            setFotoPerfil(null)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return {
        nombre, setNombre, descripcion, setDescripcion, fotoPerfil, setFotoPerfil, previewUrl, setPreviewUrl, handleFotoChange,
        experiencias, agregarExperiencia, eliminarExperiencia, actualizarExperiencia, agregarVineta, eliminarVineta, actualizarVineta,
        educacion, agregarEducacion, eliminarEducacion, actualizarEducacion, agregarVinetaEdu, eliminarVinetaEdu, actualizarVinetaEdu,
        loading, error, handleSubmit
    }
}