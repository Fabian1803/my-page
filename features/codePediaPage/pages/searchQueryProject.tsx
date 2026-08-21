'use client'
import Link from "next/link"
import { useCodePedia } from '../context/CodePediaContext'

export interface ProjectSearchResult {
    id: string;
    imagen?: string;
    nombre: string;
    descripcion: string;
    url: string;
    date?: string;
}

interface SearchQueryProjectProps {
    searchQuery?: string;
    proyectosEncontrados?: ProjectSearchResult[];
    otrosProyectos?: ProjectSearchResult[];
}

function CartSection({ imagen, nombre, descripcion, url, date }: { imagen?: string; nombre: string; descripcion: string; url: string; date?: string }) {
    return (
        <Link href={url} className="flex gap-2 md:gap-4 hover:shadow-md transition-shadow max-w-3xl">
            <div className="border min-w-18 min-h-18 w-18 h-18 md:min-w-23 md:w-23 md:h-23 md:min-h-23 border-gray-400 overflow-hidden bg-gray-100 dark:bg-gray-950 flex items-center justify-center">
                <img src={imagen || "/FLogo.webp"} alt="Imagen del proyecto" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col gap-1 justify-around min-w-0">
                <h2 className="text-md highlight truncate">{nombre}</h2>
                <p className="text-sm line-clamp-3 md:line-clamp-2">{descripcion}</p>
                <span className="text-xs text-gray-500 dark:text-gray-400">{date}</span>
            </div>
        </Link>
    )
}

export default function SearchQueryProject({
    searchQuery = "",
    proyectosEncontrados = [],
    otrosProyectos = []
}: SearchQueryProjectProps) {
    const { width } = useCodePedia()

    return (
        <div className={`py-4 ${width === 'full' ? 'md:px-30' : ''}`}>
            <h1 className="text-3xl font-semibold font-['Roboto']">Resultados de la búsqueda</h1>

            <div className="border-b border-gray-400" />
            {proyectosEncontrados.length === 0 ? (
                <div className="flex my-8">
                    <p className="text-gray-500 dark:text-gray-400 text-center">
                        No se encontraron resultados para <span className="italic font-semibold text-gray-800 dark:text-gray-200">&quot;{searchQuery}&quot;</span>.
                    </p>
                </div>
            ) : (
                <div className="gap-4 flex flex-col my-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Se encontraron {proyectosEncontrados.length} resultados para <span className="italic font-semibold text-gray-800 dark:text-gray-200">&quot;{searchQuery}&quot;</span>
                    </p>
                    <div className="flex flex-col gap-4">
                        {proyectosEncontrados.map((item) => (
                            <CartSection
                                key={item.id}
                                imagen={item.imagen}
                                nombre={item.nombre}
                                descripcion={item.descripcion}
                                url={item.url}
                                date={item.date}
                            />
                        ))}
                    </div>
                </div>
            )}

            {otrosProyectos.length > 0 && (
                <div className="gap-4 flex flex-col mt-8 pt-4 border-t border-gray-300 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-2">
                        ¿No encontraste exactamente lo que buscabas? Quizá te interese explorar otras publicaciones recientes, guías de arquitectura y proyectos destacados dentro de Codepedia.
                    </p>
                    <div className="flex flex-col gap-4">
                        {otrosProyectos.map((item) => (
                            <CartSection
                                key={item.id}
                                imagen={item.imagen}
                                nombre={item.nombre}
                                descripcion={item.descripcion}
                                url={item.url}
                                date={item.date}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
