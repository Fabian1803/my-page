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

  const sortedProyectos = [...proyectos].sort((a, b) => Number(b.destacado) - Number(a.destacado));
  const top5Skills = [...skills]
    .sort((a, b) => (b.proyectos?.length || 0) - (a.proyectos?.length || 0))
    .slice(0, 5);

  const renderSkill = (skill?: SkillItemData) =>
    skill ? (
      <div key={skill.id} className="p-4 max-w-200">
        <SkillCard skill={skill} />
      </div>
    ) : null;

  return (
    <SearchMapComponent>
      <div className="flex flex-col py-2">
        {certificados.length > 0 && <CertificatesPreviewSection certificates={certificados} />}
        {sortedProyectos[0] && <ProjectCard project={sortedProyectos[0]} />}
        {sortedProyectos[1] && <ProjectCard project={sortedProyectos[1]} />}
        {renderSkill(top5Skills[0])}
        {imagenes.length > 0 && <ImagesPreviewSection images={imagenes} />}
        {sortedProyectos[2] && <ProjectCard project={sortedProyectos[2]} />}
        {renderSkill(top5Skills[1])}
        {sortedProyectos.slice(3).map((proj) => (
          <ProjectCard key={proj.id} project={proj} />
        ))}
        {top5Skills.slice(2).map(renderSkill)}
      </div>
    </SearchMapComponent>
  );
}
