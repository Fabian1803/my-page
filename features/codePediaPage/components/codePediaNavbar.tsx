'use client';

import Link from 'next/link'
import { useState } from 'react'
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

export default function CodePediaNavbar() {
  const [showMenu, setShowMenu] = useState(false)
  const navLinkClassName = 'flex h-full items-center hover:border-b-2 hover:border-black hover:text-black py-1 sm:py-0'
  
  // Grupo 1: Siempre visibles (a la izquierda)
  const mainLinks = [
    { href: '/', label: 'Portada' },
    { href: '/acerca-de', label: 'Discusión' },
  ]

  // Grupo 2: Se vuelven un menú desplegable en móvil
  const toolLinks = [
    { href: '/contacto', label: 'Leer' },
    { href: '/politica-de-privacidad', label: 'Código Fuente' },
    { href: '/terminos-de-servicio', label: 'Ver Historial' },
    { href: '/cookies', label: 'Herramientas' },
  ]

  return (
    // relative es clave para que el menú flotante de móvil no se mueva de su sitio
    <nav className="relative mt-5 flex h-8 items-center justify-between border-y border-gray-400 text-sm font-medium text-blue-700 select-none">
      
      {/* 👈 LADO IZQUIERDO: Portada y Discusión (Siempre fijos) */}
      <div className="flex h-full items-center gap-3">
        {mainLinks.map((item) => (
          <Link key={item.href} href={item.href} className={navLinkClassName}>
            {item.label}
          </Link>
        ))}
      </div>

      {/* 👉 LADO DERECHO (Escritorio): Se muestra horizontal normal a partir de 'md:' */}
      <div className="hidden sm:flex h-full items-center gap-3">
        {toolLinks.map((item) => (
          <Link key={item.href} href={item.href} className={navLinkClassName}>
            {item.label}
          </Link>
        ))}
      </div>

      {/* 📱 BOTÓN INTERACTIVO (Solo Móvil): Reemplaza todo el grupo 2 */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex sm:hidden items-center gap-1 h-full px-2 hover:bg-gray-100 text-gray-700 border-l border-gray-300"
      >
        <span>Más acciones</span>
        {showMenu ? <BiChevronUp size={18} /> : <BiChevronDown size={18} />}
      </button>

      {/* 🪟 MENÚ DESPLEGABLE FLOTANTE (Solo Móvil): Aparece al hacer clic */}
      {showMenu && (
        <div className="absolute right-0 top-8 w-44 bg-white border border-gray-400 shadow-md rounded-sm z-30 flex flex-col p-2 gap-1 animate-fade-in md:hidden">
          {toolLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setShowMenu(false)} // Cierra el menú al hacer clic en una opción
              className="w-full px-3 py-2 text-left hover:bg-gray-100 hover:text-blue-800 text-blue-700 border-b border-gray-100 last:border-none"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

    </nav>
  )
}