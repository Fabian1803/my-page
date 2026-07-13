'use client'
import InfoSection from '@/features/dashboardPage/mainPage/forms/components/infoSection';
import React from 'react';
import { MdDelete, MdAdd, MdInfo } from 'react-icons/md';

interface ContentBlock {
    id: string;
    content: string;
}

interface DocumentationSectionsCloudProps {
    contentBlocks: ContentBlock[];
    onClick?: () => void;
    nombre: string;
    descripcion: string;
    tags: string[];
    onRemoveBlock: (id: string) => void;
    onBlockChange: (id: string, value: string) => void;
    onRegisterTiptapFile: (fileId: string, file: File) => void;
    onAddBlock: () => void;
}

export default function DocumentationSectionsCloud({
    contentBlocks,
    nombre,
    descripcion,
    tags,
    onRemoveBlock,
    onBlockChange,
    onRegisterTiptapFile,
    onAddBlock,
    onClick
}: DocumentationSectionsCloudProps) {
    const isLimitReached = contentBlocks.length >= 5;
    return (
        <div className="w-full mt-4 space-y-4" onClick={onClick}>
            <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-900">Secciones de documentación</h3>
                <p className="text-xs text-gray-500 font-normal">
                    Configure las secciones de contenido detallado para la documentación del certificado. Máximo 5 secciones.
                </p>
            </div>

            {contentBlocks.length > 0 ? (
                <div className="space-y-3">
                    {contentBlocks.map((block, index) => (
                        <div 
                            key={block.id} 
                            className="bg-white border border-gray-300 rounded-sm flex flex-col w-full overflow-hidden"
                        >
                            <div className="flex justify-between items-center bg-gray-50 px-4 py-2 border-b border-gray-300">
                                <span className="text-xs font-medium text-gray-700">
                                    Sección {index + 1}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => onRemoveBlock(block.id)}
                                    className="p-1 text-gray-500 hover:text-red-600 rounded-sm hover:bg-gray-200 transition-colors shrink-0 cursor-pointer"
                                    title="Eliminar bloque"
                                >
                                    <MdDelete size={16} />
                                </button>
                            </div>
                            <div className="bg-transparent">
                                <InfoSection
                                    htmlContent={block.content}
                                    setHtmlContent={(value) => onBlockChange(block.id, value)}
                                    proyectoNombre={nombre}
                                    proyectoDescripcion={descripcion}
                                    proyectoTags={tags}
                                    indexSeccion={index + 1}
                                    onRegisterFile={onRegisterTiptapFile}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-left py-4 px-4 border border-gray-300 bg-gray-50 rounded-sm text-xs text-gray-600">
                    No se han añadido secciones de documentación para este proyecto todavía.
                </div>
            )}

            <div className="flex flex-col gap-2 pt-1">
                <button
                    type="button"
                    onClick={onAddBlock}
                    disabled={isLimitReached}
                    className={`flex items-center gap-1.5 font-medium text-xs py-1 transition-colors ${
                        isLimitReached 
                            ? 'text-gray-400 cursor-not-allowed select-none' 
                            : 'text-[#3367d6] hover:text-[#2a56b9] cursor-pointer'
                    }`}
                >
                    <MdAdd size={16} />
                    <span>Añadir sección</span>
                </button>

                {/* Mensaje informativo cuando se alcanza el tope estilo GCP */}
                {isLimitReached && (
                    <div className="flex items-center gap-1.5 text-amber-600 text-[11px] font-normal">
                        <MdInfo size={14} className="shrink-0" />
                        <span>Se ha alcanzado el límite máximo de 5 secciones permitidas para este recurso.</span>
                    </div>
                )}
            </div>
        </div>
    );
}