import UserActionsHeader from '@/components/userActionsHeader'
import { FabianPageFooter, FabianPageHeader } from '@/features/fabianPage'
import { getMetadataUseCase } from '@/server/metadata/infrastructure/dependencies'
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const config = await getMetadataUseCase.execute()
    const { gmail, github, gitlab, discord, linkedin, telefono, whatsapp, url_cv_pdf, url_imagen } = config || {};
    const datosFiltrados = { gmail, github, gitlab, discord, linkedin, telefono, whatsapp, url_cv_pdf, url_imagen };
    const headerActions = <UserActionsHeader avatarUrl={url_imagen} socialLinks={datosFiltrados} mobileoption left className=' pl-3 max-sm:w-full justify-between' />
    return (
        <div className="grid min-h-screen bg-white text-black grid-rows-[auto_1fr_auto]">
            <FabianPageHeader userActionsSlot={headerActions} />
            {children}
            <FabianPageFooter />
        </div>
    )
}