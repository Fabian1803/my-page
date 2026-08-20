import React from 'react'
import Link from 'next/link'
import { MdDelete, MdContentCopy, MdCheck, MdFilterList } from 'react-icons/md'
import { BsQuestionCircle, BsFillBookmarkPlusFill } from 'react-icons/bs'
import { FaStar, FaRegStar } from 'react-icons/fa'
import { HiArrowUp } from 'react-icons/hi2'
import { TagItem } from '../hooks/useTagsAdmin'

interface TagsTableProps {
    tags: TagItem[];
    isLoading: boolean;
    skeletons: number[];
    searchFilter: string;
    selectedIds: string[];
    copiedId: string | null;
    onSelectRow: (id: string) => void;
    onSelectAll: () => void;
    onCopyId: (id: string) => void;
    onToggleDestacado: (id: string) => void;
    onDeleteTag: (id: string, nombre: string) => void;
    onResetFilters: () => void;
}

export default function TagsTable({
    tags,
    isLoading,
    skeletons,
    searchFilter,
    selectedIds,
    copiedId,
    onSelectRow,
    onSelectAll,
    onCopyId,
    onToggleDestacado,
    onDeleteTag,
    onResetFilters
}: TagsTableProps) {
    const isAllSelected = tags.length > 0 && selectedIds.length === tags.length

    return (
        <div className="bg-white flex-1 overflow-hidden flex flex-col">
            
            {/* 📱 1. VISTA MÓVIL (PANTALLAS PEQUEÑAS < SM) */}
            <div className="sm:hidden flex-1 overflow-y-auto divide-y divide-[#dadce0]">
                
                {/* Checkbox de selección global en móvil si hay elementos */}
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
                                <span className="font-medium text-sm text-[#202124] truncate">{tag.nombre}</span>
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

                        {/* Fila inferior: Rol y Estado en Cloud */}
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
                                Activo en Cloud
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* 🖥️ 2. VISTA DE TABLA GCP (TABLETS Y ESCRITORIO >= SM) */}
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
                            <th scope="col" className="w-20 px-3 py-2.5 border-l border-[#dadce0]"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#dadce0] text-[13px] text-[#202124] whitespace-nowrap">
                        
                        {/* ESTADO DE CARGA: SKELETONS EN TABLA */}
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
                                <td className="w-20 px-3 py-2.5 border-l border-[#dadce0] text-right">
                                    <div className="h-4 w-12 bg-gray-200 rounded ml-auto" />
                                </td>
                            </tr>
                        ))}

                        {/* FILAS DE ETIQUETAS REGISTRADAS */}
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
                                    {tag.nombre}
                                </td>
                                <td className="px-4 py-2.5 font-normal text-[#3c4043]">
                                    {tag.destacado ? 'Destacada (Principal)' : 'Estándar'}
                                </td>
                                <td className="px-4 py-2.5">
                                    <span className="inline-flex items-center gap-1.5 text-xs text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full font-medium">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                        Activo en Cloud
                                    </span>
                                </td>
                                <td className="w-20 px-3 py-2.5 border-l border-[#dadce0] text-right">
                                    <div className="flex items-center justify-end gap-2">
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

            {/* 🚫 3. ESTADO VACÍO (COMPARTIDO MÓVIL Y DESKTOP) */}
            {!isLoading && tags.length === 0 && (
                <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center">
                    <div className="w-12 sm:w-14 h-12 sm:h-14 bg-blue-50 text-[#0c68e0] rounded-2xl flex items-center justify-center mb-3">
                        <MdFilterList size={26} />
                    </div>
                    <p className="text-sm sm:text-base font-medium text-gray-800 mb-1">
                        {searchFilter ? 'No se encontraron tecnologías coincidentes' : 'No hay etiquetas registradas'}
                    </p>
                    <p className="text-xs text-gray-500 max-w-sm mb-4">
                        {searchFilter 
                            ? `No hay recursos que coincidan con "${searchFilter}". Prueba con otro término.`
                            : 'Crea tu primera tecnología para asignarla a tus proyectos y certificaciones.'}
                    </p>
                    {searchFilter ? (
                        <button
                            type="button"
                            onClick={onResetFilters}
                            className="text-xs font-semibold text-[#0c68e0] hover:underline cursor-pointer"
                        >
                            Limpiar filtros
                        </button>
                    ) : (
                        <Link
                            href="/dashboard/etiquetas/crear"
                            className="inline-flex items-center gap-2 bg-[#0c68e0] hover:bg-blue-900 text-white font-medium px-4 py-2 rounded-sm text-xs transition-colors cursor-pointer"
                        >
                            <BsFillBookmarkPlusFill size={13} />
                            <span>Crear primera etiqueta</span>
                        </Link>
                    )}
                </div>
            )}
        </div>
    )
}
