'use client'
import { EditorContent } from '@tiptap/react'
import { useRef } from 'react'
import {
    MdFormatBold,
    MdFormatItalic,
    MdFormatListBulleted,
    MdFormatListNumbered,
    MdImage,
    MdVideoLibrary,
    MdTitle
} from 'react-icons/md'
import { useInfoSection } from '../hooks/useInfoSection'

interface InfoSectionProps {
    htmlContent: string
    setHtmlContent: (value: string) => void
    proyectoNombre: string;
    proyectoDescripcion: string;
    proyectoTags: string[];
    indexSeccion: number;
    onRegisterFile: (fileId: string, file: File) => void;
}

export default function InfoSection({ htmlContent, setHtmlContent, onRegisterFile }: InfoSectionProps) {
    const { fileVideoRef, handleVideoUploadDirect, editor } = useInfoSection(htmlContent, setHtmlContent, onRegisterFile)
    const fileImageRef = useRef<HTMLInputElement>(null)
    
    if (!editor) return null
    const handleImageUploadDirect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        const fileId = crypto.randomUUID()
        onRegisterFile(fileId, file)
        const localUrl = URL.createObjectURL(file)
        editor.chain().focus().setImage({ src: localUrl, alt: file.name }).run()
        e.target.value = ''
    }

    return (
        <div className="flex flex-col gap-1.5 w-full">
            <div className="w-full flex flex-col overflow-hidden bg-white">
                <div className="flex flex-wrap items-center gap-0.5 bg-gray-50 border-b border-gray-300 p-1 select-none">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={`p-1 px-1.5 rounded-sm text-xs font-bold transition-colors flex items-center gap-0.5 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 text-black' : 'hover:bg-gray-100 text-gray-700'}`}
                        title="Título 1"
                    >
                        <MdTitle size={14} />1
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={`p-1 px-1.5 rounded-sm text-xs font-bold transition-colors flex items-center gap-0.5 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 text-black' : 'hover:bg-gray-100 text-gray-700'}`}
                        title="Título 2"
                    >
                        <MdTitle size={14} />2
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={`p-1 px-1.5 rounded-sm text-xs font-bold transition-colors flex items-center gap-0.5 ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200 text-black' : 'hover:bg-gray-100 text-gray-700'}`}
                        title="Título 3"
                    >
                        <MdTitle size={14} />3
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().setParagraph().run()}
                        className={`p-1 px-1.5 rounded-sm text-xs transition-colors ${editor.isActive('paragraph') ? 'bg-gray-200 text-black' : 'hover:bg-gray-100 text-gray-600'}`}
                        title="Texto Normal"
                    >
                        Texto
                    </button>
                    
                    <div className="w-[1px] h-4 bg-gray-300 mx-1" />
                    
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={`p-1.5 rounded-sm transition-colors ${editor.isActive('bold') ? 'bg-gray-200 text-black' : 'hover:bg-gray-100 text-gray-700'}`}
                        title="Negrita"
                    >
                        <MdFormatBold size={15} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={`p-1.5 rounded-sm transition-colors ${editor.isActive('italic') ? 'bg-gray-200 text-black' : 'hover:bg-gray-100 text-gray-700'}`}
                        title="Itálica"
                    >
                        <MdFormatItalic size={15} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={`p-1.5 rounded-sm transition-colors ${editor.isActive('bulletList') ? 'bg-gray-200 text-black' : 'hover:bg-gray-100 text-gray-700'}`}
                        title="Viñetas de Puntos"
                    >
                        <MdFormatListBulleted size={15} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={`p-1.5 rounded-sm transition-colors ${editor.isActive('orderedList') ? 'bg-gray-200 text-black' : 'hover:bg-gray-100 text-gray-700'}`}
                        title="Numeración"
                    >
                        <MdFormatListNumbered size={15} />
                    </button>
                    <div className="w-[1px] h-4 bg-gray-300 mx-1" />
                    <button
                        type="button"
                        onClick={() => fileImageRef.current?.click()}
                        className="p-1.5 rounded-sm text-[#3367d6] hover:bg-blue-50 transition-colors"
                        title="Cargar Imagen"
                    >
                        <MdImage size={15} />
                    </button>
                    <button
                        type="button"
                        onClick={() => fileVideoRef.current?.click()}
                        className="p-1.5 rounded-sm text-[#3367d6] hover:bg-blue-50 transition-colors"
                        title="Subir Video Directo (.mp4)"
                    >
                        <MdVideoLibrary size={15} />
                    </button>
                    <input
                        type="file"
                        ref={fileImageRef}
                        onChange={handleImageUploadDirect}
                        accept="image/*"
                        className="hidden"
                    />
                    <input
                        type="file"
                        ref={fileVideoRef}
                        onChange={handleVideoUploadDirect}
                        accept="video/*"
                        className="hidden"
                    />
                </div>
                <div className="px-3 py-2 text-xs text-gray-800 focus-within:outline-none bg-white min-h-[180px]">
                    <EditorContent editor={editor} />
                </div>
            </div>
        </div>
    )
}