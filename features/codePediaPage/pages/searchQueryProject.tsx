'use client'
import Link from "next/link"
import { useCodePedia } from '../context/CodePediaContext'

interface CartSectionProps {
    imagen?: string
    nombre: string
    descripcion: string
    url: string
    date?: string
}

function CartSection({ imagen, nombre, descripcion, url, date }: CartSectionProps) {
    return (
        <Link href={url} className="flex gap-2 md:gap-4 hover:shadow-md transition-shadow max-w-3xl">
            <div className="border min-w-18 min-h-18 w-18 h-18 md:min-w-23 md:w-23 md:h-23 md:min-h-23 border-gray-400 overflow-hidden bg-gray-100 dark:bg-gray-950">
                <img src={imagen || "/FLogo.webp"} alt="Imagen del proyecto" className="w-full h-auto rounded-lg" />
            </div>
            <div className="flex flex-col gap-1 justify-around">
                <h2 className="text-md highlight">{nombre}</h2>
                <p className="text-sm line-clamp-3 md:line-clamp-2">{descripcion}</p>
                <span className="text-xs text-gray-500 dark:text-gray-400">{date}</span>
            </div>
        </Link>
    )
}

export default function SearchQueryProject() {
    const { width } = useCodePedia()
    const cartMock = [
        {
            imagen: "/FLogo.webp",
            nombre: "Nombre del proyecto",
            descripcion: "Descripción breve del proyecto. Lorem ipsum dolor sit amet, consectetur adipiscing elit Descripción breve del proyecto. Lorem ipsum dolor sit amet, consectetur adipiscing elit Descripción breve del proyecto. Lorem ipsum dolor sit amet, consectetur adipiscing elit Descripción breve del proyecto. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            url: "#",
            date: "10 junio 2023"
        },
        {
            imagen: "/FLogo.webp",
            nombre: "Nombre del proyecto 2",
            descripcion: "Descripción breve del proyecto 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            url: "#",
            date: "15 junio 2023"
        },
        {
            imagen: "/FLogo.webp",
            nombre: "Nombre del proyecto 3",
            descripcion: "Descripción breve del proyecto 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            url: "#",
            date: "20 junio 2023"
        }
    ]
    return (
        <div className={`py-4 ${width === 'full' ? 'md:px-30' : ''}`}>
            <h1 className="text-3xl font-semibold font-['Roboto']">Resultados de la búsqueda</h1>

            <div className="border-b border-gray-400" />
            {cartMock.length == 0 ? (
                <div className="flex flex-col items-center gap-4 mt-10">
                    <img src="/searchNotFound.png" alt="No se encontraron resultados" className="w-40 h-40" />
                    <p className="text-gray-500 dark:text-gray-400">No se encontraron resultados para tu búsqueda.</p>
                </div>
            ) : (
                <div className="gap-4 flex flex-col my-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Se encontraron {cartMock.length} resultados para <span className="italic font-semibold text-gray-800 dark:text-gray-200">"tu_variable_de_busqueda"</span>
                    </p>
                    <div className="flex flex-col gap-4">
                        {cartMock.map((item, index) => (
                            <CartSection
                                key={index}
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

            <div className="gap-4 flex flex-col">
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-2">
                    ¿No encontraste exactamente lo que buscabas? Quizá te interese explorar otras publicaciones recientes, guías de arquitectura y proyectos destacados dentro de Codepedia.
                </p>
                <div className="flex flex-col gap-4">
                    {cartMock.map((item, index) => (
                        <CartSection
                            key={index}
                            imagen={item.imagen}
                            nombre={item.nombre}
                            descripcion={item.descripcion}
                            url={item.url}
                            date={item.date}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
