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
    <div className="w-full max-w-2xl flex gap-4">
      <Link href={`/Codepedia/${encodeURIComponent(skill.nombre)}`} className="shrink-0">
        <img
          src={iconUrl}
          alt={skill.nombre}
          className="w-[64px] h-[64px] sm:w-[70px] sm:h-[70px] object-contain p-1"
        />
      </Link>
      <div className="w-full min-w-0">
        <Link href={`/Codepedia/${encodeURIComponent(skill.nombre)}`} className="group inline-block max-w-full">
          <span className="text-xs sm:text-sm text-gray-500 block truncate">
            fabianrivera.dev › skills › {skill.nombre.toLowerCase()}
          </span>
          <h3 className="text-base sm:text-xl font-medium text-[#1a0dab] group-hover:underline leading-tight mt-0.5 truncate">
            {skill.nombre}
          </h3>
        </Link>
        <div className="border border-gray-200 rounded-2xl w-full p-4 bg-white shadow-sm space-y-3 mt-1">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
            Proyectos relacionados:
          </span>

          {skill.proyectos.length === 0 ? (
            <p className="text-xs text-gray-400 italic">No hay proyectos vinculados a esta habilidad todavía.</p>
          ) : (
            <div className="space-y-2">
              {skill.proyectos.slice(0, 3).map((proyecto) => (
                <Link
                  href={`/Codepedia/project/${proyecto.id}`}
                  key={proyecto.id}
                  className="flex items-center gap-2 text-sm text-[#1a0dab] hover:underline"
                >
                  <span className="text-gray-400 text-xs shrink-0 select-none">●</span>
                  <span className="truncate">{proyecto.nombre}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
