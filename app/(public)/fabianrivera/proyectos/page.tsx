import type { Metadata } from 'next'
import ProjectsFabian from "@/features/fabianPage/pages/projectsFabian";
import { getResourcesUseCase } from "@/server/resources/infrastructure/dependencies";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Proyectos de Software",
  description: "Catálogo de proyectos de software, arquitecturas cloud y soluciones web desarrolladas por Fabian Rivera.",
  openGraph: {
    title: "Proyectos de Software | Fabian Rivera",
    description: "Catálogo de proyectos de software, arquitecturas cloud y soluciones web desarrolladas por Fabian Rivera.",
    url: "https://fabianrivera.dev/fabianrivera/proyectos",
  }
};

export default async function Page() {
    let proyectos: any = [];
    try {
        proyectos = await getResourcesUseCase.execute({ tipo: "PROYECTO" });
    } catch (error) {
        console.error("Error al cargar proyectos en /fabianrivera/proyectos:", error);
    }
    return <ProjectsFabian proyectos={Array.isArray(proyectos) ? proyectos : []} />;
}
