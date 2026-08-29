import type { Metadata } from "next";
import SearchPage from "@/features/searchPage/searchPage";
import { getMetadataUseCase } from "@/server/metadata/infrastructure/dependencies";

export async function generateMetadata(): Promise<Metadata> {
  let config: any = null;
  try {
    config = await getMetadataUseCase.execute();
  } catch {
    config = null;
  }

  const imagenUrl = config?.url_imagen || "/FLogo.webp";
  const nombre = config?.nombre || "Fabian Rivera";
  const description = "Buscador interactivo del portafolio profesional, proyectos de software y documentación técnica de Fabian Rivera.";

  return {
    title: `${nombre} | Buscador de Proyectos y Enciclopedia`,
    description,
    icons: {
      icon: "/FLogo.webp",
      shortcut: "/FLogo.webp",
      apple: "/FLogo.webp"
    },
    openGraph: {
      title: `${nombre} | Buscador de Proyectos y Enciclopedia`,
      description,
      url: "https://fabianrivera.dev",
      siteName: nombre,
      images: [
        {
          url: imagenUrl,
          width: 800,
          height: 800,
          alt: nombre
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${nombre} | Buscador de Proyectos y Enciclopedia`,
      description,
      images: [imagenUrl]
    }
  };
}

export default function Home() { 
  return <SearchPage /> 
}
