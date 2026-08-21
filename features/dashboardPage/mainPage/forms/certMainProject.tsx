'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import {
    InputCloud,
    InputImageCloud,
    TextAreaCloud,
    TagSelector,
    VignetteInput
} from './components'
import LinksProyect from './components/LinksProyect'
import DocumentationSectionsCloud from './components/DocumentationSectionsCloud'
import CloudResourceContainer from './layout/CloudResourceContainer'
import { MdStar, MdCheck } from 'react-icons/md'
import { projectServices, ProjectLink, ContentBlock } from '../projects/services/projectServices'
import { useNotifications } from '@/features/dashboardPage/context/NotificationContext'

const COSTOS_POR_CAMPO: Record<string, { item: string; itemCost: string; total: string }> = {
    'Nombre del proyecto': { item: "E2 Standard vCPU Provisioning", itemCost: "$25.40", total: "$36,738.90" },
    'Descripción': { item: "Cloud Storage Bucket Metadata", itemCost: "$0.15", total: "$36,713.65" },
    'Categoría': { item: "Global VPC Network Tag Routing", itemCost: "$7.30", total: "$36,720.80" },
    'Viñetas': { item: "Artifact Registry Streaming Logs", itemCost: "$3.80", total: "$36,717.30" },
    'Imagen del proyecto': { item: "SSD Persistent Disk (Source Image)", itemCost: "$17.00", total: "$36,730.50" },
    'Enlaces': { item: "External Load Balancer IP Frontend", itemCost: "$14.60", total: "$36,728.10" },
    'Documentación': { item: "Cloud Run Instance Cache Layer", itemCost: "$5.20", total: "$36,718.70" },
    'Visibilidad y Estado': { item: "Featured Project Global Sync", itemCost: "$4.10", total: "$36,717.60" },
    'default': { item: "Compute Node base infrastructure", itemCost: "$36,713.50", total: "$36,713.50" }
};

export default function CertMainProject() {
    const router = useRouter()
    const params = useParams()
    const { addNotification } = useNotifications()

    const projectId = params?.url as string | undefined
    const isEditing = Boolean(projectId && projectId !== 'crear' && projectId !== 'create')

    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fotoFile, setFotoFile] = useState<File | null>(null)
    const [initialImageUrl, setInitialImageUrl] = useState<string | null>(null)
    const [compTags, setCompTags] = useState<string[]>([])
    const [compBullets, setCompBullets] = useState<string[]>([])
    const [dynamicLinks, setDynamicLinks] = useState<ProjectLink[]>([])
    const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([])
    const [esDestacado, setEsDestacado] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingInitial, setLoadingInitial] = useState(isEditing)
    const [activeField, setActiveField] = useState<string>('Nombre del proyecto')

    // Almacenamiento en memoria de archivos binarios subidos dentro del editor Tiptap
    const tiptapFilesRef = useRef<Map<string, File>>(new Map())

    // Cargar datos si estamos en modo edición
    useEffect(() => {
        if (!isEditing || !projectId) {
            setLoadingInitial(false)
            return
        }

        const fetchProject = async () => {
            setLoadingInitial(true)
            try {
                const result = await projectServices.getById(projectId)
                if (result.success && result.data) {
                    const proy = result.data
                    setNombre(proy.nombre || '')
                    setDescripcion(proy.descripcion || '')
                    setEsDestacado(Boolean(proy.destacado))
                    setInitialImageUrl(proy.imagenPrincipalUrl || null)
                    setCompTags((proy.categorias || []).map(c => typeof c === 'string' ? c : c.nombre))
                    setDynamicLinks(proy.enlaces || [])

                    if (proy.seccionesDoc && proy.seccionesDoc.length > 0) {
                        setContentBlocks(proy.seccionesDoc.map((s, idx) => ({
                            id: s.id || `${projectId}-sec-${idx}`,
                            content: s.contenidoJson
                        })))
                    }
                } else {
                    alert("No se encontró el proyecto especificado.")
                    router.push('/dashboard/proyectos')
                }
            } catch (error) {
                console.error("Error al cargar proyecto:", error)
            } finally {
                setLoadingInitial(false)
            }
        }

        fetchProject()
    }, [isEditing, projectId, router])

    const costosActuales = COSTOS_POR_CAMPO[activeField] || COSTOS_POR_CAMPO['default']

    // Métodos para bloques de documentación
    const handleAddBlock = () => {
        const newBlock: ContentBlock = {
            id: crypto.randomUUID(),
            content: ''
        };
        setContentBlocks([...contentBlocks, newBlock]);
    };

    const handleRemoveBlock = (id: string) => {
        setContentBlocks(contentBlocks.filter(block => block.id !== id));
    };

    const handleBlockChange = (id: string, value: string) => {
        setContentBlocks(contentBlocks.map(block =>
            block.id === id ? { ...block, content: value } : block
        ));
    };

    const handleRegisterTiptapFile = (fileId: string, file: File) => {
        tiptapFilesRef.current.set(fileId, file)
    };

    const handleAddLink = (type: 'github' | 'docker' | 'gitlab' | 'web') => {
        const newLink: ProjectLink = {
            id: crypto.randomUUID(),
            type,
            url: ''
        };
        setDynamicLinks([...dynamicLinks, newLink]);
    };

    const handleUrlChange = (id: string, value: string) => {
        setDynamicLinks(dynamicLinks.map(link =>
            link.id === id ? { ...link, url: value } : link
        ));
    };

    const handleRemoveLink = (id: string) => {
        setDynamicLinks(dynamicLinks.filter(link => link.id !== id));
    };

    const handleSubmit = async () => {
        if (!nombre.trim()) {
            alert("Por favor introduce el nombre del proyecto.")
            return
        }

        if (!descripcion.trim()) {
            alert("Por favor introduce una breve descripción del proyecto.")
            return
        }

        if (!isEditing && !fotoFile) {
            alert("Por favor sube la imagen de portada del proyecto.")
            return
        }

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("tipo", "PROYECTO")
            formData.append("nombre", nombre.trim())
            formData.append("descripcion", descripcion.trim())
            formData.append("destacado", String(esDestacado))
            formData.append("categorias", JSON.stringify(compTags.map(t => typeof t === 'string' ? { nombre: t } : t)))
            formData.append("enlaces", JSON.stringify(dynamicLinks))
            formData.append("vinetas", JSON.stringify(compBullets.map(b => typeof b === 'string' ? { comentario: b } : b)))
            formData.append("seccionesDoc", JSON.stringify(contentBlocks.map(b => b.content)))

            if (fotoFile) {
                formData.append("imagenPrincipal", fotoFile)
            }

            // Adjuntar todos los binarios multimedia registrados en el editor Tiptap
            tiptapFilesRef.current.forEach((file, token) => {
                formData.append(`tiptap_media_${token}`, file)
            })

            let result
            if (isEditing && projectId) {
                formData.append("id", projectId)
                result = await projectServices.update(projectId, formData)
            } else {
                result = await projectServices.create(formData)
            }

            if (!result.success) throw new Error(result.error)

            addNotification({
                type: 'success',
                title: isEditing ? 'Proyecto actualizado' : 'Proyecto provisionado',
                desc: `El proyecto "${nombre.trim()}" y sus recursos multimedia se guardaron con éxito.`
            })

            router.push('/dashboard/proyectos')
        } catch (error: any) {
            addNotification({
                type: 'error',
                title: 'Error al guardar proyecto',
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
            title={isEditing ? `Editar ${nombre || 'proyecto'}` : "proyecto"}
            activeField={activeField}
            setActiveField={setActiveField}
            onSubmit={handleSubmit}
            isSubmitting={loading}
            backHref="/dashboard/proyectos"
        >
            <InputCloud
                label="Nombre del proyecto"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                onClick={() => setActiveField('Nombre del proyecto')}
                placeholder="Ej: Antigravity Cloud Engine, Portfolio Platform"
                required
            />

            <TextAreaCloud
                label="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                onClick={() => setActiveField('Descripción')}
                placeholder="Describe los objetivos, arquitectura y alcance del proyecto..."
                required
            />

            <TagSelector
                selectedTags={compTags}
                onClick={() => setActiveField('Categoría')}
                onTagsChange={setCompTags}
            />

            <VignetteInput
                bullets={compBullets}
                onClick={() => setActiveField('Viñetas')}
                onBulletsChange={setCompBullets}
            />

            <InputImageCloud
                label="Imagen de Portada del Proyecto"
                value={fotoFile}
                initialUrl={initialImageUrl}
                onChange={(file) => {
                    setFotoFile(file)
                    if (file) setInitialImageUrl(null)
                }}
                onClick={() => setActiveField('Imagen del proyecto')}
                placeholder="Haz clic para subir la imagen de portada"
                required={!isEditing}
            />

            <LinksProyect
                onClick={() => setActiveField('Enlaces')}
                dynamicLinks={dynamicLinks}
                onAddLink={handleAddLink}
                onUrlChange={handleUrlChange}
                onRemoveLink={handleRemoveLink}
            />

            <DocumentationSectionsCloud
                contentBlocks={contentBlocks}
                nombre={nombre}
                descripcion={descripcion}
                tags={compTags}
                onClick={() => setActiveField('Documentación')}
                onAddBlock={handleAddBlock}
                onRemoveBlock={handleRemoveBlock}
                onBlockChange={handleBlockChange}
                onRegisterTiptapFile={handleRegisterTiptapFile}
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
                            <p className="text-xs text-gray-500">Mostrar este proyecto en la portada y sección principal del portafolio.</p>
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
