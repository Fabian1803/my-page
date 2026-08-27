import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fabianrivera.dev"),
  title: {
    template: "%s | Fabian Rivera",
    default: "Fabian Rivera | Software Engineer & Cloud Architect"
  },
  description: "Portafolio profesional y enciclopedia técnica de Fabian Rivera. Ingeniero de Software especializado en desarrollo web moderno, arquitecturas escalables, Google Cloud y soluciones Full Stack.",
  keywords: [
    "Fabian Rivera",
    "Software Engineer",
    "Ingeniero de Software",
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Google Cloud",
    "Codepedia",
    "Cloud Architecture",
    "Portafolio Fabian Rivera"
  ],
  authors: [{ name: "Fabian Rivera", url: "https://fabianrivera.dev" }],
  creator: "Fabian Rivera",
  icons: {
    icon: "/FLogo.webp",
    shortcut: "/FLogo.webp",
    apple: "/FLogo.webp"
  },
  openGraph: {
    title: "Fabian Rivera | Software Engineer & Cloud Architect",
    description: "Portafolio profesional y proyectos de ingeniería de software desarrollados por Fabian Rivera.",
    url: "https://fabianrivera.dev",
    siteName: "Fabian Rivera",
    images: [
      {
        url: "/perfil.jpeg",
        width: 800,
        height: 800,
        alt: "Fabian Rivera - Software Engineer"
      }
    ],
    locale: "es_LA",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Fabian Rivera | Software Engineer & Cloud Architect",
    description: "Portafolio profesional y proyectos de ingeniería de software desarrollados por Fabian Rivera.",
    images: ["/perfil.jpeg"],
    creator: "@fabianrivera"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedColor = localStorage.getItem('codepedia-theme');
                  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (savedColor === 'dark' || (!savedColor && systemDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
