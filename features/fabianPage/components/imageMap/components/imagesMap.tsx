'use client'
import React from 'react'
import { useCertificates } from '../hooks/useCertificates' 
import CertificateVisor from './imageVisor' // Asegúrate de ajustar la ruta de importación

export default function ImagesMap() {
    const { selectedCert, setSelectedCert, visorRef } = useCertificates()

    return (
        <div className="flex flex-col lg:flex-row gap-6 p-5 max-w-full mx-auto items-start relative overflow-x-hidden">

            {/* COLUMNA IZQUIERDA (MASONRY DE TARJETAS) */}
            <div className={`w-full min-w-0 transition-all duration-300 ${selectedCert ? 'lg:w-[58%] xl:w-[63%]' : 'w-full'}`}>
                <div className={`columns-2 gap-4 space-y-4 ${selectedCert ? 'md:columns-2 xl:columns-3' : 'md:columns-3 lg:columns-4'}`}>
                    {certificadosMock.map((item) => {
                        const isCurrent = selectedCert?.id === item.id;
                        return (
                            <div
                                key={item.id}
                                onClick={() => setSelectedCert(item)}
                                className="inline-block w-full break-inside-avoid mb-4 cursor-pointer group"
                            >
                                <div className={`rounded-2xl bg-white border overflow-hidden shadow-sm transition-all duration-200 group-hover:shadow-md ${isCurrent ? 'border-2 border-[#0b57d0] ring-4 ring-blue-50' : 'border-[#dadce0]'}`}>
                                    <img src={item.imagenCertificado} alt={item.titulo} className="w-full h-auto object-contain block" />
                                </div>
                                <div className="px-1 space-y-0.5">
                                    <p className="font-semibold text-[13px] sm:text-[14px] text-[#202124] line-clamp-1">{item.titulo}</p>
                                    <div className="-mt-1.5 flex gap-1.5 items-center">
                                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md overflow-hidden shrink-0 border border-gray-100">
                                            <img src={item.imagenLogo} alt="Logo" className="w-full h-full object-contain" />
                                        </div>
                                        <p className="text-gray-500 text-[12px] sm:text-[13px] truncate">{item.universidad}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* VISOR MODULARIZADO */}
            {selectedCert && (
                <CertificateVisor 
                    selectedCert={selectedCert} 
                    onClose={() => setSelectedCert(null)} 
                    visorRef={visorRef} 
                />
            )}
        </div>
    )
}

const certificadosMock = [
    { id: 1, ratio: 'aspect-video', titulo: 'Especialista en Corelia IA', universidad: 'Universidad Tecnológica del Perú', imagenCertificado: '/wikiBackBlack.webp', imagenLogo: '/FLogo.webp' },
    { id: 2, ratio: 'aspect-square', titulo: 'Desarrollo Avanzado - Foro Hub API', universidad: 'Universidad Tecnológica del Perú', imagenCertificado: '/FLogo.webp', imagenLogo: '/wikiLog.webp' },
    { id: 3, ratio: 'aspect-[3/4]', titulo: 'Vision Transformer Deep Learning', universidad: 'Universidad Tecnológica del Perú', imagenCertificado: '/wikiSubtexLogo.webp', imagenLogo: '/log.webp' },
    { id: 4, ratio: 'aspect-video', titulo: 'Arquitectura de Software y Microservicios', universidad: 'Universidad Tecnológica del Perú', imagenCertificado: '/wikitittleLogo.webp', imagenLogo: '/FLogo.webp' },
    { id: 5, ratio: 'aspect-[4/3]', titulo: 'Certificación Cloud Computing', universidad: 'Universidad Tecnológica del Perú', imagenCertificado: '/wikiBackBlack.webp', imagenLogo: '/wikiLog.webp' },
    { id: 6, ratio: 'aspect-square', titulo: 'Especialista Spring Boot REST', universidad: 'Universidad Tecnológica del Perú', imagenCertificado: '/log.webp', imagenLogo: '/log.webp' },
    { id: 7, ratio: 'aspect-[3/4]', titulo: 'Docker & Kubernetes DevOps', universidad: 'Universidad Tecnológica del Perú', imagenCertificado: '/wikiSubtexLogo.webp', imagenLogo: '/FLogo.webp' },
    { id: 8, ratio: 'aspect-video', titulo: 'Front-End Senior en Next.js', universidad: 'Universidad Tecnológica del Perú', imagenCertificado: '/wikitittleLogo.webp', imagenLogo: '/wikiLog.webp' },
    { id: 9, ratio: 'aspect-square', titulo: 'Metodologías Ágiles Scrum', universidad: 'Universidad Tecnológica del Perú', imagenCertificado: '/wikiBackBlack.webp', imagenLogo: '/log.webp' },
    { id: 10, ratio: 'aspect-[4/5]', titulo: 'UI/UX Design Specialist', universidad: 'Universidad Tecnológica del Perú', imagenCertificado: '/wikiSubtexLogo.webp', imagenLogo: '/FLogo.webp' },
    { id: 11, ratio: 'aspect-[3/4]', titulo: 'Docker & Kubernetes DevOps', universidad: 'Universidad Tecnológica del Perú', imagenCertificado: '/perfil.jpeg', imagenLogo: '/perfil.jpeg' },
    { id: 12, ratio: 'aspect-video', titulo: 'Front-End Senior en Next.js', universidad: 'Universidad Tecnológica del Perú', imagenCertificado: '/log.webp', imagenLogo: '/camaraIcon.webp' },
    { id: 13, ratio: 'aspect-square', titulo: 'Metodologías Ágiles Scrum', universidad: 'Universidad Tecnológica del Perú', imagenCertificado: '/camaraIcon.png', imagenLogo: '/log.webp' },
    { id: 14, ratio: 'aspect-[4/5]', titulo: 'UI/UX Design Specialist', universidad: 'Universidad Tecnológica del Perú', imagenCertificado: '/wikiSubtexLogo.webp', imagenLogo: '/FLogo.webp' }
]