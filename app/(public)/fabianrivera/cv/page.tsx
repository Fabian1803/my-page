import type { Metadata } from 'next'
import CvFabian from '@/features/fabianPage/pages/cvFabian'
import { getMetadataUseCase } from '@/server/metadata/infrastructure/dependencies';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Curriculum Vitae (CV)",
  description: "Consulta y descarga el Curriculum Vitae profesional de Fabian Rivera, Ingeniero de Software.",
  openGraph: {
    title: "Curriculum Vitae (CV) | Fabian Rivera",
    description: "Consulta y descarga el Curriculum Vitae profesional de Fabian Rivera.",
    url: "https://fabianrivera.dev/fabianrivera/cv",
  }
};

export default async function Page() {
    let config: any = null;
    try {
        config = await getMetadataUseCase.execute();
    } catch (error) {
        console.error("Error al cargar metadatos en /fabianrivera/cv:", error);
    }

    return <CvFabian metadata={{ url_cv_pdf: config?.url_cv_pdf }} />
}
