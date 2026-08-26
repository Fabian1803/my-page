import ProjectsFabian from "@/features/fabianPage/pages/projectsFabian";
import { getResourcesUseCase } from "@/server/resources/infrastructure/dependencies";

export const revalidate = 3600;

export default async function Page() {
    let proyectos: any = [];
    try {
        proyectos = await getResourcesUseCase.execute({ tipo: "PROYECTO" });
    } catch (error) {
        console.error("Error al cargar proyectos en /fabianrivera/proyectos:", error);
    }
    return <ProjectsFabian proyectos={Array.isArray(proyectos) ? proyectos : []} />;
}
