import type { Metadata } from 'next'
import SkillsFabian from '@/features/fabianPage/pages/skillsFabian'
import { getCategoriasUseCase } from '@/server/categoria/infrastructure/dependencies'
import { getResourcesUseCase } from '@/server/resources/infrastructure/dependencies'

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Habilidades Técnicas y Stack",
  description: "Tecnologías, lenguajes de programación, frameworks y herramientas que domina Fabian Rivera en el desarrollo de software.",
  openGraph: {
    title: "Habilidades Técnicas y Stack | Fabian Rivera",
    description: "Tecnologías, lenguajes de programación y frameworks que domina Fabian Rivera.",
    url: "https://fabianrivera.dev/fabianrivera/skills",
  }
};

export default async function Page() {
  let categoriasRaw: any = [];
  let proyectosRaw: any = [];

  try {
    const results = await Promise.all([
      getCategoriasUseCase.execute(),
      getResourcesUseCase.execute({ tipo: "PROYECTO" })
    ]);
    categoriasRaw = results[0];
    proyectosRaw = results[1];
  } catch (error) {
    console.error("Error al cargar skills en /fabianrivera/skills:", error);
  }

  const categorias = Array.isArray(categoriasRaw) ? categoriasRaw : [];
  const proyectos = Array.isArray(proyectosRaw) ? proyectosRaw : [];

  const skillsData = categorias
    .map((cat: any) => {
      const proyectosRelacionados = proyectos.filter((p: any) => {
        const pCats = p.categorias || [];
        return pCats.some((c: any) => {
          const catName = typeof c === 'string' ? c : c.nombre;
          return catName?.trim().toLowerCase() === cat.nombre?.trim().toLowerCase();
        });
      });

      return {
        id: cat.id,
        nombre: cat.nombre,
        imagenUrl: cat.imagenUrl,
        proyectos: proyectosRelacionados.slice(0, 3).map((p: any) => ({
          id: p.id,
          nombre: p.nombre,
          descripcion: p.descripcion
        }))
      };
    })
    .filter((s) => s.proyectos.length > 0);

  return <SkillsFabian skills={skillsData} />;
}
