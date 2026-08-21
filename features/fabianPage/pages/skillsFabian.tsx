import SearchMapComponent from '../components/searchMapComponent'
import SkillCard, { SkillItemData } from '../components/SkillCard'

interface SkillsFabianProps {
  skills: SkillItemData[];
}

export default function SkillsFabian({ skills }: SkillsFabianProps) {
  return (
    <SearchMapComponent>
      <div className="py-8 flex flex-col gap-10">
        {skills.length === 0 ? (
          <div className="text-gray-500 text-sm py-10">
            No se han registrado habilidades técnicas aún.
          </div>
        ) : (
          skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))
        )}
      </div>
    </SearchMapComponent>
  )
}
