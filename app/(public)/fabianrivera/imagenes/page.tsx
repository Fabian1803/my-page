import type { Metadata } from 'next'
import ImagesFabian from "@/features/fabianPage/pages/imagesFabian";
import { getResourcesUseCase } from "@/server/resources/infrastructure/dependencies";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Galería de Imágenes y Proyectos",
  description: "Galería interactiva de capturas, interfaces de usuario y certificados de proyectos desarrollados por Fabian Rivera.",
  openGraph: {
    title: "Galería de Imágenes y Proyectos | Fabian Rivera",
    description: "Galería interactiva de capturas e interfaces de usuario de proyectos desarrollados por Fabian Rivera.",
    url: "https://fabianrivera.dev/fabianrivera/imagenes",
  }
};

export default async function Page() {
    let imagenes: any = [];
    try {
        imagenes = await getResourcesUseCase.execute({ tipo: "IMAGENES" });
    } catch (error) {
        console.error("Error al cargar imágenes en /fabianrivera/imagenes:", error);
    }
    return <ImagesFabian datosCertificados={Array.isArray(imagenes) ? imagenes : []} />;
}
