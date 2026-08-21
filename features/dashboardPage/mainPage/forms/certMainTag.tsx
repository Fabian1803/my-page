'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { InputCloud, InputImageCloud } from './components'
import CloudResourceContainer from './layout/CloudResourceContainer'
import { MdStar, MdCheck } from 'react-icons/md'
import { tagServices } from '../tagsAdmin/services/tagServices'
import { useNotifications } from '@/features/dashboardPage/context/NotificationContext'

const COSTOS_POR_CAMPO: Record<string, { item: string; itemCost: string; total: string }> = {
    'Nombre de la tecnología': { item: "Global Target Tag Router", itemCost: "$1.20", total: "$36,715.40" },
    'Logotipo Oficial': { item: "Cloud Storage SVG/PNG Asset Bucket", itemCost: "$0.80", total: "$36,716.20" },
    'Visibilidad y Estado': { item: "Featured Resource Index Sync", itemCost: "$2.50", total: "$36,718.70" },
    'default': { item: "Resource Manager Metadata Store", itemCost: "$36,714.20", total: "$36,714.20" }
};

export default function CertMainTag() {
    const router = useRouter()
    const params = useParams()
    const { addNotification } = useNotifications()
    const tagId = params?.url as string | undefined
    const isEditing = Boolean(tagId && tagId !== 'create')
    const [nombre, setNombre] = useState('')
    const [fotoFile, setFotoFile] = useState<File | null>(null)
    const [initialImageUrl, setInitialImageUrl] = useState<string | null>(null)
    const [esDestacado, setEsDestacado] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingInitial, setLoadingInitial] = useState(isEditing)
    const [activeField, setActiveField] = useState<string>('Nombre de la tecnología')

    useEffect(() => {
        if (!isEditing || !tagId) return

        const fetchTag = async () => {
            setLoadingInitial(true)
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
            } finally {
                setLoadingInitial(false)
            }
        }

        fetchTag()
    }, [isEditing, tagId, router])

    const costosActuales = COSTOS_POR_CAMPO[activeField] || COSTOS_POR_CAMPO['default']

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

            let result;
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

    if (loadingInitial) {
        return (
            <div className="max-w-[1600px] mx-auto p-12 bg-white rounded-2xl flex flex-col items-center justify-center min-h-[50vh]">
                <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
                <p className="text-sm text-gray-500 font-medium">Cargando datos del recurso Cloud...</p>
            </div>
        )
    }

    return (
        <CloudResourceContainer
            costosActuales={costosActuales}
            title={isEditing ? `Editar ${nombre || 'etiqueta'}` : "etiqueta"}
            activeField={activeField}
            setActiveField={setActiveField}
            onSubmit={handleSubmit}
            isSubmitting={loading}
            backHref="/dashboard/etiquetas"
        >
            <InputCloud
                label="Nombre de la tecnología"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                onClick={() => setActiveField('Nombre de la tecnología')}
                placeholder="Ej: Docker, Next.js, PostgreSQL, Kubernetes"
                required
            />

            <InputImageCloud
                label="Logotipo Oficial / Icono"
                value={fotoFile}
                initialUrl={initialImageUrl}
                onChange={(file) => {
                    setFotoFile(file)
                    if (file) setInitialImageUrl(null)
                }}
                onClick={() => setActiveField('Logotipo Oficial')}
                placeholder="Haz clic para subir PNG, SVG o JPEG"
                required={!isEditing}
            />

            {/* Configuración de Visibilidad y Destacado */}
            <div
                onClick={() => {
                    setActiveField('Visibilidad y Estado')
                    setEsDestacado(!esDestacado)
                }}
                className={`relative mt-3 w-full p-4 rounded border transition-all cursor-pointer ${activeField === 'Visibilidad y Estado'
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
                            <p className="text-xs text-gray-500">Mostrar esta insignia en la cabecera y sección de tecnologías del portafolio público.</p>
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
