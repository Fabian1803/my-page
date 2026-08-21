'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { certificateServices } from '@/features/dashboardPage/mainPage/certificates/services/certificateServices'
import { useNotifications } from '@/features/dashboardPage/context/NotificationContext'

export const CERTIFICATE_COSTS: Record<string, { item: string; itemCost: string; total: string }> = {
    'Nombre del certificado': { item: "Premium Namespace Routing", itemCost: "$12.50", total: "$36,726.17" },
    'Descripción': { item: "Metadata Storage (Standard)", itemCost: "$0.45", total: "$36,714.12" },
    'Imagen del certificado': { item: "Object Storage SSD (100 GB)", itemCost: "$5.20", total: "$36,718.87" },
    'Instituto': { item: "Verified IAM Authority Sync", itemCost: "$25.00", total: "$36,738.67" },
    'Categoría': { item: "Global Tag Cluster Provision", itemCost: "$8.10", total: "$36,721.77" },
    'Viñetas': { item: "Audit Log Streaming Unit", itemCost: "$3.30", total: "$36,716.97" },
    'Visibilidad y Estado': { item: "Featured Resource Index Sync", itemCost: "$2.50", total: "$36,718.70" },
    'default': { item: "416 vCPU + 5,888 GB memory", itemCost: "$36,712.67", total: "$36,713.67" }
};

export function useCertificateForm() {
    const router = useRouter()
    const params = useParams()
    const { addNotification } = useNotifications()
    const certId = params?.url as string | undefined
    const isEditing = Boolean(certId && certId !== 'crear' && certId !== 'create')
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [instituto, setInstituto] = useState('')
    const [fotoFile, setFotoFile] = useState<File | null>(null)
    const [initialImageUrl, setInitialImageUrl] = useState<string | null>(null)
    const [institutoFile, setInstitutoFile] = useState<File | null>(null)
    const [initialInstitutoLogoUrl, setInitialInstitutoLogoUrl] = useState<string | null>(null)
    const [compTags, setCompTags] = useState<string[]>([])
    const [compBullets, setCompBullets] = useState<string[]>([])
    const [esDestacado, setEsDestacado] = useState(false)
    const [loading, setLoading] = useState(false)
    const [activeField, setActiveField] = useState<string>('Nombre del certificado')

    useEffect(() => {
        if (!isEditing || !certId) return

        const fetchCertificate = async () => {
            try {
                const result = await certificateServices.getById(certId)
                if (result.success && result.data) {
                    const cert = result.data
                    setNombre(cert.nombre || '')
                    setDescripcion(cert.descripcion || '')
                    setInstituto(cert.institucion || '')
                    setEsDestacado(Boolean(cert.destacado))
                    setInitialImageUrl(cert.imagenPrincipalUrl || null)
                    setInitialInstitutoLogoUrl(cert.miniaturaUrl || null)
                    setCompTags((cert.categorias || []).map((c: any) => typeof c === 'string' ? c : c.nombre))
                    setCompBullets((cert.vinetas || []).map((v: any) => typeof v === 'string' ? v : v.comentario))
                } else {
                    alert("No se encontró el certificado especificado.")
                    router.push('/dashboard/certificados')
                }
            } catch (error) {
                console.error("Error al cargar certificado:", error)
            }
        }

        fetchCertificate()
    }, [isEditing, certId, router])
    const costosActuales = CERTIFICATE_COSTS[activeField] || CERTIFICATE_COSTS['default']
    const handleSubmit = async () => {
        if (!nombre.trim()) {
            alert("Por favor introduce el nombre del certificado.")
            return
        }

        if (!descripcion.trim()) {
            alert("Por favor introduce una breve descripción del certificado.")
            return
        }

        if (!isEditing && !fotoFile) {
            alert("Por favor sube la imagen del certificado o credencial.")
            return
        }

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("tipo", "CERTIFICADO")
            formData.append("nombre", nombre.trim())
            formData.append("descripcion", descripcion.trim())
            formData.append("instituto", instituto.trim())
            formData.append("destacado", String(esDestacado))
            formData.append("categorias", JSON.stringify(compTags.map(t => ({ nombre: t }))))
            formData.append("vinetas", JSON.stringify(compBullets.map(b => ({ comentario: b }))))
            if (fotoFile) formData.append("imagenPrincipal", fotoFile)
            if (institutoFile) formData.append("miniaturaIcono", institutoFile)
            let result
            if (isEditing && certId) {
                formData.append("id", certId)
                result = await certificateServices.update(certId, formData)
            } else {
                result = await certificateServices.create(formData)
            }

            if (!result.success) throw new Error(result.error)

            addNotification({
                type: 'success',
                title: isEditing ? 'Certificado actualizado' : 'Certificado provisionado',
                desc: `La credencial "${nombre.trim()}" ha sido guardada en Postgres y Cloud Storage.`
            })

            router.push('/dashboard/certificados')
        } catch (error: any) {
            addNotification({
                type: 'error',
                title: 'Error al guardar certificado',
                desc: `Fallo al guardar "${nombre}": ${error.message}`
            })
            alert("Error al guardar: " + error.message)
        } finally {
            setLoading(false)
        }
    }

    return {
        isEditing,
        nombre,
        setNombre,
        descripcion,
        setDescripcion,
        instituto,
        setInstituto,
        fotoFile,
        setFotoFile,
        initialImageUrl,
        setInitialImageUrl,
        institutoFile,
        setInstitutoFile,
        initialInstitutoLogoUrl,
        compTags,
        setCompTags,
        compBullets,
        setCompBullets,
        esDestacado,
        setEsDestacado,
        loading,
        activeField,
        setActiveField,
        costosActuales,
        handleSubmit
    }
}
