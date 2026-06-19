import { FabianPageFooter, FabianPageHeader } from '@/features/fabianPage'
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid min-h-screen bg-white text-black grid-rows-[auto_1fr_auto]">
            <FabianPageHeader />
            {children}
            <FabianPageFooter />
        </div>
    )
}