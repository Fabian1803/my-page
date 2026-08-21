import ProjectsFabian from "@/features/fabianPage/pages/projectsFabian";
import { getResourcesUseCase } from "@/server/resources/infrastructure/dependencies";
export const revalidate = 3600;
export default async function Page() {
    const proyectos = await getResourcesUseCase.execute({ tipo: "PROYECTO" });
    return <ProjectsFabian proyectos={Array.isArray(proyectos) ? proyectos : []} />;
}
