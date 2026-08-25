'use client'
import Image from 'next/image'
import { useCodePedia } from '../context/CodePediaContext'
import Link from 'next/link'
import { AiOutlineDash } from 'react-icons/ai'
import TiptapRenderer from '../components/TiptapRenderer'

export interface ProjectSectionDoc {
    id?: string;
    orden?: number;
    contenidoJson: string;
}

export interface ProjectData {
    id: string;
    nombre: string;
    descripcion: string;
    destacado?: boolean;
    imagenPrincipalUrl?: string;
    categorias?: Array<{ id: string; nombre: string } | string>;
    enlaces?: Array<{ id?: string; type?: string; tipo?: string; url: string }>;
    seccionesDoc?: ProjectSectionDoc[];
}

interface CodePediaProjectProps {
    children?: React.ReactNode
    changeForm: boolean
    setChangeForm: (change: boolean) => void
    keytap: number
    totalSections?: number
}

function SectionProject({ children, changeForm, setChangeForm, keytap, totalSections = 5 }: CodePediaProjectProps) {
    const sectionPresets: Record<number, Record<number, { width: string; rowSpan: string }>> = {
        1: {
            0: { width: 'max-h-none', rowSpan: 'lg:col-span-2' }
        },
        2: {
            0: { width: 'max-h-240', rowSpan: 'lg:col-start-1' },
            1: { width: 'max-h-240', rowSpan: 'lg:col-start-2' }
        },
        3: {
            0: { width: 'max-h-140', rowSpan: 'lg:col-start-1 lg:row-start-1' },
            1: { width: 'max-h-300', rowSpan: 'lg:col-start-2 lg:row-start-1 lg:row-span-2' },
            2: { width: 'max-h-140', rowSpan: 'lg:col-start-1 lg:row-start-2' }
        },
        4: {
            0: { width: 'max-h-220', rowSpan: 'lg:col-start-1 lg:row-start-1 lg:row-span-2' },
            1: { width: 'max-h-120', rowSpan: 'lg:col-start-2 lg:row-start-1' },
            2: { width: 'max-h-120', rowSpan: 'lg:col-start-1 lg:row-start-3' },
            3: { width: 'max-h-220', rowSpan: 'lg:col-start-2 lg:row-start-2 lg:row-span-2' }
        },
        5: {
            0: { width: 'max-h-150', rowSpan: '' },
            1: { width: 'max-h-350', rowSpan: 'row-span-4' },
            2: { width: 'max-h-100', rowSpan: '' },
            3: { width: 'max-h-150', rowSpan: 'row-span-3' },
            4: { width: 'max-h-75', rowSpan: '' }
        }
    }

    const currentConfig = sectionPresets[totalSections]?.[keytap] || sectionPresets[5][keytap % 5] || { width: 'max-h-150', rowSpan: '' };

    return (
        <div className={changeForm ? '' : 'p-4 border border-gray-400 flex flex-col justify-between ' + currentConfig.rowSpan}>
            <div className={`w-full ${changeForm ? '' : currentConfig.width + ' overflow-hidden'}`}>
                {children}
            </div>
            <div className={`w-full flex items-center justify-between gap-4 mt-4 ${changeForm ? 'hidden' : ''}`}>
                <button className="border border-gray-400 px-4 py-1 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer" onClick={() => setChangeForm(true)}>
                    Leer
                </button>
                <Link href="/Codepedia" className="w-full font-bold hover:underline">
                    Todos los proyectos destacados
                </Link>
                <AiOutlineDash size={30} />
            </div>
        </div>
    )
}

export default function CodePediaProject({ proyecto }: { proyecto?: ProjectData }) {
    const { changeForm, setChangeForm, textSize } = useCodePedia()

    const projectData = {
        nombre: proyecto?.nombre || 'Proyecto de ejemplo en Codepedia',
        descripcion: proyecto?.descripcion || 'Descripción del proyecto registrado en Codepedia.',
        enlaces: (proyecto?.enlaces || []).map((e: any) => ({
            tag: e.type || e.tipo || 'Enlace',
            url: e.url || '#'
        })),
        secciones: (proyecto?.seccionesDoc && proyecto.seccionesDoc.length > 0)
            ? proyecto.seccionesDoc
            : [
                { id: 'sec-1', orden: 0, contenidoJson: '<h1>Documentación del proyecto</h1><p>No se han registrado secciones de documentación todavía para este proyecto.</p>' }
            ]
    }

    return (
        <div className={`w-full h-full pt-4 gap-4 flex flex-col ${changeForm ? 'pb-25' : ''}`}>
            <section className="relative h-auto md:h-50 w-full overflow-hidden border-y md:border border-gray-400">
                <Image
                    src="/wikiBack.png"
                    alt="CodePedia background"
                    fill
                    priority
                    className="object-cover object-[center_20%] grayscale hidden md:block dark:content-[url('/wikiBackBlack.webp')]"
                />
                <div className="absolute inset-0 z-10 bg-gray-100 dark:bg-gray-950 opacity-70 hidden md:block" />

                <div className="relative md:absolute md:inset-0 z-20 w-full h-full py-6 px-4 md:py-0 md:pl-4 md:pr-8 flex flex-col md:flex-row justify-center md:justify-between md:items-center">
                    <div className='flex flex-col gap-2'>
                        <h1 className="text-3xl md:text-4xl font-semibold font-['Roboto'] leading-none">{projectData.nombre}</h1>
                        <p className="text-md line-clamp-2 md:line-clamp-3 lg:line-clamp-3 max-w-full md:max-w-100 lg:max-w-125 xl:max-w-150">{projectData.descripcion}</p>
                    </div>
                    <div className="flex flex-col justify-center md:items-end gap-2 md:gap-4 md:w-150">
                        <p className="text-[14px]"><Link href="/Codepedia" className="highlight font-bold">100</Link> articulos <span className="text-blue-600 dark:text-blue-300">en español</span></p>
                        <ul className="flex gap-2 text-md font-bold flex-wrap justify-around">
                            {projectData.enlaces.length > 0 ? (
                                projectData.enlaces.map((item, index) => (
                                    <li key={index}>
                                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                            {item.tag}
                                        </a>
                                    </li>
                                ))
                            ) : (
                                <li>
                                    <Link href="/Codepedia" className="hover:underline">Codepedia</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </section>
            
            <div
                className={`grid gap-4 grid-rows-auto w-full ${changeForm ? 'grid-cols-1' : 'lg:grid-cols-[55%_45%] lg:pr-4'}`}
            >
                {projectData.secciones.map((sec, num) => (
                    <SectionProject
                        key={sec.id || num}
                        changeForm={changeForm}
                        setChangeForm={setChangeForm}
                        keytap={num}
                        totalSections={projectData.secciones.length}
                    >
                        <TiptapRenderer
                            htmlContent={sec.contenidoJson}
                            textSize={textSize}
                            baseId={`sec-${sec.id || num}`}
                            projectDescription={projectData.descripcion}
                        />
                    </SectionProject>
                ))}
            </div>
        </div>
    )
}
