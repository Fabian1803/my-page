'use client'
import { useState, useEffect, useRef } from 'react'

interface Certificado {
    id: number;
    ratio: string;
    titulo: string;
    universidad: string;
    imagenCertificado: string;
    imagenLogo: string;
}

export function useCertificates() {
    const [selectedCert, setSelectedCert] = useState<Certificado | null>(null)
    const visorRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!selectedCert) return
        
        let animationFrameId: number

        const calcularAlturaElastica = () => {
            const visor = visorRef.current
            if (!visor) return

            // En dispositivos móviles dejamos que el CSS nativo maneje el modal al 100%
            if (window.innerWidth < 1024) {
                visor.style.top = ''
                visor.style.height = ''
                return
            }

            const header = document.querySelector('header')
            const footer = document.querySelector('footer')

            const headerBottom = header ? header.getBoundingClientRect().bottom : 0
            const footerTop = footer ? footer.getBoundingClientRect().top : window.innerHeight

            const topeSuperior = Math.max(24, headerBottom + 24)
            const topeInferior = Math.min(window.innerHeight - 24, footerTop - 24)

            const calculatedHeight = topeInferior - topeSuperior

            if (calculatedHeight > 0) {
                visor.style.top = `${topeSuperior}px`
                visor.style.height = `${calculatedHeight}px`
            }
        }

        const handleScrollAndResize = () => {
            cancelAnimationFrame(animationFrameId)
            animationFrameId = requestAnimationFrame(calcularAlturaElastica)
        }

        window.addEventListener('scroll', handleScrollAndResize, { passive: true })
        window.addEventListener('resize', handleScrollAndResize)
        
        // Ejecución inicial inmediata al abrir
        calcularAlturaElastica()

        return () => {
            window.removeEventListener('scroll', handleScrollAndResize)
            window.removeEventListener('resize', handleScrollAndResize)
            cancelAnimationFrame(animationFrameId)
        }
    }, [selectedCert])

    return {
        selectedCert,
        setSelectedCert,
        visorRef
    }
}