import type { Metadata } from "next";
import SearchPage from "@/features/searchPage/searchPage";

export const metadata: Metadata = {
  title: "Fabian Rivera | Buscador de Proyectos y Enciclopedia",
  description: "Buscador interactivo del portafolio profesional, proyectos de software y documentación técnica de Fabian Rivera.",
  icons: {
    icon: "/FLogo.webp",
    shortcut: "/FLogo.webp",
    apple: "/FLogo.webp"
  },
  openGraph: {
    title: "Fabian Rivera | Buscador de Proyectos y Enciclopedia",
    description: "Buscador interactivo del portafolio profesional y documentación técnica de Fabian Rivera.",
    url: "https://fabianrivera.dev",
    siteName: "Fabian Rivera",
    images: [
      {
        url: "/perfil.jpeg",
        width: 800,
        height: 800,
        alt: "Fabian Rivera"
      }
    ]
  }
};

export default function Home() { 
  return <SearchPage /> 
}
