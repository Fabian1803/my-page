import { useRef, useState } from 'react'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ImageExtension from '@tiptap/extension-image'
import { convertImagesToCodepedia, fileToBase64 } from '../utils/editorUtils'

export function useUnifiedEditor(value: string, onChange: (html: string) => void) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    
    // Estados del modal flotante
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const [modalDescription, setModalDescription] = useState('')
    const [modalImageBase64, setModalImageBase64] = useState('')

    // Inicialización y configuración de TipTap
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [1, 2, 3] },
                bulletList: { keepMarks: true },
                orderedList: { keepMarks: true }
            }),
            ImageExtension.configure({
                allowBase64: true,
            }),
        ],
        content: value,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            const rawHtml = editor.getHTML()
            const processedHtml = convertImagesToCodepedia(rawHtml)
            onChange(processedHtml)
        },
        editorProps: {
            attributes: {
                className: 'tiptap focus:outline-none min-h-[220px] px-5 py-4 text-gray-900 bg-white rounded-b-xl',
            },
        },
    })

    // Manejador del explorador de archivos local
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            try {
                const base64 = await fileToBase64(file)
                setModalImageBase64(base64)
            } catch (error) {
                console.error("Error al procesar la imagen de la galería:", error)
            }
        }
    }

    // Inserción final en el lienzo de texto
    const handleInsertImage = () => {
        if (!editor || !modalImageBase64) return

        editor.chain().focus().insertContent({
            type: 'image',
            attrs: {
                src: modalImageBase64,
                alt: modalTitle, 
                'data-title': modalTitle, 
                'data-description': modalDescription 
            }
        }).run()

        // Limpieza de estados
        setIsModalOpen(false)
        setModalTitle('')
        setModalDescription('')
        setModalImageBase64('')
    }

    return {
        editor,
        fileInputRef,
        isModalOpen,
        setIsModalOpen,
        modalTitle,
        setModalTitle,
        modalDescription,
        setModalDescription,
        modalImageBase64,
        handleFileChange,
        handleInsertImage
    }
}