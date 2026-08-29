import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | GCP Cloud Console',
    default: 'GCP Cloud Console | Dashboard de Administración'
  },
  description: 'Panel de administración privado para gestión de proyectos, recursos y configuración.',
  icons: {
    icon: [
      { url: '/iconCloud.webp', type: 'image/webp' }
    ],
    shortcut: '/iconCloud.webp',
    apple: '/iconCloud.webp'
  },
  openGraph: {
    title: 'GCP Cloud Console | Dashboard de Administración',
    description: 'Panel de administración privado para gestión de proyectos, recursos y configuración.',
    images: [
      {
        url: '/iconCloud.webp',
        width: 512,
        height: 512,
        alt: 'GCP Cloud Console'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary',
    title: 'GCP Cloud Console | Dashboard de Administración',
    description: 'Panel de administración privado.',
    images: ['/iconCloud.webp']
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false
    }
  }
};

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
