'use client'
import React from 'react'
import ImageCodepedia from '../components/imageCodepediaP/ImageCodepedia'
import { useCodePedia } from '../context/CodePediaContext'

interface Experiencia {
    empresa: string;
    cargo: string;
    fechaInicio: string;
    fechaFin: string;
    vinetas?: string[];
    urlWeb?: string;
    urlMasInfo?: string;
}

interface HomeCodepediaProps {
    metadata?: {
        nombre?: string;
        descripcion?: string;
        url_imagen?: string;
        experiencias?: Experiencia[];
        educacion?: Experiencia[];
    };
}

export default function HomeCodepedia({ metadata }: HomeCodepediaProps) {
    const { textSize, width } = useCodePedia()
    const fontSizes = {
        small: '13px',
        medium: '15px',
        large: '18px'
    }

    const aboutText = {
        name: metadata?.nombre || "Fabián Mauro Rivera Morales",
        description: metadata?.descripcion || "Bachiller en Ingeniería de Software por la Universidad Tecnológica del Perú. Desarrollador enfocado en la construcción de aplicaciones full-stack robustas y scalables, con experiencia implementando arquitecturas limpias, principios SOLID y la automatización de entornos de desarrollo.",
        image: metadata?.url_imagen || "/perfil.jpeg",
        experiences: metadata?.experiencias || [],
        education: metadata?.educacion || []
    }

    return (
        <div className={`py-6 mb-35 ${width === 'full' ? 'md:px-30' : ''} space-y-6 text-gray-900 dark:text-gray-100`}>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start">
                <div className="space-y-4">
                    <div>
                        <h1 className="text-3xl font-semibold font-['Roboto'] tracking-tight">
                            {aboutText.name}
                        </h1>
                        <div className="border-b border-gray-400 dark:border-gray-600 mt-2" />
                    </div>

                    <div
                        style={{ fontSize: fontSizes[textSize] }}
                        className="leading-relaxed text-justify space-y-4"
                    >
                        <p>
                            {aboutText.description}
                        </p>
                    </div>
                </div>

                <div className="w-70 lg:w-35 mx-auto lg:mx-0">
                    <ImageCodepedia
                        id='imagen-portada'
                        imageSrc={aboutText.image}
                        title={aboutText.name}
                        description={aboutText.description}
                    />
                </div>

            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight">
                    Experiencia profesional
                </h2>
                <div className="border-b border-gray-300 dark:border-gray-700" />

                {aboutText.experiences.length === 0 ? (
                    <p className="text-sm text-gray-500">No hay experiencias profesionales registradas.</p>
                ) : (
                    aboutText.experiences.map((exp, index) => (
                        <div key={index} className="space-y-2">
                            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-x-2 text-sm">
                                <div className="flex flex-wrap items-center gap-x-2">
                                    <span className="font-bold text-blue-600 dark:text-blue-400">{exp.cargo}</span>
                                    <span className="text-gray-400 hidden sm:inline">•</span>
                                    <span className="font-medium">{exp.empresa}</span>
                                </div>
                                <span className="text-gray-500 dark:text-gray-400 text-xs font-normal sm:ml-auto pt-0.5 sm:pt-0">
                                    {exp.fechaInicio} {exp.fechaFin ? `- ${exp.fechaFin}` : ''}
                                </span>
                            </div>

                            {exp.vinetas && exp.vinetas.length > 0 && (
                                <ul
                                    style={{ fontSize: fontSizes[textSize] }}
                                    className="list-disc list-inside space-y-1.5 pl-1 text-justify opacity-90"
                                >
                                    {exp.vinetas.map((vineta, vIdx) => (
                                        vineta.trim() && <li key={vIdx}>{vineta}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Sección: Educación */}
            <div className="space-y-4 pt-2">
                <h2 className="text-xl font-bold tracking-tight">
                    Educación y certificaciones
                </h2>
                <div className="border-b border-gray-300 dark:border-gray-700" />

                {aboutText.education.length === 0 ? (
                    <p className="text-sm text-gray-500">No hay registros educativos guardados.</p>
                ) : (
                    aboutText.education.map((edu, index) => (
                        <div key={index} className="space-y-1">
                            {/* Cabecera de estudios */}
                            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-x-2 text-sm mb-2">
                                <div className="flex flex-wrap items-center gap-x-2">
                                    <span className="font-bold text-blue-600 dark:text-blue-400">{edu.cargo}</span>
                                    <span className="text-gray-400 hidden sm:inline">•</span>
                                    <span className="font-medium">{edu.empresa}</span>
                                </div>
                                <span className="text-gray-500 dark:text-gray-400 text-xs font-normal sm:ml-auto pt-0.5 sm:pt-0">
                                    {edu.fechaInicio} {edu.fechaFin ? `- ${edu.fechaFin}` : ''}
                                </span>
                            </div>

                            {/* Lista / detalles de educación */}
                            {edu.vinetas && edu.vinetas.length > 0 && (
                                <ul
                                    style={{ fontSize: fontSizes[textSize] }}
                                    className="list-disc list-inside space-y-1 pl-1 text-justify opacity-90"
                                >
                                    {edu.vinetas.map((vineta, vIdx) => (
                                        vineta.trim() && <li key={vIdx}>{vineta}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))
                )}
            </div>

        </div>
    )
}