import { Node, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useEffect, useRef, useState } from "react"
import Image from '@tiptap/extension-image'
import { DetailedImageData } from "../detailedImageModal"

const VideoExtension = Node.create({
    name: 'video',
    group: 'block',
    selectable: true,
    draggable: true,
    atom: true,

    addAttributes() {
        return { src: { default: null } }
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

export function useInfoSection(htmlContent: string, setHtmlContent: (value: string) => void, onRegisterFile: (fileId: string, file: File) => void) {
    const [isImageModalOpen, setIsImageModalOpen] = useState(false)
    const fileVideoRef = useRef<HTMLInputElement>(null)
    
    const editor = useEditor({
        extensions: [
            StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
            Image.configure({
                HTMLAttributes: { class: 'max-w-full h-auto rounded-lg my-2 border border-gray-200 block' },
            }),
            VideoExtension,
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

    useEffect(() => {
        if (editor && htmlContent) {
            try {
                const parsed = JSON.parse(htmlContent)
                if (JSON.stringify(editor.getJSON()) !== JSON.stringify(parsed)) {
                    editor.commands.setContent(parsed)
                }
            } catch (e) {
                // Si viene texto plano por alguna razón, evita romper la app
            }
        }
    }, [htmlContent, editor])
    
    const handleSaveMultimediaFromModal = (data: DetailedImageData) => {
        const fileFisico = data.imagen
        if (!fileFisico) return

        // 🚀 Token temporal único para enlazar el buffer final
        const tokenArchivo = `tiptap-media-${crypto.randomUUID()}`
        const blobUrlTemporal = URL.createObjectURL(fileFisico)

        // Enviamos el binario a la recámara en memoria del ProjectModal
        onRegisterFile(tokenArchivo, fileFisico)

        if (editor) {
            editor.chain().focus().setImage({ 
                src: blobUrlTemporal,
                alt: tokenArchivo, // Guardamos el token en el atributo alt de manera estratégica
                title: data.nombre 
            }).run()
        }
    }

    const handleVideoUploadDirect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const tokenArchivo = `tiptap-video-${crypto.randomUUID()}`
        const blobUrlTemporal = URL.createObjectURL(file)
        
        onRegisterFile(tokenArchivo, file)

        if (editor) {
            (editor.chain().focus() as any).setVideo({ src: blobUrlTemporal }).run()
        }
    }

    return {
        editor,
        isImageModalOpen,
        setIsImageModalOpen,
        handleSaveMultimediaFromModal,
        fileVideoRef,
        handleVideoUploadDirect
    }   
}