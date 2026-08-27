import type { Metadata } from 'next'
import UserActionsHeader from '@/components/userActionsHeader'
import { FabianPageFooter, FabianPageHeader } from '@/features/fabianPage'
import { getMetadataUseCase } from '@/server/metadata/infrastructure/dependencies'

export const metadata: Metadata = {
    title: {
        template: '%s | Fabian Rivera',
        default: 'Fabian Rivera - Portafolio y Perfil Profesional'
    },
    description: 'Explora los proyectos de software, certificaciones, habilidades técnicas y experiencia profesional de Fabian Rivera.',
    icons: {
        icon: [
            { url: '/FLogo.webp', type: 'image/webp' }
        ],
        shortcut: '/FLogo.webp',
        apple: '/FLogo.webp'
    },
    openGraph: {
        title: 'Fabian Rivera - Portafolio y Perfil Profesional',
        description: 'Explora los proyectos de software, certificaciones y habilidades de Fabian Rivera.',
        url: 'https://fabianrivera.dev/fabianrivera',
        siteName: 'Fabian Rivera',
        images: [
            {
                url: '/perfil.jpeg',
                width: 800,
                height: 800,
                alt: 'Fabian Rivera'
            }
        ],
        locale: 'es_LA',
        type: 'profile'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Fabian Rivera - Portafolio y Perfil Profesional',
        description: 'Explora los proyectos de software, certificaciones y habilidades de Fabian Rivera.',
        images: ['/perfil.jpeg']
    }
}

export default async function FabianLayout({ children }: { children: React.ReactNode }) {
    const config = await getMetadataUseCase.execute()
    const { nombre, gmail, github, gitlab, discord, linkedin, telefono, whatsapp, url_cv_pdf, url_imagen } = config || {};
    const datosFiltrados = { gmail, github, gitlab, discord, linkedin, telefono, whatsapp, url_cv_pdf, url_imagen };
    const headerActions = (
        <UserActionsHeader 
            avatarUrl={url_imagen} 
            userName={nombre} 
            userEmail={gmail} 
            socialLinks={datosFiltrados} 
            mobileoption 
            left 
            className='pl-3 max-sm:w-full justify-between' 
        />
    )
    return (
        <div className="grid min-h-screen bg-white text-black grid-rows-[auto_1fr_auto]">
            <FabianPageHeader userActionsSlot={headerActions} />
            {children}
            <FabianPageFooter />
        </div>
    )
}