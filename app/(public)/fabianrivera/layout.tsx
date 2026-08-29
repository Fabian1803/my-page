import type { Metadata } from 'next'
import UserActionsHeader from '@/components/userActionsHeader'
import { FabianPageFooter, FabianPageHeader } from '@/features/fabianPage'
import { getMetadataUseCase } from '@/server/metadata/infrastructure/dependencies'

export async function generateMetadata(): Promise<Metadata> {
    let config: any = null;
    try {
        config = await getMetadataUseCase.execute();
    } catch {
        config = null;
    }

    const imagenUrl = config?.url_imagen || '/FLogo.webp';
    const nombre = config?.nombre || 'Fabian Rivera';
    const descripcion = config?.descripcion || 'Explora los proyectos de software, certificaciones, habilidades técnicas y experiencia profesional de Fabian Rivera.';

    return {
        title: {
            template: '%s | Fabian Rivera',
            default: `${nombre} - Portafolio y Perfil Profesional`
        },
        description: descripcion,
        icons: {
            icon: [
                { url: '/FLogo.webp', type: 'image/webp' }
            ],
            shortcut: '/FLogo.webp',
            apple: '/FLogo.webp'
        },
        openGraph: {
            title: `${nombre} - Portafolio y Perfil Profesional`,
            description: descripcion,
            url: 'https://fabianrivera.dev/fabianrivera',
            siteName: nombre,
            images: [
                {
                    url: imagenUrl,
                    width: 800,
                    height: 800,
                    alt: nombre
                }
            ],
            locale: 'es_LA',
            type: 'profile'
        },
        twitter: {
            card: 'summary_large_image',
            title: `${nombre} - Portafolio y Perfil Profesional`,
            description: descripcion,
            images: [imagenUrl]
        }
    };
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