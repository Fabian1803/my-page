'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { projectServices, ProjectLink, ContentBlock } from '@/features/dashboardPage/mainPage/projects/services/projectServices'
import { useNotifications } from '@/features/dashboardPage/context/NotificationContext'

export const PROJECT_COSTS: Record<string, { item: string; itemCost: string; total: string }> = {
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

export function useProjectForm() {
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
    const [activeField, setActiveField] = useState<string>('Nombre del proyecto')

    // Almacenamiento en memoria de archivos binarios subidos dentro del editor Tiptap
    const tiptapFilesRef = useRef<Map<string, File>>(new Map())

    useEffect(() => {
        if (!isEditing || !projectId) return

        const fetchProject = async () => {
            try {
                const result = await projectServices.getById(projectId)
                if (result.success && result.data) {
                    const proy = result.data
                    setNombre(proy.nombre || '')
                    setDescripcion(proy.descripcion || '')
                    setEsDestacado(Boolean(proy.destacado))
                    setInitialImageUrl(proy.imagenPrincipalUrl || null)
                    setCompTags((proy.categorias || []).map((c: any) => typeof c === 'string' ? c : c.nombre))
                    setDynamicLinks(proy.enlaces || [])

                    if (proy.seccionesDoc && proy.seccionesDoc.length > 0) {
                        setContentBlocks(proy.seccionesDoc.map((s: any, idx: number) => ({
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
            }
        }

        fetchProject()
    }, [isEditing, projectId, router])

    const costosActuales = PROJECT_COSTS[activeField] || PROJECT_COSTS['default']

    const handleAddBlock = () => {
        const newBlock: ContentBlock = {
            id: crypto.randomUUID(),
            content: ''
        };
        setContentBlocks(prev => [...prev, newBlock]);
    };

    const handleRemoveBlock = (id: string) => {
        setContentBlocks(prev => prev.filter(block => block.id !== id));
    };

    const handleBlockChange = (id: string, value: string) => {
        setContentBlocks(prev => prev.map(block =>
            block.id === id ? { ...block, content: value } : block
        ));
    };

    const handleRegisterTiptapFile = (fileId: string, file: File) => {
        tiptapFilesRef.current.set(fileId, file);
    };

    const handleAddLink = (type: 'github' | 'docker' | 'gitlab' | 'web') => {
        const newLink: ProjectLink = {
            id: crypto.randomUUID(),
            type,
            url: ''
        };
        setDynamicLinks(prev => [...prev, newLink]);
    };

    const handleUrlChange = (id: string, value: string) => {
        setDynamicLinks(prev => prev.map(link =>
            link.id === id ? { ...link, url: value } : link
        ));
    };

    const handleRemoveLink = (id: string) => {
        setDynamicLinks(prev => prev.filter(link => link.id !== id));
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

    return {
        isEditing,
        nombre,
        setNombre,
        descripcion,
        setDescripcion,
        fotoFile,
        setFotoFile,
        initialImageUrl,
        setInitialImageUrl,
        compTags,
        setCompTags,
        compBullets,
        setCompBullets,
        dynamicLinks,
        contentBlocks,
        esDestacado,
        setEsDestacado,
        loading,
        activeField,
        setActiveField,
        costosActuales,
        handleAddBlock,
        handleRemoveBlock,
        handleBlockChange,
        handleRegisterTiptapFile,
        handleAddLink,
        handleUrlChange,
        handleRemoveLink,
        handleSubmit
    }
}
