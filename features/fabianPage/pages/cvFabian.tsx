'use client'
import React from 'react'
import SearchMapComponent from "../components/searchMapComponent"

export default function CvFabian() {
    const pdfUrl = '/prueba.pdf'

    return (
        <SearchMapComponent>
            {/* Contenedor principal alineado con el ancho máximo de tus otras vistas */}
            <div className="max-w-6xl py-8 px-3 sm:px-0 flex flex-col gap-4">
                
                {/* Sección de textos o títulos */}
                <div className="space-y-1">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                        Currículum Vitae
                    </h1>
                    <p className="text-sm text-gray-500">
                        Visualiza o descarga la versión más reciente de mi perfil profesional.
                    </p>
                </div>

                {/* Contenedor del Visor PDF Blindado 
                    - h-[80vh]: Ocupa el 80% del alto de la pantalla para dar espacio a los textos de arriba sin romper el scroll del body.
                    - rounded-2xl y border: Mantiene la consistencia visual con tu módulo de certificados.
                */}
                <div className="w-full h-[65vh] lg:h-screen rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm">
                    <iframe
                        src={`${pdfUrl}#toolbar=1&navpanes=0`}
                        title="CV Fabián Mauro Rivera Morales"
                        className="w-full h-full border-none"
                    />
                </div>
            </div>
        </SearchMapComponent>
    )
}