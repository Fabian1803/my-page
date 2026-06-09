import Image from 'next/image'
import React from 'react'
import ImageCodepedia from './cPediaMainComponents/ImageCodepedia'

export default function CodePediaMain() {
    return (
        <div className="w-full h-full pt-4 gap-4 flex flex-col">
            <section className="relative h-45 md:h-50 w-full overflow-hidden border-y md:border border-gray-400">
                <Image
                    src="/wikiback.png"
                    alt="CodePedia background"
                    fill
                    priority
                    className="object-cover object-[center_20%] grayscale hidden md:block"
                />
                <div className="absolute inset-0 z-10 bg-gray-100 opacity-70 hidden md:block" />
                <div className="absolute inset-0 z-20 w-full h-full md:pl-4 md:pr-8 flex gap-4 flex-col md:flex-row justify-center md:justify-between md:items-center">
                    <div>
                        <h1 className="text-xl md:text-3xl font-semibold">Nombre del proyecto</h1>
                        <p className="text-sm line-clamp-2 md:line-clamp-3 lg:line-clamp-3 max-w-150">Descripcion corta del proyecto! Descripcion corta del proyecto! Descripcion corta Descripcion corta del proyecto! Descripcion corta del proyecto! Descripcion corta Descripcion corta del proyecto! Descripcion corta del proyecto! Descripcion corta del proyecto! Descripcion corta del proyecto!</p>
                    </div>
                    <div className="flex flex-col justify-center md:items-end gap-2 md:gap-4">
                        <p className="text-[14px]"><span className="text-blue-600 font-bold">100</span> articulos <span className="text-blue-600">en español</span></p>
                        <ul className="flex gap-2 text-md font-bold flex-wrap justify-around">
                            <li>parte 1</li>
                            <li>parte 2</li>
                            <li>parte 3</li>
                            <li>parte 4</li>
                            <li>parte 5</li>
                        </ul>
                    </div>
                </div>
            </section>
            <div className="grid lg:grid-cols-[55%_45%] lg:pr-4 gap-4 grid-rows-auto w-full">
                <div className='border border-gray-400 p-4'>
                    <p className="text-lg font-bold">Articulo Destacado</p>
                    <h2 className="text-md font-semibold mt-2">Titulo del articulo destacado</h2>
                    <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis neque veniam fugiat, totam voluptates blanditiis doloribus dicta odit quam? Accusantium numquam aut perspiciatis explicabo aliquam hic delectus quas error quo?</p>
                    <div className="w-full">
                        <ImageCodepedia id='imagen-portada' imageSrc="/log.png" title="Titulo del articulo destacado" description="Descripción del articulo destacado Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis neque veniam fugiat, totam voluptates blanditiis" />
                    </div>
                </div>
                <div className='border border-gray-400 p-4 row-span-4'>
                    <p className="text-lg font-bold">Articulo Destacado</p>
                    <h2 className="text-md font-semibold mt-2">Titulo del articulo destacado</h2>
                    <p className="">Lorem ipsum dolor Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis neque veniam fugiat, totam voluptates Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis neque veniam fugiat, totam voluptates Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis neque veniam fugiat . Veritatis neque veniam fugiat, totam voluptates Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis neque veniam fugiat, totam voluptates Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis neque veniam fugiat . Veritatis neque veniam fugiat, totam voluptates Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis neque veniam fugiat, totam voluptates Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis neque veniam fugiat . Veritatis neque veniam fugiat, totam voluptates Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis neque veniam fugiat, totam voluptates Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis neque veniam fugiat, totam voluptates Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis neque veniam fugiat, totam voluptatessit amet consectetur adipisicing elit. Veritatis neque veniam fugiat, totam voluptates Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis neque veniam fugiat, totam voluptates Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis neque veniam fugiat, totam voluptates blanditiis doloribus dicta odit quam? Accusantium numquam aut perspiciatis explicabo aliquam hic delectus quas error quo?</p>
                </div>
                <div className='border border-gray-400 p-4'>
                    <p className="text-lg font-bold">Articulo Destacado</p>
                    <h2 className="text-md font-semibold mt-2">Titulo del articulo destacado</h2>
                    <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis neque veniam fugiat, totam voluptates blanditiis doloribus dicta odit quam? Accusantium numquam aut perspiciatis explicabo aliquam hic delectus quas error quo?</p>
                </div>
                <div className='border border-gray-400 p-4 row-span-3'>
                    <p className="text-lg font-bold">Articulo Destacado</p>
                    <h2 className="text-md font-semibold mt-2">Titulo del articulo destacado</h2>
                    <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis neque veniam fugiat, totam voluptates blanditiis doloribus dicta odit quam? Accusantium numquam aut perspiciatis explicabo aliquam hic delectus quas error quo?</p>
                </div>
                <div className='border border-gray-400 p-4'>
                    <p className="text-lg font-bold">Articulo Destacado</p>
                    <h2 className="text-md font-semibold mt-2">Titulo del articulo destacado</h2>
                    <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis neque veniam fugiat, totam voluptates blanditiis doloribus dicta odit quam? Accusantium numquam aut perspiciatis explicabo aliquam hic delectus quas error quo?</p>
                </div>
                <div className='border border-gray-400 p-4'>
                    <p className="text-lg font-bold">Articulo Destacado</p>
                    <h2 className="text-md font-semibold mt-2">Titulo del articulo destacado</h2>
                    <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis neque veniam fugiat, totam voluptates blanditiis doloribus dicta odit quam? Accusantium numquam aut perspiciatis explicabo aliquam hic delectus quas error quo?</p>
                </div>

                <div className='border border-gray-400 p-4'>
                    <p className="text-lg font-bold">Articulo Destacado</p>
                    <h2 className="text-md font-semibold mt-2">Titulo del articulo destacado</h2>
                    <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis neque veniam fugiat, totam voluptates blanditiis doloribus dicta odit quam? Accusantium numquam aut perspiciatis explicabo aliquam hic delectus quas error quo?</p>
                </div>
            </div>
        </div>
    )
}
