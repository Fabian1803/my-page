'use client'
import Image from 'next/image'
import ImageCodepedia from '../components/imageCodepediaP/ImageCodepedia'
import { useCodePedia } from '../context/CodePediaContext'
import Link from 'next/link'
import { AiOutlineDash } from 'react-icons/ai'

interface CodePediaProjectProps {
    children?: React.ReactNode
    changeForm: boolean
    setChangeForm: (change: boolean) => void
    keytap: number
}

function SectionProject({ children, changeForm, setChangeForm, keytap }: CodePediaProjectProps) {
    const sectionNumber: Record<number, { width: string; rowSpan: string }> = {
        0: { width: 'max-h-150', rowSpan: '' },
        1: { width: 'max-h-330', rowSpan: 'row-span-4' },
        2: { width: 'max-h-100', rowSpan: '' },
        3: { width: 'max-h-150', rowSpan: 'row-span-3' },
        4: { width: 'max-h-75', rowSpan: '' },
    }
    return (
        <div className={changeForm ? '' : 'p-4 border border-gray-400 flex flex-col justify-between' + ' ' + sectionNumber[keytap].rowSpan}>
            <div className={`w-full ${changeForm ? '' : sectionNumber[keytap].width + ' overflow-hidden'}` }>
                {children}
            </div>
            <div className={`w-full flex items-center justify-between gap-4 mt-4 ${changeForm ? 'hidden' : ''}`}>
                <button className="border border-gray-400 px-4 py-1 font-bold hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setChangeForm(true)}>
                    Leer
                </button>
                <Link href="#" className="w-full font-bold hover:underline">
                    Todos los proyectos destacados
                </Link>
                <AiOutlineDash size={30} />
            </div>
        </div>
    )
}



export default function CodePediaProject() {
    const { changeForm, setChangeForm } = useCodePedia()
    const { textSize } = useCodePedia()
    const fontSizes = {
        small: '14px',
        medium: '18px',
        large: '20px'
    }
    const restmock = {
        nombre: 'proyecto de ejemplo de java en tal empresa',
        descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis neque veniam fugiat, totam voluptates.',
        urls: [
            { github1: 'https://github.com/user/repo1', tag: 'Github' },
            { github2: 'https://github.com/user/repo2', tag: 'Github' },
            { gitlab: 'https://gitlab.com/user/repo', tag: 'Gitlab' },
            { website: 'https://www.example.com', tag: 'Website' },
            { docker: 'https://hub.docker.com/r/user/repo', tag: 'Docker' },
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
                    <div className='flex flex-col gap-2 md:gap-0'>
                        <h1 className="text-2xl md:text-3xl font-semibold">{restmock.nombre}</h1>
                        <p className="text-md line-clamp-2 md:line-clamp-3 lg:line-clamp-3 max-w-full md:max-w-100 lg:max-w-125 xl:max-w-150">{restmock.descripcion}</p>
                    </div>
                    <div className="flex flex-col justify-center md:items-end gap-2 md:gap-4 md:w-150">
                        <p className="text-[14px]"><Link href="#" className="text-blue-600 dark:text-blue-300 font-bold">100</Link> articulos <span className="text-blue-600 dark:text-blue-300">en español</span></p>
                        <ul className="flex gap-2 text-md font-bold flex-wrap justify-around">
                            {restmock.urls.map((item, index) => (
                                <li key={index}>
                                    <Link href={item.tag}>
                                        {item.tag}
                                    </Link>
                                </li>
                            )
                            )}
                        </ul>
                    </div>
                </div>
            </section>
            <div
                className={`grid gap-4 grid-rows-auto w-full ${changeForm ? 'grid-cols-1' : 'lg:grid-cols-[55%_45%] lg:pr-4 '}`}
                style={{ fontSize: fontSizes[textSize] }}
            >
                {[0, 1, 2, 3, 4].map((num) => (
                    <SectionProject key={num} changeForm={changeForm} setChangeForm={setChangeForm} keytap={num}>
                        <p className="font-bold mb-2">Sección {num + 1}</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis neque veniam fugiat, totam voluptates.</p>
                        <ImageCodepedia id='imagen-portada' imageSrc="/log.webp" title="Titulo del articulo destacado" description="Descripción del articulo destacado" />
                        
                    </SectionProject>
                ))}
            </div>
        </div>
    )
}
