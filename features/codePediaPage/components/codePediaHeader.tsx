import Image from 'next/image'
import { FiMenu } from 'react-icons/fi'
import { BsEyeglasses } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { TfiMoreAlt } from "react-icons/tfi"
import Link from 'next/link';
export default function CodePediaHeader() {
  return (
    <header className="h-17 px-4 lg:pl-9 lg:pr-12">
      <div className="h-full max-w-screen-2xl w-full grid-cols-[50_140_auto]
      grid md:grid-cols-[50_220_auto_260]">
        <div className="h-full flex items-center">
          <button aria-label="Abrir menú" className="p-1  hover:bg-gray-200">
            <FiMenu size={20} />
          </button>
        </div>

        <Link href="/Codepedia" className="flex items-center gap-2">
          <Image src="/wikiLog.webp" alt="Logo" width={45} height={45} className="w-auto h-auto object-contai hidden md:block" priority />
          <div className="flex flex-col justify-center">
            <Image src="/wikitittleLogo.webp" alt="Nombre" width={70} height={30} className="w-auto h-auto object-contain" priority />
            <Image src="/wikiSubtexLogo.webp" alt="Subtexto" width={70} height={20} className="w-auto h-auto object-contain" priority />
          </div>
        </Link>
        <div className="h-full items-center hidden lg:flex">
          <div className="items-center grid grid-cols-[auto_70] w-full max-w-120">
            <div className="w-full grid grid-cols-[30_auto] h-full dark:text-gray-300 dark:border-gray-500 border-y-1 border-l-1 dark:hover:border-1 dark:hover:border-gray-400 transition-colors duration-300 items-center px-2">
              <div className="flex justify-center"><IoIosSearch className="text-gray-500" size={20} /></div>
              <input id="cp-search" type="text" placeholder="Buscar en Codepedia" className="outline-none text-gray-900 dark:text-gray-100" />
            </div>
            <Link href="/Codepedia/loquesea" className="px-1 text-center py-[5px] hover:bg-gray-300 dark:hover:bg-gray-900 dark:text-gray-300 font-bold text-sm border-1 dark:border-gray-500 dark:hover:border-gray-400 transition-colors duration-300">Buscar</Link>
          </div>
        </div>
        <div className="lg:hidden items-center flex justify-end gap-1">
          <button className="p-3 hover:bg-gray-200 rounded-sm"><IoIosSearch size={22} className="text-black" /></button>
          <button className="p-3 hover:bg-gray-200 rounded-sm"><BsEyeglasses size={22} className="text-black" /></button>
          <button className="p-3 hover:bg-gray-200 rounded-sm md:hidden"><TfiMoreAlt size={22} className="text-black" /></button>
        </div>

        <div className="md:flex items-center justify-end hidden">
          <ul className="flex gap-2 text-sm text-blue-600 dark:text-blue-300 ">
            <li>Donaciones</li>
            <li>Crear una cuenta</li>
            <li>Acceder</li>
          </ul>
        </div>

      </div>
    </header>
  )
}
