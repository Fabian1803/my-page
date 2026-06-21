'use client'
import Image from 'next/image'
import ImageCodepedia from './cPediaMainComponents/ImageCodepedia'
import { useCodePedia } from '../context/CodePediaContext' // Ajusta la ruta exacta

export default function CodePediaMain() {
    const { textSize } = useCodePedia()
    const fontSizes = {
        small: '13px',
        medium: '15px',
        large: '18px'
    }

    return (
        <div className="w-full h-full pt-4 gap-4 flex flex-col">
            {/* CABECERA: Se mantiene fija, ignorando el selector de tamaño */}
            <section className="relative h-45 md:h-50 w-full overflow-hidden border-y md:border border-gray-400">
                <Image
                    src="/wikiback.png"
                    alt="CodePedia background"
                    fill
                    priority
                    className="object-cover object-[center_20%] grayscale hidden md:block dark:content-[url('/wikiBackBlack.webp')]"
                />
                <div className="absolute inset-0 z-10 bg-gray-100 dark:bg-gray-950 opacity-70 hidden md:block" />
                <div className="absolute inset-0 z-20 w-full h-full md:pl-4 md:pr-8 flex gap-4 flex-col md:flex-row justify-center md:justify-between md:items-center">
                    <div>
                        <h1 className="text-xl md:text-3xl font-semibold">Nombre del proyecto</h1>
                        <p className="text-sm line-clamp-2 md:line-clamp-3 lg:line-clamp-3 max-w-100 lg:max-w-125 xl:max-w-150">Descripcion corta del proyecto!</p>
                    </div>
                    <div className="flex flex-col justify-center md:items-end gap-2 md:gap-4">
                        <p className="text-[14px]"><span className="text-blue-600 dark:text-blue-300 font-bold">100</span> articulos <span className="text-blue-600 dark:text-blue-300">en español</span></p>
                        <ul className="flex gap-2 text-md font-bold flex-wrap justify-around">
                            <li>parte 1</li>
                            <li>parte 2</li>
                            <li>parte 3</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* ARTÍCULOS: Aquí aplicamos el font-size heredable mediante style */}
            <div 
                className="grid lg:grid-cols-[55%_45%] lg:pr-4 gap-4 grid-rows-auto w-full"
                style={{ fontSize: fontSizes[textSize] }}
            >
                {/* Artículo 1 */}
                <div className='border border-gray-400 p-4'>
                    <p className="text-lg font-bold">Articulo Destacado</p>
                    <h2 className="text-md font-semibold mt-2">Titulo del articulo destacado</h2>
                    <p className="mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis neque veniam fugiat, totam voluptates.</p>
                    <div className="w-full">
                        <ImageCodepedia id='imagen-portada' imageSrc="/log.webp" title="Titulo del articulo destacado" description="Descripción del articulo destacado" />
                    </div>
                </div>

                {/* Artículo 2 (Lateral largo) */}
                <div className='border border-gray-400 p-4 row-span-4'>
                    <p className="text-lg font-bold">Articulo Destacado</p>
                    <h2 className="text-md font-semibold mt-2">Titulo del articulo destacado</h2>
                    <p className="mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis neque veniam fugiat, totam voluptates.</p>
                </div>

                {/* Artículo 3 */}
                <div className='border border-gray-400 p-4'>
                    <p className="text-lg font-bold">Articulo Destacado</p>
                    <h2 className="text-md font-semibold mt-2">Titulo del articulo destacado</h2>
                    <p className="mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis neque veniam fugiat, totam voluptates.</p>
                </div>

                {/* Los demás artículos heredarán automáticamente el tamaño del div padre... */}
                <div className='border border-gray-400 p-4 row-span-3'>
                    <p className="text-lg font-bold">Articulo Destacado</p>
                    <h2 className="text-md font-semibold mt-2">Titulo del articulo destacado</h2>
                    <p className="mt-1">Lorem ipsum dolor sit amet.</p>
                </div>
                <div className='border border-gray-400 p-4'>
                    <p className="text-lg font-bold">Articulo Destacado</p>
                    <h2 className="text-md font-semibold mt-2">Titulo del articulo destacado</h2>
                    <p className="mt-1">Lorem ipsum dolor sit amet.</p>
                </div>
            </div>
        </div>
    )
}