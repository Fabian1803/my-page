'use client'
import { useState, useRef, useEffect } from 'react'

export interface Certificate {
    id: string;
    nombre: string;
    institucion: string;
    descripcion: string;
    imageBase64: string;
    bullets: string[];
    tags: string[]; // CORREGIDO: Añadido al modelo de datos
}

export function useCertificates() {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [nombre, setNombre] = useState('')
    const [institucion, setInstitucion] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [imageBase64, setImageBase64] = useState('')
    const [bullets, setBullets] = useState<string[]>([])
    const [currentBullet, setCurrentBullet] = useState('')
    const [tags, setTags] = useState<string[]>([]) // Estado local controlado

    // Listado en memoria dinámico (con tags iniciales vacíos para que no rompa)
    const [certificados, setCertificados] = useState<Certificate[]>([
        {
            id: '1',
            nombre: 'Corelia IA - Specialist',
            institucion: 'Universidad Tecnológica del Perú',
            descripcion: 'Sistema de inventarios basado en microservicios con Spring Boot, NestJS, Kong y Gemini API.',
            imageBase64: '/Flog.webp',
            bullets: ['Arquitectura dirigida por eventos', 'Pasarela de autenticación con Kong Gateway'],
            tags: ['Spring Boot', 'NestJS', 'Cloud']
        },
        {
            id: '2',
            nombre: 'Foro Hub API Rest',
            institucion: 'Universidad Tecnológica del Perú',
            descripcion: 'REST API construida con Spring Boot, Spring Security para autenticación JWT y Flyway.',
            imageBase64: '/Flog.webp',
            bullets: ['Migraciones controladas con base de datos', 'Seguridad por tokens JWT asíncronos'],
            tags: ['Java', 'Spring Boot']
        },
        {
            id: '3',
            nombre: 'Vision Transformer Deforestation',
            institucion: 'Universidad Tecnológica del Perú',
            descripcion: 'Modelo de Deep Learning basado en Vision Transformers (ViT) diseñado para la detección temprana de la deforestación mediante análisis de imágenes satelitales.',
            imageBase64: '/Flog.webp',
            bullets: [],
            tags: ['Python']
        }
    ])

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 600)
        return () => clearTimeout(timer)
    }, [])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => setImageBase64(reader.result as string)
            reader.readAsDataURL(file)
        }
    }

    const handleAddBullet = () => {
        if (!currentBullet.trim()) return
        setBullets(prev => [...prev, currentBullet.trim()])
        setCurrentBullet('')
    }

    const handleRemoveBullet = (indexToRemove: number) => {
        setBullets(prev => prev.filter((_, idx) => idx !== indexToRemove))
    }

    // Abre el modal en modo "Crear" limpiando los estados
    const handleCreateClick = () => {
        setEditingId(null)
        setNombre('')
        setInstitucion('')
        setDescripcion('')
        setImageBase64('')
        setBullets([])
        setTags([]) // Limpiar tags antiguos
        setIsModalOpen(true)
    }

    // Carga la info de la tarjeta y abre el formulario para actualizar
    const handleEditClick = (cert: Certificate) => {
        setEditingId(cert.id)
        setNombre(cert.nombre)
        setInstitucion(cert.institucion)
        setDescripcion(cert.descripcion)
        setImageBase64(cert.imageBase64)
        setBullets([...cert.bullets])
        setTags([...cert.tags]) // CORREGIDO: Copia de seguridad controlada de las etiquetas existentes
        setIsModalOpen(true)
    }

    // Procesa tanto la inserción como la actualización lógica
    const handleSaveCertificate = (e: React.FormEvent) => {
        e.preventDefault()
        if (!nombre || !institucion) return

        if (editingId) {
            // Modo Edición
            setCertificados(prev => prev.map(c => c.id === editingId ? {
                ...c,
                nombre,
                institucion,
                descripcion,
                imageBase64,
                bullets,
                tags // CORREGIDO: Mapea los tags editados
            } : c))
        } else {
            // Modo Creación
            const newCert: Certificate = {
                id: crypto.randomUUID(),
                nombre,
                institucion,
                descripcion,
                imageBase64: imageBase64 || '/Flog.webp',
                bullets,
                tags // CORREGIDO: Guarda los tags asignados
            }
            setCertificados(prev => [newCert, ...prev])
        }

        setIsModalOpen(false)
        setEditingId(null)
        setNombre('')
        setInstitucion('')
        setDescripcion('')
        setImageBase64('')
        setBullets([])
        setTags([]) // Reset al salir
    }

    return {
        isLoading,
        isModalOpen,
        setIsModalOpen,
        editingId,
        nombre,
        setNombre,
        institucion,
        setInstitucion,
        descripcion,
        setDescripcion,
        imageBase64,
        bullets,
        currentBullet,
        setCurrentBullet,
        tags,        // CORREGIDO: Expuesto para ser consumido en el padre
        setTags,     // CORREGIDO: Expuesto para ser consumido en el padre
        certificados,
        fileInputRef,
        handleFileChange,
        handleAddBullet,
        handleRemoveBullet,
        handleCreateClick,
        handleEditClick,
        handleSaveCertificate
    }
}