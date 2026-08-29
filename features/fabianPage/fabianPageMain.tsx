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

  const sortedProyectos = [...proyectos].sort((a, b) => {
    if (a.destacado && !b.destacado) return -1;
    if (!a.destacado && b.destacado) return 1;
    return 0;
  });

  const proyecto1 = sortedProyectos[0];
  const proyecto2 = sortedProyectos[1];
  const proyectosRestantes = sortedProyectos.slice(2);
  const top5Skills = [...skills]
    .sort((a, b) => (b.proyectos?.length || 0) - (a.proyectos?.length || 0))
    .slice(0, 5);

  const skill1 = top5Skills[0];
  const skillsRestantes = top5Skills.slice(1);

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
  );
}
