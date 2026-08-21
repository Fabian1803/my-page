'use client'
import { useEffect, useRef, useState, useCallback } from "react"
import { cvServices } from "../services/cvServices"
import { useNotifications } from "@/features/dashboardPage/context/NotificationContext"

export function useCv() {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [cvFile, setCvFile] = useState<File | null>(null)
    const [serverCvUrl, setServerCvUrl] = useState<string | null>(null)
    const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [loadingInitial, setLoadingInitial] = useState(true)
    const { addNotification } = useNotifications()

    const cargarCvExistente = useCallback(async () => {
        setLoadingInitial(true)
        try {
            const result = await cvServices.getCvDocument()
            if (result.success && result.data?.url_cv_pdf) {
                setServerCvUrl(result.data.url_cv_pdf)
            } else {
                setServerCvUrl(null)
            }
        } catch (error) {
            console.error("Error al cargar CV:", error)
        } finally {
            setLoadingInitial(false)
        }
    }, [])

    useEffect(() => {
        cargarCvExistente()
    }, [cargarCvExistente])

    // Crear Object URL para previsualización local cuando se selecciona un archivo nuevo
    useEffect(() => {
        if (!cvFile) {
            setLocalPreviewUrl(null)
            return
        }
        const objectUrl = URL.createObjectURL(cvFile)
        setLocalPreviewUrl(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [cvFile])

    const pdfPreviewUrl = localPreviewUrl || serverCvUrl || null

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
                setCvFile(file)
            } else {
                alert('Por favor, selecciona un archivo únicamente en formato PDF.')
                if (fileInputRef.current) fileInputRef.current.value = ''
            }
        }
    }

    const handleDiscardLocalChanges = () => {
        setCvFile(null)
        setLocalPreviewUrl(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const handleDeleteCv = async () => {
        if (cvFile) {
            handleDiscardLocalChanges()
            return
        }

        if (!serverCvUrl) return
        if (!confirm("¿Estás seguro de que deseas eliminar tu Currículum Vitae actual de Cloud Storage?")) return

        setLoading(true)
        try {
            const result = await cvServices.removeCvDocument()
            if (!result.success) throw new Error(result.error)

            setServerCvUrl(null)
            setCvFile(null)
            setLocalPreviewUrl(null)
            if (fileInputRef.current) fileInputRef.current.value = ''

            addNotification({
                type: 'info',
                title: 'Currículum Vitae eliminado',
                desc: 'El archivo PDF de CV fue eliminado de Cloud Storage y desvinculado de tu portafolio.'
            })
        } catch (error: any) {
            addNotification({
                type: 'error',
                title: 'Error al eliminar CV',
                desc: error.message || 'No se pudo eliminar el archivo.'
            })
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!cvFile) return

        setLoading(true)
        try {
            const result = await cvServices.uploadCvDocument(cvFile)
            if (!result.success) throw new Error(result.error)

            addNotification({
                type: 'success',
                title: 'Currículum Vitae publicado',
                desc: `El documento "${cvFile.name}" se guardó en Cloud Storage y se sincronizó con tu portafolio público.`
            })

            setCvFile(null)
            await cargarCvExistente()
        } catch (error: any) {
            addNotification({
                type: 'error',
                title: 'Fallo al subir CV',
                desc: error.message || 'No se pudo subir el archivo.'
            })
        } finally {
            setLoading(false)
        }
    }

    return {
        fileInputRef,
        cvFile,
        serverCvUrl,
        pdfPreviewUrl,
        loading,
        loadingInitial,
        handleFileChange,
        handleDiscardLocalChanges,
        handleDeleteCv,
        handleSubmit,
        cargarCvExistente
    }
}