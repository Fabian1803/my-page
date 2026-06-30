import { useState, useRef, useEffect } from 'react'
import { DetailedImageData } from '../detailedImageModal';

interface UseDetailedImageModalProps {
    onSave: (data: DetailedImageData) => void;
    onClose: () => void;
    defaultData?: any | null;
}

export function useDetailedImageModal({ onSave, onClose, defaultData }: UseDetailedImageModalProps) {
    const [preview, setPreview] = useState<string | null>(null)
    const [iconPreview, setIconPreview] = useState<string | null>(null)
    const [compImgFile, setCompImgFile] = useState<File | null>(null)
    const [compNombre, setCompNombre] = useState('')
    const [compDescripcion, setCompDescripcion] = useState('')
    const [compTags, setCompTags] = useState<string[]>([])
    const [compBullets, setCompBullets] = useState<string[]>([])
    const [compIconFile, setCompFileIcon] = useState<File | null>(null)
    const [compIconNombre, setCompIconNombre] = useState('')
    const internalFileInputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        if (defaultData) {
            setCompNombre(defaultData.nombre || '')
            setCompDescripcion(defaultData.descripcion || '')
            setPreview(defaultData.imagenPrincipalUrl || null)
            setIconPreview(defaultData.miniaturaUrl || null)
            setCompIconNombre(defaultData.instituto || '')
            if (defaultData.categorias) setCompTags(defaultData.categorias.map((c: any) => c.nombre))
            if (defaultData.vinetas) setCompBullets(defaultData.vinetas.map((v: any) => v.comentario))     
        } else {
            setPreview(null)
            setIconPreview(null)
            setCompImgFile(null)
            setCompNombre('')
            setCompDescripcion('')
            setCompTags([])
            setCompBullets([])
            setCompFileIcon(null)
            setCompIconNombre('')
        }
    }, [defaultData])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        if (file) {
            setPreview(URL.createObjectURL(file))
            setCompImgFile(file)
        }
    }
    const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        if (file) {
            setIconPreview(URL.createObjectURL(file))
            setCompFileIcon(file)
        }
    }

    const handleRemoveIcon = (e: React.MouseEvent) => {
        e.preventDefault()
        setIconPreview(null)
        setCompFileIcon(null)
    }

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave({
            imagen: compImgFile,
            nombre: compNombre,
            descripcion: compDescripcion,
            tags: compTags,
            detalles: compBullets,
            entidadIcono: {
                archivo: compIconFile,
                nombre: compIconNombre
            }
        })
        setPreview(null)
        setIconPreview(null)
        setCompImgFile(null)
        setCompNombre('')
        setCompDescripcion('')
        setCompTags([])
        setCompBullets([])
        setCompFileIcon(null)
        setCompIconNombre('')

        onClose()
    }
    return {
        preview,
        iconPreview,
        compNombre,
        setCompNombre,
        compDescripcion,
        setCompDescripcion,
        compTags,
        setCompTags,
        compBullets,
        setCompBullets,
        compIconNombre,
        setCompIconNombre,
        compIconFile,
        internalFileInputRef,
        handleFileChange,
        handleIconChange,
        handleRemoveIcon,
        handleFormSubmit
    }
}