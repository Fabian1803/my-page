'use client'
import React from 'react'
import ImageCodepedia from '../components/imageCodepediaP/ImageCodepedia'
import { useCodePedia } from '../context/CodePediaContext'

export default function homeCodepedia() {
    const { textSize, width } = useCodePedia()
    
    // Mapeo de tamaños dinámicos
    const fontSizes = {
        small: '13px',
        medium: '15px',
        large: '18px'
    }

    const aboutText = {
        name: "Fabián Mauro Rivera Morales",
        description: "Bachiller en Ingeniería de Software por la Universidad Tecnológica del Perú. Desarrollador enfocado en la construcción de aplicaciones full-stack robustas y scalables, con experiencia implementando arquitecturas limpias, principios SOLID y la automatización de entornos de desarrollo.",
        image: "/perfil.jpeg"
    }

    return (
        <div className={`py-6 mb-35 ${width === 'full' ? 'md:px-30' : ''} space-y-6 text-gray-900 dark:text-gray-100`}>
            
            {/* Bloque Principal: Une el Título, la Introducción y la Ficha Lateral */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start">
                
                {/* Columna Izquierda: Título + Descripción */}
                <div className="space-y-4">
                    <div>
                        <h1 className="text-3xl font-semibold font-['Roboto'] tracking-tight">
                            {aboutText.name}
                        </h1>
                        <div className="border-b border-gray-400 dark:border-gray-600 mt-2" />
                    </div>
                    
                    {/* Introducción Biográfica con tamaño dinámico */}
                    <div 
                        style={{ fontSize: fontSizes[textSize] }} 
                        className="leading-relaxed text-justify space-y-4"
                    >
                        <p>
                            {aboutText.description} Su enfoque profesional abarca el ciclo de vida completo del software, desde el diseño y consumo de APIs REST hasta el despliegue optimizado en la nube y el desarrollo de modelos de inteligencia artificial (Vision Transformers).
                        </p>
                    </div>
                </div>

                {/* Columna Derecha: Ficha de Información Lateral (Estilo Wikipedia) */}
                <div className="w-70 lg:w-35 mx-auto lg:mx-0">
                    <ImageCodepedia 
                        id='imagen-portada' 
                        imageSrc={aboutText.image}
                        title={aboutText.name} 
                        description="Ingeniero de Software especializado en desarrollo Full-Stack, Arquitectura Hexagonal y Docker." 
                    />
                </div>

            </div>

            {/* Sección: Experiencia Profesional */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight">
                    Experiencia profesional
                </h2>
                <div className="border-b border-gray-300 dark:border-gray-700" />
                
                <div className="space-y-2">
                    {/* Cabecera del cargo */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-x-2 text-sm">
                        <div className="flex flex-wrap items-center gap-x-2">
                            <span className="font-bold text-blue-600 dark:text-blue-400">Full Stack Intern</span>
                            <span className="text-gray-400 hidden sm:inline">•</span>
                            <span className="font-medium">Tecnología Digital Data S.A.C.</span>
                        </div>
                        <span className="text-gray-500 dark:text-gray-400 text-xs font-normal sm:ml-auto pt-0.5 sm:pt-0">
                            Marzo 2026 - Presente
                        </span>
                    </div>
                    
                    {/* Lista con tamaño dinámico */}
                    <ul 
                        style={{ fontSize: fontSizes[textSize] }} 
                        className="list-disc list-inside space-y-1.5 pl-1 text-justify opacity-90"
                    >
                        <li>Diseño y consumo de REST APIs empleando NestJS y Spring Boot bajo arquitectura hexagonal.</li>
                        <li>Construcción de interfaces modulares y altamente responsivas utilizando React y Next.js.</li>
                        <li>Automatización de flujos de trabajo y empaquetamiento de entornos utilizando Docker.</li>
                    </ul>
                </div>
            </div>

            {/* Sección: Educación */}
            <div className="space-y-4 pt-2">
                <h2 className="text-xl font-bold tracking-tight">
                    Educación y certificaciones
                </h2>
                <div className="border-b border-gray-300 dark:border-gray-700" />
                
                <div className="space-y-1">
                    {/* Cabecera de estudios */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-x-2 text-sm mb-2">
                        <div className="flex flex-wrap items-center gap-x-2">
                            <span className="font-bold text-blue-600 dark:text-blue-400">Bachiller en Ingeniería de Software</span>
                            <span className="text-gray-400 hidden sm:inline">•</span>
                            <span className="font-medium">Universidad Tecnológica del Perú</span>
                        </div>
                        <span className="text-gray-500 dark:text-gray-400 text-xs font-normal sm:ml-auto pt-0.5 sm:pt-0">
                            2021 - 2026
                        </span>
                    </div>
                    
                    {/* Párrafo con tamaño dinámico */}
                    <p 
                        style={{ fontSize: fontSizes[textSize] }} 
                        className="text-justify leading-relaxed pt-1 opacity-90"
                    >
                        Formación integral orientada al ciclo de vida del software, desarrollo ágil, administración de bases de datos relacionales y no relacionales, principios arquitectónicos avanzados y desarrollo de inteligencia artificial aplicada (Vision Transformers).
                    </p>
                </div>
            </div>

        </div>
    )
}