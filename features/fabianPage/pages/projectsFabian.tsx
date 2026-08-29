import SearchMapComponent from '../components/searchMapComponent'
import ProjectCard, { ProjectItemData } from '../components/ProjectCard'

interface ProjectsFabianProps {
  proyectos: ProjectItemData[];
}

export default function ProjectsFabian({ proyectos }: ProjectsFabianProps) {
  const sortedProyectos = [...(proyectos || [])].sort((a, b) => {
    if (a.destacado && !b.destacado) return -1;
    if (!a.destacado && b.destacado) return 1;
    return 0;
  });

  return (
    <SearchMapComponent>
      <div className=" flex flex-col pb-24">
        {sortedProyectos.length === 0 ? (
          <div className="text-gray-500 text-sm py-10">
            No se han registrado proyectos aún en el portafolio.
          </div>
        ) : (
          sortedProyectos.map((proyecto) => (
            <ProjectCard key={proyecto.id} project={proyecto} />
          ))
        )}
      </div>
    </SearchMapComponent>
  )
}
