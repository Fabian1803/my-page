'use client'
import React from 'react'
import Link from 'next/link'
import { MdDelete, MdContentCopy, MdCheck, MdEdit } from 'react-icons/md'
import { BsQuestionCircle } from 'react-icons/bs'
import { FaStar, FaRegStar } from 'react-icons/fa'
import { HiArrowUp } from 'react-icons/hi2'
import { TagItem } from '../services/tagServices'

interface TagsDesktopTableProps {
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

export default function TagsDesktopTable({
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
}: TagsDesktopTableProps) {
    return (
        <div className="hidden sm:block overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse min-w-[760px]">
                <thead className="bg-[#f8f9fa] border-b border-[#dadce0] text-[12px] font-medium text-[#202124] whitespace-nowrap">
                    <tr>
                        <th scope="col" className="w-10 px-4 py-2.5">
                            <input
                                type="checkbox"
                                checked={isAllSelected}
                                onChange={onSelectAll}
                                className="w-4 h-4 rounded-xs border-gray-400 text-[#1a73e8] focus:ring-0 cursor-pointer accent-[#1a73e8]"
                            />
                        </th>
                        <th scope="col" className="w-16 px-3 py-2.5 font-medium">Tipo</th>
                        <th scope="col" className="px-4 py-2.5 font-medium">
                            Entidad <HiArrowUp className="inline text-[13px] ml-0.5 text-gray-600" />
                        </th>
                        <th scope="col" className="px-4 py-2.5 font-medium">Nombre</th>
                        <th scope="col" className="px-4 py-2.5 font-medium">Rol</th>
                        <th scope="col" className="px-4 py-2.5 font-medium">
                            Estadísticas de seguridad <BsQuestionCircle className="inline ml-1 text-[11px] text-gray-500" />
                        </th>
                        <th scope="col" className="w-24 px-3 py-2.5 border-l border-[#dadce0]"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#dadce0] text-[13px] text-[#202124] whitespace-nowrap">
                    {/* Skeletons */}
                    {isLoading && tags.length === 0 && skeletons.map((id) => (
                        <tr key={id} className="animate-pulse">
                            <td className="w-10 px-4 py-2.5">
                                <div className="w-4 h-4 bg-gray-200 rounded-xs" />
                            </td>
                            <td className="w-16 px-3 py-2.5">
                                <div className="w-5 h-5 bg-gray-200 rounded-full" />
                            </td>
                            <td className="px-4 py-2.5">
                                <div className="h-4 bg-gray-200 rounded w-48" />
                            </td>
                            <td className="px-4 py-2.5">
                                <div className="h-4 bg-gray-200 rounded w-28" />
                            </td>
                            <td className="px-4 py-2.5">
                                <div className="h-4 bg-gray-200 rounded w-20" />
                            </td>
                            <td className="px-4 py-2.5">
                                <div className="h-4 bg-gray-200 rounded w-24" />
                            </td>
                            <td className="w-24 px-3 py-2.5 border-l border-[#dadce0] text-right">
                                <div className="h-4 w-12 bg-gray-200 rounded ml-auto" />
                            </td>
                        </tr>
                    ))}

                    {/* Filas reales */}
                    {!isLoading && tags.map((tag) => (
                        <tr key={tag.id} className="hover:bg-[#f8f9fa] transition-colors group">
                            <td className="w-10 px-4 py-2.5">
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(tag.id)}
                                    onChange={() => onSelectRow(tag.id)}
                                    className="w-4 h-4 rounded-xs border-gray-400 text-[#1a73e8] focus:ring-0 cursor-pointer accent-[#1a73e8]"
                                />
                            </td>
                            <td className="w-16 px-3 py-2.5">
                                <div className="w-5 h-5 flex items-center justify-center">
                                    <img
                                        src={tag.imagenUrl}
                                        alt={tag.nombre}
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </div>
                            </td>
                            <td className="px-4 py-2.5 font-normal text-[#202124]">
                                <div className="flex items-center gap-1.5 group/id">
                                    <span className="truncate max-w-[280px]">{tag.id}</span>
                                    <button
                                        type="button"
                                        onClick={() => onCopyId(tag.id)}
                                        className="opacity-0 group-hover/id:opacity-100 text-gray-400 hover:text-[#1a73e8] transition-opacity cursor-pointer p-0.5"
                                        title="Copiar ID completo"
                                    >
                                        {copiedId === tag.id ? (
                                            <MdCheck className="text-green-600" size={13} />
                                        ) : (
                                            <MdContentCopy size={13} />
                                        )}
                                    </button>
                                </div>
                            </td>
                            <td className="px-4 py-2.5 font-normal text-[#202124]">
                                <Link
                                    href={`/dashboard/etiquetas/${tag.id}`}
                                    className="hover:text-[#1a73e8] hover:underline font-medium"
                                >
                                    {tag.nombre}
                                </Link>
                            </td>
                            <td className="px-4 py-2.5 font-normal text-[#3c4043]">
                                {tag.destacado ? 'Destacada (Principal)' : 'Estándar'}
                            </td>
                            <td className="px-4 py-2.5">
                                <span className="inline-flex items-center gap-1.5 text-xs text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                    Activo
                                </span>
                            </td>
                            <td className="w-24 px-3 py-2.5 border-l border-[#dadce0] text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                    <button
                                        type="button"
                                        onClick={() => onToggleDestacado(tag.id)}
                                        className={`p-1 rounded hover:bg-gray-200 transition cursor-pointer ${
                                            tag.destacado ? 'text-yellow-500' : 'text-gray-400'
                                        }`}
                                        title={tag.destacado ? "Destacada" : "Marcar como destacada"}
                                    >
                                        {tag.destacado ? <FaStar size={14} /> : <FaRegStar size={14} />}
                                    </button>
                                    <Link
                                        href={`/dashboard/etiquetas/${tag.id}`}
                                        className="p-1 rounded hover:bg-gray-200 text-gray-500 hover:text-[#1a73e8] transition-colors"
                                        title="Editar recurso"
                                    >
                                        <MdEdit size={16} />
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => onDeleteTag(tag.id, tag.nombre)}
                                        className="p-1 rounded hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
                                        title="Eliminar"
                                    >
                                        <MdDelete size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
