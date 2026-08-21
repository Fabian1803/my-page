import SearchMapComponent from './components/searchMapComponent'
import ProjectCard, { ProjectItemData } from './components/ProjectCard'
import SkillCard, { SkillItemData } from './components/SkillCard'
import ImagesPreviewSection from './components/ImagesPreviewSection'
import CertificatesPreviewSection from './components/CertificatesPreviewSection'

export interface FabianMainData {
  proyectos: ProjectItemData[];
  skills: SkillItemData[];
  imagenes: any[];
  certificados: any[];
}

export default function FabianPageMain({ data }: { data?: FabianMainData }) {
  const {
    proyectos = [],
    skills = [],
    imagenes = [],
    certificados = []
  } = data || {};

  const proyecto1 = proyectos[0];
  const proyecto2 = proyectos[1];
  const proyectosRestantes = proyectos.slice(2);

  const skill1 = skills[0];
  const skillsRestantes = skills.slice(1);

  return (
    <SearchMapComponent>
      <div className="flex flex-col py-2">
        {imagenes.length > 0 && (
          <ImagesPreviewSection images={imagenes} />
        )}
        {proyecto1 && (
          <ProjectCard project={proyecto1} />
        )}
        {proyecto2 && (
          <ProjectCard project={proyecto2} />
        )}

        {skill1 && (
          <div className="p-4 max-w-200">
            <SkillCard skill={skill1} />
          </div>
        )}

        {certificados.length > 0 && (
          <CertificatesPreviewSection certificates={certificados} />
        )}
        {proyectosRestantes.map((proj) => (
          <ProjectCard key={proj.id} project={proj} />
        ))}
        {skillsRestantes.map((sk) => (
          <div key={sk.id} className="p-4 max-w-200">
            <SkillCard skill={sk} />
          </div>
        ))}
      </div>
    </SearchMapComponent>
  )
}
