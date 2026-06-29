import { getMetadata, saveMetadata } from "@/components/shared/apiClient"
import { useEffect, useRef, useState } from "react"

export function useInputTemplateProps() {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [cvFile, setCvFile] = useState<File | null>(null)
    const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const cargarCvExistente = async () => {
            const data = await getMetadata()
            if (data?.url_cv_pdf) setPdfPreviewUrl(data.url_cv_pdf)
        }
        cargarCvExistente()
    }, [])
    useEffect(() => {
        if (!cvFile) return
        const objectUrl = URL.createObjectURL(cvFile)
        setPdfPreviewUrl(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [cvFile])
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.type === 'application/pdf') {
                setCvFile(file)
            } else {
                alert('Por favor, selecciona un archivo únicamente en formato PDF.')
                if (fileInputRef.current) fileInputRef.current.value = ''
            }
        }
    }

    const handleRemoveCV = () => {
        setCvFile(null)
        setPdfPreviewUrl(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!cvFile) return;

        setLoading(true);
        try {
            await saveMetadata({}, { key: 'documento', file: cvFile });
            alert("💼 ¡Excelente! Currículum actualizado con éxito.");
            setCvFile(null);
        } catch (error: any) {
            alert("No se pudo guardar el archivo: " + error.message);
        } finally {
            setLoading(false);
        }
    }

    return {
        fileInputRef,
        cvFile,
        pdfPreviewUrl,
        loading,
        handleFileChange,
        handleRemoveCV,
        handleSubmit
    }
}