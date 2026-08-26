import Link from 'next/link'

export interface RelatedProject {
  id: string;
  nombre: string;
  descripcion?: string;
}

export interface SkillItemData {
  id: string;
  nombre: string;
  imagenUrl?: string;
  proyectos: RelatedProject[];
}

interface SkillCardProps {
  skill: SkillItemData;
}

export default function SkillCard({ skill }: SkillCardProps) {
  const iconUrl = skill.imagenUrl || '/FLogo.webp';

  return (
    <div className="w-full max-w-2xl flex gap-3 sm:gap-4 min-w-0">
      <Link href={`/Codepedia/${encodeURIComponent(skill.nombre)}`} className="shrink-0">
        <img
          src={iconUrl}
          alt={skill.nombre}
          className="w-12 h-12 sm:w-[70px] sm:h-[70px] object-contain p-1"
        />
      </Link>
      <div className="w-full min-w-0 flex-1">
        <Link href={`/Codepedia/${encodeURIComponent(skill.nombre)}`} className="group block w-full min-w-0">
          <span className="text-xs sm:text-sm text-gray-500 block break-all line-clamp-1">
            fabianrivera.dev › skills › {skill.nombre.toLowerCase()}
          </span>
          <h3 className="text-base sm:text-xl font-medium text-[#1a0dab] group-hover:underline leading-tight mt-0.5 break-words line-clamp-2">
            {skill.nombre}
          </h3>
        </Link>
        <div className="border border-gray-200 rounded-2xl w-full p-3 sm:p-4 bg-white shadow-sm space-y-2 sm:space-y-3 mt-1 min-w-0">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
            Proyectos relacionados:
          </span>

          {skill.proyectos.length === 0 ? (
            <p className="text-xs text-gray-400 italic break-words">No hay proyectos vinculados a esta habilidad todavía.</p>
          ) : (
            <div className="space-y-1.5 sm:space-y-2 w-full min-w-0">
              {skill.proyectos.slice(0, 3).map((proyecto) => (
                <Link
                  href={`/Codepedia/project/${proyecto.id}`}
                  key={proyecto.id}
                  className="flex items-start gap-2 text-xs sm:text-sm text-[#1a0dab] hover:underline w-full min-w-0"
                >
                  <span className="text-gray-400 text-xs shrink-0 select-none mt-0.5">●</span>
                  <span className="break-words line-clamp-2 min-w-0 flex-1">
                    {proyecto.nombre}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
