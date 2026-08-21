import SearchMapComponent from '../components/searchMapComponent'
import ProjectCard, { ProjectItemData } from '../components/ProjectCard'

interface ProjectsFabianProps {
  proyectos: ProjectItemData[];
}

export default function ProjectsFabian({ proyectos }: ProjectsFabianProps) {
  return (
    <SearchMapComponent>
      <div className=" flex flex-col">
        {proyectos.length === 0 ? (
          <div className="text-gray-500 text-sm py-10">
            No se han registrado proyectos aún en el portafolio.
          </div>
        ) : (
          proyectos.map((proyecto) => (
            <ProjectCard key={proyecto.id} project={proyecto} />
          ))
        )}
      </div>
    </SearchMapComponent>
  )
}
