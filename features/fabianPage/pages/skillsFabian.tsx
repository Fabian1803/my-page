import SearchMapComponent from '../components/searchMapComponent'
import Image from 'next/image'
import Link from 'next/link'

export default function SkillsFabian() {
  return (
    <SearchMapComponent>
      <div className="py-8 flex flex-col gap-10">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="w-full max-w-2xl flex gap-4">
            <Link href="/Codepedia"className="shrink-0">
              <Image
                src="/FLogo.webp"
                alt="Skill Icon"
                width={70} // Ajustado un toque para que guarde mejor proporción en móviles
                height={70}
                priority
                className="rounded-xl border border-gray-100 object-contain"
              />
            </Link>
            <div className="w-full">
              <Link href="/Codepedia" className="group inline-block">
                <span className="text-xs sm:text-sm text-gray-500 block truncate">
                  www.example.com › skills
                </span>
                <h3 className="text-base sm:text-xl font-medium text-[#1a0dab] leading-tight mt-0.5">
                  Título de la habilidad
                </h3>
              </Link>
              <div className="border border-gray-200 rounded-2xl w-full p-4 bg-white shadow-sm space-y-3">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                  Proyectos relacionados:
                </span>

                <div className="space-y-2">
                  {[1, 2, 3].map((itemProyecto) => (
                    <Link
                      href="/Codepedia"
                      key={itemProyecto}
                      className="flex items-center gap-2 text-sm text-[#1a0dab] "
                    >
                      {/* Punto de viñeta estilizado sutilmente */}
                      <span className="text-gray-400 text-xs shrink-0 select-none">●</span>
                      <span className="truncate">Título de proyecto relacionado</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SearchMapComponent>
  )
}
