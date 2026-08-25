import { CodePediaNavbar } from '@/features/codePediaPage'
import CodePediaProject from '@/features/codePediaPage/pages/codePediaProject'
import { getResourcesUseCase } from '@/server/resources/infrastructure/dependencies'
import { notFound } from 'next/navigation'
export const revalidate = 3600;

interface PageProps {
  params: Promise<{ proyecto: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const projectId = resolvedParams.proyecto;

  const projectData = await getResourcesUseCase.execute({ id: projectId });

  if (!projectData) {
    const allProjects = await getResourcesUseCase.execute({ tipo: "PROYECTO" });
    const fallbackProject = Array.isArray(allProjects)
      ? allProjects.find((p: any) => p.id === projectId || p.nombre?.toLowerCase().includes(projectId.toLowerCase()))
      : null;

    if (!fallbackProject) {
      notFound();
    }

    return (
      <>
        <CodePediaNavbar />
        <CodePediaProject proyecto={fallbackProject} />
      </>
    );
  }

  return (
    <>
      <CodePediaNavbar />
      <CodePediaProject proyecto={projectData} />
    </>
  );
}
