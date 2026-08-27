import type { Metadata } from 'next'
import CodepediaLayoutClient from '@/features/codePediaPage/components/CodepediaLayoutClient'

export const metadata: Metadata = {
  title: {
    template: "%s | Codepedia",
    default: "Codepedia - Enciclopedia de Desarrollo y Arquitectura de Software"
  },
  description: "Explora la enciclopedia técnica interactiva de desarrollo de software, arquitectura de sistemas y documentación de proyectos de Fabian Rivera.",
  keywords: [
    "Codepedia",
    "Fabian Rivera",
    "Documentación de Software",
    "Arquitectura de Software",
    "Ingeniería de Software",
    "React",
    "Next.js",
    "TypeScript",
    "Google Cloud",
    "Wikipedia de Desarrollo"
  ],
  icons: {
    icon: "/wikiLog.webp",
    shortcut: "/wikiLog.webp",
    apple: "/wikiLog.webp"
  },
  openGraph: {
    title: "Codepedia - Enciclopedia de Desarrollo de Software",
    description: "Explora la documentación interactiva, proyectos de software y arquitecturas técnicas.",
    url: "https://fabianrivera.dev/Codepedia",
    siteName: "Codepedia",
    images: [
      {
        url: "/wikiBack.webp",
        width: 1200,
        height: 630,
        alt: "Codepedia Enciclopedia"
      }
    ],
    locale: "es_LA",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Codepedia - Enciclopedia de Desarrollo de Software",
    description: "Explora la documentación interactiva, proyectos de software y arquitecturas técnicas.",
    images: ["/wikiBack.webp"]
  }
};

export default function CodepediaLayout({ children }: { children: React.ReactNode }) {
  return <CodepediaLayoutClient>{children}</CodepediaLayoutClient>;
}