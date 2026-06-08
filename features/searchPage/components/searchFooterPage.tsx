import React from 'react'

export default function SearchFooterPage() {
  return (
    <footer className="grid bg-gray-500/10 max-[600px]:grid-rows-[34%_66%]">
      <div className="flex items-center px-[30px] border-b border-gray-500/30 justify-start max-[1200px]:!justify-around max-[600px]:!justify-center max-[600px]:grid">
        Perú
      </div>
      <div className="flex items-center px-[30px] justify-between max-[1200px]:justify-around max-[600px]:justify-center max-[600px]:grid max-[600px]:gap-4">
        <div className="flex gap-5 max-[600px]:justify-center">
          <p className="flex items-center">Quien soy</p>
          <p className="flex items-center">Experiencia</p>
          <p className="flex items-center">Estudio</p>
        </div>
        <div className="flex gap-5 max-[600px]:justify-center">
          <p className="flex items-center">Conocimientos</p>
          <p className="flex items-center">Curriculum</p>
        </div>
      </div>
    </footer>
  )
}