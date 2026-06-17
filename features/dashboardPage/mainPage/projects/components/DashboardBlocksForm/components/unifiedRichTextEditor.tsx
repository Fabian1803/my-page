'use client'
import React from 'react'
import { MdFormatBold, MdFormatItalic, MdFormatListBulleted, MdFormatListNumbered, MdFormatClear, MdImage } from 'react-icons/md'
import { EditorContent } from '@tiptap/react'
import { useUnifiedEditor } from '../hooks/useUnifiedEditor'
import ImageInsertionModal from './imageInsertionModal'

interface UnifiedRichTextEditorProps {
    value: string;
    onChange: (html: string) => void;
}

export default function UnifiedRichTextEditor({ value, onChange }: UnifiedRichTextEditorProps) {
    const {
        editor, fileInputRef, isModalOpen, setIsModalOpen,
        modalTitle, setModalTitle, modalDescription, setModalDescription,
        modalImageBase64, handleFileChange, handleInsertImage
    } = useUnifiedEditor(value, onChange)

    if (!editor) return null

    // Configuración estática de los botones de la barra de herramientas
    const toolbarActions = [
        { label: 'H1', action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: editor.isActive('heading', { level: 1 }), title: 'Título Grande (H1)' },
        { label: 'H2', action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive('heading', { level: 2 }), title: 'Subtítulo (H2)' },
        { label: 'H3', action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: editor.isActive('heading', { level: 3 }), title: 'Sección (H3)' },
        { divider: true },
        { icon: <MdFormatBold size={20} />, action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive('bold'), title: 'Negrita' },
        { icon: <MdFormatItalic size={20} />, action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive('italic'), title: 'Cursiva' },
        { divider: true },
        { icon: <MdFormatListBulleted size={20} />, action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive('bulletList'), title: 'Viñetas (Puntos)' },
        { icon: <MdFormatListNumbered size={20} />, action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive('orderedList'), title: 'Lista Numerada' },
    ]

    const getBtnClass = (isActive: boolean) => 
        `p-2 rounded-lg transition-colors ${isActive ? 'bg-[#e8f0fe] text-[#0b57d0]' : 'text-[#5f6368] hover:bg-gray-100'}`

    return (
        <div className="border border-[#747775] rounded-xl overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#0b57d0] focus-within:border-transparent transition-all">
            
            <div className="flex flex-wrap items-center gap-1 bg-[#f8f9fa] border-b border-[#dadce0] p-2">
                {toolbarActions.map((item, idx) => {
                    if (item.divider) return <div key={`div-${idx}`} className="w-[1px] h-5 bg-gray-300 mx-1" />
                    
                    return (
                        <button key={`btn-${idx}`} type="button" onClick={item.action} className={getBtnClass(item.active || false)} title={item.title}>
                            {item.icon ? item.icon : <span className="font-bold text-xs">{item.label}</span>}
                        </button>
                    )
                })}

                <div className="w-[1px] h-5 bg-gray-300 mx-1" />

                <button type="button" onClick={() => setIsModalOpen(true)} className="p-2 text-green-600 hover:bg-gray-100 rounded-lg" title="Insertar Imagen Destacada">
                    <MdImage size={20} />
                </button>

                <button type="button" onClick={() => editor.chain().focus().unsetAllMarks().run()} className="p-2 text-[#5f6368] hover:bg-gray-100 rounded-lg ml-auto" title="Limpiar Formato">
                    <MdFormatClear size={20} />
                </button>
            </div>
            
            <EditorContent editor={editor} />

            <ImageInsertionModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalTitle}
                setTitle={setModalTitle}
                description={modalDescription}
                setDescription={setModalDescription}
                imageBase64={modalImageBase64}
                fileInputRef={fileInputRef}
                onFileChange={handleFileChange}
                onInsert={handleInsertImage}
            />
        </div>
    )
}