import type { Metadata } from 'next'
import SearchQueryProject from '@/features/codePediaPage/pages/searchQueryProject'
import { getResourcesUseCase } from '@/server/resources/infrastructure/dependencies'
export const revalidate = 3600;
interface PageProps { params: Promise<{ searchQuery: string }>; }
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const rawQuery = resolvedParams.searchQuery ? decodeURIComponent(resolvedParams.searchQuery).trim() : 'Todos';
  const title = `Búsqueda: ${rawQuery} | Codepedia`;
  const description = `Explora los proyectos y artículos relacionados con "${rawQuery}" en la enciclopedia técnica Codepedia.`;
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
      url: `https://fabianrivera.dev/Codepedia/${encodeURIComponent(rawQuery)}`,
      siteName: 'Codepedia',
      images: [
        {
          url: '/wikiBack.png',
          width: 1200,
          height: 630,
          alt: `Codepedia - ${rawQuery}`
        }
      ],
      locale: 'es_LA',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/wikiBack.png']
    }
  };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const rawQuery = resolvedParams.searchQuery ? decodeURIComponent(resolvedParams.searchQuery).trim() : '';
  const isAll = !rawQuery || rawQuery.toLowerCase() === 'all' || rawQuery.toLowerCase() === 'todos';
  const proyectosRaw = await getResourcesUseCase.execute({ tipo: "PROYECTO" });
  const allProjects = Array.isArray(proyectosRaw) ? proyectosRaw : [];
  const queryNormalized = rawQuery.toLowerCase();

  const matchedProjects = isAll
    ? allProjects
    : allProjects.filter((p: any) => {
      const nombreMatch = p.nombre?.toLowerCase().includes(queryNormalized);
      const descMatch = p.descripcion?.toLowerCase().includes(queryNormalized);
      const catMatch = (p.categorias || []).some((c: any) => {
        const catName = typeof c === 'string' ? c : c.nombre;
        return catName?.toLowerCase().includes(queryNormalized);
      });
      return nombreMatch || descMatch || catMatch;
    });

  const otherProjects = isAll
    ? []
    : allProjects.filter((p: any) => !matchedProjects.some(m => m.id === p.id)).slice(0, 4);

  const formatProject = (p: any) => {
    let dateStr = "Actualizado";
    if (p.createdAt || p.updatedAt) {
      const d = new Date(p.updatedAt || p.createdAt);
      dateStr = d.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    }

    return {
      id: p.id,
      nombre: p.nombre,
      descripcion: p.descripcion,
      imagen: p.imagenPrincipalUrl || p.miniaturaUrl || "/FLogo.webp",
      url: `/Codepedia/project/${p.id}`,
      date: dateStr
    };
  };

  return (
    <SearchQueryProject
      searchQuery={rawQuery}
      proyectosEncontrados={matchedProjects.map(formatProject)}
      otrosProyectos={otherProjects.map(formatProject)}
    />
  );
}
