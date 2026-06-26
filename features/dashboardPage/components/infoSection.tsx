'use client'
import React, { useState, useRef } from 'react'
import { useEditor, EditorContent, Node } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { 
    MdFormatBold, 
    MdFormatItalic, 
    MdFormatListBulleted, 
    MdFormatListNumbered, 
    MdImage, 
    MdVideoLibrary, 
    MdTitle 
} from 'react-icons/md'

// IMPORTAMOS TU MODAL DE IMAGEN DETALLADO REUTILIZABLE Y SU INTERFAZ
import DetailedImageModal, { DetailedImageData } from './detailedImageModal'

// 1. EXTENSIÓN PERSONALIZADA PARA MANEJAR LA ETIQUETA <VIDEO> NATIVA EN TIPTAP
const VideoExtension = Node.create({
    name: 'video',
    group: 'block',
    selectable: true,
    draggable: true,
    atom: true,

    addAttributes() {
        return {
            src: { default: null },
        }
    },

    parseHTML() {
        return [{ tag: 'video[src]' }]
    },

    renderHTML({ HTMLAttributes }) {
        return [
            'video', 
            { 
                ...HTMLAttributes, 
                controls: true, 
                class: 'w-full max-h-[400px] rounded-lg my-4 border border-gray-200 block bg-black' 
            }
        ]
    },

    addCommands() {
        return {
            setVideo: (options: { src: string }) => ({ commands }: { commands: any }) => {
                return commands.insertContent({
                    type: this.name,
                    attrs: options,
                })
            },
        } as any
    },
})

interface InfoSectionProps {
    htmlContent: string // Almacena el JSON estructurado serializado en string
    setHtmlContent: (value: string) => void
}

export default function InfoSection({ htmlContent, setHtmlContent }: InfoSectionProps) {
    // Estado para controlar la apertura de TU modal detallado desde Tiptap
    const [isImageModalOpen, setIsImageModalOpen] = useState(false)
    
    // Referencia para el input oculto de videos directos
    const fileVideoRef = useRef<HTMLInputElement>(null)

    // 2. CONFIGURACIÓN COMPLETA DEL MOTOR DE TIPTAP
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'max-w-full h-auto rounded-lg my-2 border border-gray-200 block',
                },
            }),
            VideoExtension, // Inyectamos el soporte de video local
        ],
        content: htmlContent ? JSON.parse(htmlContent) : '',
        editorProps: {
            attributes: {
                class: 'w-full min-h-[180px] max-h-[350px] px-4 py-3 text-sm focus:outline-none overflow-y-auto prose prose-sm max-w-none focus:ring-0 prose-h1:text-xl prose-h1:font-bold prose-h1:mt-2 prose-h1:mb-1 prose-h2:text-lg prose-h2:font-semibold prose-h2:mt-2 prose-h2:mb-1 prose-h3:text-base prose-h3:font-medium prose-h3:mt-1 prose-h3:mb-1 prose-ul:list-disc prose-ul:pl-5 prose-ul:my-1 prose-ol:list-decimal prose-ol:pl-5 prose-ol:my-1 prose-p:my-1 base-editor-style',
                'data-placeholder': 'Escribe aquí, inserta títulos, listas o sube elementos multimedia...',
            },
        },
        onUpdate: ({ editor }) => {
            const jsonStructure = editor.getJSON()
            setHtmlContent(JSON.stringify(jsonStructure))
        },
    })

    // 3. FLUJO PARA LA IMAGEN: SE FILTRA DESDE TU MODAL DETALLADO
    const handleSaveMultimediaFromModal = async (data: DetailedImageData) => {
        const file = data.imagen
        if (!file) return

        const formData = new FormData()
        formData.append('file', file)

        try {
            const response = await fetch('/api/upload-storage', {
                method: 'POST',
                body: formData
            })

            if (!response.ok) throw new Error('Error al subir imagen al servidor')

            const responseData = await response.json()
            const urlServidorDedidado = responseData.url 

            if (editor) {
                editor.chain().focus().setImage({ src: urlServidorDedidado }).run()
            }
        } catch (error) {
            console.error('Error subiendo imagen al servidor dedicado:', error)
            alert('No se pudo guardar la imagen en el editor.')
        }
    }

    // 4. FLUJO PARA EL VIDEO: SUBIDA DIRECTA SIN PASAR POR NINGÚN MODAL DE INFO
    const handleVideoUploadDirect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const formData = new FormData()
        formData.append('file', file)

        try {
            const response = await fetch('/api/upload-storage', {
                method: 'POST',
                body: formData
            })

            if (!response.ok) throw new Error('Error al subir video al servidor')

            const responseData = await response.json()
            const urlServidorVideo = responseData.url 

            if (editor) {
                (editor.chain().focus() as any).setVideo({ src: urlServidorVideo }).run()
            }
        } catch (error) {
            console.error('Error subiendo video al servidor dedicado:', error)
            alert('No se pudo cargar el video en el editor.')
        }
        
        e.target.value = '' // Reseteamos el input
    }

    if (!editor) return null

    return (
        <div className="flex flex-col gap-1.5 border-t border-gray-100 pt-4">
            <div className="w-full flex flex-col border border-[#747775] rounded-xl overflow-hidden bg-white">
                
                {/* BARRA DE HERRAMIENTAS */}
                <div className="flex flex-wrap items-center gap-1 bg-gray-50 border-b border-[#dadce0] p-1.5 select-none">
                    
                    {/* ENCABEZADOS Y TEXTO NORMAL */}
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={`p-1 px-1.5 rounded text-xs font-bold transition-colors flex items-center gap-0.5 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-300 text-black' : 'hover:bg-gray-200 text-gray-700'}`}
                        title="Título 1"
                    >
                        <MdTitle size={14} />1
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={`p-1 px-1.5 rounded text-xs font-bold transition-colors flex items-center gap-0.5 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-300 text-black' : 'hover:bg-gray-200 text-gray-700'}`}
                        title="Título 2"
                    >
                        <MdTitle size={14} />2
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={`p-1 px-1.5 rounded text-xs font-bold transition-colors flex items-center gap-0.5 ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-300 text-black' : 'hover:bg-gray-200 text-gray-700'}`}
                        title="Título 3"
                    >
                        <MdTitle size={14} />3
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().setParagraph().run()}
                        className={`p-1 px-1.5 rounded text-xs transition-colors ${editor.isActive('paragraph') ? 'bg-gray-300 text-black' : 'hover:bg-gray-200 text-gray-500'}`}
                        title="Texto Normal"
                    >
                        Texto
                    </button>

                    <div className="w-[1px] h-4 bg-gray-300 mx-1" />

                    {/* FORMATOS DE TEXTO LIBRE */}
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={`p-1.5 rounded transition-colors ${editor.isActive('bold') ? 'bg-gray-300 text-black' : 'hover:bg-gray-200 text-gray-700'}`}
                        title="Negrita"
                    >
                        <MdFormatBold size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={`p-1.5 rounded transition-colors ${editor.isActive('italic') ? 'bg-gray-300 text-black' : 'hover:bg-gray-200 text-gray-700'}`}
                        title="Itálica"
                    >
                        <MdFormatItalic size={16} />
                    </button>
                    
                    {/* LISTAS FLUIDAS */}
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={`p-1.5 rounded transition-colors ${editor.isActive('bulletList') ? 'bg-gray-300 text-black' : 'hover:bg-gray-200 text-gray-700'}`}
                        title="Viñetas de Puntos"
                    >
                        <MdFormatListBulleted size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={`p-1.5 rounded transition-colors ${editor.isActive('orderedList') ? 'bg-gray-300 text-black' : 'hover:bg-gray-200 text-gray-700'}`}
                        title="Numeración"
                    >
                        <MdFormatListNumbered size={16} />
                    </button>

                    <div className="w-[1px] h-4 bg-gray-300 mx-1" />

                    {/* BOTÓN IMAGEN: Abre tu modal detallado */}
                    <button
                        type="button"
                        onClick={() => setIsImageModalOpen(true)}
                        className="p-1.5 rounded hover:bg-gray-200 text-blue-600 transition-colors"
                        title="Cargar Imagen (Vía Modal)"
                    >
                        <MdImage size={16} />
                    </button>

                    {/* BOTÓN VIDEO: Carga directa e independiente */}
                    <button
                        type="button"
                        onClick={() => fileVideoRef.current?.click()}
                        className="p-1.5 rounded hover:bg-gray-200 text-purple-600 transition-colors"
                        title="Subir Video Directo (.mp4)"
                    >
                        <MdVideoLibrary size={16} />
                    </button>
                    <input 
                        type="file" 
                        ref={fileVideoRef} 
                        onChange={handleVideoUploadDirect} 
                        accept="video/*" 
                        className="hidden" 
                    />
                </div>

                {/* CONTENEDOR PRINCIPAL CONTROLADO POR TIPTAP */}
                <EditorContent editor={editor} style={{ minHeight: '180px' }} />
            </div>

            {/* INTEGRACIÓN DE TU MODAL DETALLADO SÓLO PARA IMÁGENES */}
            <DetailedImageModal 
                isOpen={isImageModalOpen}
                onClose={() => setIsImageModalOpen(false)}
                onSave={handleSaveMultimediaFromModal}
                id="modal-editor-multimedia"
            />
        </div>
    )
}