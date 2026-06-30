'use client'
import Image from 'next/image';
import React from 'react'
import { MdClose } from 'react-icons/md'

export interface Certificate {
    id: string;
    nombre: string;
    descripcion: string;
    imagenPrincipalUrl: string;
    instituto?: string | null;
    miniaturaUrl?: string | null;
    titulo?: string;
    universidad?: string;
    imagenCertificado?: string;
    imagenLogo?: string;
    categorias?: { id: string; nombre: string }[];
    vinetas?: { id: string; comentario: string }[];
}

interface CertificateVisorProps {
    selectedCert: Certificate;
    onClose: () => void;
    visorRef: React.RefObject<HTMLDivElement | null>;
}

export default function ImageVisor({ selectedCert, onClose, visorRef }: CertificateVisorProps) {
    return (
        <div
            ref={visorRef}
            className="fixed top-0 bottom-0 left-0 right-0 z-50 h-full w-full lg:fixed lg:right-5 lg:left-auto lg:z-10 lg:w-[39%] xl:w-[35%] lg:h-auto bg-white border border-[#dadce0] lg:rounded-3xl shadow-2xl lg:shadow-xl lg:overflow-hidden select-none shrink-0 flex flex-col animate-entry"
        >
            <div className="flex justify-between items-center px-4 py-4 lg:py-3 border-b border-gray-100 bg-gray-50/50 shrink-0">
                <div className="flex gap-1.5 items-center">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md overflow-hidden shrink-0 border border-gray-100 p-0.5 bg-white">
                        <img src={selectedCert.imagenLogo} alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <p className="text-[14px] sm:text-[16px] truncate font-medium text-gray-900">{selectedCert.universidad}</p>
                </div>
                <button 
                    type="button" 
                    onClick={onClose} 
                    className="p-1.5 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition-colors"
                >
                    <MdClose size={22} />
                </button>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto scrollbar-none flex flex-col bg-white">
                <div className="bg-gray-100 flex items-center justify-center border-b border-gray-100 min-h-[280px] lg:max-h-[350px] shrink-0">
                    <Image
                        src={selectedCert.imagenCertificado || selectedCert.imagenPrincipalUrl}
                        alt={selectedCert.titulo || selectedCert.nombre}
                        width={500}
                        height={300}
                        className="w-full max-h-[50vh] lg:max-h-[280px] object-contain"
                    />
                </div>

                <div className="p-5 lg:p-4 space-y-5 bg-white flex-1 flex flex-col justify-start">
                    <h3 className="text-base sm:text-lg lg:text-base font-bold text-gray-900 leading-snug">
                        {selectedCert.titulo}
                    </h3>
                    <div className="space-y-1.5">
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                            Acerca del certificado
                        </span>
                        <p className="text-[13px] sm:text-[14px] text-gray-600 leading-relaxed font-normal">
                            {selectedCert.descripcion}
                        </p>
                    </div>

                    {selectedCert.categorias && selectedCert.categorias.length > 0 && (
                        <div className="space-y-2.5">
                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                Tecnologías y Conceptos Clave
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {selectedCert.categorias.map((cat) => (
                                    <span
                                        key={cat.id || cat.nombre}
                                        className="inline-flex items-center px-3 py-1.5 text-[12px] font-medium text-gray-700 bg-white border border-gray-200 rounded-full shadow-sm hover:border-gray-300 transition-colors"
                                    >
                                        {cat.nombre}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {selectedCert.vinetas && selectedCert.vinetas.length > 0 && (
                        <div className="space-y-2.5 pt-4 border-t border-gray-100">
                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                Detalles clave
                            </span>
                            <div className="border-l-2 border-gray-200 pl-3 space-y-3">
                                {selectedCert.vinetas.map((bullet) => (
                                    <div 
                                        key={bullet.id} 
                                        className="text-[13px] text-gray-600 leading-relaxed font-normal"
                                    >
                                        {bullet.comentario}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}