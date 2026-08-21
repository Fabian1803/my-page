'use client'
import React from 'react'
import Link from 'next/link'
import { MdDelete, MdContentCopy, MdCheck, MdEdit } from 'react-icons/md'
import { FaStar, FaRegStar } from 'react-icons/fa'
import { TagItem } from '../services/tagServices'

interface TagsMobileListProps {
    tags: TagItem[];
    isLoading: boolean;
    skeletons: number[];
    selectedIds: string[];
    copiedId: string | null;
    isAllSelected: boolean;
    onSelectRow: (id: string) => void;
    onSelectAll: () => void;
    onCopyId: (id: string) => void;
    onToggleDestacado: (id: string) => void;
    onDeleteTag: (id: string, nombre: string) => void;
}

export default function TagsMobileList({
    tags,
    isLoading,
    skeletons,
    selectedIds,
    copiedId,
    isAllSelected,
    onSelectRow,
    onSelectAll,
    onCopyId,
    onToggleDestacado,
    onDeleteTag
}: TagsMobileListProps) {
    return (
        <div className="sm:hidden flex-1 overflow-y-auto divide-y divide-[#dadce0]">
            {/* Checkbox de selección global en móvil */}
            {!isLoading && tags.length > 0 && (
                <div className="px-3.5 py-2 bg-[#f8f9fa] flex items-center justify-between text-xs text-gray-600 font-medium border-b border-[#dadce0]">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isAllSelected}
                            onChange={onSelectAll}
                            className="w-4 h-4 rounded-xs border-gray-400 text-[#1a73e8] focus:ring-0 cursor-pointer accent-[#1a73e8]"
                        />
                        <span>Seleccionar todo ({selectedIds.length}/{tags.length})</span>
                    </label>
                </div>
            )}

            {/* Skeletons para móvil */}
            {isLoading && tags.length === 0 && skeletons.map((id) => (
                <div key={id} className="p-3.5 space-y-2.5 animate-pulse bg-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className="w-4 h-4 bg-gray-200 rounded-xs" />
                            <div className="w-7 h-7 bg-gray-200 rounded-md" />
                            <div className="h-4 bg-gray-200 rounded w-28" />
                        </div>
                        <div className="flex gap-2">
                            <div className="w-6 h-6 bg-gray-200 rounded-full" />
                            <div className="w-6 h-6 bg-gray-200 rounded-full" />
                        </div>
                    </div>
                    <div className="h-3 bg-gray-200 rounded w-48 ml-7" />
                    <div className="flex justify-between items-center ml-7 pt-1">
                        <div className="h-4 bg-gray-200 rounded w-20" />
                        <div className="h-4 bg-gray-200 rounded w-16" />
                    </div>
                </div>
            ))}

            {/* Items de lista móvil estilo GCP */}
            {!isLoading && tags.map((tag) => (
                <div key={tag.id} className="p-3.5 hover:bg-[#f8f9fa] transition-colors space-y-2 bg-white">
                    {/* Fila superior: Checkbox, Logo, Nombre, Acciones */}
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                            <input
                                type="checkbox"
                                checked={selectedIds.includes(tag.id)}
                                onChange={() => onSelectRow(tag.id)}
                                className="w-4 h-4 rounded-xs border-gray-400 text-[#1a73e8] focus:ring-0 cursor-pointer accent-[#1a73e8] shrink-0"
                            />
                            <div className="w-7 h-7 rounded bg-gray-50 border border-gray-200 p-0.5 flex items-center justify-center shrink-0">
                                <img
                                    src={tag.imagenUrl}
                                    alt={tag.nombre}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                            <Link
                                href={`/dashboard/etiquetas/${tag.id}`}
                                className="font-medium text-sm text-[#202124] hover:text-[#1a73e8] hover:underline truncate"
                            >
                                {tag.nombre}
                            </Link>
                            {tag.destacado && (
                                <FaStar size={13} className="text-yellow-400 shrink-0" />
                            )}
                        </div>

                        {/* Botones de acción móvil */}
                        <div className="flex items-center gap-1 shrink-0">
                            <button
                                type="button"
                                onClick={() => onToggleDestacado(tag.id)}
                                className={`p-1.5 rounded hover:bg-gray-100 cursor-pointer ${
                                    tag.destacado ? 'text-yellow-500' : 'text-gray-400'
                                }`}
                                title={tag.destacado ? "Destacada" : "Marcar como destacada"}
                            >
                                {tag.destacado ? <FaStar size={16} /> : <FaRegStar size={16} />}
                            </button>
                            <Link
                                href={`/dashboard/etiquetas/${tag.id}`}
                                className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-[#1a73e8] transition-colors"
                                title="Editar recurso"
                            >
                                <MdEdit size={16} />
                            </Link>
                            <button
                                type="button"
                                onClick={() => onDeleteTag(tag.id, tag.nombre)}
                                className="p-1.5 rounded hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
                                title="Eliminar"
                            >
                                <MdDelete size={17} />
                            </button>
                        </div>
                    </div>

                    {/* Fila intermedia: ID de recurso con botón para copiar */}
                    <div className="flex items-center justify-between text-xs text-gray-500 pl-7">
                        <span className="font-mono truncate max-w-[210px] text-[11px] bg-gray-50 px-1.5 py-0.5 rounded border border-gray-200">
                            {tag.id}
                        </span>
                        <button
                            type="button"
                            onClick={() => onCopyId(tag.id)}
                            className="text-gray-400 hover:text-[#1a73e8] flex items-center gap-1 cursor-pointer text-xs"
                            title="Copiar ID completo"
                        >
                            {copiedId === tag.id ? (
                                <span className="text-green-600 font-sans text-xs flex items-center gap-1 font-medium">
                                    <MdCheck size={13} /> ¡Copiado!
                                </span>
                            ) : (
                                <span className="flex items-center gap-1 hover:text-[#1a73e8]">
                                    <MdContentCopy size={13} /> Copiar
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Fila inferior: Estado de destacado y estado Activo */}
                    <div className="flex items-center justify-between text-xs pt-1 pl-7">
                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                            tag.destacado
                                ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                                : 'bg-gray-100 text-gray-600'
                        }`}>
                            {tag.destacado ? 'Destacada (Principal)' : 'Estándar'}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                            Activo
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}
