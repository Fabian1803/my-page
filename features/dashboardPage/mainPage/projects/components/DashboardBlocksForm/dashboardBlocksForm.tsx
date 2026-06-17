'use client'
import React from 'react'
import { MdAdd, MdDelete } from 'react-icons/md'
import UnifiedRichTextEditor from './components/unifiedRichTextEditor'

interface ContentBlock {
    id: string;
    content: string;
}

interface DashboardBlocksFormProps {
    contentBlocks: ContentBlock[];
    onAddBlock: () => void;
    onBlockChange: (id: string, content: string) => void;
    onRemoveBlock: (id: string) => void;
}

export default function DashboardBlocksForm({
    contentBlocks,
    onAddBlock,
    onBlockChange,
    onRemoveBlock
}: DashboardBlocksFormProps) {
    return (
        <div className="pt-2 border-t border-gray-100">
            
            {/* CORREGIDO: Cabecera adaptable. flex-col en móviles, sm:flex-row en pantallas más grandes */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
                <div>
                    <label className="block text-sm font-medium text-[#3c4043]">
                        Secciones de Documentación
                    </label>
                    <p className="text-xs text-[#5f6368] mt-0.5">
                        Cada bloque representa un capítulo o sección de tu proyecto.
                    </p>
                </div>
                {/* La píldora se alinea a la izquierda en móvil de forma natural o a la derecha en sm */}
                <span className={`w-fit text-xs font-bold px-2.5 py-0.5 rounded-full ${contentBlocks.length >= 7 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                    {contentBlocks.length}/7 bloques
                </span>
            </div>

            {/* CORREGIDO: Botón estirado al 100% en móviles para facilitar el toque táctil */}
            <div className="mb-4">
                <button
                    type="button"
                    onClick={onAddBlock}
                    disabled={contentBlocks.length >= 7}
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 border border-[#747775] text-[#0b57d0] text-sm font-semibold rounded-xl bg-white hover:bg-blue-50/50 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <MdAdd size={18} />
                    Añadir Sección de Texto
                </button>
            </div>

            {/* Renderizado de la lista dinámica */}
            {contentBlocks.length > 0 ? (
                <div className="space-y-4">
                    {contentBlocks.map((block, index) => (
                        /* CORREGIDO: Ajuste de padding responsivo (p-3 en móviles, p-4 en sm) para darle el máximo espacio posible al editor interno */
                        <div key={block.id} className="relative bg-[#f8f9fa] border border-[#dadce0] p-3 sm:p-4 rounded-2xl flex flex-col gap-3 w-full overflow-hidden">
                            
                            <div className="flex justify-between items-center text-xs text-[#5f6368] font-medium">
                                <span className="bg-white px-2.5 py-1 border border-[#dadce0] rounded-lg shadow-sm font-semibold">
                                    Sección #{index + 1}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => onRemoveBlock(block.id)}
                                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-white border border-transparent hover:border-red-200 rounded-lg transition-colors shrink-0"
                                    title="Eliminar bloque"
                                >
                                    <MdDelete size={18} />
                                </button>
                            </div>

                            {/* El editor interno ya se adapta al ancho de este contenedor de forma fluida */}
                            <UnifiedRichTextEditor 
                                value={block.content} 
                                onChange={(html) => onBlockChange(block.id, html)} 
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8 border border-dashed border-gray-300 rounded-2xl text-sm text-gray-400 bg-gray-50/50 px-4">
                    No has añadido ninguna sección para la documentación de tu proyecto todavía.
                </div>
            )}
        </div>
    )
}