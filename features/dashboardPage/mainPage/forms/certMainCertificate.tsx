'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import {
    InputCloud,
    InputImageCloud,
    InstitutionInputCloud,
    TextAreaCloud,
    TagSelector,
    VignetteInput
} from './components'
import CloudResourceContainer from './layout/CloudResourceContainer'
import { MdStar, MdCheck } from 'react-icons/md'
import { certificateServices } from '../certificates/services/certificateServices'
import { useNotifications } from '@/features/dashboardPage/context/NotificationContext'

const COSTOS_POR_CAMPO: Record<string, { item: string; itemCost: string; total: string }> = {
    'Nombre del certificado': { item: "Premium Namespace Routing", itemCost: "$12.50", total: "$36,726.17" },
    'Descripción': { item: "Metadata Storage (Standard)", itemCost: "$0.45", total: "$36,714.12" },
    'Imagen del certificado': { item: "Object Storage SSD (100 GB)", itemCost: "$5.20", total: "$36,718.87" },
    'Instituto': { item: "Verified IAM Authority Sync", itemCost: "$25.00", total: "$36,738.67" },
    'Categoría': { item: "Global Tag Cluster Provision", itemCost: "$8.10", total: "$36,721.77" },
    'Viñetas': { item: "Audit Log Streaming Unit", itemCost: "$3.30", total: "$36,716.97" },
    'Visibilidad y Estado': { item: "Featured Resource Index Sync", itemCost: "$2.50", total: "$36,718.70" },
    'default': { item: "416 vCPU + 5,888 GB memory", itemCost: "$36,712.67", total: "$36,713.67" }
};

export default function CertMainCertificate() {
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
    const [loadingInitial, setLoadingInitial] = useState(isEditing)
    const [activeField, setActiveField] = useState<string>('Nombre del certificado')

    // Cargar datos si estamos en modo edición
    useEffect(() => {
        if (!isEditing || !certId) {
            setLoadingInitial(false)
            return
        }

        const fetchCertificate = async () => {
            setLoadingInitial(true)
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
                    setCompTags((cert.categorias || []).map(c => c.nombre))
                    setCompBullets((cert.vinetas || []).map(v => v.comentario))
                } else {
                    alert("No se encontró el certificado especificado.")
                    router.push('/dashboard/certificados')
                }
            } catch (error) {
                console.error("Error al cargar certificado:", error)
            } finally {
                setLoadingInitial(false)
            }
        }

        fetchCertificate()
    }, [isEditing, certId, router])

    const costosActuales = COSTOS_POR_CAMPO[activeField] || COSTOS_POR_CAMPO['default']

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

            if (fotoFile) {
                formData.append("imagenPrincipal", fotoFile)
            }

            if (institutoFile) {
                formData.append("miniaturaIcono", institutoFile)
            }

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

    return (
        <CloudResourceContainer
            costosActuales={costosActuales}
            title={isEditing ? `Editar ${nombre || 'certificado'}` : "certificado"}
            activeField={activeField}
            setActiveField={setActiveField}
            onSubmit={handleSubmit}
            isSubmitting={loading}
            backHref="/dashboard/certificados"
        >
            <InputCloud
                label="Nombre del certificado"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                onClick={() => setActiveField('Nombre del certificado')}
                placeholder="Ej: Professional Cloud Architect, Meta Front-End Developer"
                required
            />

            <TextAreaCloud
                label="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                onClick={() => setActiveField('Descripción')}
                placeholder="Describe las competencias, conocimientos y alcance de la certificación..."
                required
            />

            <InputImageCloud
                label="Imagen del certificado / Credencial Oficial"
                value={fotoFile}
                initialUrl={initialImageUrl}
                onChange={(file) => {
                    setFotoFile(file)
                    if (file) setInitialImageUrl(null)
                }}
                onClick={() => setActiveField('Imagen del certificado')}
                placeholder="Haz clic para subir la imagen del certificado"
                required={!isEditing}
            />

            <InstitutionInputCloud
                value={instituto}
                onChange={setInstituto}
                file={institutoFile}
                onFileChange={setInstitutoFile}
                initialLogoUrl={initialInstitutoLogoUrl}
                onClick={() => setActiveField('Instituto')}
            />

            <TagSelector
                onClick={() => setActiveField('Categoría')}
                selectedTags={compTags}
                onTagsChange={setCompTags}
            />

            <VignetteInput
                bullets={compBullets}
                onClick={() => setActiveField('Viñetas')}
                onBulletsChange={setCompBullets}
            />

            {/* Configuración de Visibilidad y Destacado */}
            <div
                onClick={() => {
                    setActiveField('Visibilidad y Estado')
                    setEsDestacado(!esDestacado)
                }}
                className={`relative mt-4 w-full p-4 rounded border transition-all cursor-pointer ${activeField === 'Visibilidad y Estado'
                        ? 'border-blue-500 bg-blue-50/20'
                        : 'border-gray-300 hover:border-gray-400 bg-white'
                    }`}
            >
                <label className="absolute -top-2 left-3 bg-white z-10 px-1 text-xs font-medium text-gray-500">
                    Visibilidad y Estado
                </label>

                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${esDestacado ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-400'}`}>
                            <MdStar size={22} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-800">Destacar en la página principal</p>
                            <p className="text-xs text-gray-500">Mostrar esta credencial en la portada y sección principal del portafolio.</p>
                        </div>
                    </div>

                    <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${esDestacado ? 'bg-[#0c68e0] border-[#0c68e0] text-white' : 'border-gray-400 bg-white'
                        }`}>
                        {esDestacado && <MdCheck size={14} />}
                    </div>
                </div>
            </div>
        </CloudResourceContainer>
    )
}