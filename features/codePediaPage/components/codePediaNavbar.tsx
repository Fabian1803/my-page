'use client';

import Link from 'next/link'
import { useState } from 'react'
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

export default function CodePediaNavbar() {
  const [showMenu, setShowMenu] = useState(false)
  const navLinkClassName = 'flex h-full items-center hover:border-b-2 hover:border-black dark:hover:border-white dark:hover:text-white py-1 sm:py-0'
  const mainLinks = [
    { href: '/', label: 'Portada' },
    { href: '/acerca-de', label: 'Discusión' },
  ]

  const toolLinks = [
    { href: '/contacto', label: 'Leer' },
    { href: '/politica-de-privacidad', label: 'Código Fuente' },
    { href: '/terminos-de-servicio', label: 'Ver Historial' },
    { href: '/cookies', label: 'Herramientas' },
  ]

  return (
    // relative es clave para que el menú flotante de móvil no se mueva de su sitio
    <nav className="relative mt-5 flex h-8 items-center justify-between border-y border-gray-400 text-sm font-medium text-blue-700 dark:text-blue-300 select-none">
      <div className="flex h-full items-center gap-3">
        {mainLinks.map((item) => (
          <Link key={item.href} href={item.href} className={navLinkClassName}>
            {item.label}
          </Link>
        ))}
      </div>

      <div className="hidden sm:flex h-full items-center gap-3">
        {toolLinks.map((item) => (
          <Link key={item.href} href={item.href} className={navLinkClassName}>
            {item.label}
          </Link>
        ))}
      </div>

      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex sm:hidden items-center gap-1 h-full px-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-blue-300 border-l border-gray-300 dark:border-gray-400"
      >
        <span>Más acciones</span>
        {showMenu ? <BiChevronUp size={18} /> : <BiChevronDown size={18} />}
      </button>

      {showMenu && (
        <div className="absolute right-0 top-8 w-44 bg-white dark:bg-[#101418] border border-gray-400 dark:border-gray-700 shadow-md rounded-sm z-30 flex flex-col p-2 gap-1 animate-fade-in md:hidden">
          {toolLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setShowMenu(false)}
              className="w-full px-3 py-2 text-left text-blue-700 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-800 dark:hover:text-white border-b border-gray-100 dark:border-gray-800 last:border-none"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

    </nav>
  )
}