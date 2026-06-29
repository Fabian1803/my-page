import { getMetadata, saveMetadata } from '@/components/shared/apiClient'
import { useState, useEffect } from 'react'
export function useInputTemplateProps() {
    const [socialLinks, setSocialLinks] = useState({
        telefono: '',
        discord: '',
        gmail: '',
        whatsapp: '',
        github: '',
        linkedin: '',
        gitlab: ''
    })
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const cargarRedesExistentes = async () => {
            const data = await getMetadata()
            if (data) {
                setSocialLinks({
                    telefono: data.telefono || '',
                    discord: data.discord || '',
                    gmail: data.gmail || '',
                    whatsapp: data.whatsapp || '',
                    github: data.github || '',
                    linkedin: data.linkedin || '',
                    gitlab: data.gitlab || ''
                })
            }
        }
        cargarRedesExistentes()
    }, [])

    const handleInputChange = (field: string, value: string) => {
        setSocialLinks(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await saveMetadata(socialLinks);
            alert("🌐 ¡Brutal! Redes sociales actualizadas correctamente.");
        } catch (error: any) {
            alert("No se pudieron guardar los enlaces: " + error.message);
        } finally {
            setLoading(false);
        }
    }
    const handleReset = () => {
        if (confirm("¿Estás seguro de que deseas limpiar los cambios no guardados?")) window.location.reload()
    }
    return {
        socialLinks,
        loading,
        handleInputChange,
        handleSubmit,
        handleReset
    }
}