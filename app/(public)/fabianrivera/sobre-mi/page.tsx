import type { Metadata } from 'next'
import AboutFabian from '@/features/fabianPage/pages/aboutFabian'
import { getMetadataUseCase } from '@/server/metadata/infrastructure/dependencies';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Sobre Mí - Perfil Profesional",
  description: "Conoce más sobre Fabian Rivera: experiencia laboral, educación, trayectoria en desarrollo de software y visión técnica.",
  openGraph: {
    title: "Sobre Mí - Perfil Profesional | Fabian Rivera",
    description: "Conoce más sobre Fabian Rivera: experiencia laboral, educación y trayectoria en desarrollo de software.",
    url: "https://fabianrivera.dev/fabianrivera/sobre-mi",
  }
};

export default async function Page() {
    let config: any = null;
    try {
        config = await getMetadataUseCase.execute();
    } catch (error) {
        console.error("Error al cargar metadatos en /fabianrivera/sobre-mi:", error);
    }

    return <AboutFabian metadata={config || {}} />
}