'use client'
import { useCertificates } from '../hooks/useCertificates'
import CertificateVisor from './imageVisor'
export default function ImagesMap({ datosCertificados }: { datosCertificados: any[] }) {
    const { certificados, selectedCert, setSelectedCert, visorRef } = useCertificates(datosCertificados)
    return (
        <div className="flex flex-col lg:flex-row gap-6 p-5 items-start relative overflow-x-hidden max-w-6xl ">
            <div className={`w-full min-w-0 transition-all duration-300 ${selectedCert ? 'lg:w-[58%] xl:w-[63%]' : 'w-full'}`}>
                <div className={`columns-2 gap-4 space-y-4 ${selectedCert ? 'md:columns-2 xl:columns-3' : 'md:columns-3 lg:columns-4'}`}>
                    {certificados.map((item) => {
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