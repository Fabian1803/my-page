import type { Metadata } from 'next'
import LoginPage from '@/features/loginPage/loginPage'

export const metadata: Metadata = {
  title: 'Iniciar Sesión | GCP Cloud Console',
  description: 'Acceso seguro mediante contraseña o autenticación biométrica a la consola de administración.',
  icons: {
    icon: '/iconCloud.webp',
    shortcut: '/iconCloud.webp',
    apple: '/iconCloud.webp'
  },
  robots: {
    index: false,
    follow: false
  }
}

export default function page() {
  return <LoginPage />
}
