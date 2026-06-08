import Image from 'next/image'
import React from 'react'

export default function CodePediaMain() {
    return (
        <div className="w-full h-full py-4 gap-4 flex flex-col">
            <section className="relative h-40 w-full overflow-hidden border border-gray-400">
                <Image
                    src="/wikiBg.png"
                    alt="CodePedia background"
                    fill
                    priority
                    className="object-cover grayscale"
                />
                <div className="absolute inset-0 z-10 bg-gray-100 opacity-70" />
                <div className="absolute inset-0 z-20 w-full h-full p-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-semibold">Nombre del proyecto</h1>
                        <p className="text-sm">Descripcion corta del proyecto!</p>
                    </div>
                    <div className="flex flex-col justify-center items-end gap-4">
                        <p className="text-xs font-bold">100 articulos en español</p>
                        <ul className="flex gap-2 text-sm font-bold">
                            <li>parte 1</li>
                            <li>parte 2</li>
                            <li>parte 3</li>
                            <li>parte 4</li>
                            <li>parte 5</li>
                        </ul>
                    </div>
                </div>
            </section>
            <div className="w-full h-full grid grid-cols-2 gap-4">
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
                <div className='border border-gray-400 p-4'>
                    <p className="text-lg font-bold">Articulo Destacado</p>
                    <h2 className="text-md font-semibold mt-2">Titulo del articulo destacado</h2>
                    <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis neque veniam fugiat, totam voluptates blanditiis doloribus dicta odit quam? Accusantium numquam aut perspiciatis explicabo aliquam hic delectus quas error quo?</p>
                </div>
            </div>
        </div>
    )
}
