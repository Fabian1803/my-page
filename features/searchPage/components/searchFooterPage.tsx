import Link from 'next/link'
import React from 'react'

export default function SearchFooterPage() {
  return (
    <footer className="grid bg-gray-500/10 max-[600px]:grid-rows-[34%_66%]">
      <div className="flex items-center px-[30px] border-b border-gray-500/30 justify-start max-[1200px]:!justify-around max-[600px]:!justify-center max-[600px]:grid">
        Perú
      </div>
      <div className="flex items-center px-[30px] justify-between max-[1200px]:justify-around max-[600px]:justify-center max-[600px]:grid max-[600px]:gap-4">
        <div className="flex gap-5 max-[600px]:justify-center">
          <Link href="/fabianrivera/sobre-mi" className="flex items-center">
            Quien soy
          </Link>
          <Link href="/fabianrivera/proyectos" className="flex items-center">
            Experiencia
          </Link>
          <Link href="/Codepedia" className="flex items-center">
            Corelia
          </Link>
        </div>
        <div className="flex gap-5 max-[600px]:justify-center">
          <Link href="/fabianrivera/skills" className="flex items-center">
            Conocimientos
          </Link>
          <Link href="/fabianrivera/cv" className="flex items-center">
            Curriculum
          </Link>
        </div>
      </div>
    </footer>
  )
}