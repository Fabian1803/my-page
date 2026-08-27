import type { Metadata } from 'next'
import { CodePediaNavbar } from '@/features/codePediaPage'
import CodePediaProject from '@/features/codePediaPage/pages/codePediaProject'
import { getResourcesUseCase } from '@/server/resources/infrastructure/dependencies'
import { notFound } from 'next/navigation'

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ proyecto: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const projectId = resolvedParams.proyecto;

  let projectData: any = null;
  try {
    projectData = await getResourcesUseCase.execute({ id: projectId });
    if (!projectData) {
      const allProjects = await getResourcesUseCase.execute({ tipo: "PROYECTO" });
      projectData = Array.isArray(allProjects)
        ? allProjects.find((p: any) => p.id === projectId || p.nombre?.toLowerCase().includes(projectId.toLowerCase()))
        : null;
    }
  } catch {
    projectData = null;
  }

  if (!projectData) {
    return {
      title: 'Proyecto no encontrado | Codepedia',
      description: 'El proyecto solicitado no se encuentra disponible en Codepedia.',
      icons: { icon: '/wikiLog.webp' }
    };
  }

  const title = `${projectData.nombre} | Codepedia`;
  const description = projectData.descripcion || `Documentación técnica completa del proyecto ${projectData.nombre}.`;
  const imageUrl = projectData.imagenPrincipalUrl || '/wikiBack.png';

  return {
    title,
    description,
    icons: {
      icon: '/wikiLog.webp',
      shortcut: '/wikiLog.webp',
      apple: '/wikiLog.webp'
    },
    openGraph: {
      title,
      description,
      url: `https://fabianrivera.dev/Codepedia/project/${projectData.id}`,
      siteName: 'Codepedia',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: projectData.nombre
        }
      ],
      locale: 'es_LA',
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl]
    }
  };
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
