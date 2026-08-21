import Link from 'next/link'

export interface ProjectItemData {
  id: string;
  nombre: string;
  descripcion: string;
  destacado?: boolean;
  imagenPrincipalUrl?: string;
  miniaturaUrl?: string | null;
  categorias?: Array<{ id: string; nombre: string } | string>;
  enlaces?: Array<{ id?: string; type: string; url: string }>;
}

interface ProjectCardProps {
  project: ProjectItemData;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/Codepedia/project/${project.id}`}
      className="gap-2 px-4 pt-4 grid grid-cols-[auto_140px] min-[500px]:grid-cols-[auto_180px] grid-rows-[auto_1fr] max-w-200"
    >
      <div className="flex gap-2 flex-col max-[500px]:col-span-2">
        {project.destacado && (
          <p className="text-md font-bold">Destacado</p>
        )}
        <div className="grid grid-cols-[40px_auto] grid-rows-2 items-center h-9">
          <div className="row-span-2 flex justify-center">
            <div className="rounded-full w-8 h-8 overflow-hidden flex items-center justify-center">
              <img src="/WikiLog.webp" alt="Logo" className="w-full h-full object-contain" />
            </div>
          </div>
          <h3 className="text-sm font-bold line-clamp-1">{project.nombre}</h3>
          <p className="text-xs line-clamp-1">{`https://fabianrivera.dev/Codepedia/project/${project.id}`}</p>
        </div>
      </div>

      <div className="col-start-1 min-[500px]:row-start-2">
        <h1 className="text-blue-800 font-bold">{project.nombre}</h1>
        <p className="line-clamp-5 md:line-clamp-4">{project.descripcion}</p>
      </div>

      <div className="flex items-center justify-center row-span-2 col-start-2">
        <div className="w-40 h-40 max-[500px]:w-30 max-[500px]:h-30 rounded-2xl bg-amber-400 overflow-hidden flex items-center justify-center">
          {project.imagenPrincipalUrl ? (
            <img src={project.imagenPrincipalUrl} alt={project.nombre} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-amber-400" />
          )}
        </div>
      </div>
    </Link>
  )
}
