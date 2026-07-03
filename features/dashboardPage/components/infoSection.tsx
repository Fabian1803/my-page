'use client'
import { EditorContent } from '@tiptap/react'
import {
    MdFormatBold,
    MdFormatItalic,
    MdFormatListBulleted,
    MdFormatListNumbered,
    MdImage,
    MdVideoLibrary,
    MdTitle
} from 'react-icons/md'
import DetailedImageModal from './detailedImageModal'
import { useInfoSection } from './hooks/useInfoSection'

interface InfoSectionProps {
    htmlContent: string
    setHtmlContent: (value: string) => void
    proyectoNombre: string;
    proyectoDescripcion: string;
    proyectoTags: string[];
    indexSeccion: number;
}

export default function InfoSection({ htmlContent, setHtmlContent, proyectoNombre, proyectoDescripcion, proyectoTags, indexSeccion }: InfoSectionProps) {
    const { isImageModalOpen, setIsImageModalOpen, fileVideoRef, handleVideoUploadDirect, handleSaveMultimediaFromModal, editor } = useInfoSection(htmlContent, setHtmlContent)
    if (!editor) return null
    return (
        <div className="flex flex-col gap-1.5 border-t border-gray-100 pt-4">
            <div className="w-full flex flex-col border border-[#747775] rounded-xl overflow-hidden bg-white">
                <div className="flex flex-wrap items-center gap-1 bg-gray-50 border-b border-[#dadce0] p-1.5 select-none">
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
                <EditorContent editor={editor} style={{ minHeight: '180px' }} />
            </div>
            <DetailedImageModal
                isOpen={isImageModalOpen}
                onClose={() => setIsImageModalOpen(false)}
                onSave={handleSaveMultimediaFromModal}
                id="modal-editor-multimedia"
                sugerenciaNombre={proyectoNombre ? `${proyectoNombre} imagen ${indexSeccion}` : ''}
                sugerenciaDescripcion={proyectoDescripcion}
                sugerenciaTags={proyectoTags}
                bloquearIcono={true}
            />
        </div>
    )
}