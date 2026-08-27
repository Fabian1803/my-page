import type { Metadata } from "next";
import HomeCodepedia from "@/features/codePediaPage/pages/homeCodepedia";
import { getMetadataUseCase } from "@/server/metadata/infrastructure/dependencies";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Inicio - Artículos y Documentación de Software",
  description: "Explora más de 100 artículos, arquitectura de software y documentación interactiva en español en Codepedia.",
  icons: {
    icon: "/wikiLog.webp",
    shortcut: "/wikiLog.webp",
    apple: "/wikiLog.webp"
  },
  openGraph: {
    title: "Codepedia - Artículos y Documentación de Software",
    description: "Explora artículos técnicos y documentación de software en español.",
    url: "https://fabianrivera.dev/Codepedia",
  }
};

export default async function Codepedia() {
    let config: any = null;
    try {
        config = await getMetadataUseCase.execute();
    } catch (error) {
        console.error("Error al cargar metadatos en /Codepedia:", error);
    }

    return <HomeCodepedia metadata={config || {}} />
}
