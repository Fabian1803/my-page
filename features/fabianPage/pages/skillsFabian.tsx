import SearchMapComponent from '../components/searchMapComponent'
import SkillCard, { SkillItemData } from '../components/SkillCard'

interface SkillsFabianProps {
  skills: SkillItemData[];
}

export default function SkillsFabian({ skills }: SkillsFabianProps) {
  const visibleSkills = (skills || []).filter((skill) => skill.proyectos && skill.proyectos.length > 0);

  return (
    <SearchMapComponent>
      <div className="pr-3 pl-2 py-4 md:px-4 md:py-5 flex flex-col gap-10">
        {visibleSkills.length === 0 ? (
          <div className="text-gray-500 text-sm py-10">
            No se han registrado habilidades técnicas con proyectos asociados aún.
          </div>
        ) : (
          visibleSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))
        )}
      </div>
    </SearchMapComponent>
  )
}
