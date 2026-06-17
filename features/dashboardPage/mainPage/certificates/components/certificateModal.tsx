'use client'
import TagSelector from '@/components/tagSelector'
import React from 'react'
import { MdSchool, MdClose, MdFormatListBulleted, MdDelete, MdSave } from 'react-icons/md'

interface CertificateModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingId: string | null;
    nombre: string;
    setNombre: (val: string) => void;
    institucion: string;
    setInstitucion: (val: string) => void;
    descripcion: string;
    setDescripcion: (val: string) => void;
    imageBase64: string;
    bullets: string[];
    currentBullet: string;
    setCurrentBullet: (val: string) => void;
    // CORREGIDO: Añadimos las propiedades de las etiquetas al tipado de las Props
    tags: string[];
    setTags: (tags: string[]) => void;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleAddBullet: () => void;
    handleRemoveBullet: (index: number) => void;
    handleSaveCertificate: (e: React.FormEvent) => void;
}

export default function CertificateModal({
    isOpen,
    onClose,
    editingId,
    nombre,
    setNombre,
    institucion,
    setInstitucion,
    descripcion,
    setDescripcion,
    imageBase64,
    bullets,
    currentBullet,
    setCurrentBullet,
    // CORREGIDO: Desestructuramos para usarlas en el JSX
    tags,
    setTags,
    fileInputRef,
    handleFileChange,
    handleAddBullet,
    handleRemoveBullet,
    handleSaveCertificate
}: CertificateModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="bg-white border border-[#dadce0] rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-[#dadce0]">
                    <h2 className="text-lg font-medium text-[#202124] flex items-center gap-2">
                        <MdSchool className="text-[#0b57d0]" size={22} />
                        {editingId ? 'Modificar Certificación' : 'Registrar Nueva Certificación'}
                    </h2>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                        <MdClose size={22} />
                    </button>
                </div>
                
                <form onSubmit={handleSaveCertificate} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-[#3c4043]">Nombre de la Certificación *</label>
                            <input type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej. Scrum Master Certified" className="w-full px-3 py-2 border border-[#747775] rounded-xl text-sm focus:outline-none focus:border-2 focus:border-[#0b57d0]" />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-[#3c4043]">Institución Emisora *</label>
                            <input type="text" required value={institucion} onChange={(e) => setInstitucion(e.target.value)} placeholder="Ej. Universidad Tecnológica del Perú" className="w-full px-3 py-2 border border-[#747775] rounded-xl text-sm focus:outline-none focus:border-2 focus:border-[#0b57d0]" />
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-[#3c4043]">Descripción Corta</label>
                        <textarea rows={3} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Resume el propósito u objetivos validados por esta credencial..." className="w-full px-3 py-2 border border-[#747775] rounded-xl text-sm focus:outline-none focus:border-2 focus:border-[#0b57d0] resize-none" />
                    </div>
                    
                    <div className="flex flex-col gap-1.5 bg-[#f8f9fa] p-3 rounded-xl border border-[#dadce0]">
                        <label className="text-xs font-semibold text-[#3c4043] flex items-center gap-1">
                            <MdFormatListBulleted size={16} />
                            Viñetas de Logros (Varias o ninguna)
                        </label>
                        <div className="flex gap-2">
                            <input type="text" value={currentBullet} onChange={(e) => setCurrentBullet(e.target.value)} placeholder="Ej. Certificación oficial nivel avanzado" className="flex-1 px-3 py-2 bg-white border border-[#747775] rounded-xl text-sm focus:outline-none focus:border-2 focus:border-[#0b57d0]" />
                            <button type="button" onClick={handleAddBullet} className="px-3 py-2 border border-[#747775] text-[#0b57d0] bg-white font-semibold text-xs rounded-xl hover:bg-blue-50/50 shadow-sm transition-all">
                                Añadir
                            </button>
                        </div>

                        {bullets.length > 0 && (
                            <ul className="mt-2 space-y-1.5 bg-white p-2.5 rounded-lg border border-gray-200 max-h-32 overflow-y-auto">
                                {bullets.map((bullet, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-xs text-gray-700 font-medium pl-2 border-l-2 border-[#0b57d0]">
                                        <span className="truncate mr-2">• {bullet}</span>
                                        <button type="button" onClick={() => handleRemoveBullet(idx)} className="text-gray-400 hover:text-red-500 p-0.5">
                                            <MdDelete size={16} />
                                        </button>
                                    </div>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* El TagSelector ahora recibe perfectamente las variables validadas */}
                    <TagSelector
                        selectedTags={tags}
                        onTagsChange={setTags}
                    />

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-[#3c4043]">Logotipo de la Credencial</label>
                        <div className="flex items-center gap-3">
                            <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileChange} className="sr-only" />
                            <button type="button" onClick={() => fileInputRef.current?.click()} className="px-4 py-2 border border-[#747775] rounded-xl text-xs font-semibold text-[#0b57d0] bg-white hover:bg-blue-50/50 shadow-sm">
                                {imageBase64 ? 'Cambiar imagen' : 'Seleccionar logo'}
                            </button>
                            {imageBase64 && (
                                <img src={imageBase64} alt="Preview" className="w-10 h-10 object-contain rounded-md border border-gray-200 bg-white" />
                            )}
                        </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-full transition-colors">Cancelar</button>
                        <button type="submit" className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#0b57d0] hover:bg-[#155bd3] text-white text-sm font-semibold rounded-full shadow-sm transition-all">
                            <MdSave size={16} /> {editingId ? 'Guardar cambios' : 'Registrar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}