'use client'
import { MdClose } from 'react-icons/md'
import { useCertificates } from './useCertificates' 

export default function CertificatesFabian() {
    const { selectedCert, setSelectedCert, visorRef } = useCertificates()
    return (
        <div className="flex flex-col lg:flex-row gap-6 p-5 max-w-full mx-auto items-start relative overflow-x-hidden">
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

            {/* VISOR ELÁSTICO DERECHO */}
            {selectedCert && (
                <div
                    ref={visorRef}
                    className="fixed top-0 bottom-0 left-0 right-0 z-50 h-full w-full lg:fixed lg:right-5 lg:left-auto lg:z-10 lg:w-[39%] xl:w-[35%] lg:h-auto bg-white border border-[#dadce0] lg:rounded-3xl shadow-2xl lg:shadow-xl lg:overflow-hidden select-none shrink-0 flex flex-col animate-entry"
                >
                    {/* Cabecera del Visor */}
                    <div className="flex justify-between items-center px-4 py-4 lg:py-3 border-b border-gray-100 bg-gray-50/50 shrink-0">
                        <div className="flex gap-1.5 items-center">
                            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md overflow-hidden shrink-0 border border-gray-100">
                                <img src={selectedCert.imagenLogo} alt="Logo" className="w-full h-full object-contain" />
                            </div>
                            <p className="text-[14px] sm:text-[16px] truncate font-medium text-gray-900">{selectedCert.universidad}</p>
                        </div>
                        <button type="button" onClick={() => setSelectedCert(null)} className="p-1.5 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition-colors">
                            <MdClose size={22} />
                        </button>
                    </div>

                    {/* Cuerpo del Visor con Scroll Interno */}
                    <div className="flex-1 min-h-0 overflow-y-auto scrollbar-none flex flex-col bg-white">
                        <div className="bg-gray-300 flex items-center justify-center border-b border-gray-100 min-h-[280px] lg:max-h-[350px] shrink-0">
                            <img
                                src={selectedCert.imagenCertificado}
                                alt={selectedCert.titulo}
                                className="max-w-full max-h-[50vh] lg:max-h-[280px] object-contain"
                            />
                        </div>
                        
                        {/* Contenedor de Información Estructurado */}
                        <div className="p-5 lg:p-4 space-y-5 bg-white flex-1 flex flex-col justify-start">
                            <h3 className="text-base sm:text-lg lg:text-base font-bold text-gray-900 leading-snug">
                                {selectedCert.titulo}
                            </h3>
                            
                            {/* Información descriptiva básica */}
                            <div className="space-y-1.5">
                                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                    Acerca del certificado
                                </span>
                                <p className="text-[13px] sm:text-[14px] text-gray-600 leading-relaxed font-normal">
                                    Validación oficial que acredita las competencias técnicas, metodologías de ingeniería y el dominio práctico aplicados en la resolución del proyecto.
                                </p>
                            </div>

                            {/* Píldoras de tecnologías utilizadas */}
                            <div className="space-y-2.5">
                                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                    Tecnologías y Conceptos Clave
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    {['JavaScript', 'Docker', 'React', 'Node.js', 'Clean Architecture', 'DevOps', 'Git'].map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-flex items-center px-3 py-1.5 text-[12px] font-medium text-gray-700 bg-white border border-gray-200 rounded-full shadow-sm hover:border-gray-300 transition-colors"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Bloque de metadatos con línea lateral sutil */}
                            <div className="space-y-2.5 pt-4 border-t border-gray-100">
                                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                    Detalles clave
                                </span>
                                <div className="border-l-2 border-gray-200 pl-3 space-y-2">
                                    <div className="text-[13px] text-gray-600">
                                        <span className="font-semibold text-gray-800">Competencias:</span> Arquitectura limpia, optimización y buenas prácticas de desarrollo.
                                    </div>
                                    <div className="text-[13px] text-gray-600">
                                        <span className="font-semibold text-gray-800">Evaluación:</span> Defensa técnica de requerimientos y despliegue exitoso.
                                    </div>
                                    <div className="text-[13px] text-gray-600">
                                        <span className="font-semibold text-gray-800">Estado:</span> Verificado formalmente por la entidad académica correspondiente.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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